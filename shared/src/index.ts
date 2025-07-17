// User Types
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
}

// Group Types
export enum GroupStatus {
  RECRUITING = 'RECRUITING',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Group {
  id: string;
  title: string;
  description?: string;
  store: string;
  location: string;
  pickupLocation: string;
  pickupTime: Date;
  deadline: Date;
  minMembers: number;
  maxMembers: number;
  status: GroupStatus;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  memberCount?: number;
}

export interface CreateGroupRequest {
  title: string;
  description?: string;
  store: string;
  location: string;
  pickupLocation: string;
  pickupTime: Date;
  deadline: Date;
  minMembers: number;
  maxMembers: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}