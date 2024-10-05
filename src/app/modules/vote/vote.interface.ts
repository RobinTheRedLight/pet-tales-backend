import { Document, Types } from 'mongoose';

export interface IVote extends Document {
  postId: Types.ObjectId;
  userEmail: string;
  voteType: 'upvote' | 'downvote';
}
