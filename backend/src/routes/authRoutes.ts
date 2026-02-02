import { Router } from 'express';
import { login, logout, getCurrentUser, seedUser } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/login', login);
router.get('/seed', seedUser); // For creating test user

// Protected routes
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getCurrentUser);

export default router;
