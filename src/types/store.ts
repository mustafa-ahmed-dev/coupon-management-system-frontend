import type { User } from "./api";

export interface RouterContext {
  auth: {
    isAuthenticated: boolean;
    user: User | null;
  };
}
