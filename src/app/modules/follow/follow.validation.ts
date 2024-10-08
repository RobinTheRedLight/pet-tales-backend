import { z } from 'zod';

const followUserValidationSchema = z.object({
  body: z.object({
    userEmailToFollow: z.string({
      required_error: 'User ID to follow is required',
    }),
  }),
});

const unfollowUserValidationSchema = z.object({
  body: z.object({
    userEmailToUnfollow: z.string({
      required_error: 'User ID to unfollow is required',
    }),
  }),
});

export const FollowValidation = {
  followUserValidationSchema,
  unfollowUserValidationSchema,
};
