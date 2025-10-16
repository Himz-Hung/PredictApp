import { useCallback, useEffect, useRef, useState } from "react";

export type ToastType = "info" | "success" | "warning" | "error";

export type Toast = {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  removing?: boolean;
};

export type UseToastHook = {
  toasts: Toast[];
  showToast: (payload: {
    title?: string;
    message: string;
    type?: ToastType;
    duration?: number;
  }) => string;
  removeToast: (id: string) => void;
};

export default function useToastProviderHook(): UseToastHook {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, number>>(new Map());
  const idCounter = useRef<number>(0);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, removing: true } : t)));
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      const timerId = timers.current.get(id);
      if (timerId) {
        window.clearTimeout(timerId);
        timers.current.delete(id);
      }
    }, 300);
  }, []);

  const showToast = useCallback(
    ({ title, message, type = "info", duration = 3500 }: { title?: string; message: string; type?: ToastType; duration?: number }) => {
      const id = `${Date.now()}-${++idCounter.current}`;
      const toast: Toast = { id, title, message, type, duration };
      setToasts((prev) => [toast, ...prev]); // newest on top

      const timer = window.setTimeout(() => {
        removeToast(id);
      }, duration);
      timers.current.set(id, timer);

      return id;
    },
    [removeToast]
  );

  useEffect(() => {
    const timersMap = timers.current;
    return () => {
      timersMap.forEach((t) => window.clearTimeout(t));
      timersMap.clear();
    };
  }, []);

  return { toasts, showToast, removeToast };
}