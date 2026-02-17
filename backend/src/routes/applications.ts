import { Router } from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { TABLES } from '../config/index.js';

const router = Router();
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const sesClient = new SESClient({ region: 'us-east-1' });

const FORWARD_TO = ['edward+0001@etumos.com', 'animeshk604@gmail.com'];

// Submit application
router.post('/', async (req, res) => {
  try {
    const { name, email, role, company, experience, warStory } = req.body;

    if (!name || !email || !experience || !warStory) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check for existing application
    const existing = await docClient.send(new GetCommand({
      TableName: TABLES.APPLICATIONS,
      Key: { email },
    }));

    if (existing.Item) {
      return res.status(409).json({ error: 'You have already submitted an application' });
    }

    // Store application
    const application = {
      email,
      name,
      role: role || '',
      company: company || '',
      experience,
      warStory,
      status: 'pending', // pending, approved, rejected
      submittedAt: new Date().toISOString(),
    };

    await docClient.send(new PutCommand({
      TableName: TABLES.APPLICATIONS,
      Item: application,
    }));

    // Notify admins
    try {
      for (const recipient of FORWARD_TO) {
        await sesClient.send(new SendEmailCommand({
          Source: 'noreply@aiopscouncil.io',
          Destination: { ToAddresses: [recipient] },
          Message: {
            Subject: { Data: `[AI Ops Council] New Application: ${name}` },
            Body: {
              Html: {
                Data: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px;">
                    <h2 style="color: #2c3e50;">New Council Application</h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Email:</strong> ${email}</p>
                      <p><strong>Role:</strong> ${role || 'Not specified'}</p>
                      <p><strong>Company:</strong> ${company || 'Not specified'}</p>
                      <p><strong>Experience:</strong> ${experience}</p>
                      <h3>War Story:</h3>
                      <p style="background: white; padding: 15px; border-left: 4px solid #3498db;">${warStory}</p>
                    </div>
                    <p style="color: #7f8c8d; margin-top: 20px;">
                      Reply to this email or visit the admin panel to review this application.
                    </p>
                  </div>
                `,
              },
            },
          },
        }));
      }
    } catch (emailErr) {
      console.error('Failed to send notification email:', emailErr);
      // Don't fail the request if email fails
    }

    // Send confirmation to applicant
    try {
      await sesClient.send(new SendEmailCommand({
        Source: 'noreply@aiopscouncil.io',
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: 'AI Ops Council - Application Received' },
          Body: {
            Html: {
              Data: `
                <div style="font-family: Arial, sans-serif; max-width: 600px;">
                  <h2 style="color: #2c3e50;">Thank You for Applying, ${name}!</h2>
                  <p>We've received your application to join the AI Ops Council.</p>
                  <p>Our members review applications weekly. If approved, you'll receive an invitation to complete your membership ($500/year) and gain access to:</p>
                  <ul>
                    <li>Private channels with top AI operators</li>
                    <li>Exclusive war stories & architecture reviews</li>
                    <li>Early access to council-built tools</li>
                    <li>Monthly office hours with Council Fellows</li>
                  </ul>
                  <p>We typically respond within 5-7 business days.</p>
                  <p style="color: #7f8c8d; margin-top: 30px;">
                    Best,<br>
                    The AI Ops Council
                  </p>
                </div>
              `,
            },
          },
        },
      }));
    } catch (emailErr) {
      console.error('Failed to send confirmation email:', emailErr);
    }

    res.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Get application status (by email)
router.get('/status', async (req, res) => {
  try {
    const email = req.query.email as string;
    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    const result = await docClient.send(new GetCommand({
      TableName: TABLES.APPLICATIONS,
      Key: { email },
    }));

    if (!result.Item) {
      return res.json({ status: 'not_found' });
    }

    res.json({
      status: result.Item.status,
      submittedAt: result.Item.submittedAt,
    });
  } catch (error) {
    console.error('Status check error:', error);
    res.status(500).json({ error: 'Failed to check status' });
  }
});

export default router;
