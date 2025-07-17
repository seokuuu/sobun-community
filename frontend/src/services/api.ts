import {
  LoginRequest,
  LoginResponse,
  CreateUserRequest,
  User,
  Group,
  CreateGroupRequest,
  ApiResponse,
} from '@sobun/shared';

const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  private accessToken: string | null = null;

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.accessToken && { Authorization: `Bearer ${this.accessToken}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API 요청 실패');
    }

    return response.json();
  }

  // 인증 API
  async login(loginData: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  }

  async register(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.request<User>('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile(): Promise<ApiResponse<User>> {
    return this.request<User>('/users/profile');
  }

  // 그룹 API
  async getGroups(): Promise<ApiResponse<Group[]>> {
    return this.request<Group[]>('/groups');
  }

  async getGroup(id: string): Promise<ApiResponse<Group>> {
    return this.request<Group>(`/groups/${id}`);
  }

  async createGroup(groupData: CreateGroupRequest): Promise<ApiResponse<Group>> {
    return this.request<Group>('/groups', {
      method: 'POST',
      body: JSON.stringify(groupData),
    });
  }

  async joinGroup(groupId: string): Promise<ApiResponse<null>> {
    return this.request<null>(`/groups/${groupId}/join`, {
      method: 'POST',
    });
  }

  async leaveGroup(groupId: string): Promise<ApiResponse<null>> {
    return this.request<null>(`/groups/${groupId}/leave`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();