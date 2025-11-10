import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";
import "./App.css";

function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768) {
        const atTop = window.scrollY === 0;

        if (atTop || (!atTop && !scrolled)) {
          setScrolled(!atTop);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [scrolled]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsMobileMenuOpen(true);
  };

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="header-content">
        <Link to="/" className="desktop-logo-link">
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

        {/* Mobile Navigation */}
        <div className="mobile-header">
          <div className="mobile-logo-container">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/images/logo1.png" alt="Logo" className="mobile-logo" />
            </Link>
          </div>
          <button
            className="mobile-dropdown-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? "close" : "open"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={24} style={{ color: "white" }} />
                ) : (
                  <FaBars size={24} style={{ color: "white" }} />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="mobile-dropdown-menu"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <nav>
                  <ul className="mobile-nav-list">
                    <li>
                      <Link
                        to="/about"
                        className="mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t("O Nama")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services"
                        className="mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t("Usluge")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/projects"
                        className="mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t("Projekti")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t("Kontakt")}
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="mobile-language-switcher">
                  <FaGlobe size={16} className="globe-icon" />
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default Header;
