import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { authApi } from "./authApi";
import { userApi } from "../../../services/api/userApi";
import { tokenUtils, userUtils, authUtils } from "../../../utils/auth";
import { useAppDispatch } from "../../../store/hooks/redux";
import {
  setToken,
  setCredentials,
  logout,
  initializeAuth,
} from "../store/authSlice";
import { useRouter } from "@tanstack/react-router";
import type { LoginData } from "../../../types/api";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async (loginData: LoginData) => {
      const loginResponse = await authApi.login(loginData);

      if (!loginResponse.accessToken) {
        throw new Error("No access token received");
      }

      const userId = authUtils.getUserIdFromToken(loginResponse.accessToken);

      if (!userId) {
        throw new Error("Could not extract user ID from token");
      }

      tokenUtils.setToken(loginResponse.accessToken);
      dispatch(setToken(loginResponse.accessToken));

      const user = await userApi.getUser(userId);

      return { user, token: loginResponse.accessToken };
    },

    onSuccess: ({ user, token }) => {
      userUtils.setUser(user);
      dispatch(setCredentials({ user, token }));
      message.success(`Welcome back, ${user.name}!`);
      router.navigate({ to: "/" });
    },

    onError: (error) => {
      console.error("Login failed:", error);
      authUtils.clearAll();
      dispatch(logout());
      message.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return () => {
    authUtils.clearAll();
    dispatch(logout());
    message.success("Logged out successfully");
    router.navigate({ to: "/login" });
  };
};

export const useInitializeAuth = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: ["initializeAuth"],
    queryFn: async () => {
      const { token, user } = authUtils.getStoredAuth();

      if (token && user) {
        if (authUtils.isTokenExpired(token)) {
          console.log("Stored token is expired, clearing auth data");
          authUtils.clearAll();
          dispatch(initializeAuth({ user: null, token: null }));
          return { user: null, token: null };
        }

        try {
          await userApi.getUser(user.id);
          dispatch(initializeAuth({ user, token }));
          return { user, token };
        } catch (error) {
          // FIXME: do something for the error object because it is not used
          console.log("Token validation failed, clearing auth data");
          authUtils.clearAll();
          dispatch(initializeAuth({ user: null, token: null }));
          return { user: null, token: null };
        }
      } else {
        dispatch(initializeAuth({ user: null, token: null }));
        return { user: null, token: null };
      }
    },
    staleTime: Infinity,
    retry: false,
  });
};
