import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { RouterContext } from "../types/store";
import { useAppSelector } from "../store/hooks/redux";
import type { RootState } from "../store";
import { ConfigProvider, App as AntApp } from "antd";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const auth = useAppSelector((state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  })); // FIXME: use the auth

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 6,
        },
      }}
    >
      <AntApp>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </AntApp>
    </ConfigProvider>
  );
}
