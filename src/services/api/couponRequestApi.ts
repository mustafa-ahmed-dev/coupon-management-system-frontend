import { apiClient } from "../../lib/api";
import type { CouponRequest } from "../../types/api";

export interface CreateCouponRequestData {
  orderNumber: string;
  customerName: string;
  description: string;
  categoryId: number;
}

export const couponRequestApi = {
  // Get all coupon requests
  getCouponRequests: async (): Promise<CouponRequest[]> => {
    const { data } = await apiClient.get<CouponRequest[]>("/coupon-requests");
    return data;
  },

  // Get coupon request by ID
  getCouponRequest: async (id: number): Promise<CouponRequest> => {
    const { data } = await apiClient.get<CouponRequest>(
      `/coupon-requests/${id}`
    );
    return data;
  },

  // Create new coupon request
  createCouponRequest: async (
    requestData: CreateCouponRequestData
  ): Promise<CouponRequest> => {
    const { data } = await apiClient.post<CouponRequest>(
      "/coupon-requests",
      requestData
    );
    return data;
  },

  // Update coupon request
  updateCouponRequest: async (
    id: number,
    requestData: Partial<CreateCouponRequestData>
  ): Promise<CouponRequest> => {
    const { data } = await apiClient.patch<CouponRequest>(
      `/coupon-requests/${id}`,
      requestData
    );
    return data;
  },

  // Delete coupon request
  deleteCouponRequest: async (id: number): Promise<void> => {
    await apiClient.delete(`/coupon-requests/${id}`);
  },
};
