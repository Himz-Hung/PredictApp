import { useEffect, useRef, useState } from "react";
import { isAdmin } from "../../utils/jwt";

export default function useHeaderHook() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);
  const token = localStorage.getItem("token");
  const NAV_ITEMS =
    token && isAdmin(token)
      ? [
          "NBA Report",
          "MLB Report",
          "NFL Report",
          "NHL Report",
          "NCAA Report",
          "Admin",
        ]
      : ["NBA Report", "MLB Report", "NFL Report", "NHL Report", "NCAA Report"];
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen) return;
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return {
    state: { isOpen, NAV_ITEMS },
    ref: { menuRef },
    handler: { toggleMenu, closeMenu, handleLogout },
  };
}
