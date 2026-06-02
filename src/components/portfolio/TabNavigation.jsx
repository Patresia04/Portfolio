"use client";

import { motion } from "framer-motion";
import { FiCode, FiAward, FiCpu } from "react-icons/fi";

const tabs = [
  { id: "projects", label: "Projects", icon: FiCode },
  { id: "certificates", label: "Certificates", icon: FiAward },
  { id: "techstack", label: "Tech Stack", icon: FiCpu },
];

export default function TabNavigation({ activeTab, onTabChange, isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex justify-center"
    >
      <div
        className="inline-flex items-center gap-1.5 p-1.5 rounded-full"
        style={{
          background: isDark
            ? "rgba(255,255,255,0.04)"
            : "rgba(0,0,0,0.04)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.06)",
          boxShadow: isDark
            ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative px-6 sm:px-8 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 flex items-center gap-2"
              style={{
                color: isActive
                  ? isDark
                    ? "#ffffff"
                    : "#09090b"
                  : isDark
                    ? "rgba(161,161,170,0.7)"
                    : "rgba(82,82,91,0.7)",
              }}
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundImage: isDark
                      ? "linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(168,85,247,0.15) 100%)"
                      : "linear-gradient(135deg, rgba(236,72,153,0.12) 0%, rgba(168,85,247,0.08) 100%)",
                    border: isDark
                      ? "1px solid rgba(236,72,153,0.25)"
                      : "1px solid rgba(236,72,153,0.15)",
                    boxShadow: isDark
                      ? "0 4px 20px rgba(236,72,153,0.15), inset 0 1px 0 rgba(255,255,255,0.1)"
                      : "0 2px 12px rgba(236,72,153,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <Icon
                size={15}
                className="relative z-10"
                style={{
                  color: isActive
                    ? "#EC4899"
                    : isDark
                      ? "rgba(161,161,170,0.5)"
                      : "rgba(82,82,91,0.5)",
                }}
              />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
