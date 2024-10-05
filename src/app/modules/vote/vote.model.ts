import { Schema, model } from 'mongoose';
import { IVote } from './vote.interface';

const voteSchema = new Schema<IVote>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    voteType: {
      type: String,
      enum: ['upvote', 'downvote'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Vote = model<IVote>('Vote', voteSchema);
