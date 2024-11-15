import { Schema, model } from 'mongoose';
import { IPost } from './post.interface';

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['Tip', 'Story'],
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    author: {
      type: String,
      ref: 'User',
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isPublishable: {
      type: Boolean,
      default: true,
    },

    upvoteCount: {
      type: Number,
      default: 0,
    },
    downvoteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model<IPost>('Post', postSchema);
