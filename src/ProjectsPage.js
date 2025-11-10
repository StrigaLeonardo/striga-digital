import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./ProjectsPage.css";
import "./App.css";

function ProjectsPage() {
  const { t } = useTranslation();
  const projects = t("projects", { returnObjects: true });

  return (
    <section className="projects-section">
      <div className="projects-list">
        {projects
          .slice()
          .reverse()
          .map((proj, idx) => (
            <motion.div
              className="project-row"
              key={idx}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px rgba(83,78,125,0.18)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="project-image-col">
                <img
                  src={
                    proj.title === "Štriga Savjetovanje"
                      ? "/images/striga-savjetovanje.png"
                      : "/images/cfacroatia.png"
                  }
                  alt={proj.title}
                  className="project-image"
                />
                <div className="project-overlay">
                  <a
                    href={
                      proj.title === "Štriga Savjetovanje"
                        ? "https://striga-savjetovanje.com/"
                        : "https://www.cfacroatia.org/"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-view-btn"
                  >
                    {t("view_live")}
                  </a>
                </div>
              </div>
              <div className="project-text-col">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <ul className="feature-list">
                  {proj.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <div className="tech-list">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="tech" title="Built with">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}

export default ProjectsPage;
