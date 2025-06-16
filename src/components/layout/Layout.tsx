import React from "react";
import { Layout as AntLayout, theme } from "antd";
import { useAppSelector } from "../../store/hooks/redux";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  const { token } = theme.useToken();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Header />

      <AntLayout>
        {showSidebar && <Sidebar />}

        <AntLayout
          style={{
            marginLeft: showSidebar ? (sidebarOpen ? 250 : 80) : 0,
            marginTop: 64,
            transition: "margin-left 0.2s",
          }}
        >
          <Content
            style={{
              margin: "24px",
              padding: "24px",
              backgroundColor: token.colorBgContainer,
              borderRadius: token.borderRadius,
              minHeight: "calc(100vh - 64px - 48px - 70px)",
            }}
          >
            {children}
          </Content>

          <Footer />
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
}
