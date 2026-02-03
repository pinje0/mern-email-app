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
    cachedConnection = await mongoose.connect(mongoURI, options);
    console.log('✅ MongoDB connected successfully');
    
    return cachedConnection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// Check if database is connected
export const isDBConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

export default connectDB;
