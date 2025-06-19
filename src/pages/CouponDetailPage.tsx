import { Layout } from "../components/layout";
import {
  Typography,
  Card,
  Descriptions,
  Tag,
  Button,
  Space,
  Spin,
  Alert,
  Row,
  Col,
  Statistic,
  Timeline,
} from "antd";
import {
  EditOutlined,
  ArrowLeftOutlined,
  TagOutlined,
  UserOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useCoupon } from "../features/coupons/services/couponQueries";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { UpdateCouponModal } from "../features/coupons/components/UpdateCouponModal";
import type { Coupon } from "../types/api";

const { Title, Paragraph } = Typography;

import { Route } from "../routes/coupons/$id";

export function CouponDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // Convert string id to number for the API call
  const couponId = parseInt(id, 10);

  const { data: coupon, isLoading, error } = useCoupon(couponId);

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleBackToCoupons = () => {
    navigate({ to: "/coupons" });
  };

  if (isLoading) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Loading coupon details...</div>
        </div>
      </Layout>
    );
  }

  if (error || !coupon) {
    return (
      <Layout>
        <Alert
          message="Error"
          description={
            error instanceof Error
              ? error.message
              : `Coupon with ID ${id} not found`
          }
          type="error"
          showIcon
        />
      </Layout>
    );
  }

  // Calculate coupon value display
  const formatCouponValue = (coupon: Coupon) => {
    return coupon.amount;
  };

  // Timeline data for coupon history
  const timelineItems = [
    {
      color: "blue",
      dot: <CalendarOutlined />,
      children: (
        <div>
          <div style={{ fontWeight: "bold" }}>Coupon Created</div>
          <div style={{ color: "#666", fontSize: "12px" }}>
            {new Date(coupon.createdDate).toLocaleString()}
          </div>
          <div style={{ fontSize: "12px" }}>
            Created by:{" "}
            {coupon.createdBy?.name || `User ID: ${coupon.createdById}`}
          </div>
        </div>
      ),
    },
  ];

  if (coupon.assignedDate) {
    timelineItems.push({
      color: "green",
      dot: <CheckCircleOutlined />,
      children: (
        <div>
          <div style={{ fontWeight: "bold" }}>Coupon Assigned</div>
          <div style={{ color: "#666", fontSize: "12px" }}>
            {new Date(coupon.assignedDate).toLocaleString()}
          </div>
          {coupon.couponRequest && (
            <div style={{ fontSize: "12px" }}>
              Assigned to request #{coupon.couponRequest.id}
            </div>
          )}
        </div>
      ),
    });
  }

  if (coupon.isUsed) {
    timelineItems.push({
      color: "red",
      dot: <DollarCircleOutlined />,
      children: (
        <div>
          <div style={{ fontWeight: "bold" }}>Coupon Used</div>
          <div style={{ color: "#666", fontSize: "12px" }}>
            Used for discount
          </div>
        </div>
      ),
    });
  }

  return (
    <Layout>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header Section */}
        <div>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleBackToCoupons}
            style={{ marginBottom: "16px" }}
          >
            Back to Coupons
          </Button>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Title level={2}>
                <TagOutlined style={{ marginRight: 8 }} />
                Coupon Details
              </Title>
              <Paragraph type="secondary">
                Detailed information for coupon: <strong>{coupon.code}</strong>
              </Paragraph>
            </div>

            <Space>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleOpenUpdateModal}
                disabled={coupon.isUsed}
              >
                Edit Coupon
              </Button>
            </Space>
          </div>
        </div>

        {/* Statistics Cards */}
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Coupon Value"
                value={formatCouponValue(coupon)}
                prefix={coupon.type === "percentage" ? "%" : "$"}
                valueStyle={{
                  color: coupon.type === "percentage" ? "#52c41a" : "#1890ff",
                  fontSize: "24px",
                }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Status"
                value={coupon.isUsed ? "Used" : "Available"}
                prefix={
                  coupon.isUsed ? (
                    <CheckCircleOutlined />
                  ) : (
                    <ClockCircleOutlined />
                  )
                }
                valueStyle={{
                  color: coupon.isUsed ? "#f5222d" : "#52c41a",
                  fontSize: "18px",
                }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Type"
                value={coupon.type.toUpperCase()}
                prefix={<TagOutlined />}
                valueStyle={{
                  color: coupon.type === "percentage" ? "#722ed1" : "#fa8c16",
                  fontSize: "18px",
                }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Coupon ID"
                value={coupon.id}
                prefix="#"
                valueStyle={{ color: "#666", fontSize: "18px" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Information Card */}
        <Card title="Coupon Information" size="default">
          <Descriptions
            bordered
            column={{ xs: 1, sm: 2, md: 2, lg: 2 }}
            items={[
              {
                key: "code",
                label: "Coupon Code",
                children: (
                  <Tag color="blue" style={{ fontSize: "14px" }}>
                    {coupon.code}
                  </Tag>
                ),
              },
              {
                key: "amount",
                label: "Amount",
                children: (
                  <Tag
                    color={coupon.type === "percentage" ? "green" : "orange"}
                    style={{ fontSize: "14px" }}
                  >
                    {formatCouponValue(coupon)}
                  </Tag>
                ),
              },
              {
                key: "type",
                label: "Type",
                children: (
                  <Tag
                    color={coupon.type === "percentage" ? "purple" : "blue"}
                    style={{ fontSize: "14px" }}
                  >
                    {coupon.type === "percentage"
                      ? "Percentage Discount"
                      : "Fixed Amount"}
                  </Tag>
                ),
              },
              {
                key: "status",
                label: "Status",
                children: (
                  <Tag
                    color={coupon.isUsed ? "red" : "green"}
                    style={{ fontSize: "14px" }}
                  >
                    {coupon.isUsed ? "Used" : "Available"}
                  </Tag>
                ),
              },
              {
                key: "createdBy",
                label: "Created By",
                children: (
                  <Space>
                    <UserOutlined />
                    {coupon.createdBy?.name || `User ID: ${coupon.createdById}`}
                  </Space>
                ),
              },
              {
                key: "createdDate",
                label: "Created Date",
                children: (
                  <Space>
                    <CalendarOutlined />
                    {new Date(coupon.createdDate).toLocaleString()}
                  </Space>
                ),
              },
              {
                key: "assignedDate",
                label: "Assigned Date",
                children: coupon.assignedDate ? (
                  <Space>
                    <CalendarOutlined />
                    {new Date(coupon.assignedDate).toLocaleString()}
                  </Space>
                ) : (
                  <Tag color="default">Not assigned</Tag>
                ),
              },
              {
                key: "couponRequest",
                label: "Related Request",
                children: coupon.couponRequest ? (
                  <Button
                    type="link"
                    size="small"
                    onClick={() =>
                      navigate({
                        to: `/coupon-requests/${coupon.couponRequest!.id}`,
                      })
                    }
                  >
                    View Request #{coupon.couponRequest.id}
                  </Button>
                ) : (
                  <span style={{ color: "#999" }}>No related request</span>
                ),
              },
            ]}
          />
        </Card>

        {/* Timeline Card */}
        <Card title="Coupon History" size="default">
          <Timeline items={timelineItems} />
        </Card>

        {/* Request Details Card (if available) */}
        {coupon.couponRequest && (
          <Card title="Related Coupon Request" size="default">
            <Descriptions
              bordered
              column={{ xs: 1, sm: 2 }}
              items={[
                {
                  key: "requestId",
                  label: "Request ID",
                  children: `#${coupon.couponRequest.id}`,
                },
                {
                  key: "orderNumber",
                  label: "Order Number",
                  children: coupon.couponRequest.orderNumber,
                },
                {
                  key: "customerName",
                  label: "Customer Name",
                  children: coupon.couponRequest.customerName,
                },
                {
                  key: "description",
                  label: "Description",
                  children: coupon.couponRequest.description,
                },
                {
                  key: "category",
                  label: "Category",
                  children: coupon.couponRequest.category?.name || "Unknown",
                },
                {
                  key: "requestUser",
                  label: "Requested By",
                  children:
                    coupon.couponRequest.user?.name ||
                    `User ID: ${coupon.couponRequest.userId}`,
                },
              ]}
            />

            <div style={{ marginTop: 16 }}>
              <Button
                type="primary"
                onClick={() =>
                  navigate({
                    to: `/coupon-requests/${coupon.couponRequest!.id}`,
                  })
                }
              >
                View Full Request Details
              </Button>
            </div>
          </Card>
        )}

        {/* Usage Information */}
        <Card title="Usage Information" size="default">
          {coupon.isUsed ? (
            <Alert
              message="This coupon has been used"
              description="This coupon has been redeemed and cannot be used again."
              type="info"
              showIcon
            />
          ) : (
            <Alert
              message="This coupon is available for use"
              description="This coupon has not been used yet and is available for redemption."
              type="success"
              showIcon
            />
          )}
        </Card>

        {/* Update Modal */}
        <UpdateCouponModal
          open={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          coupon={coupon}
        />
      </Space>
    </Layout>
  );
}
