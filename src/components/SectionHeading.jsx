"use client";

import { motion } from "framer-motion";

export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="text-center mb-16">

      {/* Main heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold text-themed mb-4"
      >
        {title.split(" ").map((word, i) => (
          <span key={i}>
            {i === 0 ? (
              <span className="gradient-text">{word}</span>
            ) : (
              <span> {word}</span>
            )}
          </span>
        ))}
      </motion.h2>

      {/* Animated underline */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "5rem", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="h-1 rounded-full mx-auto mb-5"
        style={{
          background: "linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-primary))",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-secondary-themed max-w-2xl mx-auto text-base md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
