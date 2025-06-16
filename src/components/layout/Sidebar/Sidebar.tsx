import { Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAppSelector, useAppDispatch } from "../../../store/hooks/redux";
import { toggleSidebar } from "../../../store/slices/uiSlice";
import {
  DashboardOutlined,
  TeamOutlined,
  TagOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  // CategoryOutlined, // FIXME: get something else
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const menuItems: MenuItem[] = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/users",
    icon: <TeamOutlined />,
    label: "Users",
  },
  {
    key: "/coupons",
    icon: <TagOutlined />,
    label: "Coupons",
    children: [
      {
        key: "/coupons",
        label: "All Coupons",
      },
      {
        key: "/coupons/used",
        label: "Used Coupons",
      },
    ],
  },
  {
    key: "/coupon-requests",
    icon: <FileTextOutlined />,
    label: "Coupon Requests",
  },
  {
    key: "/approvals",
    icon: <CheckCircleOutlined />,
    label: "Approvals",
  },
  {
    key: "/categories",
    icon: <AppstoreOutlined />,
    label: "Categories",
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = theme.useToken();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate({ to: key as string });
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const getSelectedKeys = () => {
    const path = location.pathname;
    return [path];
  };

  const getOpenKeys = () => {
    const path = location.pathname;
    if (path.startsWith("/coupons")) {
      return ["/coupons"];
    }
    return [];
  };

  return (
    <Sider
      theme="light"
      width={250}
      collapsedWidth={80}
      collapsed={!sidebarOpen}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 64,
        borderRight: `1px solid ${token.colorBorder}`,
        zIndex: 100,
      }}
      trigger={
        <div
          style={{
            textAlign: "center",
            padding: "12px",
            borderTop: `1px solid ${token.colorBorder}`,
            cursor: "pointer",
          }}
          onClick={handleToggleSidebar}
        >
          {sidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
      }
    >
      <Menu
        mode="inline"
        selectedKeys={getSelectedKeys()}
        defaultOpenKeys={getOpenKeys()}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          height: "calc(100% - 48px)",
          borderRight: 0,
        }}
      />
    </Sider>
  );
}
