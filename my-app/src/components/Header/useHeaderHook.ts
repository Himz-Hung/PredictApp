// src/components/layout/Header/useHeaderHook.ts
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { isAdmin } from "../../utils/jwt";

export default function useHeaderHook() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const token = localStorage.getItem("token");
  const location = useLocation(); // ✅ Lấy path hiện tại

  const NAV_ITEMS =
    token && isAdmin(token)
      ? ["NBA Report", "MLB Report", "NFL Report", "NHL Report", "NCAA Report", "Admin"]
      : ["NBA Report", "MLB Report", "NFL Report", "NHL Report", "NCAA Report"];

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen || !menuRef.current) return;
      if (!(e.target instanceof Node)) return;

      if (toggleRef.current?.contains(e.target)) return;
      if (!menuRef.current.contains(e.target)) setIsOpen(false);
    };

    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return {
    state: { isOpen, NAV_ITEMS, pathname: location.pathname },
    ref: { menuRef, toggleRef },
    handler: { toggleMenu, closeMenu, handleLogout },
  };
}
