"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onComplete }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Reuse site backgrounds so the loader blends seamlessly */}
      <div className="mesh-gradient" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Name */}
        <motion.h1
          className="
            font-heading font-bold text-center select-none
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
            text-[#09090b] dark:text-[#f4f4f5]
          "
          style={{ letterSpacing: "0.07em" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          Patresia Marshanda Siregar
        </motion.h1>

        {/* Vertical bars loader */}
        <motion.div
          className="flex items-end gap-[6px]"
          aria-label="Loading"
          role="status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="
                block w-[3px] rounded-full
                bg-[#18181b]/50 dark:bg-[#f4f4f5]/50
                loader-bar
              "
              style={{ animationDelay: `${i * 180}ms` }}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        .loader-bar {
          height: 10px;
          animation: verticalPulse 1.1s ease-in-out infinite;
        }

        @keyframes verticalPulse {
          0%, 100% {
            height: 10px;
            opacity: 0.3;
          }
          50% {
            height: 34px;
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-bar {
            animation: none;
            height: 24px;
            opacity: 0.5;
          }
        }
      `}</style>
    </motion.div>
  );
}