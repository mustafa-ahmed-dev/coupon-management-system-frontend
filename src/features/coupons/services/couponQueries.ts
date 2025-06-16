import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { couponApi } from "../../../services/api/couponApi";
import type { CreateCouponData } from "../../../services/api/couponApi";

export const useCoupons = () => {
  return useQuery({
    queryKey: ["coupons"],
    queryFn: couponApi.getCoupons,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUsedCoupons = () => {
  return useQuery({
    queryKey: ["coupons", "used"],
    queryFn: couponApi.getUsedCoupons,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCoupon = (identifier: string | number) => {
  return useQuery({
    queryKey: ["coupons", identifier],
    queryFn: () => couponApi.getCoupon(identifier),
    enabled: !!identifier,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponApi.createCoupon,
    onSuccess: (newCoupon) => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      message.success(`Coupon "${newCoupon.code}" created successfully!`);
    },
    onError: (error) => {
      console.error("Create coupon failed:", error);
      message.error(
        error instanceof Error ? error.message : "Failed to create coupon"
      );
    },
  });
};

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      identifier,
      data,
    }: {
      identifier: string | number;
      data: Partial<CreateCouponData>;
    }) => couponApi.updateCoupon(identifier, data),
    onSuccess: (updatedCoupon) => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      queryClient.invalidateQueries({
        queryKey: ["coupons", updatedCoupon.id],
      });
      message.success(`Coupon "${updatedCoupon.code}" updated successfully!`);
    },
    onError: (error) => {
      console.error("Update coupon failed:", error);
      message.error(
        error instanceof Error ? error.message : "Failed to update coupon"
      );
    },
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponApi.deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      message.success("Coupon deleted successfully!");
    },
    onError: (error) => {
      console.error("Delete coupon failed:", error);
      message.error(
        error instanceof Error ? error.message : "Failed to delete coupon"
      );
    },
  });
};
