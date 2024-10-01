import express from 'express';
import { AdminControllers } from './admin.controller';
import auth from '../../middlewares/auth';
import { ADMIN_ROLE } from './admin.constant';

const router = express.Router();

router.get('/allUsers', auth(ADMIN_ROLE.admin), AdminControllers.getAllUsers);
router.put(
  '/makeAdmin/:id',
  auth(ADMIN_ROLE.admin),
  AdminControllers.updateUserAdmin,
);
router.delete('/:id', auth(ADMIN_ROLE.admin), AdminControllers.deleteUser);

export const AdminRoutes = router;
