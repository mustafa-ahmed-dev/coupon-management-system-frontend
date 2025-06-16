import { Modal, Form, Input, Select, Switch, Popconfirm, Button } from "antd";
import { useCreateUser } from "../services/userQueries";
import type { CreateUserData } from "../../../types/api";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateUserModal({ open, onClose }: CreateUserModalProps) {
  const [form] = Form.useForm<CreateUserData>();
  const createUserMutation = useCreateUser();

  const handleSubmit = (values: CreateUserData) => {
    createUserMutation.mutate(values, {
      onSuccess: () => {
        form.resetFields();
        onClose();
      },
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Create New User"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={createUserMutation.isPending}
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[
            { required: true, message: "Please enter the full name" },
            { min: 2, message: "Name must be at least 2 characters" },
            { max: 50, message: "Name must not exceed 50 characters" },
          ]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            { required: true, message: "Please enter username" },
            { min: 3, message: "Username must be at least 3 characters" },
            { max: 25, message: "Username must not exceed 25 characters" },
            {
              pattern: /^[a-zA-Z0-9._]+$/,
              message:
                "Username can only contain letters, numbers, dots and underscores",
            },
          ]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
            { max: 100, message: "Email must not exceed 100 characters" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter password" },
            { min: 6, message: "Password must be at least 6 characters" },
            { max: 50, message: "Password must not exceed 50 characters" },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select a role" }]}
        >
          <Select placeholder="Select user role">
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="manager">Manager</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="isActive"
          label="Active Status"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Popconfirm
            title="Create User"
            description="Are you sure you want to create this user?"
            onConfirm={() => form.submit()}
            okText="Yes, Create"
            cancelText="Cancel"
            disabled={createUserMutation.isPending}
          >
            <Button
              type="primary"
              htmlType="button"
              disabled={createUserMutation.isPending}
              style={{ marginRight: 8 }}
            >
              {createUserMutation.isPending ? "Creating..." : "Create User"}
            </Button>
          </Popconfirm>

          <Button
            type="default"
            htmlType="button"
            onClick={handleCancel}
            disabled={createUserMutation.isPending}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
