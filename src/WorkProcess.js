import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import "./WorkProcess.css";
import {
  FaComments,
  FaRegListAlt,
  FaPencilRuler,
  FaCode,
  FaRocket,
} from "react-icons/fa";

function WorkProcess() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const steps = [
    {
      title: t("process_step1_title"),
      desc: t("process_step1_desc"),
      icon: FaComments,
    },
    {
      title: t("process_step2_title"),
      desc: t("process_step2_desc"),
      icon: FaRegListAlt,
    },
    {
      title: t("process_step3_title"),
      desc: t("process_step3_desc"),
      icon: FaPencilRuler,
    },
    {
      title: t("process_step4_title"),
      desc: t("process_step4_desc"),
      icon: FaCode,
    },
    {
      title: t("process_step5_title"),
      desc: t("process_step5_desc"),
      icon: FaRocket,
    },
  ];

  return (
    <section className="process-section" ref={sectionRef}>
      <div className="process-container">
        <motion.h2
          className="process-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {t("process_title")}
        </motion.h2>

        <div className="process-timeline">
          {/* Connecting line */}
          <svg
            className="timeline-connector"
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="0"
              y1="2"
              x2="100"
              y2="2"
              stroke="var(--primary-color)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                className="process-step"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + index * 0.1,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className="step-icon-circle"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <Icon className="step-icon" />
                </motion.div>
                <div className="step-number">{index + 1}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WorkProcess;
