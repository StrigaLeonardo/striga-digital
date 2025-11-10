import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaLaptopCode,
  FaSyncAlt,
  FaCogs,
  FaChartLine,
  FaBullhorn,
  FaPaintBrush,
  FaLifeRing,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";
import "./ServicesSection.css";

const serviceIcons = [
  FaLaptopCode,
  FaSyncAlt,
  FaCogs,
  FaChartLine,
  FaBullhorn,
  FaPaintBrush,
  FaLifeRing,
];

function ServicesSection() {
  const { t } = useTranslation();
  const [currentGroup, setCurrentGroup] = useState(0);

  const services = useMemo(
    () => [
      {
        id: "websites",
        cat: "Web",
        title: t("service_1_title"),
        desc: t("service_1_desc"),
        icon: serviceIcons[0],
        features: [
          t("service_1_feat_1", "Custom design"),
          t("service_1_feat_2", "Mobile optimization"),
          t("service_1_feat_3", "SEO best practices"),
        ],
      },
      {
        id: "maintenance",
        cat: "Web",
        title: t("service_2_title"),
        desc: t("service_2_desc"),
        icon: serviceIcons[1],
        features: [
          t("service_2_feat_1", "Visual redesign"),
          t("service_2_feat_2", "Security updates"),
          t("service_2_feat_3", "Performance optimization"),
        ],
      },
      {
        id: "apps",
        cat: "Apps",
        title: t("service_3_title"),
        desc: t("service_3_desc"),
        icon: serviceIcons[2],
        features: [
          t("service_3_feat_1", "Custom app development"),
          t("service_3_feat_2", "API integration"),
          t("service_3_feat_3", "User management"),
        ],
      },
      {
        id: "seo",
        cat: "Growth",
        title: t("service_4_title"),
        desc: t("service_4_desc"),
        icon: serviceIcons[3],
        features: [
          t("service_4_feat_1", "Keyword research"),
          t("service_4_feat_2", "On-page optimization"),
          t("service_4_feat_3", "Technical SEO audits"),
        ],
      },
      {
        id: "marketing",
        cat: "Growth",
        title: t("service_5_title"),
        desc: t("service_5_desc"),
        icon: serviceIcons[4],
        features: [
          t("service_5_feat_1", "Google Ads management"),
          t("service_5_feat_2", "Email marketing"),
        ],
      },
      {
        id: "branding",
        cat: "Design",
        title: t("service_6_title"),
        desc: t("service_6_desc"),
        icon: serviceIcons[5],
        features: [
          t("service_6_feat_1", "Logo design"),
          t("service_6_feat_2", "Brand guidelines"),
          t("service_6_feat_3", "Marketing materials"),
        ],
      },
      {
        id: "support",
        cat: "Care",
        title: t("service_7_title"),
        desc: t("service_7_desc"),
        icon: serviceIcons[6],
        features: [
          t("service_7_feat_2", "Regular backups"),
          t("service_7_feat_3", "Quick response"),
        ],
      },
    ],
    [t]
  );

  // Group services: [0,1], [2], [3,4], [5], [6]
  const serviceGroups = useMemo(() => {
    const groups = [];
    let i = 0;
    while (i < services.length) {
      if ((i + 1) % 3 === 0) {
        groups.push([services[i]]);
        i++;
      } else {
        const group = [services[i]];
        if (i + 1 < services.length && (i + 2) % 3 !== 0) {
          group.push(services[i + 1]);
          i += 2;
        } else {
          i++;
        }
        groups.push(group);
      }
    }
    return groups;
  }, [services]);

  const nextGroup = () => {
    setCurrentGroup((prev) => (prev + 1) % serviceGroups.length);
  };

  const prevGroup = () => {
    setCurrentGroup(
      (prev) => (prev - 1 + serviceGroups.length) % serviceGroups.length
    );
  };

  const currentServices = serviceGroups[currentGroup];
  const isLargeCard = currentServices.length === 1;

  return (
    <section className="services-section-home">
      <div className="services-container-home">
        <div className="services-split-layout">
          {/* Left: Header */}
          <div className="services-header-home">
            <h2 className="services-title-home">
              {t("services_title", "Our Services")}
            </h2>
            <p className="services-subtitle-home">
              {t(
                "services_subtitle",
                "Comprehensive digital solutions tailored to elevate your business. From web development to branding, we deliver results that matter."
              )}
            </p>
          </div>

          {/* Right: Carousel */}
          <div className="services-carousel-wrapper">
            <button
              className="carousel-nav-btn carousel-nav-left"
              onClick={prevGroup}
              aria-label="Previous services"
            >
              <FaChevronLeft />
            </button>

            <button
              className="carousel-nav-btn carousel-nav-right"
              onClick={nextGroup}
              aria-label="Next services"
            >
              <FaChevronRight />
            </button>

            <div className="services-carousel-container">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentGroup}
                  className={`services-carousel-grid ${
                    isLargeCard ? "large" : "small"
                  }`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <article
                        key={service.id}
                        className={`service-carousel-card ${
                          isLargeCard ? "card-large" : "card-small"
                        }`}
                      >
                        <div className="service-premium-icon-wrapper-home">
                          <Icon className="service-premium-icon-home" />
                        </div>
                        <div className="service-premium-content-home">
                          <span
                            className={`service-badge-home service-${service.cat.toLowerCase()}`}
                          >
                            {service.cat}
                          </span>
                          <h3 className="service-title-card">
                            {service.title}
                          </h3>
                          <p className="service-desc-home">{service.desc}</p>

                          <ul className="service-features-home">
                            {service.features.map((feature, i) => (
                              <li key={i} className="service-feature-home">
                                <FaCheckCircle className="service-check-home" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Dots indicator */}
              <div className="carousel-dots-home">
                {serviceGroups.map((group, index) => (
                  <button
                    key={index}
                    className={`dot-home ${
                      index === currentGroup ? "active" : ""
                    }`}
                    onClick={() => setCurrentGroup(index)}
                    aria-label={`Go to group ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
