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
  const accent =
    type === "success"
      ? "bg-emerald-400/20 border-emerald-400 text-emerald-300"
      : type === "error"
      ? "bg-rose-400/10 border-rose-400 text-rose-300"
      : type === "warning"
      ? "bg-amber-400/10 border-amber-400 text-amber-300"
      : "bg-sky-400/10 border-sky-400 text-sky-300";
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`pointer-events-auto w-full
        transform transition-all duration-300 ease-out
        ${accent}
        border rounded-md p-3 shadow-lg backdrop-blur-sm text-sm
        ${removing ? "opacity-0 -translate-x-5" : "opacity-100 translate-x-0"}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {title ? <div className="font-semibold text-white truncate">{title}</div> : null}
          <div className="text-gray-200 mt-1 break-words">{message}</div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-white/20"
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
