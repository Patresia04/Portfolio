"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

export default function CertificateCard({ cert, isDark, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group cursor-pointer rounded-2xl overflow-hidden transform-gpu will-change-transform"
      style={{
        background: isDark
          ? "rgba(255,255,255,0.03)"
          : "rgba(255,255,255,0.85)",
        border: isHovered
          ? `1px solid ${isDark ? "rgba(236,72,153,0.25)" : "rgba(236,72,153,0.15)"}`
          : `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: isHovered
          ? isDark
            ? "0 16px 50px rgba(0,0,0,0.5), 0 0 20px rgba(236,72,153,0.06)"
            : "0 16px 50px rgba(0,0,0,0.08), 0 0 20px rgba(236,72,153,0.04)"
          : isDark
            ? "0 4px 16px rgba(0,0,0,0.3)"
            : "0 2px 8px rgba(0,0,0,0.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "border-color 0.3s ease, box-shadow 0.4s ease",
      }}
    >
      {/* ── Image ──────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.name}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: isHovered ? "scale(1.06)" : "scale(1)",
            }}
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(135deg, #1a1a2e, #16213e)"
                : "linear-gradient(135deg, #e2e8f0, #f1f5f9)",
            }}
          >
            <FiAward
              size={40}
              style={{ color: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)" }}
            />
          </div>
        )}

        {/* Reflection gloss */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            backgroundImage:
              "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)",
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(to top, rgba(15,15,20,0.9), transparent)"
              : "linear-gradient(to top, rgba(255,255,255,0.85), transparent)",
          }}
        />
      </div>

      {/* ── Info ───────────────────────────── */}
      <div className="px-4 pb-4 pt-1">
        <h4
          className="text-sm font-bold leading-snug mb-1 transition-colors duration-300"
          style={{
            color: isHovered
              ? "#EC4899"
              : isDark
                ? "#f4f4f5"
                : "#09090b",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {cert.name}
        </h4>
        <div className="flex items-center justify-between">
          <span
            className="text-xs"
            style={{
              color: isDark ? "rgba(161,161,170,0.7)" : "rgba(82,82,91,0.7)",
            }}
          >
            {cert.issuer}
          </span>
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{
              background: isDark
                ? "rgba(236,72,153,0.08)"
                : "rgba(236,72,153,0.06)",
              color: isDark
                ? "rgba(244,114,182,0.8)"
                : "rgba(190,24,93,0.7)",
              border: isDark
                ? "1px solid rgba(236,72,153,0.12)"
                : "1px solid rgba(236,72,153,0.08)",
            }}
          >
            {cert.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
