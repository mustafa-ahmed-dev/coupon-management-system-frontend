import { jwtDecode } from "jwt-decode";
import { localstorageUtils } from "./localstorage";
import type { User } from "../types/api";

interface JwtPayload {
  sub: number; // User ID
  email?: string;
  iat?: number;
  exp?: number;
  [key: string]: any; // FIXME: why it is showing an error
}

const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  USER: "user",
} as const;

const { set, get, remove } = localstorageUtils;

export const tokenUtils = {
  setToken: (token: string): void => set(STORAGE_KEYS.ACCESS_TOKEN, token),
  getToken: (): string | null => get(STORAGE_KEYS.ACCESS_TOKEN),
  removeToken: (): void => remove(STORAGE_KEYS.ACCESS_TOKEN),
  isTokenPresent: (): boolean => !!get(STORAGE_KEYS.ACCESS_TOKEN),
};

export const userUtils = {
  setUser: (user: User): void => set(STORAGE_KEYS.USER, JSON.stringify(user)),
  getUser: (): User | null => {
    try {
      const userStr = get(STORAGE_KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing user from storage:", error);
      return null;
    }
  },
  removeUser: (): void => remove(STORAGE_KEYS.USER),
};

export const authUtils = {
  clearAll: (): void => {
    tokenUtils.removeToken();
    userUtils.removeUser();
  },

  getStoredAuth: () => ({
    token: tokenUtils.getToken(),
    user: userUtils.getUser(),
  }),

  // Decode user ID from JWT using jwt-decode library
  getUserIdFromToken: (token: string): number | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (!decoded.sub) {
        console.warn("No sub field found in JWT token");
        return null;
      }

      // Ensure sub is a number
      const userId =
        typeof decoded.sub === "string"
          ? parseInt(decoded.sub, 10)
          : Number(decoded.sub);

      return isNaN(userId) ? null : userId;
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return null;
    }
  },

  // Check if token is expired
  isTokenExpired: (token: string): boolean => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (!decoded.exp) {
        return true;
      }

      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return true;
    }
  },
};
