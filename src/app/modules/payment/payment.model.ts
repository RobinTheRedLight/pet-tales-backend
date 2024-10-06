import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentIntentId: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

export const Payment = model('Payment', paymentSchema);
