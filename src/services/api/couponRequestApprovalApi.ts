import { apiClient } from "../../lib/api";
import type {
  CouponRequestApproval,
  CouponApprovalStatus,
} from "../../types/api";

export interface UpdateApprovalStatusData {
  status: CouponApprovalStatus;
  comment?: string;
}

export interface CancelApprovalData {
  cancelReason: string;
}

export const couponRequestApprovalApi = {
  // Get all approvals
  getApprovals: async (): Promise<CouponRequestApproval[]> => {
    const { data } = await apiClient.get<CouponRequestApproval[]>(
      "/coupon-request-approvals"
    );
    return data;
  },

  // Get approval by ID
  getApproval: async (id: number): Promise<CouponRequestApproval> => {
    const { data } = await apiClient.get<CouponRequestApproval>(
      `/coupon-request-approvals/${id}`
    );
    return data;
  },

  // Update approval (general update)
  updateApproval: async (
    id: number,
    approvalData: Partial<UpdateApprovalStatusData>
  ): Promise<CouponRequestApproval> => {
    const { data } = await apiClient.patch<CouponRequestApproval>(
      `/coupon-request-approvals/${id}`,
      approvalData
    );
    return data;
  },

  // Update approval status (specific endpoint)
  updateApprovalStatus: async (
    id: number,
    statusData: UpdateApprovalStatusData
  ): Promise<CouponRequestApproval> => {
    const { data } = await apiClient.put<CouponRequestApproval>(
      `/coupon-request-approvals/${id}/status`,
      statusData
    );
    return data;
  },

  // Cancel approval
  cancelApproval: async (
    id: number,
    cancelData: CancelApprovalData
  ): Promise<CouponRequestApproval> => {
    const { data } = await apiClient.post<CouponRequestApproval>(
      `/coupon-request-approvals/${id}/cancel`,
      cancelData
    );
    return data;
  },

  // Delete approval - NOTE: Your Postman has wrong URL (coupon-requests-approvals vs coupon-request-approvals)
  deleteApproval: async (id: number): Promise<void> => {
    await apiClient.delete(`/coupon-request-approvals/${id}`);
  },
};
