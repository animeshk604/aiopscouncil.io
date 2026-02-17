import { Router } from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import { TABLES, MEMBERSHIP_PRICE_ID, MEMBERSHIP_BENEFITS } from '../config/index.js';

const router = Router();
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });
const JWT_SECRET = process.env.JWT_SECRET || 'aiops-council-secret-2026';
const CONSOLE_URL = process.env.CONSOLE_URL || 'http://localhost:5173';

// Middleware to verify JWT
const requireAuth = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Get membership info
router.get('/info', (req, res) => {
  res.json({
    price: 500,
    interval: 'year',
    currency: 'usd',
    benefits: MEMBERSHIP_BENEFITS,
  });
});

// Get membership status
router.get('/status', requireAuth, async (req: any, res) => {
  try {
    const result = await docClient.send(new GetCommand({
      TableName: TABLES.USERS,
      Key: { email: req.user.email },
    }));

    if (!result.Item) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      status: result.Item.membershipStatus || 'none',
      subscriptionId: result.Item.stripeSubscriptionId,
      expiresAt: result.Item.membershipExpiresAt,
    });
  } catch (error) {
    console.error('Membership status error:', error);
    res.status(500).json({ error: 'Failed to get membership status' });
  }
});

// Create checkout session
router.post('/checkout', requireAuth, async (req: any, res) => {
  try {
    const { email, userId } = req.user;

    // Get user to check if they have a Stripe customer ID
    const userResult = await docClient.send(new GetCommand({
      TableName: TABLES.USERS,
      Key: { email },
    }));

    if (!userResult.Item) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already a member
    if (userResult.Item.membershipStatus === 'active') {
      return res.status(400).json({ error: 'Already an active member' });
    }

    let customerId = userResult.Item.stripeCustomerId;

    // Create Stripe customer if needed
    if (!customerId) {
      const customer = await stripe.customers.create({
        email,
        name: userResult.Item.name,
        metadata: { userId, source: 'aiopscouncil' },
      });
      customerId = customer.id;

      // Save customer ID
      await docClient.send(new UpdateCommand({
        TableName: TABLES.USERS,
        Key: { email },
        UpdateExpression: 'SET stripeCustomerId = :cid',
        ExpressionAttributeValues: { ':cid': customerId },
      }));
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: MEMBERSHIP_PRICE_ID, quantity: 1 }],
      success_url: `${CONSOLE_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CONSOLE_URL}/join`,
      metadata: { userId, email, source: 'aiopscouncil' },
      subscription_data: {
        metadata: { userId, email, source: 'aiopscouncil' },
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Manage billing (redirect to Stripe portal)
router.post('/portal', requireAuth, async (req: any, res) => {
  try {
    const userResult = await docClient.send(new GetCommand({
      TableName: TABLES.USERS,
      Key: { email: req.user.email },
    }));

    if (!userResult.Item?.stripeCustomerId) {
      return res.status(400).json({ error: 'No billing account found' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: userResult.Item.stripeCustomerId,
      return_url: `${CONSOLE_URL}/membership`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Portal error:', error);
    res.status(500).json({ error: 'Failed to create portal session' });
  }
});

export default router;
