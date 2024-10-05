import { z } from 'zod';

const followUserValidationSchema = z.object({
  body: z.object({
    userIdToFollow: z.string({
      required_error: 'User ID to follow is required',
    }),
  }),
});

const unfollowUserValidationSchema = z.object({
  body: z.object({
    userIdToUnfollow: z.string({
      required_error: 'User ID to unfollow is required',
    }),
  }),
});

export const FollowValidation = {
  followUserValidationSchema,
  unfollowUserValidationSchema,
};
