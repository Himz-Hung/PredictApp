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
  }
  
  export default function ConfirmPopup({
    open,
    onClose,
    onConfirm,
    selectedPackage,
    selectedSports,
  }: ConfirmPopupProps) {
    if (!open) return null;
    return (
      <div className="popup-overlay">
        <div className="popup-box animate-popup-pro">
          {/* Icon + Title */}
          <div className="popup-header">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF8C42"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <h2 className="popup-title">Confirm Selection</h2>
          </div>
  
          {/* Content */}
          <div className="popup-content">
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
          </div>
  
          {/* Buttons */}
          <div className="popup-buttons">
            <button className="btn-cancel ripple" onClick={onClose}>
              Cancel
            </button>
  
            <button className="btn-confirm ripple" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
  