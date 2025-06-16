import { apiClient } from "../../lib/api";
import type { Coupon, CouponType } from "../../types/api";

export interface CreateCouponData {
  code: string;
  amount: number;
  type?: CouponType; // Optional, defaults to "fixed"
}

export const couponApi = {
  getCoupons: async (): Promise<Coupon[]> => {
    const { data } = await apiClient.get<Coupon[]>("/coupons");
    return data;
  },

  getUsedCoupons: async (): Promise<Coupon[]> => {
    const { data } = await apiClient.get<Coupon[]>("/coupons/used");
    return data;
  },

  getCoupon: async (identifier: string | number): Promise<Coupon> => {
    const { data } = await apiClient.get<Coupon>(`/coupons/${identifier}`);
    return data;
  },

  createCoupon: async (couponData: CreateCouponData): Promise<Coupon> => {
    const { data } = await apiClient.post<Coupon>("/coupons", couponData);
    return data;
  },

  updateCoupon: async (
    identifier: string | number,
    couponData: Partial<CreateCouponData>
  ): Promise<Coupon> => {
    const { data } = await apiClient.patch<Coupon>(
      `/coupons/${identifier}`,
      couponData
    );
    return data;
  },

  deleteCoupon: async (identifier: string | number): Promise<void> => {
    await apiClient.delete(`/coupons/${identifier}`);
  },
};
