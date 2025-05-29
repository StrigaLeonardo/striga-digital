import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaLaptopCode,
  FaSyncAlt,
  FaCogs,
  FaChartLine,
  FaBullhorn,
  FaPaintBrush,
  FaLifeRing,
} from "react-icons/fa";
import "./ServicesSection.css";

const serviceIcons = [
  <FaLaptopCode />,
  <FaSyncAlt />,
  <FaCogs />,
  <FaChartLine />,
  <FaBullhorn />,
  <FaPaintBrush />,
  <FaLifeRing />,
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="services-section">
      <h2 className="services-title">{t("services_title")}</h2>
      <div className="services-list">
        {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
          <motion.div
            className="service-card"
            key={num}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <div className="service-icon">{serviceIcons[idx]}</div>
            <h3 className="service-name">{t(`service_${num}_title`)}</h3>
            <p className="service-desc">{t(`service_${num}_desc`)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
