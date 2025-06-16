import { Layout } from "../components/layout";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Table,
  Tag,
  Space,
  Spin,
  Alert,
} from "antd";
import {
  UserOutlined,
  TagOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useStatistics } from "../services/queries/statisticsQueries";
import type { Activity } from "../types/api"; // FIXME: use the activity

const { Title, Paragraph } = Typography;

export function HomePage() {
  const { data: stats, isLoading, error } = useStatistics();

  if (error) {
    return (
      <Layout>
        <Alert
          message="Error Loading Dashboard"
          description={
            error instanceof Error
              ? error.message
              : "Failed to load dashboard data"
          }
          type="error"
          showIcon
        />
      </Layout>
    );
  }

  const columns = [
    {
      title: "Activity",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "User",
      dataIndex: "userName",
      key: "userName",
      render: (userName: string) => userName || "System",
    },
    {
      title: "Time",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        const typeColors: Record<string, string> = {
          user_created: "blue",
          coupon_created: "green",
          coupon_used: "orange",
          request_submitted: "purple",
          request_approved: "cyan",
        };
        return (
          <Tag color={typeColors[type] || "default"}>
            {type.replace("_", " ").toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return (
    <Layout>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={2}>Coupon Management Dashboard</Title>
          <Paragraph type="secondary">
            Welcome to your coupon management system. Monitor requests,
            approvals, and coupon usage.
          </Paragraph>
        </div>

        <Spin spinning={isLoading}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Users"
                  value={stats?.totalUsers || 0}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Coupons"
                  value={stats?.totalCoupons || 0}
                  prefix={<TagOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Coupon Requests"
                  value={stats?.totalCouponRequests || 0}
                  prefix={<FileTextOutlined />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Pending Approvals"
                  value={stats?.pendingApprovals || 0}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Statistic
                  title="Used Coupons"
                  value={stats?.usedCoupons || 0}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Statistic
                  title="Unused Coupons"
                  value={stats?.unusedCoupons || 0}
                  prefix={<TagOutlined />}
                  valueStyle={{ color: "#fa8c16" }}
                />
              </Card>
            </Col>

            <Col xs={24} sm={12} lg={8}>
              <Card>
                <Statistic
                  title="Total Coupon Value"
                  value={stats?.totalCouponValue || 0}
                  prefix={<DollarOutlined />}
                  precision={2}
                  valueStyle={{ color: "#13c2c2" }}
                />
              </Card>
            </Col>
          </Row>
        </Spin>

        <Card title="Recent Activities">
          <Table
            columns={columns}
            dataSource={stats?.recentActivities || []}
            loading={isLoading}
            pagination={false}
            size="small"
            rowKey="id"
          />
        </Card>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="Quick Actions" size="small">
              <Space direction="vertical" style={{ width: "100%" }}>
                <a href="/users/new">Create New User</a>
                <a href="/coupons/new">Create New Coupon</a>
                <a href="/coupon-requests">View Coupon Requests</a>
                <a href="/approvals">Manage Approvals</a>
                <a href="/categories">Manage Categories</a>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="System Overview" size="small">
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <Tag color="green">API: Healthy</Tag>
                </div>
                <div>
                  <Tag color="green">Database: Connected</Tag>
                </div>
                <div>
                  <Tag
                    color={
                      stats?.pendingApprovals && stats.pendingApprovals > 10
                        ? "orange"
                        : "green"
                    }
                  >
                    Pending Approvals: {stats?.pendingApprovals || 0}
                  </Tag>
                </div>
                <div>
                  <Tag
                    color={
                      stats?.unusedCoupons && stats.unusedCoupons > 0
                        ? "green"
                        : "orange"
                    }
                  >
                    Available Coupons: {stats?.unusedCoupons || 0}
                  </Tag>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>
    </Layout>
  );
}
