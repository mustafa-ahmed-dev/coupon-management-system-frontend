import { apiClient } from "../../lib/api";
import type { Statistics } from "../../types/api";

export const statisticsApi = {
  getStatistics: async (): Promise<Statistics> => {
    const { data } = await apiClient.get<Statistics>("/statistics");
    return data;
  },
};
