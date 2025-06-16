import { Layout, Card, theme } from "antd";
import { LoginForm } from "../features/auth/components/LoginForm";

const { Content } = Layout;

export function LoginPage() {
  const { token } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: token.colorBgLayout,
      }}
    >
      <Content
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px",
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 400,
            boxShadow: token.boxShadow,
          }}
          styles={{
            body: {
              padding: "40px",
            },
          }}
        >
          <LoginForm />
        </Card>
      </Content>
    </Layout>
  );
}
