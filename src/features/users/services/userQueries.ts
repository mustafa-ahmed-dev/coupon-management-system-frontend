import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { userApi } from "./../../../services/api/userApi";
import type { CreateUserData, UpdateUserPassword } from "./../../../types/api";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userApi.getUsers,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success(`User "${newUser.name}" created successfully!`);
    },
    onError: (error) => {
      console.error("Create user failed:", error);
      message.error(
        error instanceof Error ? error.message : "Failed to create user"
      );
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateUserData> }) =>
      userApi.updateUser(id, data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", updatedUser.id] });
      message.success(`User "${updatedUser.name}" updated successfully!`);
    },
    onError: (error) => {
      console.error("Update user failed:", error);
      message.error(
        error instanceof Error ? error.message : "Failed to update user"
      );
    },
  });
};

export const useActivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.activateUser,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", user.id] });
      message.success(`User "${user.name}" activated successfully!`);
    },
    onError: (error) => {
      console.error("Activate user failed:", error);
      message.error(
        error instanceof Error ? error.message : "Failed to activate user"
      );
    },
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deactivateUser,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", user.id] });
      message.success(`User "${user.name}" deactivated successfully!`);
    },
    onError: (error) => {
      console.error("Deactivate user failed:", error);
      message.error(
        error instanceof Error ? error.message : "Failed to deactivate user"
      );
    },
  });
};

export const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserPassword }) =>
      userApi.updateUserPassword(id, data),
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["users", user.id] });
      message.success("Password updated successfully!");
    },
    onError: (error) => {
      console.error("Update password failed:", error);
      message.error(
        error instanceof Error ? error.message : "Failed to update password"
      );
    },
  });
};
