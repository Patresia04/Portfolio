"use client";

import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiHeart,
  FiArrowUp,
} from "react-icons/fi";

const socialLinks = [
  { icon: FiGithub, href: "https://github.com", label: "GitHub", hoverColor: "#333" },
  { icon: FiLinkedin, href: "https://linkedin.com", label: "LinkedIn", hoverColor: "#0A66C2" },
  { icon: FiInstagram, href: "https://instagram.com", label: "Instagram", hoverColor: "#E4405F" },
  { icon: FiMail, href: "mailto:hello@example.com", label: "Email", hoverColor: "#ffffff" },
];

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative">
      {/* Gradient top border */}
      <div className="h-px w-full" style={{
        background: "linear-gradient(90deg, transparent, var(--color-primary), var(--color-accent), transparent)",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center border border-primary/20">
              <span className="gradient-text font-bold text-sm">P</span>
            </div>
            <span className="text-secondary-themed text-sm">
              Built with{" "}
              <FiHeart className="inline text-accent mx-1" size={14} />
              by{" "}
              <span className="gradient-text font-semibold">Patresia</span>
            </span>
          </div>

          {/* Center - Social Links */}
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

          {/* Right - Back to top + Copyright */}
          <div className="flex items-center gap-6">
            <motion.button
              onClick={handleBackToTop}
              className="flex items-center gap-2 text-secondary-themed hover:text-primary text-sm transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowUp size={14} />
              Back to top
            </motion.button>
            <p className="text-secondary-themed text-sm opacity-60">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
