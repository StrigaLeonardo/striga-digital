import React from "react";
import { useTranslation } from "react-i18next";
import "./HeroSection.css";
import { Link } from "react-router-dom";

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>{t("hero_title")}</h1>
        <p>
          {t("hero_subtitle")}
          <br />
          {t("hero_tagline")}
        </p>
        <Link to="/contact" className="hero-button">
          {t("hero_cta")}
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
