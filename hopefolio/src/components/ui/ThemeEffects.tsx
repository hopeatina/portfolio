import React, { useEffect, useState } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function ThemeEffects() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Only track if we are in themes that need it
    if (theme !== "base" && theme !== "rice" && theme !== "cameroonian") return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [theme]);

  // 1. Emerging Hope (Base): The Sentient Aura
  if (theme === "base") {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--color-primary-light), transparent 40%)`,
          opacity: 0.08,
          mixBlendMode: "screen",
        }}
        aria-hidden="true"
      />
    );
  }

  // 2. Cultural Heritage (Cameroonian): The Woven Canvas
  if (theme === "cameroonian") {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-multiply dark:mix-blend-overlay dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          transform: `translateY(${scrollY * 0.15}px)`, // Parallax woven effect
        }}
        aria-hidden="true"
      />
    );
  }

  // 3. Academic Excellence (Rice): The Drafting Board
  if (theme === "rice") {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.3,
          maskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 60%)`,
          WebkitMaskImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 80%)`,
        }}
        aria-hidden="true"
      />
    );
  }

  // 4. Future Vision (Futuristic): The Terminal Node
  if (theme === "futuristic") {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-50 pointer-events-none"
        style={{
          background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))`,
          backgroundSize: "100% 4px, 6px 100%",
          mixBlendMode: "overlay",
          opacity: 0.8,
        }}
        aria-hidden="true"
      />
    );
  }

  return null;
}