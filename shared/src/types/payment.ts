export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentRequest {
  orderId: string;
  paymentMethod: string;
  amount: number;
}