import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import "./AboutSection.css";

function AboutSection() {
  const { t } = useTranslation();

  return (
    <section className="about-section" id="about">
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2>{t("about_title")}</h2>
        <p>{t("about_text")}</p>
        <div className="about-values">
          <div>
            <span className="about-value-title">
              {t("about_value_1_title")}
            </span>
            <span className="about-value-desc">{t("about_value_1_desc")}</span>
          </div>
          <div>
            <span className="about-value-title">
              {t("about_value_2_title")}
            </span>
            <span className="about-value-desc">{t("about_value_2_desc")}</span>
          </div>
          <div>
            <span className="about-value-title">
              {t("about_value_3_title")}
            </span>
            <span className="about-value-desc">{t("about_value_3_desc")}</span>
          </div>
        </div>
        <a href="/about" className="about-cta">
          {t("about_cta")}
        </a>
      </motion.div>
    </section>
  );
}

export default AboutSection;
