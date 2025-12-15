import "./ConfirmPopup.scss";
interface PackageType {
  id: string;
  title: string;
  price: string;
  limit: number;
}

interface ConfirmPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedPackage: PackageType;
  selectedSports: string[];
  loading?: boolean;
  orderId?: string;
}

export default function ConfirmPopup({
  open,
  onClose,
  onConfirm,
  selectedPackage,
  selectedSports,
  loading = false,
  orderId,
}: ConfirmPopupProps) {
  if (!open) return null;

  const isConfirmed = Boolean(orderId);

  const handleCopy = async () => {
    if (!orderId) return;
    await navigator.clipboard.writeText(orderId);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box animate-popup-pro">
        {/* Header */}
        <div className="popup-header">
          <h2 className="popup-title">
            {isConfirmed ? "Order Created" : "Confirm Selection"}
          </h2>
        </div>

        {/* Content */}
        <div className="popup-content">
          {!isConfirmed ? (
            <>
              <div className="popup-row">
                Package:{" "}
                <strong className="text-orange-500">
                  {selectedPackage.title}
                </strong>
              </div>

              <div className="popup-row mt-2">
                Price:{" "}
                <strong className="text-orange-500">
                  {selectedPackage.price}
                </strong>
              </div>

              <div className="popup-row mt-3">
                Sports:{" "}
                <strong className="highlight-orange">
                  {selectedSports.join(", ")}
                </strong>
              </div>

              <div className="popup-note mt-4">
                ⚠️ Please save your <strong>Order ID</strong> to track your
                payment status later.
              </div>
            </>
          ) : (
            <>
              <div className="order-id-box">
                <p className="order-id-label">Your Order ID</p>

                <div className="order-id-row">
                  <code>{orderId}</code>
                  <button className="btn-copy ripple" onClick={handleCopy}>
                    Copy
                  </button>
                </div>
              </div>

              <div className="popup-note mt-3">
                Use this Order ID to check your payment status.
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="popup-buttons">
          {!isConfirmed ? (
            <>
              <button
                className="btn-cancel ripple"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="btn-confirm ripple"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </>
          ) : (
            <button className="btn-confirm ripple" onClick={onClose}>
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
