import { Schema, model } from 'mongoose';
import { IFollow } from './follow.interface';

const followSchema = new Schema<IFollow>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    followingUserEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

followSchema.index({ userId: 1, followingUserEmail: 1 }, { unique: true });

export const Follow = model<IFollow>('Follow', followSchema);
