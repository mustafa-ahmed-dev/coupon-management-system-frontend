import { apiClient } from "../../lib/api";
import type { User } from "../../types/api";
import type { CreateUserData, UpdateUserPassword } from "../../types/api";

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>("/users");
    return data;
  },

  getUser: async (userId: number): Promise<User> => {
    const { data } = await apiClient.get<User>(`/users/${userId}`);
    return data;
  },

  createUser: async (userData: CreateUserData): Promise<User> => {
    const { data } = await apiClient.post<User>("/users", userData);
    return data;
  },

  updateUser: async (
    userId: number,
    userData: Partial<CreateUserData>
  ): Promise<User> => {
    const { data } = await apiClient.patch<User>(`/users/${userId}`, userData);
    return data;
  },

  activateUser: async (userId: number): Promise<User> => {
    const { data } = await apiClient.post<User>(`/users/${userId}/activate`);
    return data;
  },

  deactivateUser: async (userId: number): Promise<User> => {
    const { data } = await apiClient.post<User>(`/users/${userId}/deactivate`);
    return data;
  },

  updateUserPassword: async (
    userId: number,
    passwordData: UpdateUserPassword
  ): Promise<User> => {
    const { data } = await apiClient.put<User>(
      `/users/${userId}/password`,
      passwordData
    );
    return data;
  },

  deleteUser: async (userId: number): Promise<void> => {
    await apiClient.delete(`/users/${userId}`);
  },
};
