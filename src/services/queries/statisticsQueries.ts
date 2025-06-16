import { useQuery } from "@tanstack/react-query";
import { statisticsApi } from "../api/statisticsApi";

export const useStatistics = () => {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: statisticsApi.getStatistics,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5,
  });
};
