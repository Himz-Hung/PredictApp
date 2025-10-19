// src/components/layout/Header/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import useHeaderHook from "./useHeaderHook";

export default function Header(): React.JSX.Element {
  const { state, ref, handler } = useHeaderHook();
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    handler.closeMenu();
    navigate(path);
  };

  const isActive = (path: string) => state.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-lg transition-all duration-300
        ${state.isOpen ? "border-indigo-400/30 shadow-lg" : "shadow-sm"}
        bg-gradient-to-b from-[#081020] to-[#060711]`}
    >
      <div className="max-w-[90%] mx-auto flex items-center justify-between py-3">
        <div
          onClick={() => handleLinkClick("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-9 h-9 rounded-lg object-contain bg-gradient-to-b from-[#0b1220] to-[#071021] p-1 shadow-lg group-hover:scale-110 transition"
          />
          <span className="text-white font-bold text-lg tracking-wide group-hover:text-indigo-400 transition">
            MyApp
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {state.NAV_ITEMS.map((item) => {
            const path = `/${item.replace(" ", "-").toLowerCase()}`;
            const active = isActive(path);
            return (
              <Link
                key={item}
                to={path}
                className={`relative group font-medium px-2 py-1 rounded-md transition duration-300 ease-out
                  ${active ? "text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" : "text-white/80 hover:text-white"}
                `}
              >
                {item}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] rounded-full 
                  bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600
                  transition-all duration-300 ease-out
                  ${active ? "w-full opacity-100" : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"}
                `}></span>
              </Link>
            );
          })}
          <button
            onClick={handler.handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-4 py-2 rounded-md 
              shadow-sm transition-all duration-300
              hover:scale-105 hover:shadow-red-500/30 hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]"
          >
            Logout
          </button>
        </nav>

        <div className="md:hidden flex items-center">
          <button
            ref={ref.toggleRef}
            onClick={handler.toggleMenu}
            aria-label={state.isOpen ? "Close menu" : "Open menu"}
            aria-expanded={state.isOpen}
            className="p-2 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition"
          >
            {state.isOpen ? (
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <aside
        ref={ref.menuRef}
        className={`fixed left-1/2 -translate-x-1/2 top-[72px] w-[90%] max-w-xs rounded-2xl border border-white/10 
          bg-[#0b0e18]/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-out 
          ${state.isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible"}`}
      >
        <div className="flex flex-col divide-y divide-white/10">
          {state.NAV_ITEMS.map((item, i) => {
            const path = `/${item.replace(" ", "-").toLowerCase()}`;
            const active = isActive(path);
            return (
              <button
                key={item}
                onClick={() => handleLinkClick(path)}
                role="menuitem"
                className={`py-3 px-4 text-left font-semibold transition-all duration-300 ease-out
                  ${active ? "text-indigo-400 bg-indigo-500/10" : "text-white hover:bg-indigo-500/10"}
                  animate-slide-in`}
                style={{
                  animationDelay: `${i * 70}ms`,
                  animationFillMode: "backwards",
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="p-3">
          <button
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 rounded-xl 
              hover:scale-105 hover:drop-shadow-[0_0_6px_rgba(239,68,68,0.7)] transition-all duration-300"
            onClick={handler.handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>
    </header>
  );
}
