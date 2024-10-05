import express from 'express';
import { VoteController } from './vote.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.user), VoteController.createOrUpdateVote);
router.get('/:postId', VoteController.getVotesByPostId);

export const VoteRoutes = router;
