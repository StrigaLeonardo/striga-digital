import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaUser, FaPen } from "react-icons/fa";
import "./ContactForm.css";

function ContactForm() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      showMessage(t("contact_form_spam"));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://us-central1-striga-digital.cloudfunctions.net/api/sendContactEmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            lang: i18n.language,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Unknown error");
      }

      showMessage(t("contact_form_success"));
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      showMessage(`${t("contact_form_error")}: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section">
      {message && (
        <motion.div
          className="form-message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {message}
        </motion.div>
      )}
      <motion.div
        className="contact-form-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2>{t("contact_form_title")}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "none" }} aria-hidden="true">
            <label>
              <span>Do not fill this out</span>
              <input
                type="text"
                name="honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex="-1"
                autoComplete="off"
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
            disabled={isSubmitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting
              ? t("contact_form_sending")
              : t("contact_form_submit")}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

export default ContactForm;
