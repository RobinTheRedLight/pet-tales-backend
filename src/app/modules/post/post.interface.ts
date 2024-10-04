import { Document } from 'mongoose';

export type PostCategory = 'Tip' | 'Story';

export interface IPost extends Document {
  title: string;
  content: string;
  category: PostCategory;
  images?: string[];
  author: string;
  isPremium?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// export interface PostModel extends Model<IPost> {}
