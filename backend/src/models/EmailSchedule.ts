import mongoose, { Document, Schema } from 'mongoose';

export interface IEmailSchedule extends Document {
  email: string;
  date: Date;
  description: string;
  userId: mongoose.Types.ObjectId;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EmailScheduleSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    sentAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEmailSchedule>('EmailSchedule', EmailScheduleSchema);
