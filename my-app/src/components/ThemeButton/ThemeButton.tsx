import { useEffect, useState } from "react";

export default function ThemeButton() {
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-20 h-8 rounded-full relative overflow-hidden 
        flex items-center p-1
        shadow-md
        transition-all duration-700
        bg-gradient-to-r
        ${
          theme === "dark"
            ? "from-[#040b18] to-[#0a162b]"
            : "from-sky-300 to-sky-500"
        }
      `}
    >
      <div
        className={`
          absolute inset-0 flex items-center gap-2 px-2
          transition-all duration-700
          ${
            theme === "dark"
              ? "opacity-0 -translate-x-2"
              : "opacity-100 translate-x-0"
          }
        `}
      >
        <div className="animate-cloud">
          <svg width="16" height="10" fill="white" opacity="0.9">
            <circle cx="7" cy="7" r="7" />
            <circle cx="13" cy="7" r="5" />
          </svg>
        </div>
        <div className="animate-cloud-delayed opacity-90">
          <svg width="14" height="9" fill="white">
            <circle cx="6" cy="6" r="5" />
            <circle cx="11" cy="6" r="4" />
          </svg>
        </div>
      </div>

      {/* ✨ Stars */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-700
          ${theme === "dark" ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="absolute animate-twinkle left-2 top-1 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute animate-twinkle2 right-2 top-2 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute animate-twinkle3 left-6 bottom-1 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute animate-twinkle right-8 top-4 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute animate-twinkle2 left-4 bottom-3 w-1 h-1 bg-white rounded-full"></div>
      </div>

      <div
        className={`
          w-7 h-7 rounded-full flex items-center justify-center
                    ${
                      theme === "light"
                        ? "translate-x-0  bg-yellow-100 "
                        : "translate-x-12 bg-gray-700"
                    }
          transition-all duration-700
          shadow-[0_0_8px_rgba(255,255,200,0.9)]
          dark:shadow-[0_0_10px_rgba(200,200,255,0.8)]
        `}
      >
        {theme === "light" && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" fill="#ffb100" />
            <line
              x1="12"
              y1="1"
              x2="12"
              y2="4"
              stroke="#ffb100"
              strokeWidth="1"
            />
            <line
              x1="12"
              y1="20"
              x2="12"
              y2="23"
              stroke="#ffb100"
              strokeWidth="1"
            />
            <line
              x1="1"
              y1="12"
              x2="4"
              y2="12"
              stroke="#ffb100"
              strokeWidth="1"
            />
            <line
              x1="20"
              y1="12"
              x2="23"
              y2="12"
              stroke="#ffb100"
              strokeWidth="1"
            />
            <line
              x1="4.2"
              y1="4.2"
              x2="6.5"
              y2="6.5"
              stroke="#ffb100"
              strokeWidth="1"
            />
            <line
              x1="17.5"
              y1="17.5"
              x2="19.8"
              y2="19.8"
              stroke="#ffb100"
              strokeWidth="1"
            />
            <line
              x1="4.2"
              y1="19.8"
              x2="6.5"
              y2="17.5"
              stroke="#ffb100"
              strokeWidth="1"
            />
            <line
              x1="17.5"
              y1="6.5"
              x2="19.8"
              y2="4.2"
              stroke="#ffb100"
              strokeWidth="1"
            />
          </svg>
        )}

        {theme === "dark" && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            {/* Glow nhẹ */}
            <circle cx="12" cy="12" r="7" fill="rgba(230,230,230,0.15)" />
            {/* Mặt trăng khuyết mới */}
            <path
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              fill="#e5e5e5"
            />
          </svg>
        )}
      </div>

      <style>
        {`
          @keyframes cloud {
            0% { transform: translateX(0px); }
            100% { transform: translateX(18px); }
          }

          @keyframes twinkle {
            0%,100% { opacity: 0.2; transform: scale(1); }  
            50% { opacity: 1; transform: scale(1.2); }
          }

          .animate-cloud { animation: cloud 3s ease-in-out infinite alternate; }
          .animate-cloud-delayed { animation: cloud 4s ease-in-out infinite alternate-reverse; }

          .animate-twinkle { animation: twinkle 2s infinite ease-in-out; }
          .animate-twinkle2 { animation: twinkle 2.5s infinite ease-in-out; }
          .animate-twinkle3 { animation: twinkle 3s infinite ease-in-out; }
        `}
      </style>
    </button>
  );
}
