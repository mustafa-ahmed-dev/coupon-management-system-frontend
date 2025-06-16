import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { Spin } from "antd";
import { store } from "../store";
import { router } from "../lib/router";
import { useInitializeAuth } from "../features/auth/services/authQueries";
import { useAppSelector } from "../store/hooks/redux";
import { queryClient } from "../lib/queryClient";

function AppWithAuth() {
  const { isLoading } = useInitializeAuth();
  const isInitialized = useAppSelector((state) => state.auth.isInitialized);
  const auth = useAppSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }));

  if (isLoading || !isInitialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Spin size="large" />
        <div style={{ color: "#666" }}>Loading...</div>
      </div>
    );
  }

  return <RouterProvider router={router} context={{ auth }} />;
}

export function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppWithAuth />
      </QueryClientProvider>
    </Provider>
  );
}
