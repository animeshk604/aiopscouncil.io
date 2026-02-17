import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import applicationRoutes from './routes/applications.js';
import membershipRoutes from './routes/membership.js';
import webhookRoutes from './routes/webhook.js';
import oauthRoutes from './routes/oauth.js';

const app = express();
const PORT = process.env.PORT || 3001;

// CORS
app.use(cors({
  origin: process.env.CONSOLE_URL || 'http://localhost:5173',
  credentials: true,
}));

// Webhook route needs raw body (before JSON parsing)
app.use('/webhook', webhookRoutes);

// JSON parsing for other routes
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'aiopscouncil-backend' });
});

// Routes
app.use('/auth', authRoutes);
app.use('/auth', oauthRoutes);  // OAuth routes (google, discord, github)
app.use('/applications', applicationRoutes);
app.use('/membership', membershipRoutes);

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`AI Ops Council backend running on port ${PORT}`);
});
