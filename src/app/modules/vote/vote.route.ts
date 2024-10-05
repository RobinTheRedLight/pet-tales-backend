import express from 'express';
import { VoteController } from './vote.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { VoteValidation } from './vote.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(VoteValidation.createOrUpdateVoteValidationSchema),
  VoteController.createOrUpdateVote,
);
router.get('/:postId', VoteController.getVotesByPostId);

export const VoteRoutes = router;
