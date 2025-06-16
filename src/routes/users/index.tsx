import { createFileRoute, redirect } from "@tanstack/react-router";
import { UsersPage } from "../../pages/UsersPage";

export const Route = createFileRoute("/users/")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: UsersPage,
});
