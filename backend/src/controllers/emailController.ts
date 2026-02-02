import { Request, Response } from 'express';
import EmailSchedule from '../models/EmailSchedule';
import { sendEmail, generateEmailTemplate } from '../utils/emailService';

interface AuthRequest extends Request {
  user?: any;
}

export const getAllEmails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const emails = await EmailSchedule.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(emails);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const getEmailById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const email = await EmailSchedule.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });
    
    if (!email) {
      res.status(404).json({ message: 'Email not found' });
      return;
    }
    
    res.json(email);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const createEmail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, date, description } = req.body;

    const emailSchedule = new EmailSchedule({
      email,
      date: new Date(date),
      description,
      userId: req.user.userId,
      status: 'pending',
    });

    await emailSchedule.save();
    
    res.status(201).json({
      message: 'Email scheduled successfully',
      emailSchedule,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const updateEmail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, date, description } = req.body;

    const emailSchedule = await EmailSchedule.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      {
        email,
        date: new Date(date),
        description,
      },
      { new: true }
    );

    if (!emailSchedule) {
      res.status(404).json({ message: 'Email not found' });
      return;
    }

    res.json({
      message: 'Email updated successfully',
      emailSchedule,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const deleteEmail = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const emailSchedule = await EmailSchedule.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!emailSchedule) {
      res.status(404).json({ message: 'Email not found' });
      return;
    }

    res.json({ message: 'Email deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const sendEmailNow = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const emailSchedule = await EmailSchedule.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!emailSchedule) {
      res.status(404).json({ message: 'Email not found' });
      return;
    }

    const subject = 'Hi Salam kenal';
    const html = generateEmailTemplate(emailSchedule.description);
    const text = `Hi Salam kenal\n\n${emailSchedule.description}`;

    const sent = await sendEmail(emailSchedule.email, subject, text, html);

    if (sent) {
      emailSchedule.status = 'sent';
      emailSchedule.sentAt = new Date();
      await emailSchedule.save();
      res.json({ message: 'Email sent successfully', emailSchedule });
    } else {
      emailSchedule.status = 'failed';
      await emailSchedule.save();
      res.status(500).json({ message: 'Failed to send email' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};
