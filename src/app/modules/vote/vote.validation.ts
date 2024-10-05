import { z } from 'zod';

const createOrUpdateVoteValidationSchema = z.object({
  body: z.object({
    postId: z.string().min(1, 'Post ID is required'),
    voteType: z
      .enum(['upvote', 'downvote'])
      .describe('Vote type must be either "upvote" or "downvote"'),
  }),
});

export const VoteValidation = {
  createOrUpdateVoteValidationSchema,
};
