import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaUser, FaPen } from "react-icons/fa";
import "./ContactForm.css";

function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState(""); // Honeypot state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check honeypot
    if (honeypot) {
      alert(t("contact_form_spam"));
      return;
    }
    // Handle form submission (send to backend, email, etc.)
    alert(t("contact_form_success"));
  };

  return (
    <section className="contact-form-section">
      <motion.div
        className="contact-form-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2>{t("contact_form_title")}</h2>
        <form onSubmit={handleSubmit}>
          {/* Honeypot field (hidden) */}
          <div style={{ display: "none" }}>
            <label>
              <span>Do not fill this out if you are human</span>
              <input
                type="text"
                name="honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
          </div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label>
              <FaUser size={16} />
              <span>{t("contact_form_name")}</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label>
              <FaEnvelope size={16} />
              <span>{t("contact_form_email")}</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label>
              <FaPen size={16} />
              <span>{t("contact_form_message")}</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </motion.div>
          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("contact_form_submit")}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

export default ContactForm;
