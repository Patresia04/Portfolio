"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiFigma,
  SiGit,
  SiGithub,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiFirebase,
  SiVercel,
  SiVite,
  SiBootstrap,
} from "react-icons/si";
import {
  FaHtml5,
  FaCss3Alt,
  FaNetworkWired,
  FaHeadset,
  FaLaptopCode,
} from "react-icons/fa";

/* ─────────────────────────────────────────────
   Keyboard data — each key uses its brand colors
───────────────────────────────────────────── */
const keyboardRows = [
  // Row labels
  { label: "Frontend", keys: [
    { name: "HTML", icon: FaHtml5, color: "#E44D26", darkSide: "#C2411A" },
    { name: "CSS", icon: FaCss3Alt, color: "#264DE4", darkSide: "#1B3AA0" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", darkSide: "#D4BF00", iconColor: "#000" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", darkSide: "#24588A" },
    { name: "React", icon: SiReact, color: "#23272F", darkSide: "#1A1D23", iconColor: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#111111", darkSide: "#000000" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#0EA5E9", darkSide: "#0980B5" },
    { name: "Framer", icon: SiFramer, color: "#BB4BF6", darkSide: "#9333CA" },
  ]},
  { label: "Backend & Data", keys: [
    { name: "Node.js", icon: SiNodedotjs, color: "#339933", darkSide: "#267326" },
    { name: "PHP", icon: SiPhp, color: "#777BB4", darkSide: "#5B5F8C" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1", darkSide: "#335A78" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", darkSide: "#264E6E" },
    { name: "Firebase", icon: SiFirebase, color: "#FFA000", darkSide: "#CC8000" },
    { name: "Python", icon: SiPython, color: "#3776AB", darkSide: "#285882" },
    { name: "Git", icon: SiGit, color: "#F05032", darkSide: "#C73E25" },
    { name: "GitHub", icon: SiGithub, color: "#24292E", darkSide: "#161A1E" },
  ]},
  { label: "Tools & Others", keys: [
    { name: "VS Code", icon: FaLaptopCode, color: "#007ACC", darkSide: "#005EA0" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E", darkSide: "#C73E18" },
    { name: "Docker", icon: SiDocker, color: "#2496ED", darkSide: "#1A73BE" },
    { name: "Vite", icon: SiVite, color: "#646CFF", darkSide: "#4B52CC" },
    { name: "Vercel", icon: SiVercel, color: "#1A1A1A", darkSide: "#0A0A0A" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", darkSide: "#5B3D8A" },
    { name: "IT Support", icon: FaHeadset, color: "#EC4899", darkSide: "#CC3D71", wide: true },
    { name: "Networking", icon: FaNetworkWired, color: "#10B981", darkSide: "#0D9466" },
  ]},
];

const allKeys = keyboardRows.flatMap(r => r.keys);

/* Pre-compute scatter offsets deterministically to avoid hydration mismatch */
const pseudoRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return Number((x - Math.floor(x)).toFixed(4));
};

const scatterValues = allKeys.map((_, i) => ({
  x: Number(((pseudoRandom(i * 5 + 1) - 0.5) * 600).toFixed(2)),
  y: Number(((pseudoRandom(i * 5 + 2) - 0.5) * 400 - 200).toFixed(2)),
  rX: Number(((pseudoRandom(i * 5 + 3) - 0.5) * 60).toFixed(2)),
  rY: Number(((pseudoRandom(i * 5 + 4) - 0.5) * 60).toFixed(2)),
  rZ: Number(((pseudoRandom(i * 5 + 5) - 0.5) * 30).toFixed(2)),
}));

/* Adjust hex color brightness */
function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/* ─────────────────────────────────────────────
   3D Keycap Component
───────────────────────────────────────────── */
function Keycap({ data, index, isVisible }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const Icon = data.icon;
  const isWide = data.wide;
  const scatter = scatterValues[index];
  const iColor = data.iconColor || "#fff";

  const keyW = isWide ? 140 : 88;
  const keyH = 88;
  const depth = 22;

  return (
    <motion.div
      className="relative"
      style={{
        width: keyW,
        height: keyH + depth,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      initial={{
        opacity: 0,
        x: scatter.x,
        y: scatter.y,
        rotateX: scatter.rX,
        rotateY: scatter.rY,
        rotateZ: scatter.rZ,
        scale: 0.3,
      }}
      animate={
        isVisible
          ? { opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1 }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
        animate={{ y: pressed ? 14 : hovered ? 4 : 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {/* TOP FACE */}
        <div
          style={{
            position: "absolute",
            width: keyW,
            height: keyH,
            borderRadius: 14,
            background: `linear-gradient(145deg, ${data.color}, ${adjustBrightness(data.color, -15)})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transform: `translateZ(${depth}px)`,
            boxShadow: pressed
              ? `inset 0 4px 8px rgba(0,0,0,0.3)`
              : hovered
                ? `0 0 35px ${data.color}60, 0 8px 15px rgba(0,0,0,0.25)`
                : `0 8px 12px rgba(0,0,0,0.35)`,
            transition: "box-shadow 0.2s ease",
            zIndex: 2,
          }}
        >
          <Icon
            size={isWide ? 26 : 24}
            style={{
              color: iColor,
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
            }}
          />
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: iColor,
              opacity: 0.9,
            }}
          >
            {data.name}
          </span>
        </div>

        {/* FRONT FACE (depth) */}
        <div
          style={{
            position: "absolute",
            width: keyW,
            height: depth,
            bottom: 0,
            left: 0,
            background: data.darkSide,
            borderRadius: "0 0 14px 14px",
            transform: `rotateX(-90deg) translateZ(${keyH - depth}px)`,
            transformOrigin: "bottom",
          }}
        />

        {/* LEFT FACE */}
        <div
          style={{
            position: "absolute",
            width: depth,
            height: keyH,
            top: 0,
            left: 0,
            background: adjustBrightness(data.darkSide, -12),
            borderRadius: "14px 0 0 14px",
            transform: "rotateY(90deg) translateZ(0px)",
            transformOrigin: "left",
          }}
        />

        {/* RIGHT FACE */}
        <div
          style={{
            position: "absolute",
            width: depth,
            height: keyH,
            top: 0,
            right: 0,
            background: adjustBrightness(data.darkSide, -8),
            borderRadius: "0 14px 14px 0",
            transform: "rotateY(-90deg) translateZ(0px)",
            transformOrigin: "right",
          }}
        />
      </motion.div>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: -28,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "4px 10px",
              borderRadius: 8,
              background: data.color,
              color: iColor,
              fontSize: 11,
              fontWeight: 700,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 30,
              boxShadow: `0 4px 12px ${data.color}50`,
            }}
          >
            {data.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function SkillConstellation() {
  const sectionRef = useRef(null);
  const boardRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px -10% 0px" });
  const [isMobile, setIsMobile] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile || !boardRef.current) return;
      const rect = boardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({
        x: Math.max(-8, Math.min(8, -dy * 8)),
        y: Math.max(-8, Math.min(8, dx * 8)),
      });
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  const rowOffsets = [0, 48, 24];

  return (
    <section
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      id="skills"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient for dark mode */}
      <div className="absolute inset-0 hidden dark:block" style={{
        background: "linear-gradient(180deg, #030014 0%, #0A0A2E 50%, #030014 100%)",
      }} />

      {/* Ambient glow behind keyboard */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Skills & Tech Stack"
          subtitle="Technologies and tools I use to build modern web experiences."
        />

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2, duration: 0.5 }}
          className="text-center text-secondary-themed"
          style={{ fontSize: 13, marginTop: -8, marginBottom: 24, fontStyle: "italic" }}
        >
          (hint) press a key
        </motion.p>

        {!isMobile ? (
          /* Desktop: 3D Keyboard with row labels */
          <div className="flex justify-center mt-8">
            <div ref={boardRef} style={{ perspective: "1000px" }}>
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "30px 36px 40px",
                }}
                animate={{
                  rotateX: 28 + tilt.x,
                  rotateY: tilt.y,
                }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                }}
              >
                {keyboardRows.map((row, rowIdx) => {
                  const rowKeys = row.keys;
                  const startIdx = keyboardRows.slice(0, rowIdx).reduce((sum, r) => sum + r.keys.length, 0);

                  return (
                    <div key={rowIdx}>
                      {/* Row label */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 0.5 } : {}}
                        transition={{ delay: 1.5 + rowIdx * 0.2 }}
                        className="text-xs text-secondary-themed font-semibold tracking-wider uppercase mb-2 text-center"
                        style={{ transform: "translateZ(10px)" }}
                      >
                        {row.label}
                      </motion.p>
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          justifyContent: "center",
                          marginLeft: rowOffsets[rowIdx],
                        }}
                      >
                        {rowKeys.map((keyData, colIdx) => (
                          <Keycap
                            key={keyData.name}
                            data={keyData}
                            index={startIdx + colIdx}
                            isVisible={isInView}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        ) : (
          /* Mobile: Responsive grid */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              marginTop: 24,
              padding: "0 8px",
            }}
          >
            {allKeys.map((data, idx) => {
              const Icon = data.icon;
              const iColor = data.iconColor || "#fff";
              
              return (
                <motion.div
                  key={data.name}
                  style={{
                    height: 76,
                    borderRadius: 14,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    background: `linear-gradient(145deg, ${data.color}, ${adjustBrightness(data.color, -10)})`,
                    border: `1px solid ${data.color}`,
                    boxShadow: `0 4px 0 ${data.darkSide}, 0 6px 14px rgba(0,0,0,0.15)`,
                  }}
                  initial={{ opacity: 0, y: 30, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Icon
                    size={22}
                    style={{
                      color: iColor,
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: iColor,
                    }}
                  >
                    {data.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
