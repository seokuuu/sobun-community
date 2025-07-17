export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  groupId: string;
  createdAt: Date;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  groupId: string;
}