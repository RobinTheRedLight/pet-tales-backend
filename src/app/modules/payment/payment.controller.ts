import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { PaymentsService } from './payment.service';

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.userEmail;
  const amount = req.body.amount;

  const paymentIntent = await PaymentsService.createPaymentIntent(
    userEmail,
    amount,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Intent created successfully',
    data: { clientSecret: paymentIntent.client_secret },
  });
});

const getPaymentByEmail = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req.user.userEmail;
  const payment = await PaymentsService.getPaymentByEmail(userEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment fetched successfully',
    data: payment,
  });
});
export const PaymentsController = {
  createPaymentIntent,
  getPaymentByEmail,
};
