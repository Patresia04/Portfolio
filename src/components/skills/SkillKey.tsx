"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SkillData } from "@/data/skillsData";
import { useTheme } from "@/components/ThemeProvider";

/* ── Color utility ─────────────────────────────── */
function adjustBrightness(hex: string, amount: number): string {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split("").map((char) => char + char).join("");
  }
  const num = parseInt(cleanHex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/* ── Constants ─────────────────────────────────── */
const KEY_SIZE = 100;
const RADIUS_OUTER = 20;
const RADIUS_INNER = 16;

// Vertical Z-axis kinetic bounds
const REST_Z = 6;
const HOVER_Z = 16;
const PRESS_Z = -3;

// Tuned for a soft, responsive, highly premium mechanical keyboard switch feel
const springConfig = {
  type: "spring" as const,
  stiffness: 250,
  damping: 20,
  mass: 0.8,
};


/* ── Component ─────────────────────────────────── */
interface SkillKeyProps {
  data: SkillData;
  index: number;
  row: number;
  col: number;
  isVisible: boolean;
  isPressed: boolean;
}

export default function SkillKey({
  data,
  isPressed: externalPressed,
}: SkillKeyProps) {
  const [hovered, setHovered] = useState(false);
  const [localPressed, setLocalPressed] = useState(false);
  const pressed = externalPressed || localPressed;

  useTheme();

  const Icon = data.icon;
  const iColor = data.iconColor || "#fff";
  const topLight = adjustBrightness(data.color, 30);
  const topDark = adjustBrightness(data.color, -16);

  /* ── Deep 18-slice stacked tapered 3D body depth ── */
  const NUM_LAYERS = 18;
  const LAYER_GAP = 1.6; // total body depth: 28.8px
  
  const sideLayers = Array.from({ length: NUM_LAYERS }).map((_, i) => {
    const factor = i / (NUM_LAYERS - 1);
    
    // keycap tapers as it rises
    const layerScale = 1 - factor * 0.08;
    
    // Deep progressive color shading for high-contrast volumetric sides
    const layerColor = adjustBrightness(data.sideColor, factor * 50 - 25);
    
    return {
      z: i * LAYER_GAP,
      scale: layerScale,
      color: layerColor,
    };
  });

  /* ── Computed kinetic properties ── */
  const plungerZ = pressed ? PRESS_Z : hovered ? HOVER_Z : REST_Z;
  const plungerScale = pressed ? 0.96 : hovered ? 1.04 : 1.0;
  
  // Tactical 3D plunger tilt (roll and pitch) on hover
  const plungerRotateX = pressed ? 0 : hovered ? -3.5 : 0;
  const plungerRotateY = pressed ? 0 : hovered ? 2.5 : 0;

  // Refined dynamic glow shadow that grows deeper on hover, compresses on press

  return (
    <div
      className="skill-key"
      style={{
        width: KEY_SIZE,
        height: KEY_SIZE,
        position: "relative",
        transformStyle: "preserve-3d",
        cursor: "pointer",
        userSelect: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setLocalPressed(false);
      }}
      onMouseDown={() => setLocalPressed(true)}
      onMouseUp={() => setLocalPressed(false)}
    >





      {/* Main plunger (travels along Z-axis) */}
      <motion.div
        className="keycap-plunger"
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        animate={{
          z: plungerZ,
          scale: plungerScale,
          rotateX: plungerRotateX,
          rotateY: plungerRotateY,
        }}
        transition={springConfig}
      >
        {/* Extruded tapered side walls */}
        {sideLayers.map((layer, i) => (
          <div
            key={i}
            className="key-body-slice"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: RADIUS_OUTER,
              background: layer.color,
              border: `1.5px solid ${adjustBrightness(layer.color, 16)}`,
              borderBottom: `2.2px solid ${adjustBrightness(layer.color, -26)}`,
              transform: `translateZ(${layer.z}px) scale(${layer.scale})`,
              transformStyle: "preserve-3d",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Tapered curved top face cap */}
        <div
          className="key-top"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: RADIUS_OUTER,
            transformStyle: "preserve-3d",
            transform: `translateZ(${(NUM_LAYERS - 1) * LAYER_GAP + 0.2}px) scale(0.92)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            background: `linear-gradient(135deg, ${topLight} 0%, ${data.color} 50%, ${topDark} 100%)`,
            border: `1.5px solid ${adjustBrightness(data.color, 32)}`,
            borderBottom: `2px solid ${adjustBrightness(data.color, -20)}`,
            boxShadow: "inset 0 2.5px 5px rgba(255,255,255,0.25), inset 0 -2.5px 5px rgba(0,0,0,0.45), 0 1.5px 3px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          {/* Subtle gloss overlay strip */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "45%",
              borderRadius: `${RADIUS_INNER}px ${RADIUS_INNER}px 0 0`,
              background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.01) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Icon */}
          <div
            style={{
              color: iColor,
              filter: hovered
                ? `drop-shadow(0 0 6px ${data.glowColor})`
                : "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={25} />
          </div>

          {/* Label */}
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: iColor,
              opacity: hovered ? 1.0 : 0.85,
              position: "relative",
              zIndex: 1,
              textShadow: hovered
                ? `0 0 6px ${data.glowColor}, 0 1px 2px rgba(0,0,0,0.4)`
                : "0 1px 2px rgba(0,0,0,0.4)",
              lineHeight: 1,
              transition: "opacity 0.2s, text-shadow 0.2s",
            }}
          >
            {data.label}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
