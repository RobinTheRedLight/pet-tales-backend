import { z } from 'zod';

const createPaymentIntentValidationSchema = z.object({
  body: z.object({
    price: z.number({ required_error: 'Price is required' }).positive(),
  }),
});

const savePaymentValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User ID is required' }),
    amount: z.number({ required_error: 'Amount is required' }).positive(),
    transactionId: z.string({ required_error: 'Transaction ID is required' }),
  }),
});

export const PaymentValidation = {
  createPaymentIntentValidationSchema,
  savePaymentValidationSchema,
};
