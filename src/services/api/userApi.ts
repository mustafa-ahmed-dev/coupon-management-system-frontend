// src/services/api/userApi.ts
import { apiClient } from "../../lib/api";
import type { User, CreateUserData, UpdateUserData } from "../../types/api";

export const userApi = {
  getUsers: async (): Promise<User[]> => {
    const { data } = await apiClient.get("/users");
    return data;
  },

  getUser: async (id: number): Promise<User> => {
    const { data } = await apiClient.get(`/users/${id}`);
    return data;
  },

  createUser: async (userData: CreateUserData): Promise<User> => {
    const { data } = await apiClient.post("/users", userData);
    return data;
  },

  updateUser: async ({
    id,
    ...userData
  }: UpdateUserData & { id: number }): Promise<User> => {
    const { data } = await apiClient.put(`/users/${id}`, userData);
    return data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  },
};
