import { Layout } from "../components/layout";
import {
  Typography,
  Card,
  Descriptions,
  Tag,
  Button,
  Space,
  Avatar,
  Divider,
  Spin,
  Alert,
} from "antd";
import { EditOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useUser } from "../features/users/services/userQueries";
import { useNavigate } from "@tanstack/react-router";

const { Title, Paragraph } = Typography;

import { Route } from "../routes/users/$id";

export function UserDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const userId = parseInt(id, 10);

  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Loading user details...</div>
        </div>
      </Layout>
    );
  }

  if (error || !user) {
    return (
      <Layout>
        <Alert
          message="Error"
          description={
            error instanceof Error
              ? error.message
              : `User with ID ${id} not found`
          }
          type="error"
          showIcon
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={2}>User Details</Title>
          <Paragraph type="secondary">
            Detailed information for user ID: {id}
          </Paragraph>
        </div>

        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <Title level={3} style={{ margin: 0 }}>
                  {user.name}
                </Title>
                <Paragraph type="secondary" style={{ margin: 0 }}>
                  @{user.username}
                </Paragraph>
                <Space style={{ marginTop: 8 }}>
                  <Tag
                    color={
                      user.role === "admin"
                        ? "red"
                        : user.role === "manager"
                          ? "orange"
                          : "blue"
                    }
                  >
                    {user.role.toUpperCase()}
                  </Tag>
                  <Tag color={user.isActive ? "green" : "default"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Tag>
                </Space>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => navigate({ to: `/users/${user.id}/edit` })}
                >
                  Edit User
                </Button>
              </div>
            </div>

            <Divider />

            <Descriptions
              title="User Information"
              bordered
              column={{ xs: 1, sm: 2, md: 2, lg: 2 }}
            >
              <Descriptions.Item label="User ID">{user.id}</Descriptions.Item>
              <Descriptions.Item label="Username">
                {user.username}
              </Descriptions.Item>
              <Descriptions.Item label="Full Name">
                {user.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <Space>
                  <MailOutlined />
                  {user.email}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                <Tag
                  color={
                    user.role === "admin"
                      ? "red"
                      : user.role === "manager"
                        ? "orange"
                        : "blue"
                  }
                >
                  {user.role.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={user.isActive ? "green" : "default"}>
                  {user.isActive ? "Active" : "Inactive"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {new Date(user.createdAt).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Last Login">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "Never"}
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </Card>

        <Card title="Recent Activity" size="small">
          <Paragraph type="secondary">
            User activity log will be implemented here. This could show:
            <ul>
              <li>Coupon requests made</li>
              <li>Coupons used</li>
              <li>Login history</li>
              <li>Profile changes</li>
            </ul>
          </Paragraph>
        </Card>
      </Space>
    </Layout>
  );
}
