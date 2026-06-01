"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import FloatingIdentityCard from "./FloatingIdentityCard";

function CountUp({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numTarget = parseInt(target);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = Math.max(1, Math.floor(numTarget / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= numTarget) {
        current = numTarget;
        clearInterval(interval);
      }
      setCount(current);
    }, 40);
    return () => clearInterval(interval);
  }, [isInView, numTarget]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      id="hero"
    >
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft silver orb — top left */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Cool gray orb — bottom right */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(161,161,170,0.06) 0%, transparent 70%)",
            bottom: "5%",
            right: "-5%",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Light zinc orb — center */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(244,244,245,0.04) 0%, transparent 70%)",
            top: "40%",
            right: "20%",
          }}
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Small floating shapes */}
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-primary/20 border border-primary/30"
          style={{ top: "15%", left: "15%" }}
          animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-accent/25 border border-accent/35"
          style={{ top: "65%", left: "10%" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-4 h-4 rounded-sm bg-primary/10 border border-primary/15 rotate-45"
          style={{ top: "25%", right: "12%" }}
          animate={{ y: [0, -10, 0], rotate: [45, 90, 45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full bg-accent/15"
          style={{ bottom: "20%", left: "30%" }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:pl-16 xl:pl-32"
          >
            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold gradient-text leading-[1.1] mb-4 tracking-tight"
            >
              Patresia Marshanda Siregar
            </motion.h1>

            {/* Description */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl lg:text-3xl text-secondary-themed font-medium"
            >
              IT Enthusiast
            </motion.h2>
          </motion.div>

          {/* Right: Floating Identity Card */}
          <div className="flex justify-center lg:justify-end">
            <FloatingIdentityCard />
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.a
          href="#about"
          onClick={(e) => handleScrollTo(e, "about")}
          className="flex flex-col items-center gap-1 text-secondary-themed hover:text-primary transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <FiChevronDown size={18} />
        </motion.a>
      </motion.div>
    </section>
  );
}
