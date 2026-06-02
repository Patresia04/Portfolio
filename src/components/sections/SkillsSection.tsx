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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /* ── Staggered assembly delay timer ── */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isInView) {
      timer = setTimeout(() => {
        setIsAssembled(true);
      }, 1500); // 1.5s settles the entire keyboard entrance
    } else {
      timer = setTimeout(() => setIsAssembled(false), 0);
    }
    return () => clearTimeout(timer);
  }, [isInView]);



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
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      style={{
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "2rem",
        paddingBottom: "4rem",
        position: "relative",
        overflow: "hidden",
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
          className="font-extrabold text-center"
          variants={titleVariants}
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            backgroundImage: isDark
              ? "linear-gradient(135deg, #FFFFFF 0%, #F472B6 50%, #A855F7 100%)"
              : "linear-gradient(135deg, #09090b 0%, #EC4899 50%, #8B5CF6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 8,
          }}
        >
        </motion.h2>

        {/* Clean divider line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "5rem", opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            height: "3px",
            borderRadius: "2px",
            backgroundImage: "linear-gradient(90deg, #EC4899, #A855F7, #EC4899)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s ease-in-out infinite",
            marginBottom: 12,
          }}
        />

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
