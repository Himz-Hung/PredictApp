import { useNavigate } from "react-router-dom";
import styles from "./BlurLayout.module.scss";

export default function BlurLayout({
  show,
}: {
  show: boolean;
}) {
  const navigate = useNavigate();
  if (!show) return null;
  return (
    <div
      className={`
        absolute inset-0 z-20 flex items-center justify-center px-6
        bg-black/40 backdrop-blur-sm
        ${styles.blurLayoutOverlay}
      `}
    >
      <div
        className={`
          bg-white dark:bg-[#1e1e1e]
          p-6 rounded-2xl shadow-xl max-w-sm w-full text-center
          ${styles.blurLayoutBox}
        `}
        style={{
          boxShadow: "0 0 20px rgba(255,140,66,0.25)",
        }}
      >
        <h2 className="text-lg font-semibold text-[#FF8C42] mb-2">
          Restricted Content
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-5">
          This content is locked. Follow to view more.
        </p>

        <button
          onClick={()=> navigate('/prediction-packages')}
          className={`
            w-full py-2 rounded-full font-medium text-white
            bg-[#FF8C42] hover:bg-[#f57819]
            transition-all duration-200
            shadow-[0_0_12px_rgba(255,140,66,0.5)]
            hover:shadow-[0_0_20px_rgba(255,140,66,0.7)]
            ${styles.blurLayoutPulse}
          `}
        >
          Follow to view more
        </button>
      </div>
    </div>
  );
}
