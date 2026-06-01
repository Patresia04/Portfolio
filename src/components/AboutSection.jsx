"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { FiDownload, FiCode, FiLayers, FiCpu, FiAward, FiBriefcase, FiFolder } from "react-icons/fi";

const stats = [
  { icon: FiFolder, value: "6+", label: "Projects", color: "#ffffff" },
  { icon: FiBriefcase, value: "2+", label: "Years Experience", color: "#d4d4d8" },
  { icon: FiAward, value: "16", label: "Certifications", color: "#a1a1aa" },
];

const highlights = [
  { icon: FiCode, text: "Front End Dev", desc: "React, Next.js, Tailwind" },
  { icon: FiLayers, text: "Quality Assurance", desc: "Testing & Automation" },
  { icon: FiCpu, text: "UI/UX Design", desc: "Figma & Prototyping" },
];

export default function AboutSection() {
  return (
    <section className="py-28 relative" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12">
            {/* Accent line */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                About Me
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
            </div>

            <p className="text-secondary-themed text-lg leading-relaxed">
              I am a passionate developer and designer dedicated to creating 
              seamless digital experiences. With a focus on <strong className="text-themed">Front End Development</strong>, 
              <strong className="text-themed"> Quality Assurance</strong>, and <strong className="text-themed">UI/UX Design</strong>, I combine 
              technical precision with creative problem-solving.
            </p>
          </div>
        </ScrollReveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Stats Row */}
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="bento-card flex items-center gap-4 group cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)`,
                    border: `1px solid ${stat.color}20`,
                  }}
                >
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-themed">{stat.value}</p>
                  <p className="text-secondary-themed text-sm">{stat.label}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}

          {/* Skill highlights - spans 2 columns */}
          <ScrollReveal delay={0.25} className="md:col-span-2">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bento-card h-full"
            >
              <h3 className="text-sm font-semibold text-primary mb-4 tracking-wider uppercase">
                Core Expertise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 dark:bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <item.icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-themed">{item.text}</p>
                      <p className="text-xs text-secondary-themed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Currently Learning + CTA */}
          <ScrollReveal delay={0.3}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bento-card h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-semibold text-primary mb-3 tracking-wider uppercase">
                  Currently Learning
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Docker", "Cloud", "DevOps", "CI/CD"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-lg bg-primary/5 dark:bg-primary/10 text-secondary-themed border border-primary/10 dark:border-primary/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="shimmer-btn inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
              >
                <FiDownload size={14} />
                Get In Touch
              </a>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
