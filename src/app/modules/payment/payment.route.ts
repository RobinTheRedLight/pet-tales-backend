import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { PaymentsController } from './payment.controller';

const router = express.Router();

router.post(
  '/create-payment-intent',
  auth(USER_ROLE.user, USER_ROLE.admin),
  PaymentsController.createPaymentIntent,
);

router.get(
  '/get-payment-by-email',
  auth(USER_ROLE.user, USER_ROLE.admin),
  PaymentsController.getPaymentByEmail,
);

export const PaymentsRoutes = router;
