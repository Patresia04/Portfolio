"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SocialLink } from "@/data/socialLinks";

interface SocialButtonProps {
  link: SocialLink;
}

export default function SocialButton({ link }: SocialButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const Icon = link.icon;

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Precise collapsed coordinates: mobile translates to -108px, desktop to -124px
  const collapsedX = isMobile ? -108 : -124;

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between h-[42px] sm:h-[46px] w-[150px] sm:w-[170px] rounded-r-[12px] text-white font-semibold pointer-events-auto select-none overflow-hidden transform-gpu will-change-transform"
      style={{
        background: link.bg,
      }}
      animate={{
        x: hovered ? 0 : collapsedX,
        scale: hovered ? 1.025 : 1.0,
        boxShadow: hovered
          ? `0 10px 28px ${link.glow}, 0 0 0 1.5px rgba(255,255,255,0.2)`
          : `0 4px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.05)`,
      }}
      transition={{
        type: "spring",
        stiffness: 110,  // Lower stiffness for smooth, gentler slide
        damping: 17,     // Butter-like damping to absorb any hard bounce
        mass: 0.85,
      }}
    >
      {/* Label (hidden in collapsed state, slides out on hover) */}
      <span className="pl-5 text-xs sm:text-sm uppercase tracking-wider font-heading truncate pr-2">
        {link.name}
      </span>

      {/* Icon Area (stays visible on the right edge) */}
      <div className="w-[42px] sm:w-[46px] h-full flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="transform-gpu" />
      </div>
    </motion.a>
  );
}
