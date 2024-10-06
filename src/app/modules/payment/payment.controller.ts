import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { PaymentService } from './payment.service';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const { price } = req.body;
  const amount = price * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: { clientSecret: paymentIntent.client_secret },
  });
});

const savePayment = catchAsync(async (req: Request, res: Response) => {
  const paymentData = req.body;
  const payment = await PaymentService.savePayment(paymentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment saved successfully',
    data: payment,
  });
});

export const PaymentController = {
  createPaymentIntent,
  savePayment,
};
