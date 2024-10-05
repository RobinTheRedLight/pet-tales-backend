import express from 'express';
import { FollowController } from './follow.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), FollowController.followUser);
router.post('/unfollow', auth(USER_ROLE.user), FollowController.unfollowUser);
router.get('/followers/:userId', FollowController.getUserFollowers);
router.get('/following/:userId', FollowController.getUserFollowing);

export const FollowRoutes = router;
