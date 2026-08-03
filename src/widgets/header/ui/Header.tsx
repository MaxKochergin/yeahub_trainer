import { useState } from "react";
import styles from "./Header.module.scss";
import { ROUTES } from "@/shared/config/routes";
import { Link } from "react-router-dom";
import logo from "@/shared/assets/LogoYeaHub.svg";
import chevronDown from "@/shared/assets/chevron_Down.svg";
import hamburger from "@/shared/assets/hamburger.svg";
import { Button } from "@/shared/ui/button";

const NAV_LINKS = [
  { to: ROUTES.HOME, label: "База вопросов" },
  { to: ROUTES.TRAINER_SETTINGS, label: "Тренажер" },
  { to: ROUTES.HOME, label: "Материалы" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to={ROUTES.HOME} className={styles.logo} onClick={closeMenu}>
            <img src={logo} alt="YeaHub" />
          </Link>
          <Link
            to={ROUTES.TRAINER_SETTINGS}
            className={styles.brandTitle}
            onClick={closeMenu}
          >
            Подготовка
            <img className={styles.brandChevron} src={chevronDown} alt="" />
          </Link>
        </div>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.action}>
          <Button variant="ghost">Вход</Button>
          <Button variant="primary" className={styles.registerButton}>
            Регистрация
          </Button>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <img src={hamburger} alt="" />
        </button>
      </div>

      {isMenuOpen ? (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            {NAV_LINKS.map((link) => (
              <Link key={link.label} to={link.to} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileAction}>
            <Button variant="ghost">Вход</Button>
            <Button variant="primary" className={styles.registerButton}>
              Регистрация
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
};
