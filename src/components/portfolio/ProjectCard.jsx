"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiStar } from "react-icons/fi";

export default function ProjectCard({ project, index, gradient, isDark, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const [g1, g2] = gradient;

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        y: isHovered ? -8 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group h-full rounded-2xl overflow-hidden cursor-pointer transform-gpu will-change-transform"
      style={{
        perspective: "1000px",
        background: isDark
          ? "rgba(255,255,255,0.03)"
          : "rgba(255,255,255,0.85)",
        border: isHovered
          ? `1px solid ${isDark ? "rgba(236,72,153,0.3)" : "rgba(236,72,153,0.2)"}`
          : `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: isHovered
          ? isDark
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(236,72,153,0.08)`
            : `0 20px 60px rgba(0,0,0,0.1), 0 0 30px rgba(236,72,153,0.06)`
          : isDark
            ? "0 4px 20px rgba(0,0,0,0.3)"
            : "0 2px 10px rgba(0,0,0,0.04)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "border-color 0.3s ease, box-shadow 0.4s ease",
      }}
    >
      {/* ── Image/Gradient Hero ────────────────────── */}
      <div
        className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800"
        style={{
          backgroundImage: project.image ? "none" : `linear-gradient(135deg, ${g1}, ${g2})`,
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />
        )}





        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.45)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: isHovered ? 1 : 0.8,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold"
            style={{
              background: "rgba(236,72,153,0.3)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(236,72,153,0.4)",
              boxShadow: "0 4px 20px rgba(236,72,153,0.2)",
            }}
          >
            <FiExternalLink size={14} />
            View Details
          </motion.div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{
            backgroundImage: isDark
              ? "linear-gradient(to top, rgba(15,15,18,0.8), transparent)"
              : "linear-gradient(to top, rgba(255,255,255,0.6), transparent)",
          }}
        />
      </div>

      {/* ── Content ──────────────────────────── */}
      <div className="p-6">
        <h3
          className="text-lg font-bold mb-2.5 transition-colors duration-300"
          style={{
            color: isHovered
              ? "#EC4899"
              : isDark
                ? "#f4f4f5"
                : "#09090b",
          }}
        >
          {project.title}
        </h3>

        <p
          className="text-sm leading-relaxed mb-5"
          style={{
            color: isDark ? "rgba(161,161,170,0.8)" : "rgba(82,82,91,0.8)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.shortDescription}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs rounded-lg font-medium transition-colors duration-300"
              style={{
                background: isDark
                  ? "rgba(236,72,153,0.08)"
                  : "rgba(236,72,153,0.06)",
                color: isDark
                  ? "rgba(244,114,182,0.9)"
                  : "rgba(190,24,93,0.8)",
                border: isHovered
                  ? `1px solid ${isDark ? "rgba(236,72,153,0.2)" : "rgba(236,72,153,0.15)"}`
                  : `1px solid ${isDark ? "rgba(236,72,153,0.1)" : "rgba(236,72,153,0.08)"}`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
