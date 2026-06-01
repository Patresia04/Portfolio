"use client";

import { motion } from "framer-motion";

export default function CertificationCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative card rounded-2xl p-6 overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content */}
      <div className="relative z-10">
        {/* Year badge */}
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          {cert.year}
        </span>

        {/* Certificate name */}
        <h3 className="text-lg font-semibold text-themed mb-2 group-hover:text-primary transition-colors">
          {cert.name}
        </h3>

        {/* Issuer */}
        <p className="text-secondary-themed text-sm mb-3">{cert.issuer}</p>

        {/* Description (visible on hover) */}
        <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500">
          <p className="text-secondary-themed text-sm leading-relaxed pt-3 border-t border-themed opacity-70">
            {cert.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
