import React, { useEffect, useState, useRef } from "react";
import "./Header.css";
import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";

function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setScrolled(window.scrollY > 30);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <Link to="/">
        <div className="logo-container">
          <img src="/images/logo1.png" alt="Logo" className="logo" />
        </div>
      </Link>
      <nav className="nav">
        <ul className="nav-list">
          <li>
            <Link to="/about" className="nav-link">
              {t("O Nama")}
            </Link>
          </li>
          <li>
            <Link to="/services" className="nav-link">
              {t("Usluge")}
            </Link>
          </li>
          <li>
            <Link to="/projects" className="nav-link">
              {t("Projekti")}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              {t("Kontakt")}
            </Link>
          </li>
        </ul>
        <div className="language-switcher">
          <button
            onClick={() => changeLanguage("hr")}
            className={i18n.language === "hr" ? "active" : ""}
          >
            HR
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={i18n.language === "en" ? "active" : ""}
          >
            EN
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
