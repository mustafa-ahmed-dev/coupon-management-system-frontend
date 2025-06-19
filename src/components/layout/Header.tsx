import {
  Layout,
  Typography,
  Space,
  Avatar,
  Dropdown,
  theme,
  Switch,
  Image,
} from "antd";
import {
  UserOutlined,
  SettingOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../store/hooks/redux";
import { toggleTheme } from "../../store/slices/uiSlice";
import { LogoutButton } from "../../features/auth/components/LogoutButton";
import { useNavigate } from "@tanstack/react-router";
import type { MenuProps } from "antd";
import SystemLogo from "./../../../public/system-logo.jpeg";
import CompanyLogo from "./../../../public/company-logo.png";
import { Link } from "@tanstack/react-router";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export function Header() {
  const user = useAppSelector((state) => state.auth.user);
  const currentTheme = useAppSelector((state) => state.ui.theme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "profile") {
      navigate({ to: "/profile" });
    } else if (key === "settings") {
      navigate({ to: "/settings" });
    }
  };

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
      <Link to="/">
        <Space size="middle" align="center">
          <Image
            src={CompanyLogo}
            alt="Company Logo"
            preview={false}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              width: "1px",
              height: "30px",
              backgroundColor: token.colorBorder,
            }}
          />
          <Image
            src={SystemLogo}
            alt="System Logo"
            preview={false}
            height={35}
            style={{ objectFit: "contain" }}
          />
          <Typography.Title
            level={4}
            style={{ margin: 0, color: token.colorPrimary }}
          >
            Coupon Management System
          </Typography.Title>
        </Space>
      </Link>

      <Space size="middle">
        {/* Theme Toggle */}
        <Space>
          <SunOutlined
            style={{
              color:
                currentTheme === "light"
                  ? token.colorPrimary
                  : token.colorTextSecondary,
            }}
          />
          <Switch
            checked={currentTheme === "dark"}
            onChange={handleThemeToggle}
            size="small"
          />
          <MoonOutlined
            style={{
              color:
                currentTheme === "dark"
                  ? token.colorPrimary
                  : token.colorTextSecondary,
            }}
          />
        </Space>

        {user && (
          <>
            <Text type="secondary">Welcome, {user.name}</Text>
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleMenuClick }}
              placement="bottomRight"
            >
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
