export type Role = "user" | "manager" | "admin";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  refreshToken: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface CreateUserData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  isActive?: boolean;
}

export interface UpdateUserData {
  name?: string;
  username?: string;
  email?: string;
  role?: Role;
}

export interface UpdateUserPassword {
  password: string;
  confirmPassword: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
