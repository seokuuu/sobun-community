export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  phone?: string;
  avatar?: string;
  address?: string;
  trustScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  fullName?: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface UpdateUserRequest {
  fullName?: string;
  phone?: string;
  avatar?: string;
  address?: string;
}