export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  user?: {
    id: string;
    username: string;
    avatar?: string;
  };
}

export interface CreateReviewRequest {
  userId: string;
  rating: number;
  comment?: string;
}