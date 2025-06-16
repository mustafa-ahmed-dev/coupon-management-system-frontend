import { Layout, Typography, Space, Avatar, Dropdown, theme } from "antd";
import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../store/hooks/redux";
import { LogoutButton } from "../../../features/auth/components/LogoutButton";
import type { MenuProps } from "antd";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export function Header() {
  const user = useAppSelector((state) => state.auth.user);
  const { token } = theme.useToken();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: <LogoutButton type="text" size="small" />,
    },
  ];

  return (
    <AntHeader
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorder}`,
        padding: "0 24px",
      }}
    >
      <Typography.Title
        level={3}
        style={{ margin: 0, color: token.colorPrimary }}
      >
        Coupon Management System
      </Typography.Title>

      <Space size="middle">
        {user && (
          <>
            <Text type="secondary">Welcome, {user.name}</Text>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Avatar
                style={{
                  cursor: "pointer",
                  backgroundColor: token.colorPrimary,
                }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </>
        )}
      </Space>
    </AntHeader>
  );
}
