import express from 'express';
import { PostController } from './post.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PostValidation } from './post.validation';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(PostValidation.createPostValidationSchema),
  PostController.createPost,
);

router.get('/', PostController.getAllPosts);

router.get('/:id', PostController.getPostById);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(PostValidation.updatePostValidationSchema),
  PostController.updatePost,
);

router.delete('/:id', auth(USER_ROLE.user), PostController.deletePost);

export const PostRoutes = router;
