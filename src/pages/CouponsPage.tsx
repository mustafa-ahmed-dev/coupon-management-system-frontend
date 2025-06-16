import { Layout } from "../components/layout";
import {
  Typography,
  Table,
  Button,
  Space,
  Card,
  Tag,
  Input,
  Popconfirm,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  useCoupons,
  useDeleteCoupon,
} from "../features/coupons/services/couponQueries";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { Coupon } from "../types/api";
import { CreateCouponModal } from "../features/coupons/components/CreateCouponModal";
import { UpdateCouponModal } from "../features/coupons/components/UpdateCouponModal";

const { Title, Paragraph } = Typography;
const { Search } = Input;

export function CouponsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const { data: coupons = [], isLoading, error } = useCoupons();
  const deleteCouponMutation = useDeleteCoupon();

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenUpdateModal = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedCoupon(null);
  };

  const handleViewCoupon = (couponId: number) => {
    navigate({ to: `/coupons/${couponId}` });
  };

  const handleDeleteCoupon = (couponId: number) => {
    deleteCouponMutation.mutate(couponId);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a: Coupon, b: Coupon) => a.id - b.id,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (code: string) => <Tag color="blue">{code}</Tag>,
      sorter: (a: Coupon, b: Coupon) => a.code.localeCompare(b.code),
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record: Coupon) => (
        <span style={{ fontWeight: "bold" }}>
          {record.type === "percentage"
            ? `${record.amount}%`
            : `${record.amount}`}
        </span>
      ),
      sorter: (a: Coupon, b: Coupon) => Number(a.amount) - Number(b.amount),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === "percentage" ? "green" : "orange"}>
          {type.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Percentage", value: "percentage" },
        { text: "Fixed", value: "fixed" },
      ],
      onFilter: (value: any, record: Coupon) => record.type === value,
    },
    {
      title: "Status",
      dataIndex: "isUsed",
      key: "isUsed",
      render: (isUsed: boolean) => (
        <Tag color={isUsed ? "red" : "green"}>
          {isUsed ? "Used" : "Available"}
        </Tag>
      ),
      filters: [
        { text: "Available", value: false },
        { text: "Used", value: true },
      ],
      onFilter: (value: any, record: Coupon) => record.isUsed === value,
    },
    {
      title: "Created By",
      key: "createdBy",
      render: (_, record: Coupon) =>
        record.createdBy
          ? record.createdBy.name
          : `User ID: ${record.createdById}`,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: Coupon, b: Coupon) =>
        new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime(),
    },
    {
      title: "Assigned Date",
      dataIndex: "assignedDate",
      key: "assignedDate",
      render: (date: string | null) =>
        date ? (
          <span>{new Date(date).toLocaleDateString()}</span>
        ) : (
          <Tag color="default">Not assigned</Tag>
        ),
      sorter: (a: Coupon, b: Coupon) => {
        if (!a.assignedDate && !b.assignedDate) return 0;
        if (!a.assignedDate) return -1;
        if (!b.assignedDate) return 1;
        return (
          new Date(a.assignedDate).getTime() -
          new Date(b.assignedDate).getTime()
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record: Coupon) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              type="link"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewCoupon(record.id)}
            />
          </Tooltip>
          <Tooltip title="Edit Coupon">
            <Button
              type="link"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleOpenUpdateModal(record)}
              disabled={record.isUsed}
            />
          </Tooltip>
          <Popconfirm
            title="Delete Coupon"
            description={`Are you sure you want to delete coupon "IQD {record.code}"?`}
            onConfirm={() => handleDeleteCoupon(record.id)}
            okText="Yes"
            cancelText="No"
            disabled={record.isUsed}
          >
            <Tooltip
              title={
                record.isUsed ? "Cannot delete used coupon" : "Delete Coupon"
              }
            >
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                size="small"
                loading={deleteCouponMutation.isPending}
                disabled={record.isUsed}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const summaryStats = {
    total: coupons.length,
    available: coupons.filter((c) => !c.isUsed).length,
    used: coupons.filter((c) => c.isUsed).length,
    percentage: coupons.filter((c) => c.type === "percentage").length,
    fixed: coupons.filter((c) => c.type === "fixed").length,
  };

  if (error) {
    return (
      <Layout>
        <Card>
          <Typography.Text type="danger">
            Error loading coupons:{" "}
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
          <Title level={2}>Coupons Management</Title>
          <Paragraph type="secondary">
            Manage your discount coupons and track their usage status.
          </Paragraph>
        </div>

        <Card size="small">
          <Space size="large">
            <div>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                Total:{" "}
              </span>
              <Tag color="blue">{summaryStats.total}</Tag>
            </div>
            <div>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                Available:{" "}
              </span>
              <Tag color="green">{summaryStats.available}</Tag>
            </div>
            <div>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                Used:{" "}
              </span>
              <Tag color="red">{summaryStats.used}</Tag>
            </div>
            <div>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                Percentage:{" "}
              </span>
              <Tag color="purple">{summaryStats.percentage}</Tag>
            </div>
            <div>
              <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                Fixed:{" "}
              </span>
              <Tag color="orange">{summaryStats.fixed}</Tag>
            </div>
          </Space>
        </Card>

        <Card size="small">
          <Space style={{ width: "100%", justifyContent: "space-between" }}>
            <Search
              placeholder="Search coupons by code..."
              allowClear
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Space>
              <Button onClick={() => navigate({ to: "/coupons/used" })}>
                View Used Coupons
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleOpenCreateModal}
              >
                Create New Coupon
              </Button>
            </Space>
          </Space>
        </Card>

        <Card>
          <Table
            columns={columns}
            dataSource={filteredCoupons}
            loading={isLoading}
            rowKey="id"
            pagination={{
              total: filteredCoupons.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} coupons`,
            }}
            scroll={{ x: 1200 }}
          />
        </Card>

        {/* Modals */}
        <CreateCouponModal
          open={isCreateModalOpen}
          onClose={handleCloseCreateModal}
        />

        <UpdateCouponModal
          open={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          coupon={selectedCoupon}
        />
      </Space>
    </Layout>
  );
}
