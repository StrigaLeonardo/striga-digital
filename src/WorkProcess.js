import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./WorkProcess.css";

function WorkProcess() {
  const { t } = useTranslation();

  const steps = [
    { title: t("process_step1_title"), desc: t("process_step1_desc") },
    { title: t("process_step2_title"), desc: t("process_step2_desc") },
    { title: t("process_step3_title"), desc: t("process_step3_desc") },
    { title: t("process_step4_title"), desc: t("process_step4_desc") },
    { title: t("process_step5_title"), desc: t("process_step5_desc") },
  ];

  return (
    <section className="process-section">
      <h2>{t("process_title")}</h2>
      <div className="process-timeline">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="process-step"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.15 }}
          >
            <div className="step-number">{index + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
        <div className="timeline-line"></div>
      </div>
    </section>
  );
}

export default WorkProcess;
