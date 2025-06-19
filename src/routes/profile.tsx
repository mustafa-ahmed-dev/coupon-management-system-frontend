// Create src/routes/profile.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProfilePage } from "../pages/ProfilePage";

export const Route = createFileRoute("/profile")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: ProfilePage,
});
