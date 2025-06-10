import { createFileRoute } from "@tanstack/react-router";
import UserDetailPage from "../../pages/UserDetailPage";

export const Route = createFileRoute("/users/$id")({
  component: UserDetailPage,
});
