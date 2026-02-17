import { Router } from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import express from 'express';
import Stripe from 'stripe';
import { TABLES } from '../config/index.js';

const router = Router();
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const sesClient = new SESClient({ region: 'us-east-1' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

// Raw body parser for webhook
router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Received webhook: ${event.type}`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.metadata?.source !== 'aiopscouncil') break;

        const email = session.metadata.email;
        if (email) {
          await docClient.send(new UpdateCommand({
            TableName: TABLES.USERS,
            Key: { email },
            UpdateExpression: 'SET membershipStatus = :status, stripeSubscriptionId = :subId',
            ExpressionAttributeValues: {
              ':status': 'active',
              ':subId': session.subscription,
            },
          }));

          // Send welcome email
          await sendWelcomeEmail(email, session.metadata.userId);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        if (subscription.metadata?.source !== 'aiopscouncil') break;

        const email = subscription.metadata.email;
        if (email) {
          const status = subscription.status === 'active' ? 'active' : 'expired';
          const expiresAt = new Date(subscription.current_period_end * 1000).toISOString();

          await docClient.send(new UpdateCommand({
            TableName: TABLES.USERS,
            Key: { email },
            UpdateExpression: 'SET membershipStatus = :status, membershipExpiresAt = :exp',
            ExpressionAttributeValues: {
              ':status': status,
              ':exp': expiresAt,
            },
          }));
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        if (subscription.metadata?.source !== 'aiopscouncil') break;

        const email = subscription.metadata.email;
        if (email) {
          await docClient.send(new UpdateCommand({
            TableName: TABLES.USERS,
            Key: { email },
            UpdateExpression: 'SET membershipStatus = :status',
            ExpressionAttributeValues: { ':status': 'expired' },
          }));
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = invoice.subscription
          ? await stripe.subscriptions.retrieve(invoice.subscription as string)
          : null;

        if (subscription?.metadata?.source !== 'aiopscouncil') break;

        const email = subscription.metadata.email;
        if (email) {
          await sendPaymentFailedEmail(email);
        }
        break;
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

async function sendWelcomeEmail(email: string, userId: string) {
  try {
    await sesClient.send(new SendEmailCommand({
      Source: 'noreply@aiopscouncil.io',
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: 'Welcome to AI Ops Council!' },
        Body: {
          Html: {
            Data: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h1 style="color: #2c3e50;">Welcome to the AI Ops Council!</h1>
                <p>Your membership is now active. You're now part of an exclusive community of AI operators building the future.</p>

                <h2>Getting Started</h2>
                <ul>
                  <li><strong>Discord:</strong> You'll receive a separate invite to our private Discord server</li>
                  <li><strong>Office Hours:</strong> Join our monthly sessions with Council Fellows</li>
                  <li><strong>ClawAPI Access:</strong> Get early access to our AI tools at <a href="https://dev.clawapi.io">dev.clawapi.io</a></li>
                </ul>

                <h2>Community Guidelines</h2>
                <ul>
                  <li>100% Signal, 0% Noise</li>
                  <li>Share real production experiences</li>
                  <li>Help others solve hard problems</li>
                  <li>No sales pitches or self-promotion</li>
                </ul>

                <p style="margin-top: 30px;">
                  Questions? Reply to this email or reach out at <a href="mailto:contact@aiopscouncil.io">contact@aiopscouncil.io</a>
                </p>

                <p style="color: #7f8c8d;">
                  Best,<br>
                  The AI Ops Council
                </p>
              </div>
            `,
          },
        },
      },
    }));
  } catch (err) {
    console.error('Failed to send welcome email:', err);
  }
}

async function sendPaymentFailedEmail(email: string) {
  try {
    await sesClient.send(new SendEmailCommand({
      Source: 'noreply@aiopscouncil.io',
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: 'AI Ops Council - Payment Failed' },
        Body: {
          Html: {
            Data: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2 style="color: #e74c3c;">Payment Failed</h2>
                <p>We couldn't process your AI Ops Council membership payment.</p>
                <p>Please update your payment method to continue your membership:</p>
                <p><a href="https://aiopscouncil.io/membership" style="background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Update Payment Method</a></p>
                <p style="color: #7f8c8d; margin-top: 30px;">
                  If you have questions, contact us at <a href="mailto:contact@aiopscouncil.io">contact@aiopscouncil.io</a>
                </p>
              </div>
            `,
          },
        },
      },
    }));
  } catch (err) {
    console.error('Failed to send payment failed email:', err);
  }
}

export default router;
