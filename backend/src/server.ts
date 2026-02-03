import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectDB, isDBConnected } from './utils/db';
import authRoutes from './routes/authRoutes';
import emailRoutes from './routes/emailRoutes';

const app = express();

// Middleware - CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to ensure DB connection on each request (for serverless)
const ensureDBConnection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!isDBConnected()) {
      console.log('🔌 Connecting to database...');
      await connectDB();
    }
    next();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    res.status(500).json({ 
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
};

// Apply DB connection middleware to all routes except health check
app.use('/api/auth', ensureDBConnection, authRoutes);
app.use('/api/emails', ensureDBConnection, emailRoutes);

// Health check - no DB required
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    dbConnected: isDBConnected()
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err);
  res.status(500).json({ 
    message: 'Server error', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
}

// Export app for Vercel
export default app;
