import mongoose from 'mongoose';

// Cache the connection for serverless environments
let cachedConnection: typeof mongoose | null = null;

export const connectDB = async (): Promise<typeof mongoose> => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ ERROR: MONGODB_URI is not defined');
      throw new Error('MONGODB_URI is not defined');
    }

    // Debug: Log connection string (mask password)
    const maskedURI = mongoURI.replace(/:([^@]+)@/, ':****@');
    console.log('🔌 Attempting MongoDB connection to:', maskedURI);

    // If we have a cached connection, use it
    if (cachedConnection && cachedConnection.connection.readyState === 1) {
      console.log('✅ Using cached MongoDB connection');
      return cachedConnection;
    }

    // Connection options optimized for serverless/Vercel
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    };

    // Create new connection
    console.log('⏳ Connecting to MongoDB...');
    cachedConnection = await mongoose.connect(mongoURI, options);
    console.log('✅ MongoDB connected successfully');
    
    return cachedConnection;
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Error code:', error.code);
    console.error('Error reason:', error.reason);
    throw error;
  }
};

// Check if database is connected
export const isDBConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

export default connectDB;
