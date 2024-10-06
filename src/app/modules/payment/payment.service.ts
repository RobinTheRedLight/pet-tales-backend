import { Payment } from './payment.model';
import { IPayment } from './payment.interface';

const savePayment = async (paymentData: IPayment) => {
  const payment = await Payment.create(paymentData);
  return payment;
};

export const PaymentService = {
  savePayment,
};
