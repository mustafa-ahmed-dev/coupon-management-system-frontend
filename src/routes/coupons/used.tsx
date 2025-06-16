import { createFileRoute, redirect } from "@tanstack/react-router";
import { UsedCouponsPage } from "./../../pages/UsedCouponsPage";

export const Route = createFileRoute("/coupons/used")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: UsedCouponsPage,
});
