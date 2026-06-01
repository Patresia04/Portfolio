"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMessageCircle, FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import SectionHeading from "./SectionHeading";

const WHATSAPP_NUMBER = "6281234567890"; // Replace with actual number

const socialLinks = [
  { icon: FiGithub, href: "https://github.com", label: "GitHub", color: "#333" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "#0A66C2" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram", color: "#E4405F" },
  { icon: FiMail, href: "mailto:hello@example.com", label: "Email", color: "#ffffff" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) return;

    setSending(true);

    const text = `Halo, saya ${formData.name}.\n\n${formData.message}`;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setSending(false);
      setFormData({ name: "", message: "" });
    }, 600);
  };

  return (
    <section className="py-28 relative" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project or question? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 flex items-center justify-center">
                <FiMessageCircle className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-themed">
                  Let&apos;s Connect
                </h3>
                <p className="text-secondary-themed text-sm">
                  I&apos;d love to hear from you
                </p>
              </div>
            </div>

            <p className="text-secondary-themed leading-relaxed mb-8">
              Have a project in mind or need assistance with web development and design? 
              Feel free to reach out. I&apos;m always open to discussing new opportunities,
              collaborations, or just having a conversation about technology.
            </p>

            {/* Quick info cards */}
            <div className="space-y-4 mb-8">
              {[
                { label: "Response Time", value: "Within 24 hours" },
                { label: "Location", value: "Indonesia" },
                { label: "Preferred", value: "WhatsApp / Email" },
              ].map((info) => (
                <div
                  key={info.label}
                  className="flex items-center justify-between py-3 border-b border-themed"
                >
                  <span className="text-secondary-themed text-sm opacity-70">
                    {info.label}
                  </span>
                  <span className="text-themed text-sm font-medium">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm font-semibold text-themed mb-4">Find me on</p>
              <div className="flex items-center gap-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-themed hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={22} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bento-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name field */}
                <div className="relative">
                  <label
                    htmlFor="contact-name"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === "name" || formData.name
                        ? "-top-2.5 text-xs font-semibold text-primary bg-bg dark:bg-dark-900 px-1.5 z-10"
                        : "top-3.5 text-sm text-secondary-themed"
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 rounded-xl bg-bg-soft dark:bg-dark-800 border border-themed text-themed focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  />
                </div>

                {/* Message field */}
                <div className="relative">
                  <label
                    htmlFor="contact-message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === "message" || formData.message
                        ? "-top-2.5 text-xs font-semibold text-primary bg-bg dark:bg-dark-900 px-1.5 z-10"
                        : "top-3.5 text-sm text-secondary-themed"
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-3.5 rounded-xl bg-bg-soft dark:bg-dark-800 border border-themed text-themed focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`shimmer-btn w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    sending
                      ? "bg-primary/50 cursor-not-allowed text-white/70"
                      : "bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl hover:shadow-primary/25"
                  }`}
                >
                  {sending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Redirecting to WhatsApp...
                    </>
                  ) : (
                    <>
                      <FiSend size={18} />
                      Send via WhatsApp
                    </>
                  )}
                </motion.button>

                <p className="text-secondary-themed text-xs text-center opacity-60">
                  Your message will be pre-filled in WhatsApp for your convenience.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
