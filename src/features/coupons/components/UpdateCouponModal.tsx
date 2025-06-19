import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Popconfirm,
  Button,
} from "antd";
import { useUpdateCoupon } from "../services/couponQueries";
import type { Coupon } from "../../../types/api";
import type { CreateCouponData } from "../../../services/api/couponApi";
import { useEffect } from "react";

interface UpdateCouponModalProps {
  open: boolean;
  onClose: () => void;
  coupon: Coupon | null;
}

export function UpdateCouponModal({
  open,
  onClose,
  coupon,
}: UpdateCouponModalProps) {
  const [form] = Form.useForm<Partial<CreateCouponData>>();
  const updateCouponMutation = useUpdateCoupon();

  useEffect(() => {
    if (coupon && open) {
      form.setFieldsValue({
        code: coupon.code,
        type: coupon.type,
        amount: Number(coupon.amount),
      });
    }
  }, [coupon, open, form]);

  const handleSubmit = (values: Partial<CreateCouponData>) => {
    console.log("Form submitted with values:", values); // Add this line
    console.log("Current form values:", form.getFieldsValue()); // Add this line

    if (!coupon) return;

    updateCouponMutation.mutate(
      { identifier: coupon.id, data: values },
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
      title={`Update Coupon: ${coupon?.code}`}
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={updateCouponMutation.isPending}
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
          />
        </Form.Item>

        <Form.Item
          name="type"
          label="Coupon Type"
          rules={[{ required: true, message: "Please select coupon type" }]}
        >
          <Select placeholder="Select coupon type">
            <Select.Option value="fixed">Fixed Amount ($)</Select.Option>
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
              // Fix: Remove all non-numeric characters except decimal point
              const cleaned = value?.replace(/[^0-9.]/g, "") || "";
              return parseFloat(cleaned) ? cleaned : "0";
            }}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Popconfirm
            title="Update Coupon"
            description="Are you sure you want to update this coupon?"
            onConfirm={() => {
              console.log(
                "Current form values before submit:",
                form.getFieldsValue()
              );
              form.submit();
            }}
            okText="Yes, Update"
            cancelText="Cancel"
            disabled={updateCouponMutation.isPending}
          >
            <Button
              type="primary"
              htmlType="button"
              disabled={updateCouponMutation.isPending}
              style={{ marginRight: 8 }}
            >
              {updateCouponMutation.isPending ? "Updating..." : "Update Coupon"}
            </Button>
          </Popconfirm>

          <Button
            type="default"
            htmlType="button"
            onClick={handleCancel}
            disabled={updateCouponMutation.isPending}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
