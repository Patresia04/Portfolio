"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Project", href: "#projects" },
  { name: "Let's Talk", href: "#contact", cta: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for active section highlighting
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }, []);

  const isDark = theme === "dark";

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
        }}
        transition={{ 
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1] // Smooth ease-out
        }}
        className={`fixed top-4 md:top-5 left-0 right-0 mx-auto z-50 w-[90%] md:w-fit rounded-2xl md:rounded-full border transition-all duration-500 ${
          scrolled
            ? isDark 
              ? "bg-white/20 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-white/90 border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            : isDark
              ? "bg-white/10 border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
              : "bg-white/70 border-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
        }`}
        style={{ backdropFilter: "blur(32px) saturate(180%)", WebkitBackdropFilter: "blur(32px) saturate(180%)" }}
      >
        <div className="px-4 sm:px-5 md:px-2">
          <div className="flex items-center justify-center md:justify-center h-12 md:h-14 relative w-full">
            
            {/* Desktop Nav */}
            <motion.div 
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={() => setHoveredSection(null)}
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.2
                  }
                }
              }}
            >
              {navLinks.map((link) => {
                const isActive =
                  activeSection === link.href.replace("#", "");
                const isHovered = hoveredSection === link.name;
                
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    onMouseEnter={() => setHoveredSection(link.name)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-5 py-2 font-sora text-[13px] font-semibold tracking-wide rounded-full transition-colors duration-300 z-10 ${
                      isActive
                        ? isDark ? "text-white drop-shadow-md" : "text-black drop-shadow-sm"
                        : isHovered
                          ? isDark ? "text-white/90" : "text-black/80"
                          : "text-secondary-themed hover:text-themed opacity-80"
                    }`}
                  >
                    <span className="relative z-20 block">
                      {link.name}
                    </span>

                    {/* Active State Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavHighlight"
                        className="absolute inset-0 rounded-full -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        style={{
                          background: isDark
                            ? "linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)"
                            : "linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.03) 100%)",
                          boxShadow: isDark
                            ? "0 4px 12px rgba(255,255,255,0.15), inset 0 1px 1px rgba(255,255,255,0.4)"
                            : "0 2px 8px rgba(0,0,0,0.08), inset 0 1px 1px rgba(0,0,0,0.05)",
                          border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.08)",
                        }}
                      />
                    )}

                    {/* Hover State Background */}
                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute inset-0 rounded-full -z-20"
                          style={{
                            background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.03)",
                          }}/>
                      )}
                    </AnimatePresence>
                  </motion.a>
                );
              })}

              {/* Theme toggle */}
              <motion.button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-full text-secondary-themed hover:text-themed hover:bg-primary/10 transition-all duration-300"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Mobile controls */}
            <div className="flex items-center justify-between w-full md:hidden">
              <span className="text-sm font-semibold tracking-widest uppercase opacity-70">Menu</span>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 text-secondary-themed hover:text-themed transition-colors"
                  aria-label="Toggle theme"
                  whileTap={{ scale: 0.9 }}
                >
                  {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
                </motion.button>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 text-secondary-themed hover:text-themed transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 glass z-50 md:hidden"
            >
              <div className="flex flex-col pt-20 px-6">
                {navLinks.map((link, i) => {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`w-full text-left px-6 py-4 rounded-xl text-lg font-sora font-semibold tracking-wide transition-colors ${
                          activeSection === link.href.replace("#", "")
                            ? isDark 
                              ? "bg-white/10 text-white" 
                              : "bg-black/5 text-black"
                            : "text-secondary-themed hover:bg-bg-soft dark:hover:bg-dark-800"
                        }`}
                      >
                        {link.name}
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
