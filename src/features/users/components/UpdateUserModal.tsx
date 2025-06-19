import { useEffect } from "react";
import { Modal, Form, Input, Select, Popconfirm, Button } from "antd";
import { useUpdateUser } from "../services/userQueries";
import type { User } from "../../../types/api";
import type { UpdateUserData } from "../../../types/api";

interface UpdateUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

export function UpdateUserModal({ open, onClose, user }: UpdateUserModalProps) {
  const [form] = Form.useForm<UpdateUserData>();
  const updateUserMutation = useUpdateUser();

  useEffect(() => {
    if (user && open) {
      form.setFieldsValue({
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
  }, [user, open, form]);

  const handleSubmit = (values: UpdateUserData) => {
    if (!user) return;

    updateUserMutation.mutate(
      { id: user.id, data: values },
      {
        onSuccess: () => {
          form.resetFields();
          onClose();
        },
      }
    );
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={`Update User: ${user?.name}`}
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={updateUserMutation.isPending}
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

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Popconfirm
            title="Update User"
            description="Are you sure you want to update this user?"
            onConfirm={() => form.submit()}
            okText="Yes, Update"
            cancelText="Cancel"
            disabled={updateUserMutation.isPending}
          >
            <Button
              htmlType="button"
              type="primary"
              disabled={updateUserMutation.isPending}
              style={{ marginRight: 8 }}
            >
              {updateUserMutation.isPending ? "Updating..." : "Update User"}
            </Button>
          </Popconfirm>

          <Button
            type="default"
            htmlType="button"
            onClick={handleCancel}
            disabled={updateUserMutation.isPending}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
