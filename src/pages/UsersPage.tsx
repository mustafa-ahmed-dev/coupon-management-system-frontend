import { Layout } from "../components/layout";
import {
  Typography,
  Table,
  Button,
  Space,
  Card,
  Tag,
  Input,
  Dropdown,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  CheckOutlined,
  StopOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import {
  useUsers,
  useActivateUser,
  useDeactivateUser,
} from "./../features/users/services/userQueries";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { User } from "../types/api";
import type { MenuProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { CreateUserModal } from "../features/users/components/CreateUserModal";
import { UpdateUserModal } from "../features/users/components/UpdateUserModal";
import { useAppSelector } from "../store/hooks/redux";

const { Title, Paragraph } = Typography;
const { Search } = Input;

export function UsersPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const currentUser = useAppSelector((state) => state.auth.user);
  const isAdmin = currentUser?.role === "admin";

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const { data: users = [], isLoading, error } = useUsers();
  const activateUserMutation = useActivateUser();
  const deactivateUserMutation = useDeactivateUser();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenUpdateModal = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  };

  const handleActivateUser = (userId: number) => {
    activateUserMutation.mutate(userId);
  };

  const handleDeactivateUser = (userId: number) => {
    deactivateUserMutation.mutate(userId);
  };

  const getActionsMenu = (record: User): MenuProps["items"] => {
    const baseItems: MenuProps["items"] = [
      {
        key: "view",
        icon: <EyeOutlined />,
        label: "View Details",
        onClick: () => navigate({ to: `/users/${record.id}` }),
      },
      {
        key: "edit",
        icon: <EditOutlined />,
        label: "Edit User",
        onClick: () => handleOpenUpdateModal(record),
      },
      {
        key: "password",
        icon: <KeyOutlined />,
        label: "Change Password",
        onClick: () => navigate({ to: `/users/${record.id}/password` }),
      },
    ];

    // Only add activate/deactivate option for admins
    if (isAdmin) {
      baseItems.push(
        {
          type: "divider",
        } as any,
        {
          key: "activate",
          icon: record.isActive ? <StopOutlined /> : <CheckOutlined />,
          label: (
            <Popconfirm
              title={`${record.isActive ? "Deactivate" : "Activate"} User`}
              description={`Are you sure you want to ${
                record.isActive ? "deactivate" : "activate"
              } ${record.name}?`}
              onConfirm={() =>
                record.isActive
                  ? handleDeactivateUser(record.id)
                  : handleActivateUser(record.id)
              }
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                loading:
                  activateUserMutation.isPending ||
                  deactivateUserMutation.isPending,
              }}
            >
              <span>{record.isActive ? "Deactivate" : "Activate"}</span>
            </Popconfirm>
          ),
        },
        {
          type: "divider",
        } as any
      );
    }

    return baseItems;
  };

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a: User, b: User) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: User, b: User) => a.email.localeCompare(b.email),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const color =
          role === "admin" ? "red" : role === "manager" ? "orange" : "blue";
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      },
      filters: [
        { text: "Admin", value: "admin" },
        { text: "Manager", value: "manager" },
        { text: "User", value: "user" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "default"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: User, b: User) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (date: string | null) =>
        date ? new Date(date).toLocaleString() : "Never",
      sorter: (a: User, b: User) => {
        if (!a.lastLogin && !b.lastLogin) return 0;
        if (!a.lastLogin) return -1;
        if (!b.lastLogin) return 1;
        return (
          new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime()
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      render: (_, record: User) => (
        <Dropdown
          menu={{ items: getActionsMenu(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
            size="small"
            loading={
              activateUserMutation.isPending || deactivateUserMutation.isPending
            }
          />
        </Dropdown>
      ),
    },
  ];

  if (error) {
    return (
      <Layout>
        <Card>
          <Typography.Text type="danger">
            Error loading users:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </Typography.Text>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={2}>Users Management</Title>
          <Paragraph type="secondary">
            Manage your application users, their roles, and permissions.
          </Paragraph>
        </div>

        <Card size="small">
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Search
              placeholder="Search users by name, email, or username..."
              allowClear
              style={{ width: 400 }}
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenCreateModal}
            >
              Add New User
            </Button>
          </Space>
        </Card>

        <Card>
          <Table
            columns={columns}
            dataSource={filteredUsers} // your filtered Users
            loading={isLoading}
            rowKey="id"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: filteredUsers.length, // or your actual total
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              pageSizeOptions: ["10", "20", "50", "100"],
              onChange: (page, pageSize) => {
                setPagination({
                  current: page,
                  pageSize: pageSize || 10,
                  total: filteredUsers.length,
                });
              },
              onShowSizeChange: (current, size) => {
                setPagination({
                  current: 1, // Reset to first page when changing page size
                  pageSize: size,
                  total: filteredUsers.length,
                });
              },
            }}
            scroll={{ x: 1200 }}
          />
        </Card>

        {/* Modals */}
        <CreateUserModal
          open={isCreateModalOpen}
          onClose={handleCloseCreateModal}
        />

        <UpdateUserModal
          open={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          user={selectedUser}
        />
      </Space>
    </Layout>
  );
}
