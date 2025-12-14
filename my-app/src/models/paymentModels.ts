export type PaymentStatus =
  | "active"
  | "pending"
  | "cancelled"
  | "expired"
  | "paid";

export interface PaymentInfo {
  status: PaymentStatus;
  packageCode: string;
  sports: string[];
  expiresAt: string;
  limit: string;
}

export interface CheckStatusResponse {
  status: PaymentStatus;
}

export type PackageCode = "EW_001" | "EW_002" | "EW_003";

export const LABEL_BY_STATUS: Record<PaymentStatus, string> = {
  active: "Active",
  pending: "Pending Payment",
  cancelled: "Cancelled",
  expired: "Expired",
  paid: "Paid",
};
