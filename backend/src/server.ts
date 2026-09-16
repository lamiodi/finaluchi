import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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
