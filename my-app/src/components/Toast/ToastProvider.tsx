import useToastProviderHook, { type Toast } from "./useToastProviderHook";
import { ToastContext } from "../../hooks/useContextHook";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, showToast, removeToast } = useToastProviderHook();

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed inset-x-0 bottom-4 flex justify-start px-4 z-[9999] pointer-events-none">
      <div className="flex flex-col gap-2 items-start w-full max-w-xs sm:max-w-sm">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => onRemove(t.id)} />
        ))}
      </div>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const { title, message, type = "info", removing } = toast;

  // Theme trắng – cam pastel + màu tương ứng cho các type
  const accent =
    type === "success"
      ? "bg-emerald-50 border-emerald-300 text-emerald-700"
      : type === "error"
      ? "bg-rose-50 border-rose-300 text-rose-700"
      : type === "warning"
      ? "bg-amber-50 border-amber-300 text-amber-700"
      : "bg-white border-orange-200 text-orange-600"; // info (default) cam pastel

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`pointer-events-auto w-full
        transform transition-all duration-300 ease-out
        ${accent}
        border rounded-lg p-3 shadow-md backdrop-blur-sm text-sm
        ${removing ? "opacity-0 -translate-x-5" : "opacity-100 translate-x-0"}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {title && <div className="font-semibold truncate">{title}</div>}
          <div className="mt-1 break-words">{message}</div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-orange-600 p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-200/50"
          aria-label="Close toast"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
