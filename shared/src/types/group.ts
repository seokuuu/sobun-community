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

export interface GroupMember {
  id: string;
  userId: string;
  groupId: string;
  joinedAt: Date;
  user?: {
    id: string;
    username: string;
    avatar?: string;
  };
}