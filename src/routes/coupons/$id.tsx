import { createFileRoute, redirect } from "@tanstack/react-router";
import { CouponDetailPage } from "../../pages/CouponDetailPage";

export const Route = createFileRoute("/coupons/$id")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: CouponDetailPage,
});
