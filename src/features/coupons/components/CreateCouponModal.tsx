import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Popconfirm,
  Button,
} from "antd";
import { useCreateCoupon } from "./../services/couponQueries";
import type { CreateCouponData } from "../../../services/api/couponApi";

interface CreateCouponModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateCouponModal({ open, onClose }: CreateCouponModalProps) {
  const [form] = Form.useForm<CreateCouponData>();
  const createCouponMutation = useCreateCoupon();

  const handleSubmit = (values: CreateCouponData) => {
    createCouponMutation.mutate(values, {
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
      title="Create New Coupon"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={createCouponMutation.isPending}
        initialValues={{ type: "fixed" }}
      >
        <Form.Item
          name="code"
          label="Coupon Code"
          rules={[
            { required: true, message: "Please enter coupon code" },
            { min: 3, message: "Code must be at least 3 characters" },
            { max: 25, message: "Code must not exceed 25 characters" },
            {
              pattern: /^[A-Za-z0-9]+$/,
              message: "Code can only contain letters and numbers",
            },
          ]}
        >
          <Input
            placeholder="Enter coupon code"
            style={{ textTransform: "uppercase" }}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              form.setFieldValue("code", value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="type"
          label="Coupon Type"
          rules={[{ required: true, message: "Please select coupon type" }]}
        >
          <Select placeholder="Select coupon type">
            <Select.Option value="fixed">Fixed Amount (IQD)</Select.Option>
            <Select.Option value="percentage">Percentage (%)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            { required: true, message: "Please enter amount" },
            {
              type: "number",
              min: 0.01,
              message: "Amount must be greater than 0",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter amount"
            style={{ width: "100%" }}
            min={0.01}
            step={0.01}
            precision={2}
            formatter={(value) => {
              const watchedType = form.getFieldValue("type");
              if (watchedType === "percentage") {
                return `${value}%`;
              }
              return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }}
            parser={(value) => {
              return value?.replace(/\$\s?|(,*)/g, "").replace("%", "") as any;
            }}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Popconfirm
            title="Create Coupon"
            description="Are you sure you want to create this coupon?"
            onConfirm={() => form.submit()}
            okText="Yes, Create"
            cancelText="Cancel"
            disabled={createCouponMutation.isPending}
          >
            <Button
              type="primary"
              htmlType="button"
              disabled={createCouponMutation.isPending}
              style={{ marginRight: 8 }}
            >
              {createCouponMutation.isPending ? "Creating..." : "Create Coupon"}
            </Button>
          </Popconfirm>

          <Button
            type="default"
            htmlType="button"
            onClick={handleCancel}
            disabled={createCouponMutation.isPending}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
