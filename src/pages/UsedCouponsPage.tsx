import { Layout } from "../components/layout";
import {
  Typography,
  Table,
  Button,
  Space,
  Card,
  Tag,
  Input,
  Tooltip,
} from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useUsedCoupons } from "../features/coupons/services/couponQueries";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { Coupon } from "../types/api";

const { Title, Paragraph } = Typography;
const { Search } = Input;

export function UsedCouponsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: usedCoupons = [], isLoading, error } = useUsedCoupons();

  const filteredCoupons = usedCoupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewCoupon = (couponId: number) => {
    navigate({ to: `/coupons/${couponId}` });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (code: string) => <Tag color="blue">{code}</Tag>,
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record: Coupon) => (
        <Tag color={record.type === "percentage" ? "green" : "orange"}>
          {record.type === "percentage"
            ? `${record.amount}%`
            : `$${record.amount}`}
        </Tag>
      ),
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
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Assigned Date",
      dataIndex: "assignedDate",
      key: "assignedDate",
      render: (date: string | null) =>
        date ? new Date(date).toLocaleDateString() : "N/A",
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
      title: "Coupon Request",
      key: "couponRequest",
      render: (_, record: Coupon) =>
        record.couponRequest ? (
          <Button
            type="link"
            size="small"
            onClick={() =>
              navigate({ to: `/coupon-requests/${record.couponRequest!.id}` })
            }
          >
            View Request #{record.couponRequest.id}
          </Button>
        ) : (
          <span style={{ color: "#999" }}>No request</span>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record: Coupon) => (
        <Tooltip title="View Details">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleViewCoupon(record.id)}
          />
        </Tooltip>
      ),
    },
  ];

  if (error) {
    return (
      <Layout>
        <Card>
          <Typography.Text type="danger">
            Error loading used coupons:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </Typography.Text>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: "24px" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate({ to: "/coupons" })}
              style={{ marginBottom: "16px" }}
            >
              Back to All Coupons
            </Button>

            <div>
              <Title level={2}>Used Coupons</Title>
              <Paragraph type="secondary">
                View all coupons that have been used and assigned to requests.
              </Paragraph>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Card size="small" style={{ minWidth: "150px" }}>
              <div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1890ff",
                  }}
                >
                  {usedCoupons.length}
                </div>
                <div style={{ color: "#666" }}>Total Used</div>
              </div>
            </Card>

            <Card size="small" style={{ minWidth: "150px" }}>
              <div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#52c41a",
                  }}
                >
                  {usedCoupons.filter((c) => c.type === "percentage").length}
                </div>
                <div style={{ color: "#666" }}>Percentage Coupons</div>
              </div>
            </Card>

            <Card size="small" style={{ minWidth: "150px" }}>
              <div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#fa8c16",
                  }}
                >
                  {usedCoupons.filter((c) => c.type === "fixed").length}
                </div>
                <div style={{ color: "#666" }}>Fixed Coupons</div>
              </div>
            </Card>
          </div>

          <Card>
            <Search
              placeholder="Search by coupon code..."
              prefix={<SearchOutlined />}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              style={{ marginBottom: "16px", maxWidth: "400px" }}
            />

            <Table
              columns={columns}
              dataSource={filteredCoupons}
              rowKey="id"
              loading={isLoading}
              pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} used coupons`,
              }}
              scroll={{ x: 1000 }}
            />
          </Card>
        </Space>
      </div>
    </Layout>
  );
}
