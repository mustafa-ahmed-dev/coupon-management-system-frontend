export type Role = "user" | "manager" | "admin";
export type CouponType = "percentage" | "fixed";
export type CouponApprovalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled"
  | "expired";

// Auth Types
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

// User Types (based on Prisma schema)
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  lastLogin: string | null;
}

export interface CreateUserData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  isActive?: boolean;
}

export interface UpdateUserData {
  name?: string;
  username?: string;
  email?: string;
  role?: Role;
}

export interface UpdateUserPassword {
  password: string;
  confirmPassword: string;
}

// Coupon Types (based on Prisma schema)
export interface Coupon {
  id: number;
  code: string;
  amount: number; // Decimal comes as number
  isUsed: boolean;
  type: CouponType;
  createdById: number;
  createdDate: string;
  assignedDate: string | null;
  createdBy?: User; // Optional populated field
  couponRequest?: CouponRequest; // Optional populated field
}

// Coupon Request Category Types
export interface CouponRequestCategory {
  id: number;
  name: string;
  description: string | null;
}

// Coupon Request Types (based on Prisma schema - maps to "issues" table)
export interface CouponRequest {
  id: number;
  orderNumber: string; // BigInt comes as string
  customerName: string;
  description: string;
  userId: number;
  couponId: number | null;
  categoryId: number;
  user?: User; // Optional populated field
  coupon?: Coupon; // Optional populated field
  category?: CouponRequestCategory; // Optional populated field
  approval?: CouponRequestApproval; // Optional populated field
}

// Coupon Request Approval Types
export interface CouponRequestApproval {
  id: number;
  requestId: number;
  userId: number | null;
  status: CouponApprovalStatus;
  decisionDate: string;
  comment: string | null;
  cancelReason: string | null;
  request?: CouponRequest; // Optional populated field
  user?: User; // Optional populated field
}

// Statistics (custom interface for dashboard)
export interface Statistics {
  totalUsers: number;
  totalCoupons: number;
  totalCouponRequests: number;
  pendingApprovals: number;
  usedCoupons: number;
  unusedCoupons: number;
  totalCouponValue: number;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type:
    | "user_created"
    | "coupon_created"
    | "coupon_used"
    | "request_submitted"
    | "request_approved";
  message: string;
  userId?: number;
  userName?: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
