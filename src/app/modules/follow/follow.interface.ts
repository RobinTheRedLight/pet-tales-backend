import { Document } from 'mongoose';

export interface IFollow extends Document {
  userEmail: string;
  followingUserEmail: string;
}
