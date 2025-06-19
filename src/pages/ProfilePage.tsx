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
  Form,
  Input,
  message,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  UserOutlined,
  MailOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../store/hooks/redux";
import { useState } from "react";

const { Title, Paragraph } = Typography;

export function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  if (!user) {
    return (
      <Layout>
        <Card>
          <Typography.Text type="danger">
            User not found. Please log in again.
          </Typography.Text>
        </Card>
      </Layout>
    );
  }

  const handleEdit = () => {
    form.setFieldsValue({
      name: user.name,
      username: user.username,
    });
    setIsEditing(true);
  };

  const handleSave = async (values: any) => {
    try {
      // Here you would typically call an API to update the user profile
      console.log("Saving profile:", values);
      message.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  return (
    <Layout>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={2}>My Profile</Title>
          <Paragraph type="secondary">
            View and manage your personal information
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card>
              <Space
                direction="vertical"
                size="large"
                style={{ width: "100%" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Avatar size={80} icon={<UserOutlined />} />
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
                    {!isEditing ? (
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={handleEdit}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <Space>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button
                          type="primary"
                          icon={<SaveOutlined />}
                          onClick={() => form.submit()}
                        >
                          Save Changes
                        </Button>
                      </Space>
                    )}
                  </div>
                </div>

                <Divider />

                {!isEditing ? (
                  <Descriptions
                    title="Personal Information"
                    bordered
                    column={{ xs: 1, sm: 1, md: 2 }}
                  >
                    <Descriptions.Item label="User ID">
                      {user.id}
                    </Descriptions.Item>
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
                    <Descriptions.Item label="Account Status">
                      <Tag color={user.isActive ? "green" : "default"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Member Since" span={2}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Login" span={2}>
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleString()
                        : "Never"}
                    </Descriptions.Item>
                  </Descriptions>
                ) : (
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSave}
                    initialValues={{
                      name: user.name,
                      username: user.username,
                      email: user.email,
                    }}
                  >
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="name"
                          label="Full Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your full name",
                            },
                            {
                              min: 2,
                              message: "Name must be at least 2 characters",
                            },
                          ]}
                        >
                          <Input placeholder="Enter your full name" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="username"
                          label="Username"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your username",
                            },
                            {
                              min: 3,
                              message: "Username must be at least 3 characters",
                            },
                          ]}
                        >
                          <Input placeholder="Enter your username" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item name="email" label="Email">
                      <Input
                        placeholder="Enter your email address"
                        disabled
                        style={{
                          backgroundColor: "transparent",
                          color: "inherit",
                          cursor: "not-allowed",
                        }}
                      />
                    </Form.Item>
                  </Form>
                )}
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card title="Account Summary" size="small">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>User ID:</span>
                    <strong>{user.id}</strong>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Role:</span>
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
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>Status:</span>
                    <Tag color={user.isActive ? "green" : "default"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Tag>
                  </div>
                </Space>
              </Card>

              <Card title="Quick Actions" size="small">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button type="link" style={{ padding: 0, height: "auto" }}>
                    Change Password
                  </Button>
                  <Button type="link" style={{ padding: 0, height: "auto" }}>
                    Download Profile Data
                  </Button>
                  <Button type="link" style={{ padding: 0, height: "auto" }}>
                    Privacy Settings
                  </Button>
                </Space>
              </Card>
            </Space>
          </Col>
        </Row>
      </Space>
    </Layout>
  );
}
