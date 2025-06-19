import { Result, Button, Space, Card, Typography, Alert } from "antd";
import {
  BugOutlined,
  ReloadOutlined,
  HomeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import * as Sentry from "@sentry/react";

const { Paragraph, Text } = Typography;

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
  level?: "page" | "section" | "component";
}

export function ErrorFallback({
  error,
  resetError,
  level = "page",
}: ErrorFallbackProps): Sentry.FallbackRender {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const isDevelopment = import.meta.env.MODE === "development";

  // Page-level error (full screen)
  if (level === "page") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div style={{ maxWidth: "600px", width: "100%" }}>
          <Result
            status="500"
            title="Oops! Something went wrong"
            subTitle="We're sorry for the inconvenience. Our team has been automatically notified and is working on a fix."
            icon={<BugOutlined />}
            extra={
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Space size="middle" wrap>
                  {resetError && (
                    <Button
                      type="primary"
                      icon={<ReloadOutlined />}
                      onClick={resetError}
                    >
                      Try Again
                    </Button>
                  )}
                  <Button icon={<HomeOutlined />} onClick={handleGoHome}>
                    Go Home
                  </Button>
                  <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
                    Refresh Page
                  </Button>
                </Space>

                {isDevelopment && error && (
                  <Alert
                    message="Development Error Details"
                    description={
                      <div style={{ textAlign: "left" }}>
                        <Text strong>Error:</Text>
                        <Paragraph
                          style={{ marginTop: "8px", fontFamily: "monospace" }}
                        >
                          {error.message}
                        </Paragraph>
                        {error.stack && (
                          <>
                            <Text strong>Stack Trace:</Text>
                            <pre
                              style={{
                                fontSize: "12px",
                                overflow: "auto",
                                backgroundColor: "#f0f0f0",
                                padding: "12px",
                                borderRadius: "4px",
                                marginTop: "8px",
                                maxHeight: "200px",
                              }}
                            >
                              {error.stack}
                            </pre>
                          </>
                        )}
                      </div>
                    }
                    type="error"
                    showIcon
                    style={{ marginTop: "20px" }}
                  />
                )}
              </Space>
            }
          />
        </div>
      </div>
    );
  }

  // Section-level error (within a page)
  if (level === "section") {
    return (
      <Card style={{ margin: "20px 0", border: "1px solid #ff4d4f" }}>
        <Result
          status="warning"
          title="Section Error"
          subTitle="This section encountered an error and couldn't load properly."
          icon={<ExclamationCircleOutlined />}
          extra={
            <Space>
              {resetError && (
                <Button type="primary" onClick={resetError}>
                  Try Again
                </Button>
              )}
              <Button onClick={handleRefresh}>Refresh Page</Button>
            </Space>
          }
        />
        {isDevelopment && error && (
          <div style={{ marginTop: "16px", textAlign: "left" }}>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              <strong>Error:</strong> {error.message}
            </Text>
          </div>
        )}
      </Card>
    );
  }

  // Component-level error (inline)
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #ff4d4f",
        borderRadius: "6px",
        backgroundColor: "#fff2f0",
        margin: "8px 0",
      }}
    >
      <Space direction="vertical" size="small" style={{ width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <BugOutlined style={{ color: "#ff4d4f" }} />
          <Text type="danger" strong>
            Component Error
          </Text>
        </div>
        <Text type="secondary">
          This component encountered an error and couldn't render.
        </Text>
        {resetError && (
          <Button size="small" type="primary" onClick={resetError}>
            Retry
          </Button>
        )}
        {isDevelopment && error && (
          <Text
            type="secondary"
            style={{ fontSize: "12px", fontFamily: "monospace" }}
          >
            {error.message}
          </Text>
        )}
      </Space>
    </div>
  );
}
