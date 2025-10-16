import { useContext } from "react";
import { createContext } from "react";
import { type Toast } from "../components/Toast/useToastProviderHook";

export type ToastContextValue = {
  toasts: Toast[];
  showToast: (payload: {
    title?: string;
    message: string;
    type?: ToastType;
    duration?: number;
  }) => string;
  removeToast: (id: string) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

type ToastType = "info" | "success" | "warning" | "error";
