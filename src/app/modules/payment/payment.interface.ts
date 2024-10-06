import { Document } from 'mongoose';

export interface IPayment extends Document {
  userId: string;
  amount: number;
  paymentDate: Date;
  transactionId: string;
}
