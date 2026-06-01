"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import {
  FiBriefcase,
  FiUsers,
  FiBookOpen,
  FiTool,
} from "react-icons/fi";

const typeIcons = {
  Internship: FiBriefcase,
  Organization: FiUsers,
  "Teaching Assistant": FiBookOpen,
  Freelance: FiTool,
};

const typeColors = {
  Internship: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", glow: "var(--color-accent-glow)" },
  Organization: { bg: "bg-accent/15", text: "text-accent", border: "border-accent/20", glow: "rgba(161,161,170,0.15)" },
  "Teaching Assistant": { bg: "bg-zinc-500/10 dark:bg-zinc-400/10", text: "text-zinc-600 dark:text-zinc-300", border: "border-zinc-500/20", glow: "rgba(113,113,122,0.15)" },
  Freelance: { bg: "bg-zinc-600/10 dark:bg-zinc-500/10", text: "text-zinc-700 dark:text-zinc-400", border: "border-zinc-600/20", glow: "rgba(82,82,91,0.15)" },
};

export default function ExperienceTimeline() {
  return (
    <section className="py-28 relative" id="experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey and the roles that shaped my skills."
        />

        <div className="relative w-full lg:max-w-6xl mx-auto">
          {/* Timeline center line with gradient */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-[1px]">
            <div className="w-full h-full timeline-line rounded-full" />
          </div>

          {experiences.map((exp, index) => {
            const Icon = typeIcons[exp.type] || FiBriefcase;
            const colors = typeColors[exp.type] || typeColors.Internship;
            const isLeft = index % 2 === 0;

            return (
              <ScrollReveal
                key={exp.id}
                direction={isLeft ? "right" : "left"}
                delay={index * 0.1}
              >
                <div
                  className={`relative flex items-start mb-14 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot with pulse ring */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="relative"
                    >
                      {/* Pulse ring */}
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-20"
                        style={{ animationDuration: "3s", background: colors.glow }}
                      />
                      <div
                        className={`w-10 h-10 rounded-full bg-bg dark:bg-dark-900 border-2 border-primary flex items-center justify-center shadow-lg`}
                        style={{ boxShadow: `0 0 20px ${colors.glow}` }}
                      >
                        <Icon size={16} className="text-primary" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isLeft ? "md:pr-8 md:text-right" : "md:pl-8"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      className="group card rounded-2xl p-6"
                    >
                      {/* Header: Logo + Role + Org */}
                      <div className={`flex items-center gap-4 mb-5 ${isLeft ? "md:flex-row-reverse" : "flex-row"}`}>
                        {/* Logo Container */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-black/5 dark:border-transparent flex items-center justify-center p-1.5 shadow-sm overflow-hidden">
                          {exp.logo ? (
                            <img src={exp.logo} alt={exp.organization} className="w-full h-full object-contain" />
                          ) : (
                            <Icon size={20} className="text-primary opacity-60" />
                          )}
                        </div>

                        {/* Title & Org */}
                        <div className={`flex flex-col ${isLeft ? "md:text-right" : "text-left"}`}>
                          <h3 className="text-lg font-bold text-themed group-hover:text-primary transition-colors leading-tight mb-1">
                            {exp.role}
                          </h3>
                          <p className="text-secondary-themed text-sm font-medium">
                            {exp.organization}
                          </p>
                          <p className="text-secondary-themed text-xs opacity-60 mt-0.5">
                            {exp.duration}
                          </p>
                        </div>
                      </div>

                      {/* Achievements */}
                      <ul
                        className={`space-y-2.5 ${
                          isLeft ? "md:text-right" : ""
                        }`}
                      >
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: isLeft ? 10 : -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.08 }}
                            className={`text-secondary-themed text-sm flex items-start gap-2 text-justify`}
                          >
                            <span className="text-primary mt-1 flex-shrink-0 text-[10px]">
                              ●
                            </span>
                            <span className="leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
