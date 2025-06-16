import { createFileRoute, redirect } from "@tanstack/react-router";
import { UserDetailPage } from "../../pages/UserDetailPage";

export const Route = createFileRoute("/users/$id")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: UserDetailPage,
});
