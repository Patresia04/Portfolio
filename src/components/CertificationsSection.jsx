"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { certifications } from "@/data/certifications";
import { FiAward, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const CARD_WIDTH = 550;
const CARD_GAP = 590;

const gradients = [
  "from-zinc-700 to-zinc-900",
  "from-blue-700 to-slate-900",
  "from-emerald-700 to-zinc-900",
  "from-slate-700 to-slate-950",
  "from-amber-700 to-stone-900",
  "from-neutral-700 to-neutral-900",
];

export default function CertificationsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  const [phase, setPhase] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState(0);

  const totalCards = certifications.length;
  const centerIndex = (totalCards - 1) / 2;

  useEffect(() => {
    function checkMobile() { setIsMobile(window.innerWidth < 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [isInView]);

  const handleCardClick = useCallback((index) => {
    if (phase < 2) return;
    if (focusedIndex === index) {
      setExpandedIndex(index);
    } else {
      setFocusedIndex(index);
    }
  }, [phase, focusedIndex]);

  const getCardStyle = useCallback((index) => {
    if (isMobile) return {};

    if (phase === 0) {
      return {
        x: (index - centerIndex) * CARD_GAP,
        y: 0,
        rotateZ: index % 2 === 0 ? -6 : 6,
        scale: 0.9,
        opacity: 0,
      };
    }

    if (phase === 1) {
      return {
        x: (index - centerIndex) * CARD_GAP,
        y: 0,
        rotateZ: index % 2 === 0 ? -6 : 6,
        scale: 1,
        opacity: 1,
      };
    }

    if (focusedIndex === null) {
      return {
        x: (index - centerIndex) * CARD_GAP,
        y: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
      };
    }

    const dist = index - focusedIndex;

    if (dist === 0) {
      return { x: 0, y: 0, rotateZ: 0, scale: 1.08, opacity: 1 };
    }

    if (dist < 0) {
      return { x: dist * CARD_GAP - 90, y: 0, rotateZ: -2, scale: 0.9, opacity: 0.4 };
    }

    return { x: dist * CARD_GAP + 90, y: 0, rotateZ: 2, scale: 0.9, opacity: 0.4 };
  }, [phase, focusedIndex, centerIndex, isMobile]);

  const getTransition = useCallback((index) => {
    if (phase === 1) {
      return { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: index * 0.09 };
    }
    if (phase === 2 && focusedIndex === null) {
      return { duration: 0.9, ease: [0.16, 1, 0.3, 1] };
    }
    return { type: "spring", stiffness: 80, damping: 22, mass: 1.2 };
  }, [phase, focusedIndex]);

  useEffect(() => {
    if (phase < 2) return;
    const handler = (e) => {
      if (expandedIndex !== null) return;
      if (e.key === "ArrowRight") {
        setFocusedIndex(prev => prev === null ? 0 : Math.min(prev + 1, totalCards - 1));
      } else if (e.key === "ArrowLeft") {
        setFocusedIndex(prev => prev === null ? 0 : Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && focusedIndex !== null) {
        setExpandedIndex(focusedIndex);
      } else if (e.key === "Escape") {
        if (expandedIndex !== null) setExpandedIndex(null);
        else setFocusedIndex(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, focusedIndex, expandedIndex, totalCards]);

  const paginate = (dir) => {
    setSlideDirection(dir);
    setExpandedIndex((prev) => {
      if (prev === null) return null;
      let next = prev + dir;
      if (next < 0) next = totalCards - 1;
      if (next >= totalCards) next = 0;
      setFocusedIndex(next);
      return next;
    });
  };

  const expandedCert = expandedIndex !== null ? certifications[expandedIndex] : null;

  return (
    <section
      ref={sectionRef}
      className="py-32 relative min-h-screen overflow-hidden flex flex-col justify-center bg-bg-soft dark:bg-transparent"
      id="certifications"
    >
      {/* Dark mode background gradient */}
      <div className="absolute inset-0 hidden dark:block" style={{
        background: "linear-gradient(180deg, #1a0a10 0%, #2d1520 50%, #1a0a10 100%)",
      }} />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-16">
        <div className="text-center">
          {/* Label accent */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 mb-6"
          >
            <FiAward className="text-primary" size={14} />
            <span className="text-primary text-xs font-semibold tracking-wider uppercase">
              Certifications
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-themed tracking-tight mb-4"
          >
            <span className="gradient-text">Certifications</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-secondary-themed max-w-2xl mx-auto"
          >
            Professional achievements & milestones.{" "}
            {phase >= 2 && <span className="text-primary font-medium">Click a card to explore!</span>}
          </motion.p>
        </div>
      </div>

      {/* CARD AREA */}
      <div className="w-full overflow-hidden relative z-10">
        {isMobile ? (
          <div className="flex flex-col items-center px-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ y: 40, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setExpandedIndex(index)}
                className="w-full max-w-sm cursor-pointer"
              >
                <CertCard cert={cert} index={index} isFocused={false} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            className="flex justify-center items-center w-full relative"
            style={{ height: 560, perspective: "1200px" }}
          >
            {certifications.map((cert, index) => {
              const style = getCardStyle(index);
              const transition = getTransition(index);
              const isFocused = focusedIndex === index;

              return (
                <motion.div
                  key={cert.id}
                  className="absolute cursor-pointer"
                  style={{
                    width: CARD_WIDTH,
                    height: 385,
                    zIndex: isFocused ? 100 : index + 10,
                    left: "50%",
                    marginLeft: -(CARD_WIDTH / 2),
                    top: "50%",
                    marginTop: -192.5,
                  }}
                  animate={{
                    x: style.x,
                    y: style.y,
                    rotateZ: style.rotateZ,
                    scale: style.scale,
                    opacity: style.opacity,
                  }}
                  transition={transition}
                  onClick={() => handleCardClick(index)}
                  whileHover={phase >= 2 ? {
                    y: -8,
                    scale: (style.scale || 1) + 0.02,
                    transition: { type: "spring", stiffness: 120, damping: 14, mass: 0.8 },
                  } : {}}
                >
                  <CertCard cert={cert} index={index} isFocused={isFocused} />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation dots */}
      {!isMobile && phase >= 2 && (
        <div className="w-full flex justify-center mt-6 gap-2.5 relative z-20">
          {certifications.map((_, i) => (
            <button
              key={i}
              onClick={() => setFocusedIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                focusedIndex === i
                  ? "bg-primary scale-125 shadow-lg shadow-primary/40"
                  : "bg-primary/20 dark:bg-primary/30 hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* EXPANDED MODAL */}
      <AnimatePresence>
        {expandedIndex !== null && expandedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] flex justify-center items-center px-4 bg-black/50 dark:bg-black/70 backdrop-blur-md"
            onClick={() => setExpandedIndex(null)}
          >
            <div
              className="w-full max-w-3xl h-[70vh] max-h-[700px] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-bg dark:bg-dark-800 border border-border dark:border-primary/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative"
              >
                {/* Nav buttons */}
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 text-secondary-themed hover:text-primary p-3 transition-colors rounded-full hover:bg-primary/10"
                >
                  <FiChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 text-secondary-themed hover:text-primary p-3 transition-colors rounded-full hover:bg-primary/10"
                >
                  <FiChevronRight size={28} />
                </button>

                {/* Close button */}
                <button
                  onClick={() => setExpandedIndex(null)}
                  className="absolute top-5 right-5 z-50 w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-secondary-themed hover:text-primary transition-colors"
                >
                  <FiX size={20} />
                </button>

                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

                <AnimatePresence custom={slideDirection} mode="popLayout" initial={false}>
                  <motion.div
                    key={expandedIndex}
                    custom={slideDirection}
                    initial={(dir) => ({ x: (dir || 1) > 0 ? 300 : -300, opacity: 0 })}
                    animate={{ x: 0, opacity: 1 }}
                    exit={(dir) => ({ x: (dir || 1) < 0 ? 300 : -300, opacity: 0 })}
                    transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1.0 }}
                    className="w-full h-full p-4 md:p-8 flex flex-col justify-center items-center relative z-10"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={(e, { offset }) => {
                      if (offset.x < -60) paginate(1);
                      else if (offset.x > 60) paginate(-1);
                    }}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      {expandedCert.image ? (
                        <img
                          src={expandedCert.image}
                          alt={expandedCert.name}
                          className="max-w-full max-h-[calc(100%-80px)] object-contain rounded-xl shadow-2xl"
                        />
                      ) : (
                        <div className={`w-64 h-64 rounded-3xl flex items-center justify-center bg-gradient-to-br ${gradients[expandedIndex % gradients.length]} shadow-2xl`}>
                          <span className="text-7xl font-black text-white">{expandedCert.name.charAt(0)}</span>
                        </div>
                      )}
                      {/* Cert info */}
                      <div className="text-center mt-2">
                        <h3 className="text-lg font-bold text-themed">{expandedCert.name}</h3>
                        <p className="text-sm text-secondary-themed">{expandedCert.issuer} • {expandedCert.year}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ========== CARD COMPONENT ========== */
function CertCard({ cert, index, isFocused }) {
  return (
    <div
      className={`w-full h-full rounded-[24px] overflow-hidden group transition-all duration-300 relative
      ${isFocused 
        ? 'shadow-[0_10px_40px_-5px_rgba(251,111,146,0.4)] ring-[4px] ring-primary/40 ring-offset-4 ring-offset-bg dark:ring-offset-dark-900 scale-105' 
        : 'shadow-xl hover:shadow-[0_10px_30px_-5px_rgba(251,111,146,0.2)] hover:-translate-y-2'}
      bg-surface dark:bg-dark-700`}
      style={{ padding: "8px" }}
    >
      <div className="w-full h-full rounded-[16px] overflow-hidden relative bg-bg-soft dark:bg-dark-800">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br ${gradients[index % gradients.length]}`}>
            <span className="text-4xl font-black text-white opacity-40">{cert.name.charAt(0)}</span>
          </div>
        )}
        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-8">
          <p className="text-white text-sm font-semibold truncate">{cert.name}</p>
          <p className="text-white/70 text-xs">{cert.issuer}</p>
        </div>
      </div>
    </div>
  );
}
