import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

// ----------------------------------------------------------------------
// Physics Definitions per Theme
// ----------------------------------------------------------------------

const basePhysics = {
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -40, filter: "blur(10px)" },
  transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }, // Fluid, liquid ease
};

const cameroonianPhysics = {
  initial: { opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" },
  animate: { opacity: 1, clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)" },
  exit: { opacity: 0, clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)" },
  transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1] }, // Sharp, hard mask ease
};

const ricePhysics = {
  initial: { opacity: 0, scale: 0.98, x: -20 },
  animate: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 1.02, x: 20 },
  transition: { duration: 0.6, ease: "circOut" }, // Precise, architectural
};

const futuristicPhysics = {
  initial: { opacity: 0, skewX: 10, x: -10 },
  animate: { opacity: 1, skewX: 0, x: 0 },
  exit: { opacity: 0, skewX: -10, x: 10 },
  transition: { type: "spring", stiffness: 200, damping: 10, mass: 1 }, // Glitchy, mechanical
};

// ----------------------------------------------------------------------
// Core Animated Container
// ----------------------------------------------------------------------

interface ThemeAnimatedProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  staggerChildren?: number;
  className?: string;
  viewport?: { once?: boolean; margin?: string; amount?: "some" | "all" | number };
}

export function ThemeAnimatedSection({
  children,
  delay = 0,
  staggerChildren,
  className = "",
  viewport = { once: true, margin: "-100px" },
  ...rest
}: ThemeAnimatedProps) {
  const { theme } = useTheme();

  let activePhysics;
  switch (theme) {
    case "cameroonian":
      activePhysics = cameroonianPhysics;
      break;
    case "rice":
      activePhysics = ricePhysics;
      break;
    case "futuristic":
      activePhysics = futuristicPhysics;
      break;
    case "base":
    default:
      activePhysics = basePhysics;
      break;
  }

  const variants = {
    hidden: activePhysics.initial,
    visible: {
      ...activePhysics.animate,
      transition: {
        ...activePhysics.transition,
        delay,
        staggerChildren,
      },
    },
    exit: activePhysics.exit,
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={viewport}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// Micro-interaction: Hover Physicality
// ----------------------------------------------------------------------

export function ThemeHoverElement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { theme } = useTheme();

  let whileHover;
  switch (theme) {
    case "cameroonian":
      whileHover = { scale: 0.98, rotate: -1 }; // Earthy press
      break;
    case "rice":
      whileHover = { x: 5, backgroundColor: "rgba(255, 215, 0, 0.1)" }; // Blueprint slide
      break;
    case "futuristic":
      whileHover = { skewX: -5, x: 2, filter: "drop-shadow(2px 0 0 rgba(0,255,255,1))" }; // Glitch
      break;
    case "base":
    default:
      whileHover = { scale: 1.02, y: -2 }; // Liquid float
      break;
  }

  return (
    <motion.div whileHover={whileHover} transition={{ duration: 0.2 }} className={className}>
      {children}
    </motion.div>
  );
}
