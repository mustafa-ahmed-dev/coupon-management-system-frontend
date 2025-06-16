import { createFileRoute, redirect } from "@tanstack/react-router";
import { CouponsPage } from "../../pages/CouponsPage";

export const Route = createFileRoute("/coupons/")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: CouponsPage,
});
