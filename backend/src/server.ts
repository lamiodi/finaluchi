import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://finaluchi.com',
  'https://www.finaluchi.com',
  'http://localhost:5173',
].filter((url): url is string => Boolean(url));

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl) or if in allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive fallback in development
  },
  credentials: true,
}));
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'finaluchi-backend',
    timestamp: new Date().toISOString(),
  });
});

// Paystack Webhook Handler (Stub aligned to Architecture Blueprint)
app.post('/api/webhooks/paystack', (req: Request, res: Response) => {
  const event = req.body;
  console.log('[Paystack Webhook Received]:', event?.event || 'Unknown event');

  // Acknowledge receipt immediately with 200 OK
  res.status(200).json({ received: true });
});

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'FINALUCHI Couture API Gateway',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      paystackWebhook: '/api/webhooks/paystack',
    },
  });
});

app.listen(PORT, () => {
  console.log(`[Finaluchi API] Server listening on http://localhost:${PORT}`);
});

export default app;
