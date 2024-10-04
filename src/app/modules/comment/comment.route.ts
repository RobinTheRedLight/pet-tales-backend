import express from 'express';
import { CommentController } from './comment.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CommentValidation } from './comment.validation';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(CommentValidation.createCommentValidationSchema),
  CommentController.createComment,
);

router.get('/:postId', CommentController.getCommentsByPostId);

router.patch(
  '/:commentId',
  auth(USER_ROLE.user),
  validateRequest(CommentValidation.updateCommentValidationSchema),
  CommentController.updateComment,
);

router.delete(
  '/:commentId',
  auth(USER_ROLE.user),
  CommentController.deleteComment,
);

export const CommentRoutes = router;
