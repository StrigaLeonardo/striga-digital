import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLaptopCode,
  FaSyncAlt,
  FaCogs,
  FaChartLine,
  FaBullhorn,
  FaPaintBrush,
  FaLifeRing,
  FaCheckCircle,
} from "react-icons/fa";
import "./App.css";
import "./ServicesPage.css";

const serviceIcons = [
  FaLaptopCode,
  FaSyncAlt,
  FaCogs,
  FaChartLine,
  FaBullhorn,
  FaPaintBrush,
  FaLifeRing,
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

function ServicesPage() {
  const { t } = useTranslation();

  // Stable category IDs for logic and CSS classes
  const CAT_IDS = ["Web", "Apps", "Growth", "Design", "Care"];
  const ALL_ID = "__ALL__";

  // Label resolver: map ID -> localized label
  const catLabel = (id) =>
    id === ALL_ID ? t("filter_all", "All") : t(`cat_${id.toLowerCase()}`, id);

  const services = useMemo(
    () => [
      {
        id: "websites",
        cat: "Web",
        title: t("service_1_title"),
        desc: t("service_1_desc_long"),
        icon: serviceIcons[0],
        features: [
          t("service_1_feat_1"),
          t("service_1_feat_2"),
          t("service_1_feat_3"),
        ],
      },
      {
        id: "maintenance",
        cat: "Web",
        title: t("service_2_title"),
        desc: t("service_2_desc_long"),
        icon: serviceIcons[1],
        features: [
          t("service_2_feat_1"),
          t("service_2_feat_2"),
          t("service_2_feat_3"),
        ],
      },
      {
        id: "apps",
        cat: "Apps",
        title: t("service_3_title"),
        desc: t("service_3_desc_long"),
        icon: serviceIcons[2],
        features: [
          t("service_3_feat_1"),
          t("service_3_feat_2"),
          t("service_3_feat_3"),
        ],
      },
      {
        id: "seo",
        cat: "Growth",
        title: t("service_4_title"),
        desc: t("service_4_desc_long"),
        icon: serviceIcons[3],
        features: [
          t("service_4_feat_1"),
          t("service_4_feat_2"),
          t("service_4_feat_3"),
        ],
      },
      {
        id: "marketing",
        cat: "Growth",
        title: t("service_5_title"),
        desc: t("service_5_desc_long"),
        icon: serviceIcons[4],
        features: [t("service_5_feat_1"), t("service_5_feat_2")],
      },
      {
        id: "branding",
        cat: "Design",
        title: t("service_6_title"),
        desc: t("service_6_desc_long"),
        icon: serviceIcons[5],
        features: [
          t("service_6_feat_1"),
          t("service_6_feat_2"),
          t("service_6_feat_3"),
        ],
      },
      {
        id: "support",
        cat: "Care",
        title: t("service_7_title"),
        desc: t("service_7_desc_long"),
        icon: serviceIcons[6],
        features: [
          t("service_7_feat_1"),
          t("service_7_feat_2"),
          t("service_7_feat_3"),
        ],
      },
    ],
    [t]
  );

  const categories = useMemo(() => [ALL_ID, ...CAT_IDS], []);

  const [activeCat, setActiveCat] = useState(ALL_ID);

  const filtered = useMemo(
    () =>
      activeCat === ALL_ID
        ? services
        : services.filter((s) => s.cat === activeCat),
    [services, activeCat]
  );

  return (
    <section className="svc wrap">
      {/* Sidebar */}
      <aside className="svc-sidebar">
        <div className="svc-sticky">
          <h2 className="svc-title">{t("services_intro_title")}</h2>
          <p className="svc-sub">{t("services_intro_blurb")}</p>
          <div
            className="svc-filters"
            role="tablist"
            aria-label={t("aria_service_categories", "Service categories")}
          >
            {categories.map((id) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeCat === id}
                className={`svc-filter ${activeCat === id ? "active" : ""}`}
                onClick={() => setActiveCat(id)}
              >
                {catLabel(id)}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Grid */}
      <main className="svc-grid">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCat}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="svc-grid-inner"
          >
            {filtered.map((service) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.id}
                  variants={cardVariants}
                  layout
                  className="svc-card"
                >
                  <div className="svc-card-head">
                    <span
                      className={`svc-badge svc-${service.cat.toLowerCase()}`}
                    >
                      {t(`cat_${service.cat.toLowerCase()}`, service.cat)}
                    </span>
                    <Icon className="svc-icon" aria-hidden />
                  </div>
                  <h3 className="svc-h3">{service.title}</h3>
                  <p className="svc-desc">{service.desc}</p>

                  <ul className="svc-feats">
                    {service.features.map((f, i) => (
                      <li key={i} className="svc-feat">
                        <FaCheckCircle className="svc-check" aria-hidden />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <section
          className="svc-help-cta"
          role="region"
          aria-label={t("help_cta.region_label")}
        >
          <div className="svc-help-cta-inner">
            <h2 className="svc-help-cta-title">{t("help_cta.title")}</h2>
            <p className="svc-help-cta-text">{t("help_cta.text")}</p>
            <div className="svc-help-cta-actions">
              <a
                className="svc-help-btn"
                href="/contact"
                aria-label={t("help_cta.btn_label")}
              >
                {t("help_cta.btn")}
              </a>
              <a className="svc-help-link" href="/faq">
                {t("help_cta.secondary")}
              </a>
            </div>
          </div>
        </section>

        <div className="svc-spacer" />
      </main>
    </section>
  );
}

export default ServicesPage;
