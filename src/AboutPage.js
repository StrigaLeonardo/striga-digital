import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./AboutPage.css";
import WorkProcess from "./WorkProcess";

function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <section className="about-section-page" id="about-page">
        <motion.div
          className="about-content-page"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2>{t("about_page_title")}</h2>
          <p>{t("about_page_intro")}</p>
          <div className="about-extra-text">
            <p>{t("about_page_extra")}</p>
          </div>
          <div className="about-image-row">
            <img
              src="/images/template-img.jpg"
              alt={t("about_page_founder_alt")}
              className="about-founder-img"
            />
            <div className="about-image-text">
              <p>{t("about_page_founder_text")}</p>
            </div>
          </div>
        </motion.div>
      </section>
      <WorkProcess />
    </>
  );
}

export default AboutPage;
