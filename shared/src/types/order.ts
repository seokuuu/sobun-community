export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PAID = 'PAID',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  id: string;
  userId: string;
  groupId: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface CreateOrderRequest {
  groupId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}