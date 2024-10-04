import { z } from 'zod';

const createCommentValidationSchema = z.object({
  body: z.object({
    postId: z.string({ required_error: 'Post ID is required' }),
    content: z.string({ required_error: 'Content is required' }),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z.object({
    content: z.string().optional(),
  }),
});

export const CommentValidation = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
};
