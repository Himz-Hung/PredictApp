import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="text-center p-8 flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-6">404 - Page Not Found</h1>

      <button
        type="button"
        onClick={() => navigate("/nba-Report", { replace: true })}
        className="flex items-center justify-center
            text-blue-400 border border-blue-400
            bg-transparent
            font-medium rounded-xl text-sm px-5 py-2.5 text-center
            shadow-none
            transition-all duration-300 ease-out
            hover:text-white hover:bg-blue-400/20 hover:border-blue-500
            hover:shadow-lg hover:shadow-blue-500/30
            hover:scale-[1.02] active:scale-[0.98] hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Quay lại
      </button>
    </div>
  );
}
