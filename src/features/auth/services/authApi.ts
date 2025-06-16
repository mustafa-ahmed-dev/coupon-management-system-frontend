import { apiClient } from "../../../lib/api";
import type { LoginData, LoginResponse } from "../../../types/api";

export const authApi = {
  login: async (loginData: LoginData): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(
      "/auth/login",
      loginData
    );
    return data;
  },
};
