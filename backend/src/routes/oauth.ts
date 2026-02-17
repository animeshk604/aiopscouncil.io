import { Router } from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { TABLES } from '../config/index.js';

const router = Router();
const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

const JWT_SECRET = process.env.JWT_SECRET || 'aiops-council-secret-2026';
const CONSOLE_URL = process.env.CONSOLE_URL || 'https://aiopscouncil.io';

// OAuth credentials from environment variables
// Set these in PM2 or server environment (same values as dev.clawapi.io)
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || '';
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || '';
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';

// Helper to create or update user from OAuth
async function findOrCreateOAuthUser(provider: string, profile: { email: string; name: string; providerId: string }) {
  const { email, name, providerId } = profile;

  // Check if user exists
  const existing = await docClient.send(new GetCommand({
    TableName: TABLES.USERS,
    Key: { email },
  }));

  if (existing.Item) {
    // Update OAuth provider info
    await docClient.send(new UpdateCommand({
      TableName: TABLES.USERS,
      Key: { email },
      UpdateExpression: `SET ${provider}Id = :pid, lastLogin = :now`,
      ExpressionAttributeValues: {
        ':pid': providerId,
        ':now': new Date().toISOString(),
      },
    }));
    return existing.Item;
  }

  // Create new user
  const userId = uuidv4();
  const newUser = {
    email,
    userId,
    name,
    [`${provider}Id`]: providerId,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    membershipStatus: 'none',
    authProvider: provider,
  };

  await docClient.send(new PutCommand({
    TableName: TABLES.USERS,
    Item: newUser,
  }));

  return newUser;
}

// Generate JWT and redirect
function generateTokenAndRedirect(user: any, res: any) {
  const token = jwt.sign(
    { userId: user.userId, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.redirect(`${CONSOLE_URL}/membership#token=${token}`);
}

// ============ GOOGLE ============

router.get('/google', (req, res) => {
  const redirectUri = `${CONSOLE_URL}/api/auth/google/callback`;
  const scope = encodeURIComponent('email profile');
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
  res.redirect(url);
});

router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.redirect(`${CONSOLE_URL}/login?error=no_code`);
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: code as string,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `${CONSOLE_URL}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenRes.json();
    if (!tokens.access_token) {
      console.error('Google token error:', tokens);
      return res.redirect(`${CONSOLE_URL}/login?error=token_failed`);
    }

    // Get user info
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const googleUser = await userRes.json();

    const user = await findOrCreateOAuthUser('google', {
      email: googleUser.email,
      name: googleUser.name,
      providerId: googleUser.id,
    });

    generateTokenAndRedirect(user, res);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect(`${CONSOLE_URL}/login?error=oauth_failed`);
  }
});

// ============ DISCORD ============

router.get('/discord', (req, res) => {
  const redirectUri = `${CONSOLE_URL}/api/auth/discord/callback`;
  const scope = encodeURIComponent('identify email');
  const url = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;
  res.redirect(url);
});

router.get('/discord/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.redirect(`${CONSOLE_URL}/login?error=no_code`);
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: code as string,
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        redirect_uri: `${CONSOLE_URL}/api/auth/discord/callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenRes.json();
    if (!tokens.access_token) {
      console.error('Discord token error:', tokens);
      return res.redirect(`${CONSOLE_URL}/login?error=token_failed`);
    }

    // Get user info
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const discordUser = await userRes.json();

    if (!discordUser.email) {
      return res.redirect(`${CONSOLE_URL}/login?error=no_email`);
    }

    const user = await findOrCreateOAuthUser('discord', {
      email: discordUser.email,
      name: discordUser.global_name || discordUser.username,
      providerId: discordUser.id,
    });

    generateTokenAndRedirect(user, res);
  } catch (error) {
    console.error('Discord OAuth error:', error);
    res.redirect(`${CONSOLE_URL}/login?error=oauth_failed`);
  }
});

// ============ GITHUB ============

router.get('/github', (req, res) => {
  const redirectUri = `${CONSOLE_URL}/api/auth/github/callback`;
  const scope = encodeURIComponent('user:email');
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
  res.redirect(url);
});

router.get('/github/callback', async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.redirect(`${CONSOLE_URL}/login?error=no_code`);
  }

  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        code,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        redirect_uri: `${CONSOLE_URL}/api/auth/github/callback`,
      }),
    });

    const tokens = await tokenRes.json();
    if (!tokens.access_token) {
      console.error('GitHub token error:', tokens);
      return res.redirect(`${CONSOLE_URL}/login?error=token_failed`);
    }

    // Get user info
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        'User-Agent': 'AI-Ops-Council',
      },
    });
    const githubUser = await userRes.json();

    // Get email if not public
    let email = githubUser.email;
    if (!email) {
      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          'User-Agent': 'AI-Ops-Council',
        },
      });
      const emails = await emailRes.json();
      const primaryEmail = emails.find((e: any) => e.primary) || emails[0];
      email = primaryEmail?.email;
    }

    if (!email) {
      return res.redirect(`${CONSOLE_URL}/login?error=no_email`);
    }

    const user = await findOrCreateOAuthUser('github', {
      email,
      name: githubUser.name || githubUser.login,
      providerId: String(githubUser.id),
    });

    generateTokenAndRedirect(user, res);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.redirect(`${CONSOLE_URL}/login?error=oauth_failed`);
  }
});

export default router;
