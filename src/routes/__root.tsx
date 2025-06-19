// In src/routes/__root.tsx
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { RouterContext } from "../types/store";
import { useAppSelector } from "../store/hooks/redux";
import type { RootState } from "../store";
import { ConfigProvider, App as AntApp, theme } from "antd";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

import { useEffect } from "react";

function RootComponent() {
  const auth = useAppSelector((state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }));

  const currentTheme = useAppSelector((state: RootState) => state.ui.theme);

  // Force body background update
  useEffect(() => {
    if (currentTheme === "dark") {
      document.body.style.backgroundColor = "#141414";
      document.documentElement.style.backgroundColor = "#141414";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.documentElement.style.backgroundColor = "#ffffff";
    }
  }, [currentTheme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1890ff",
          borderRadius: 6,
        },
      }}
    >
      <AntApp>
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: currentTheme === "dark" ? "#141414" : "#ffffff",
            transition: "background-color 0.3s ease",
          }}
        >
          <Outlet />
        </div>
        <TanStackRouterDevtools position="bottom-right" />
      </AntApp>
    </ConfigProvider>
  );
}
