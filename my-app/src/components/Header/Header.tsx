import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";

const NAV_ITEMS = ["NBA Report", "MLB Report", "NFL Report", "Admin"];

const Header = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!isOpen) return;
      if (!menuRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!menuRef.current.contains(e.target)) setIsOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  return (
    <header className={styles.header} aria-expanded={isOpen}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <span className={styles.title}>MyApp</span>
        </div>

        {/* RIGHT GROUP: desktop nav + mobile control */}
        <div className={styles.right}>
          <nav className={styles.desktopNav} aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href={`/${item.split(" ")[0].toLowerCase()}`}
                className={styles.navLink}
              >
                {item}
              </a>
            ))}
            <button className={styles.logout}>Logout</button>
          </nav>

          <div className={styles.mobileCtrl}>
            <button
              className={styles.burger}
              onClick={() => setIsOpen((s) => !s)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
                  <path
                    d="M6 6L18 18M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* overlay + mobile menu */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
        aria-hidden={!isOpen}
      />
      <aside
        ref={menuRef}
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
        role="menu"
        aria-hidden={!isOpen}
      >
        <div className={styles.mobileContent}>
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              role="menuitem"
              href={`/${item.split(" ")[0].toLowerCase()}`}
              className={styles.mobileItem}
              style={{ animationDelay: `${i * 70}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
          <button
            className={styles.mobileLogout}
            onClick={() => setIsOpen(false)}
            style={{ animationDelay: `${NAV_ITEMS.length * 70}ms` }}
          >
            Logout
          </button>
        </div>
      </aside>
    </header>
  );
};

export default Header;
