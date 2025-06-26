"use client";

import React, { Suspense } from "react";
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

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Suspense fallback={<LoadingScene />}>
        <div className="absolute inset-0">
          <ConnectorScene />
        </div>
      </Suspense>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10"
      >
        <div
          className="backdrop-blur-sm bg-black/5 p-8 rounded-2xl max-w-4xl mx-auto"
          style={{
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            style={{
              fontFamily: headingFont,
              textShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            }}
          >
            Hope Atina
            <br />
            <span className="text-3xl md:text-5xl">
              Building, Creating, & Rethinking Possibility
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl mb-8 text-white/90"
            style={{
              fontFamily: bodyFont,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            Software Developer, Bioengineer, and Musician. Building innovative
            solutions at the intersection of technology, science, and
            creativity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 group"
              style={{
                background: "var(--gradient-primary)",
                color: "white",
                fontFamily: bodyFont,
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
              className="inline-flex items-center px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 border-2 border-white/30 backdrop-blur-sm"
              style={{
                color: "white",
                fontFamily: bodyFont,
              }}
            >
              About Me
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 inset-x-0 mx-auto z-20 flex flex-col items-center justify-center"
      >
        <p
          className="text-white/70 text-sm mb-2"
          style={{
            fontFamily: bodyFont,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Scroll to explore
        </p>
        <div className="animate-bounce">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)",
            }}
          >
            <FiChevronDown
              className="text-white"
              size={24}
              style={{ filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))" }}
            />
          </div>
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
