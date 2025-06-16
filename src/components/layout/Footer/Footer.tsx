import { Layout, Typography, Space, theme } from "antd";

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { token } = theme.useToken();

  return (
    <AntFooter
      style={{
        textAlign: "center",
        backgroundColor: token.colorBgContainer,
        borderTop: `1px solid ${token.colorBorder}`,
      }}
    >
      <Space direction="vertical" size="small">
        <Text type="secondary">
          © {currentYear} Coupon Management System. All rights reserved.
        </Text>
        <Space size="large">
          <Link href="#" type="secondary">
            Privacy Policy
          </Link>
          <Link href="#" type="secondary">
            Terms of Service
          </Link>
          <Link href="#" type="secondary">
            Support
          </Link>
        </Space>
      </Space>
    </AntFooter>
  );
}
