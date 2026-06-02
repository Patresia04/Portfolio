"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn, FiZoomOut } from "react-icons/fi";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { scale: 0.92, opacity: 0, filter: "blur(8px)" },
  visible: {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    scale: 0.92,
    opacity: 0,
    filter: "blur(6px)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function CertificatePreviewModal({
  certifications,
  currentIndex,
  isDark,
  onClose,
  onNavigate,
}) {
  const isOpen = currentIndex !== null;
  const cert = isOpen ? certifications[currentIndex] : null;
  const [slideDirection, setSlideDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const goNext = useCallback(() => {
    if (currentIndex === null) return;
    setSlideDirection(1);
    setIsZoomed(false);
    const next =
      currentIndex + 1 >= certifications.length ? 0 : currentIndex + 1;
    onNavigate(next);
  }, [currentIndex, certifications.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex === null) return;
    setSlideDirection(-1);
    setIsZoomed(false);
    const prev =
      currentIndex - 1 < 0 ? certifications.length - 1 : currentIndex - 1;
    onNavigate(prev);
  }, [currentIndex, certifications.length, onNavigate]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [onClose, goNext, goPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setTimeout(() => setIsZoomed(false), 0);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && cert && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-8"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          style={{
            background: isDark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col"
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
                ? "0 40px 100px rgba(0,0,0,0.7)"
                : "0 40px 100px rgba(0,0,0,0.15)",
            }}
          >
            {/* ── Top bar ─────────────────────── */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: isDark
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* Info */}
              <div className="flex-1 min-w-0 pr-4">
                <h3
                  className="text-sm sm:text-base font-bold truncate"
                  style={{ color: isDark ? "#f4f4f5" : "#09090b" }}
                >
                  {cert.name}
                </h3>
                <p
                  className="text-xs truncate"
                  style={{
                    color: isDark
                      ? "rgba(161,161,170,0.7)"
                      : "rgba(82,82,91,0.7)",
                  }}
                >
                  {cert.issuer} • {cert.year}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)",
                    color: isDark
                      ? "rgba(161,161,170,0.7)"
                      : "rgba(82,82,91,0.7)",
                  }}
                >
                  {isZoomed ? (
                    <FiZoomOut size={16} />
                  ) : (
                    <FiZoomIn size={16} />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(0,0,0,0.04)",
                    color: isDark
                      ? "rgba(161,161,170,0.7)"
                      : "rgba(82,82,91,0.7)",
                  }}
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* ── Image area ─────────────────── */}
            <div
              className="relative flex-1 flex items-center justify-center overflow-hidden"
              style={{ minHeight: "300px" }}
            >
              {/* Nav arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-3 sm:left-5 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
                  color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(8px)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 sm:right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.06)",
                  color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)",
                  backdropFilter: "blur(8px)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <FiChevronRight size={20} />
              </button>

              {/* Certificate image with navigation animation */}
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={currentIndex}
                  custom={slideDirection}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full flex items-center justify-center p-6 sm:p-10"
                >
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="max-w-full max-h-[55vh] object-contain rounded-xl transition-transform duration-500 cursor-zoom-in"
                      style={{
                        transform: isZoomed ? "scale(1.5)" : "scale(1)",
                        boxShadow: isDark
                          ? "0 8px 40px rgba(0,0,0,0.5)"
                          : "0 8px 40px rgba(0,0,0,0.1)",
                      }}
                      onClick={() => setIsZoomed(!isZoomed)}
                    />
                  ) : (
                    <div
                      className="w-64 h-48 rounded-2xl flex items-center justify-center"
                      style={{
                        background: isDark
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0.03)",
                      }}
                    >
                      <span
                        className="text-6xl font-black"
                        style={{
                          color: isDark
                            ? "rgba(255,255,255,0.1)"
                            : "rgba(0,0,0,0.06)",
                        }}
                      >
                        {cert.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Dot indicators ──────────────── */}
            <div
              className="flex justify-center gap-1.5 px-6 py-4 flex-shrink-0"
              style={{
                borderTop: isDark
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {certifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSlideDirection(i > currentIndex ? 1 : -1);
                    setIsZoomed(false);
                    onNavigate(i);
                  }}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background:
                      i === currentIndex
                        ? "#EC4899"
                        : isDark
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(0,0,0,0.1)",
                    transform:
                      i === currentIndex ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
