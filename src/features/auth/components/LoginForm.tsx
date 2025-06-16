import { Form, Input, Button, Alert, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLogin } from "../services/authQueries";
import type { LoginData } from "../../../types/api";

const { Title } = Typography;

export function LoginForm() {
  const [form] = Form.useForm<LoginData>();
  const loginMutation = useLogin();

  const onFinish = (values: LoginData) => {
    loginMutation.mutate(values);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Title level={2}>Sign In</Title>
        <p style={{ color: "#666" }}>
          Enter your credentials to access your dashboard
        </p>
      </div>

      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        layout="vertical"
        size="large"
        disabled={loginMutation.isPending}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters long!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            autoComplete="current-password"
          />
        </Form.Item>

        {loginMutation.isError && (
          <Form.Item>
            <Alert
              message="Login Failed"
              description={
                loginMutation.error instanceof Error
                  ? loginMutation.error.message
                  : "Please check your credentials and try again."
              }
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loginMutation.isPending}
            block
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
