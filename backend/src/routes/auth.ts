import { Router } from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { TABLES } from '../config/index.js';

const router = Router();
const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

const JWT_SECRET = process.env.JWT_SECRET || 'aiops-council-secret-2026';

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role, company } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    // Check if user exists
    const existing = await docClient.send(new GetCommand({
      TableName: TABLES.USERS,
      Key: { email },
    }));

    if (existing.Item) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    // Create user
    await docClient.send(new PutCommand({
      TableName: TABLES.USERS,
      Item: {
        email,
        userId,
        passwordHash,
        name,
        role: role || '',
        company: company || '',
        createdAt: new Date().toISOString(),
        membershipStatus: 'none', // none, pending, active, expired
      },
    }));

    // Generate token
    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { userId, email, name, role, company, membershipStatus: 'none' },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Get user
    const result = await docClient.send(new GetCommand({
      TableName: TABLES.USERS,
      Key: { email },
    }));

    if (!result.Item) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const valid = await bcrypt.compare(password, result.Item.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: result.Item.userId, email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash, ...user } = result.Item;
    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get profile (requires auth)
router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    const result = await docClient.send(new GetCommand({
      TableName: TABLES.USERS,
      Key: { email: decoded.email },
    }));

    if (!result.Item) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { passwordHash, ...user } = result.Item;
    res.json({ user });
  } catch (error) {
    if ((error as any).name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

export default router;
