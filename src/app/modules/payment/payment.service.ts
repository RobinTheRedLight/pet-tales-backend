import Stripe from 'stripe';
import config from '../../config';
import { Payment } from './payment.model';

const stripe = new Stripe(config.stripeSecretKey as string, {
  apiVersion: '2024-09-30.acacia',
});

const createPaymentIntent = async (userEmail: string, amount: number) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'usd',
    metadata: { userEmail },
  });

  await Payment.create({
    userEmail,
    amount,
    paymentIntentId: paymentIntent.id,
    status: 'pending',
  });

  return paymentIntent;
};

export const PaymentsService = {
  createPaymentIntent,
};
