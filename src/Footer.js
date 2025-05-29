import React from "react";
import { FaLinkedin, FaArrowUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Footer.css";

function Footer() {
  const { t } = useTranslation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <a href="/">
            <img
              src="/images/logo1.png"
              alt="Štriga Digital logo"
              className="footer-logo-img"
            />
          </a>
        </div>
        <nav className="footer-nav">
          <a href="/services">{t("services")}</a>
          <a href="/about">{t("about")}</a>
          <a href="/contact">{t("contact")}</a>
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            {t("privacy_policy")}
          </a>
          <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">
            {t("cookie_policy")}
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin-profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="footer-linkedin"
          >
            <FaLinkedin size={22} />
          </a>
        </nav>
        <button
          className="footer-top-btn"
          onClick={scrollToTop}
          aria-label={t("back_to_top")}
        >
          <FaArrowUp size={20} />
        </button>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Štriga Digital. {t("all_rights_reserved")}
      </div>
    </footer>
  );
}

export default Footer;
