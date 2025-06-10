import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/userApi";
import type { CreateUserData, UpdateUserData } from "../../types/api";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// Queries
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: userApi.getUsers,
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
  });
};

// Mutations
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(userKeys.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
