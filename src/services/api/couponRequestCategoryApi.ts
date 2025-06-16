import { apiClient } from "../../lib/api";
import type { CouponRequestCategory } from "../../types/api";

export interface CreateCategoryData {
  name: string;
  description?: string;
}

export const couponRequestCategoryApi = {
  // Get all categories
  getCategories: async (): Promise<CouponRequestCategory[]> => {
    const { data } = await apiClient.get<CouponRequestCategory[]>(
      "/coupon-request-categories"
    );
    return data;
  },

  // Get category by ID
  getCategory: async (id: number): Promise<CouponRequestCategory> => {
    const { data } = await apiClient.get<CouponRequestCategory>(
      `/coupon-request-categories/${id}`
    );
    return data;
  },

  // Create new category
  createCategory: async (
    categoryData: CreateCategoryData
  ): Promise<CouponRequestCategory> => {
    const { data } = await apiClient.post<CouponRequestCategory>(
      "/coupon-request-categories",
      categoryData
    );
    return data;
  },

  // Update category
  updateCategory: async (
    id: number,
    categoryData: Partial<CreateCategoryData>
  ): Promise<CouponRequestCategory> => {
    const { data } = await apiClient.patch<CouponRequestCategory>(
      `/coupon-request-categories/${id}`,
      categoryData
    );
    return data;
  },

  // Delete category
  deleteCategory: async (id: number): Promise<void> => {
    await apiClient.delete(`/coupon-request-categories/${id}`);
  },
};
