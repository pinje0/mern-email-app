import { Router } from 'express';
import {
  getAllEmails,
  getEmailById,
  createEmail,
  updateEmail,
  deleteEmail,
  sendEmailNow,
} from '../controllers/emailController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All email routes are protected
router.get('/', authMiddleware, getAllEmails);
router.get('/:id', authMiddleware, getEmailById);
router.post('/', authMiddleware, createEmail);
router.put('/:id', authMiddleware, updateEmail);
router.delete('/:id', authMiddleware, deleteEmail);
router.post('/:id/send', authMiddleware, sendEmailNow);

export default router;
