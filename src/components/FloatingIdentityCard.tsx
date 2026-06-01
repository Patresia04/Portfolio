"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

// Repeating name pattern for background
function NamePattern() {
  const rows = 14;
  const name = "PATRESIA";
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-[0.07]">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="whitespace-nowrap font-heading font-extrabold tracking-[0.15em] text-white"
          style={{
            fontSize: "13px",
            lineHeight: "36px",
            transform: `translateX(${rowIdx % 2 === 0 ? "0px" : "-40px"}) rotate(-20deg)`,
            transformOrigin: "top left",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mr-6">{name}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function FloatingIdentityCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const swingAnimation = prefersReducedMotion
    ? {}
    : {
        rotate: [-2.5, 2.5, -2.5],
        x: [-8, 8, -8],
        y: [0, -10, 0],
      };

  const swingTransition = prefersReducedMotion
    ? {}
    : {
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
        x: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <motion.div
      className="relative flex flex-col items-center select-none"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      {/* === LANYARD STRAP === */}
      <div className="relative flex flex-col items-center z-10">
        {/* Strap - light mode */}
        <div
          className="w-[22px] sm:w-[26px] rounded-b-sm dark:hidden"
          style={{
            height: "70px",
            background: "linear-gradient(180deg, rgba(24,24,27,0.0) 0%, #18181b 30%)",
          }}
        />
        {/* Strap - dark mode */}
        <div
          className="w-[22px] sm:w-[26px] rounded-b-sm hidden dark:block"
          style={{
            height: "70px",
            background: "linear-gradient(180deg, rgba(228,228,231,0.0) 0%, #d4d4d8 30%)",
          }}
        />

        {/* Metal Ring */}
        <div className="relative -mt-[6px] z-20">
          <div
            className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] rounded-full border-[3px] border-zinc-400 dark:border-zinc-300"
            style={{
              background: "linear-gradient(145deg, #d4d4d8, #a1a1aa)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.5)",
            }}
          />
        </div>

        {/* Metal Clip */}
        <div className="relative -mt-[10px] z-30">
          <div
            className="w-[40px] h-[20px] sm:w-[46px] sm:h-[22px] rounded-b-lg"
            style={{
              background: "linear-gradient(180deg, #a1a1aa 0%, #71717a 100%)",
              boxShadow: "0 3px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
              borderLeft: "1px solid rgba(255,255,255,0.2)",
              borderRight: "1px solid rgba(0,0,0,0.15)",
              borderBottom: "1px solid rgba(0,0,0,0.2)",
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[28px] sm:w-[32px] h-[3px] bg-zinc-500 dark:bg-zinc-400 rounded-t-sm" />
          </div>
        </div>
      </div>

      {/* === CARD with SWING === */}
      <motion.div
        animate={swingAnimation}
        transition={swingTransition}
        style={{ transformOrigin: "top center" }}
        className="-mt-[3px]"
      >
        <motion.div
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            scale: isHovered ? 1.03 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-fit rounded-[20px] sm:rounded-[24px] overflow-hidden cursor-pointer transform-gpu will-change-transform"
          style={{
            perspective: "1000px",
            boxShadow: isHovered
              ? "0 30px 60px -15px rgba(0,0,0,0.5), 0 15px 30px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)"
              : "0 20px 40px -10px rgba(0,0,0,0.4), 0 10px 20px -8px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Card Background — Black gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(165deg, #1a1a1f 0%, #0d0d10 40%, #050507 100%)",
            }}
          />

          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Repeating Name Pattern Background */}
          <NamePattern />

          {/* Glass Reflection Sweep */}
          <div
            className="absolute inset-0 z-40 pointer-events-none"
            style={{
              background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.02) 55%, transparent 70%)",
              animation: "card-reflection-sweep 5s ease-in-out infinite",
            }}
          />

          {/* === CARD CONTENT: Photo Only === */}
          <div className="relative z-10 flex flex-col items-center justify-center p-5 sm:p-6">
            {/* Profile Photo — Large, centered */}
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden border-2 border-white/15"
                style={{
                  width: "240px",
                  height: "300px",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.08)",
                }}
              >
                <Image
                  src="/images/profile-patresia.jpg"
                  alt="Patresia Marshanda Siregar"
                  width={240}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{ imageOrientation: "from-image" }}
                  priority
                />
              </div>

              {/* Corner registration marks */}
              <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-white/25 rounded-tl-sm" />
              <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-white/25 rounded-tr-sm" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-white/25 rounded-bl-sm" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-white/25 rounded-br-sm" />
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[4px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
