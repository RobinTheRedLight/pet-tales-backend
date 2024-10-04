import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).max(200),
    content: z.string({ required_error: 'Content is required' }),
    category: z.enum(['Tip', 'Story'], {
      required_error: 'Category is required',
    }),
    images: z.array(z.string().url()).optional(),
    isPremium: z.boolean().optional(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    title: z.string().max(200).optional(),
    content: z.string().optional(),
    category: z.enum(['Tip', 'Story']).optional(),
    images: z.array(z.string().url()).optional(),
    isPremium: z.boolean().optional(),
  }),
});

export const PostValidation = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
