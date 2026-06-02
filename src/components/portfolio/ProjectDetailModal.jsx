"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiGithub,
  FiExternalLink,
  FiCalendar,
  FiTag,
  FiCheckCircle,
  FiLayers,
  FiStar,
} from "react-icons/fi";

/* ── Category gradients (matching ProjectCard) ───── */
const categoryGradients = {
  Networking: ["#EC4899", "#A855F7"],
  "Web App": ["#8B5CF6", "#6366F1"],
  "IoT / Networking": ["#F472B6", "#EC4899"],
  "UI/UX Design": ["#FB7185", "#F472B6"],
  DevOps: ["#A855F7", "#7C3AED"],
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const modalVariants = {
  hidden: { scale: 0.92, opacity: 0, filter: "blur(8px)" },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    scale: 0.92,
    opacity: 0,
    filter: "blur(6px)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProjectDetailModal({ project, isDark, onClose }) {
  // Escape key handler
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  const [g1, g2] = project
    ? categoryGradients[project.category] || ["#EC4899", "#A855F7"]
    : ["#EC4899", "#A855F7"];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          style={{
            background: isDark
              ? "rgba(0,0,0,0.7)"
              : "rgba(0,0,0,0.4)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <motion.div
            className="relative w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: isDark
                ? "linear-gradient(180deg, rgba(15,15,20,0.98), rgba(10,10,15,0.99))"
                : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,252,0.99))",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
              boxShadow: isDark
                ? "0 40px 100px rgba(0,0,0,0.6), 0 0 40px rgba(236,72,153,0.05)"
                : "0 40px 100px rgba(0,0,0,0.15), 0 0 40px rgba(236,72,153,0.03)",
            }}
          >
            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[85vh] custom-scrollbar">
              {/* ── Hero gradient header ────────── */}
              <div
                className="relative h-64 sm:h-80 md:h-96 flex items-end"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${g1}, ${g2})`,
                }}
              >
                {/* Pattern / Image */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                ) : (
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                )}

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
                  style={{
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <FiX size={18} />
                </button>



                {/* Title overlay */}
                <div className="relative z-10 px-8 pb-6 w-full">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    }}
                  />
                  <div className="relative z-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">

                      <span className="inline-flex items-center gap-1.5">
                        <FiCalendar size={12} />
                        {project.timeline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Body content ───────────────── */}
              <div className="px-8 py-8 space-y-8">
                {/* Overview */}
                <div>
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: "#EC4899" }}
                  >
                    <FiLayers size={14} />
                    Overview
                  </h3>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{
                      color: isDark
                        ? "rgba(212,212,216,0.85)"
                        : "rgba(82,82,91,0.9)",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Responsibilities */}
                {project.responsibilities?.length > 0 && (
                  <div>
                    <h3
                      className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
                      style={{ color: "#EC4899" }}
                    >
                      <FiCheckCircle size={14} />
                      Responsibilities
                    </h3>
                    <ul className="space-y-2.5">
                      {project.responsibilities.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-[14px] leading-relaxed"
                          style={{
                            color: isDark
                              ? "rgba(212,212,216,0.8)"
                              : "rgba(82,82,91,0.85)",
                          }}
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: "#EC4899" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}



                {/* Technologies */}
                <div>
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2"
                    style={{ color: "#EC4899" }}
                  >
                    <FiTag size={14} />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${isDark ? "rgba(236,72,153,0.12)" : "rgba(236,72,153,0.08)"}, ${isDark ? "rgba(168,85,247,0.1)" : "rgba(168,85,247,0.06)"})`,
                          color: isDark ? "#F472B6" : "#BE185D",
                          border: isDark
                            ? "1px solid rgba(236,72,153,0.15)"
                            : "1px solid rgba(236,72,153,0.1)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                {(project.github || project.demo) && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.04)",
                          color: isDark ? "#f4f4f5" : "#09090b",
                          border: isDark
                            ? "1px solid rgba(255,255,255,0.1)"
                            : "1px solid rgba(0,0,0,0.08)",
                        }}
                      >
                        <FiGithub size={16} />
                        View Source
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg, #EC4899, #A855F7)",
                          boxShadow: "0 4px 20px rgba(236,72,153,0.3)",
                        }}
                      >
                        <FiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
