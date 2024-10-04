import { Document, Types } from 'mongoose';

export interface IComment extends Document {
  postId: Types.ObjectId;
  userEmail: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
