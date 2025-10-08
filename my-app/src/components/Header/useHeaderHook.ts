
import { useEffect, useRef, useState } from "react";

export const NAV_ITEMS = ["NBA Report", "MLB Report", "NFL Report", "Admin"];

export default function useHeaderHook() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);

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


  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return {
    state: { isOpen },
    ref: { menuRef },
    handler: { toggleMenu, closeMenu, handleLogout },
  };
}
