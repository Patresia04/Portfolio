"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import TabNavigation from "./TabNavigation";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import CertificateCard from "./CertificateCard";
import CertificatePreviewModal from "./CertificatePreviewModal";
import SkillsSection from "@/components/sections/SkillsSection";
import { projects } from "@/data/projects";
import { certifications } from "@/data/certifications";
import { useTheme } from "@/components/ThemeProvider";

/* ── Animation variants ────────────────────────── */
const headerVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: "5rem",
    opacity: 1,
    transition: { duration: 0.6, delay: 0.25, ease: "easeOut" },
  },
};

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Slide direction for tab transitions ───────── */
const tabContentVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Category gradients for project cards ──────── */
const categoryGradients = {
  Networking: ["#EC4899", "#A855F7"],
  "Web App": ["#8B5CF6", "#6366F1"],
  "IoT / Networking": ["#F472B6", "#EC4899"],
  "UI/UX Design": ["#FB7185", "#F472B6"],
  DevOps: ["#A855F7", "#7C3AED"],
};

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("projects");
  const [slideDirection, setSlideDirection] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [initialRows, setInitialRows] = useState(8);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Calculate how many items = 2 rows based on current breakpoint
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setInitialRows(8);       // xl: 4 cols × 2 rows
      else if (w >= 1024) setInitialRows(6);  // lg: 3 cols × 2 rows
      else if (w >= 640) setInitialRows(4);   // sm: 2 cols × 2 rows
      else setInitialRows(2);                  // mobile: 1 col × 2 rows
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const tabOrder = ["projects", "certificates", "techstack"];

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    const currentIdx = tabOrder.indexOf(activeTab);
    const nextIdx = tabOrder.indexOf(tab);
    setSlideDirection(nextIdx > currentIdx ? 1 : -1);
    setShowAllCerts(false);
    setActiveTab(tab);
  };

  return (
    <section
      id="portfolio"
      className="relative py-28 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Premium Dark Background ───────────────── */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          backgroundImage: isDark
            ? "linear-gradient(180deg, #050505 0%, #0a0a12 30%, #0d0815 50%, #0a0a12 70%, #050505 100%)"
            : "linear-gradient(180deg, #fafafa 0%, #f0f0f5 30%, #ece8f0 50%, #f0f0f5 70%, #fafafa 100%)",
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "10%",
            left: "-10%",
            backgroundImage: isDark
              ? "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "5%",
            right: "-8%",
            backgroundImage: isDark
              ? "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, -20, 0], y: [0, -25, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ──────────────────────── */}
        <div className="text-center mb-14">
          <motion.h2
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(135deg, #FFFFFF 0%, #F472B6 50%, #A855F7 100%)"
                : "linear-gradient(135deg, #09090b 0%, #EC4899 50%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Portfolio
          </motion.h2>

          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="h-1 rounded-full mx-auto mb-6"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #EC4899, #A855F7, #EC4899)",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          />

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed"
            style={{
              color: isDark ? "rgba(161,161,170,0.85)" : "rgba(82,82,91,0.9)",
            }}
          >
            A collection of selected projects, technical achievements, and
            development experience that demonstrate my skills in frontend
            development, software engineering, UI/UX design, networking, and
            IoT.
          </motion.p>
        </div>

        {/* ── Tab Navigation ─────────────────────── */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isDark={isDark}
        />

        {/* ── Tab Content ────────────────────────── */}
        <div className="mt-12">
          <AnimatePresence mode="wait" custom={slideDirection}>
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                custom={slideDirection}
                variants={tabContentVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
                  variants={gridVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {projects.map((project, index) => (
                    <motion.div key={project.id} variants={cardVariant}>
                      <ProjectCard
                        project={project}
                        index={index}
                        gradient={
                          categoryGradients[project.category] || [
                            "#EC4899",
                            "#A855F7",
                          ]
                        }
                        isDark={isDark}
                        onClick={() => setSelectedProject(project)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {activeTab === "certificates" && (
              <motion.div
                key="certificates"
                custom={slideDirection}
                variants={tabContentVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  variants={gridVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {(showAllCerts
                    ? certifications
                    : certifications.slice(0, initialRows)
                  ).map((cert) => (
                    <motion.div
                      key={cert.id}
                      variants={cardVariant}
                      layout
                    >
                      <CertificateCard
                        cert={cert}
                        isDark={isDark}
                        onClick={() => setSelectedCertIndex(
                          certifications.findIndex((c) => c.id === cert.id)
                        )}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Expand / Collapse button */}
                {certifications.length > initialRows && (
                  <motion.div
                    className="flex justify-center mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      onClick={() => setShowAllCerts(!showAllCerts)}
                      className="group flex flex-col items-center gap-2 transition-all duration-300"
                    >
                      <span
                        className="text-sm font-semibold tracking-wide"
                        style={{
                          color: isDark
                            ? "rgba(244,114,182,0.8)"
                            : "rgba(190,24,93,0.7)",
                        }}
                      >
                        {showAllCerts
                          ? "Show Less"
                          : `Show All (${certifications.length - initialRows} more)`}
                      </span>
                      <motion.div
                        animate={{ rotate: showAllCerts ? 180 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: isDark
                            ? "rgba(236,72,153,0.1)"
                            : "rgba(236,72,153,0.08)",
                          border: isDark
                            ? "1px solid rgba(236,72,153,0.2)"
                            : "1px solid rgba(236,72,153,0.15)",
                          boxShadow: isDark
                            ? "0 4px 20px rgba(236,72,153,0.1)"
                            : "0 2px 12px rgba(236,72,153,0.08)",
                          color: "#EC4899",
                        }}
                      >
                        <FiChevronDown size={20} />
                      </motion.div>
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "techstack" && (
              <motion.div
                key="techstack"
                custom={slideDirection}
                variants={tabContentVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <SkillsSection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Modals ────────────────────────────────── */}
      <ProjectDetailModal
        project={selectedProject}
        isDark={isDark}
        onClose={() => setSelectedProject(null)}
      />

      <CertificatePreviewModal
        certifications={certifications}
        currentIndex={selectedCertIndex}
        isDark={isDark}
        onClose={() => setSelectedCertIndex(null)}
        onNavigate={(idx) => setSelectedCertIndex(idx)}
      />
    </section>
  );
}
