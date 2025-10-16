// src/components/layout/Header/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import useHeaderHook from "./useHeaderHook";

export default function Header(): React.JSX.Element {
  const { state, ref, handler } = useHeaderHook();
  const navigate = useNavigate();

  return (
    <header className={styles.header} aria-expanded={state.isOpen}>
      <div className={styles.inner}>
        <div
          className={styles.brand}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <img src="/logo.png" alt="Logo" className={styles.logo} />
          <span className={styles.title}>MyApp</span>
        </div>

        {/* RIGHT GROUP */}
        <div className={styles.right}>
          <nav className={styles.desktopNav} aria-label="Primary">
            {state.NAV_ITEMS.map((item) => {
              const path = `/${item.replace(" ", "-").toLowerCase()}`;
              return (
                <Link key={item} to={path} className={styles.navLink}>
                  {item}
                </Link>
              );
            })}
            <button className={styles.logout} onClick={handler.handleLogout}>
              Logout
            </button>
          </nav>

          <div className={styles.mobileCtrl}>
            <button
              className={styles.burger}
              onClick={handler.toggleMenu}
              aria-label={state.isOpen ? "Close menu" : "Open menu"}
              aria-expanded={state.isOpen}
            >
              {state.isOpen ? (
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
        className={`${styles.overlay} ${state.isOpen ? styles.show : ""}`}
        aria-hidden={!state.isOpen}
        onClick={handler.closeMenu}
      />
      <aside
        ref={ref.menuRef}
        className={`${styles.mobileMenu} ${state.isOpen ? styles.open : ""}`}
        role="menu"
        aria-hidden={!state.isOpen}
      >
        <div className={styles.mobileContent}>
          {state.NAV_ITEMS.map((item, i) => {
            const path = `/${item.replace(" ", "-").toLowerCase()}`;
            return (
              <Link
                key={item}
                to={path}
                role="menuitem"
                className={styles.mobileItem}
                style={{ animationDelay: `${i * 70}ms` }}
                onClick={handler.closeMenu}
              >
                {item}
              </Link>
            );
          })}
          <button
            className={styles.mobileLogout}
            onClick={handler.handleLogout}
            style={{ animationDelay: `${state.NAV_ITEMS.length * 70}ms` }}
          >
            Logout
          </button>
        </div>
      </aside>
    </header>
  );
}
