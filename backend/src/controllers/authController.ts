import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Record login timestamp
    user.loginTimestamps.push(new Date());
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (user) {
      user.logoutTimestamps.push(new Date());
      await user.save();
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const seedUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      res.json({ message: 'Test user already exists' });
      return;
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
    });

    await user.save();
    res.json({ message: 'Test user created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};
