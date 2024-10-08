import express from 'express';
import { FollowController } from './follow.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  FollowController.followUser,
);
router.post(
  '/unfollow',
  auth(USER_ROLE.user, USER_ROLE.admin),
  FollowController.unfollowUser,
);
router.get(
  '/followers/:userEmail',
  auth(USER_ROLE.user, USER_ROLE.admin),
  FollowController.getUserFollowers,
);
router.get(
  '/following/:userEmail',
  auth(USER_ROLE.user, USER_ROLE.admin),
  FollowController.getUserFollowing,
);

export const FollowRoutes = router;
