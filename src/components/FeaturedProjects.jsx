"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import { FiExternalLink, FiStar } from "react-icons/fi";

const gradients = [
  "from-zinc-800 to-zinc-950",
  "from-neutral-800 to-zinc-900",
  "from-slate-800 to-slate-950",
  "from-zinc-900 to-black",
  "from-neutral-700 to-neutral-900",
  "from-slate-900 to-neutral-950",
];

export default function ProjectsSection() {
  return (
    <section className="py-28 relative dot-grid" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Projects"
          subtitle="A showcase of projects that demonstrate my technical capabilities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08}>
              <ProjectCard project={project} index={index} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group h-full card rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Top gradient bar */}
      <div className={`h-44 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }} />
        </div>

        {/* Project number */}
        <div className="absolute top-4 left-5">
          <span className="text-white/30 text-6xl font-black">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
              <FiStar size={10} />
              Featured
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: hovered ? 1 : 0.8, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold border border-white/20"
          >
            <FiExternalLink size={14} />
            View Details
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-themed mb-2.5 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-secondary-themed text-sm leading-relaxed mb-5 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs rounded-lg bg-primary/5 dark:bg-primary/10 text-secondary-themed border border-primary/10 dark:border-primary/15 group-hover:border-primary/25 transition-colors font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
