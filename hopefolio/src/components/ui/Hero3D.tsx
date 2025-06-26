"use client";

import React, { Suspense, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

// Loading component with shimmer effect
const LoadingScene = () => (
  <div
    className="w-full h-screen relative overflow-hidden"
    style={{
      background: "var(--background)",
    }}
  >
    <div
      className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-primary/10 to-transparent"
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 2s infinite",
      }}
    />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-primary/20 animate-pulse" />
        <div className="h-8 w-64 mx-auto bg-primary/20 rounded animate-pulse mb-4" />
        <div className="h-4 w-48 mx-auto bg-primary/20 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

// Fallback content for when WebGL is not supported
const FallbackContent = () => {
  const { theme, themeProps } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-gradient-to-br"
      style={{
        background: bgIsDark
          ? "linear-gradient(to bottom right, var(--background), var(--primary-dark))"
          : "linear-gradient(to bottom right, var(--background), var(--primary-light))",
      }}
    >
      <div className="text-center px-4">
        <h1
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{
            color: bgIsDark ? "var(--text-on-dark)" : "var(--text)",
            textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          Hope Atina
          <br />
          <span className="text-3xl md:text-5xl">
            Building, Creating, & Rethinking Possibility
          </span>
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 opacity-90"
          style={{
            color: bgIsDark ? "var(--text-on-dark)" : "var(--text)",
          }}
        >
          Software Developer, Bioengineer, and Musician. Building innovative
          solutions at the intersection of technology, science, and creativity.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 group"
            style={{
              background: "var(--gradient-primary)",
              color: "white",
              boxShadow: "0 4px 12px rgba(var(--primary-rgb), 0.3)",
            }}
          >
            View Projects
            <svg
              className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 border-2"
            style={{
              borderColor: bgIsDark ? "rgba(255,255,255,0.3)" : "var(--border)",
              color: bgIsDark ? "white" : "var(--text)",
            }}
          >
            About Me
          </Link>
        </div>
      </div>
    </div>
  );
};

const ConnectorScene = dynamic(() => import("./ConnectorScene"), {
  ssr: false,
  loading: () => <LoadingScene />,
});

const Hero3D: React.FC = () => {
  const { themeProps } = useTheme();
  const headingFont =
    themeProps.typography.headingFont || "'Orbitron', sans-serif";
  const bodyFont =
    themeProps.typography.bodyFont || "'Titillium Web', sans-serif";

  // Scroll to next section functionality
  const scrollToNextSection = useCallback(() => {
    const nextSection = document.querySelector("main section:nth-child(2)");
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      // Fallback: scroll to the height of the viewport
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Suspense fallback={<LoadingScene />}>
        <div className="absolute inset-0">
          <ConnectorScene />
        </div>
      </Suspense>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10"
      >
        {/* Main content container with improved spacing and hierarchy */}
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Eyebrow text - establishes context */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base font-medium tracking-wider uppercase mb-4 text-white/80"
            style={{
              fontFamily: bodyFont,
              letterSpacing: "var(--letter-spacing-wider)",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            Software Developer • Bioengineer • Musician
          </motion.p>

          {/* Primary heading with better scale progression */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
            style={{
              fontFamily: headingFont,
            }}
          >
            <span
              className="block text-6xl md:text-7xl lg:text-8xl font-bold text-white"
              style={{
                fontSize:
                  "clamp(var(--font-size-5xl), 10vw, var(--font-size-6xl))",
                lineHeight: "var(--line-height-none)",
                textShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.5), 0 8px 40px rgba(var(--primary-rgb), 0.3)",
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              Hope Atina
            </span>
          </motion.h1>

          {/* Tagline with visual separation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/95"
              style={{
                fontFamily: headingFont,
                fontSize:
                  "clamp(var(--font-size-2xl), 5vw, var(--font-size-4xl))",
                lineHeight: "var(--line-height-tight)",
                textShadow: "0 3px 12px rgba(0, 0, 0, 0.4)",
                background:
                  "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Building, Creating, & Rethinking Possibility
            </h2>
          </motion.div>

          {/* Description with improved readability */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto text-white/80"
            style={{
              fontFamily: bodyFont,
              lineHeight: "var(--line-height-relaxed)",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            Building innovative solutions at the intersection of technology,
            science, and creativity.
          </motion.p>

          {/* CTAs with improved visual prominence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA */}
            <Link
              href="/projects"
              className="group relative inline-flex items-center px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              style={{
                fontSize: "var(--font-size-lg)",
                fontFamily: bodyFont,
                background: "var(--gradient-primary)",
                color: "white",
                boxShadow:
                  "0 4px 20px rgba(var(--primary-rgb), 0.4), 0 8px 32px rgba(0, 0, 0, 0.2)",
              }}
            >
              <span className="relative z-10">View Projects</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/about"
              className="group relative inline-flex items-center px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              style={{
                fontSize: "var(--font-size-base)",
                fontFamily: bodyFont,
                border: "2px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <span className="relative z-10">Learn More About Me</span>
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Improved scroll indicator with functionality */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center">
          {/* Text label */}
          <motion.p
            className="text-white/70 text-xs md:text-sm mb-3 font-medium select-none"
            style={{
              fontFamily: bodyFont,
              letterSpacing: "var(--letter-spacing-wide)",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Scroll to explore
          </motion.p>

          {/* Clickable scroll button */}
          <motion.button
            onClick={scrollToNextSection}
            className="group relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to next section"
          >
            {/* Outer pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{
                width: "60px",
                height: "60px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Main button */}
            <motion.div
              className="relative w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "2px solid rgba(255, 255, 255, 0.25)",
                boxShadow:
                  "0 4px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                background: "rgba(255, 255, 255, 0.2)",
                borderColor: "rgba(255, 255, 255, 0.4)",
                boxShadow:
                  "0 6px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <FiChevronDown
                className="text-white transition-transform duration-300 group-hover:translate-y-1"
                size={20}
              />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero3D;
