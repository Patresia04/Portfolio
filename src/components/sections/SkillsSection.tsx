"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { skills, keyboardLayout } from "@/data/skillsData";
import SkillKey from "@/components/skills/SkillKey";
import { useTheme } from "@/components/ThemeProvider";

/* ── Motion Variants for Scroll-Based Entrance ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 85,
      damping: 18,
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 85,
      damping: 18,
    },
  },
};

const keyboardVariants = {
  hidden: {
    scale: 0.4,
    y: 250,
    rotateX: 65,
    rotateY: 0,
    rotateZ: -25,
  },
  visible: {
    scale: 1,
    y: 0,
    rotateX: 42,
    rotateY: 0,
    rotateZ: -10,
    transition: {
      type: "spring" as const,
      stiffness: 30,
      damping: 15,
      mass: 1.5,
    },
  },
};

/* ── Main Component ───────────────────────────── */
export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });
  const [isAssembled, setIsAssembled] = useState(false);
  const [pressedKey, setPressedKey] = useState<number | null>(null);
  const [kbScale, setKbScale] = useState(1);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /* ── Staggered assembly delay timer ── */
  useEffect(() => {
    if (isInView) {
      setIsAssembled(false);
      const timer = setTimeout(() => {
        setIsAssembled(true);
      }, 1500); // 1.5s settles the entire keyboard entrance
      return () => clearTimeout(timer);
    } else {
      setIsAssembled(false);
    }
  }, [isInView]);

  /* ── Responsive scale ── */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1200) setKbScale(1);
      else if (w >= 900) setKbScale(0.8);
      else if (w >= 700) setKbScale(0.65);
      else setKbScale(0.48);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Typing interaction simulation ── */
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      setPressedKey(Math.floor(Math.random() * skills.length));
    };
    const up = () => {
      setTimeout(() => setPressedKey(null), 180);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  /* ── Soft, highly dampened mouse parallax ── */
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const sx = useSpring(mxRaw, { stiffness: 25, damping: 20 });
  const sy = useSpring(myRaw, { stiffness: 25, damping: 20 });

  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const sTiltX = useSpring(tiltXRaw, { stiffness: 25, damping: 20 });
  const sTiltY = useSpring(tiltYRaw, { stiffness: 25, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!boardRef.current) return;
      const rect = boardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      
      // Soft kinetic shifts
      mxRaw.set(dx * 12);
      myRaw.set(dy * 8);
      // Soft kinetic tilts
      tiltXRaw.set(-dy * 3);
      tiltYRaw.set(dx * 4);
    },
    [mxRaw, myRaw, tiltXRaw, tiltYRaw]
  );

  const handleMouseLeave = useCallback(() => {
    mxRaw.set(0);
    myRaw.set(0);
    tiltXRaw.set(0);
    tiltYRaw.set(0);
  }, [mxRaw, myRaw, tiltXRaw, tiltYRaw]);

  // Layout parameters
  const GAP = 26;
  const rowOffsets = [40, 0, 20, 0];

  return (
    <motion.section
      ref={sectionRef}
      id="skills"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      style={{
        background: "transparent",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* ── Theme-consistent Ambient Background Glow Orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft silver orb — top left */}
        <div
          style={{
            position: "absolute",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)",
            top: "-15%",
            left: "-10%",
            transition: "background 0.4s ease",
          }}
        />
        {/* Cool gray orb — bottom right */}
        <div
          style={{
            position: "absolute",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(161,161,170,0.02) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(113,113,122,0.03) 0%, transparent 70%)",
            bottom: "-10%",
            right: "-10%",
            transition: "background 0.4s ease",
          }}
        />
        {/* Central backdrop glow behind the keyboard */}
        <div
          style={{
            position: "absolute",
            width: "750px",
            height: "500px",
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 75%)"
              : "radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 75%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "background 0.4s ease",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* ═══ TITLE ═══ */}
        <motion.h2
          className="font-black text-center"
          variants={titleVariants}
          style={{
            fontSize: "clamp(54px, 6.5vw, 92px)",
            fontWeight: 900,
            letterSpacing: "0.08em",
            lineHeight: 1.1,
            background: isDark
              ? "linear-gradient(180deg, #FFFFFF 0%, #C0C0CB 40%, #7E7E91 100%)"
              : "linear-gradient(180deg, #0F172A 0%, #475569 50%, #64748B 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              filter: isDark
                ? "drop-shadow(1px 1px 0 #555) drop-shadow(2px 2px 0 #444) drop-shadow(3px 3px 0 #333) drop-shadow(4px 4px 6px rgba(0,0,0,0.8))"
                : "drop-shadow(1px 1px 0 #E2E8F0) drop-shadow(2px 2px 0 #CBD5E1) drop-shadow(3px 3px 6px rgba(0,0,0,0.15))",
            }}
          >
            SKILLS
          </span>
        </motion.h2>

        {/* Clean divider line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "4.5rem", opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            height: "2px",
            background: isDark
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)"
              : "linear-gradient(90deg, transparent, rgba(24,24,27,0.15), transparent)",
            marginBottom: 8,
          }}
        />

        {/* Subtitle */}
        <motion.p
          className="text-center font-medium"
          variants={subtitleVariants}
          style={{
            fontSize: 13,
            fontStyle: "italic",
            color: isDark ? "rgba(148,163,184,0.75)" : "rgba(71,85,105,0.8)",
            opacity: isDark ? 0.45 : 0.65,
            marginBottom: "3rem",
          }}
        >
          (hint: press a key)
        </motion.p>

        {/* ═══ 3D KEYBOARD SYSTEM ═══ */}
        <div
          ref={boardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: "1400px",
            perspectiveOrigin: "50% 35%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Level 1: Soft dampened parallax shift on cursor hover */}
          <motion.div
            style={{
              x: sx,
              y: sy,
              rotateX: sTiltX,
              rotateY: sTiltY,
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              variants={keyboardVariants}
              className="transform-gpu"
              style={{
                transformStyle: "preserve-3d",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: GAP,
                padding: "36px 40px",
                position: "relative",
                willChange: "transform",
              }}
            >


              <motion.div
                className="transform-gpu"
                style={{
                  transformStyle: "preserve-3d",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: GAP,
                  willChange: "transform",
                }}
                animate={isAssembled ? {
                  y: [0, -10, 0],
                  rotateX: [0, 1.5, 0],
                  rotateZ: [0, 0.8, 0],
                } : {
                  y: 0,
                  rotateX: 0,
                  rotateZ: 0,
                }}
                transition={{
                  y: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotateX: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotateZ: {
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Staggered Keyboard Rows */}
                {keyboardLayout.map((rowIndices, rowIdx) => (
                  <div
                    key={rowIdx}
                    style={{
                      display: "flex",
                      gap: GAP,
                      justifyContent: "center",
                      marginLeft: rowOffsets[rowIdx],
                      transformStyle: "preserve-3d",
                      zIndex: 1,
                    }}
                  >
                    {rowIndices.map((skillIdx, colIdx) => (
                      <SkillKey
                        key={skills[skillIdx].id}
                        data={skills[skillIdx]}
                        index={skillIdx}
                        row={rowIdx}
                        col={colIdx}
                        isVisible={true} // Unused now because variants are scroll-triggered
                        isPressed={pressedKey === skillIdx}
                      />
                    ))}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
