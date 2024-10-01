import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { USER_ROLE } from './user.constant';

const router = express.Router();

// Route to get the logged-in user's profile
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getUser,
);

// Route for updating the logged-in user's own profile
router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(UserValidation.userUpdateValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
