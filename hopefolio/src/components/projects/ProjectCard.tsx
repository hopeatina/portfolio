import React, { ReactNode } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

interface ProjectCardProps {
  title?: string;
  children: ReactNode;
  variant?: "default" | "accent" | "secondary" | "highlight";
  className?: string;
  role?: string;
  ariaLabel?: string;
}

export default function ProjectCard({
  title,
  children,
  variant = "default",
  className = "",
  role,
  ariaLabel,
}: ProjectCardProps) {
  const { themeProps, theme } = useTheme();

  const getCardStyles = () => {
    const baseStyles = {
      padding: "1.5rem",
      borderRadius: themeProps.borderRadius,
      transition: themeProps.animation.transition,
      position: "relative" as const,
      overflow: "hidden" as const,
    };

    switch (variant) {
      case "accent":
        return {
          ...baseStyles,
          backgroundColor:
            theme === "futuristic"
              ? "rgba(0, 238, 92, 0.1)"
              : theme === "rice"
              ? "rgba(0, 32, 91, 0.05)"
              : theme === "cameroonian"
              ? "rgba(0, 150, 57, 0.1)"
              : "rgba(109, 40, 217, 0.05)",
          border: `1px solid ${themeProps.colors.primary}20`,
          color: themeProps.colors.text,
        };
      case "secondary":
        return {
          ...baseStyles,
          backgroundColor:
            theme === "futuristic"
              ? "rgba(51, 255, 153, 0.08)"
              : theme === "rice"
              ? "rgba(173, 199, 220, 0.15)"
              : theme === "cameroonian"
              ? "rgba(245, 233, 0, 0.1)"
              : "rgba(243, 232, 255, 0.8)",
          border: `1px solid ${themeProps.colors.secondary}30`,
          color: themeProps.colors.text,
        };
      case "highlight":
        return {
          ...baseStyles,
          backgroundColor:
            theme === "futuristic"
              ? "rgba(0, 255, 153, 0.12)"
              : theme === "rice"
              ? "rgba(77, 154, 212, 0.1)"
              : theme === "cameroonian"
              ? "rgba(199, 31, 2, 0.1)"
              : "rgba(251, 191, 36, 0.1)",
          border: `1px solid ${themeProps.colors.highlight}40`,
          color: themeProps.colors.text,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor:
            theme === "futuristic"
              ? "rgba(10, 10, 10, 0.6)"
              : theme === "base"
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(255, 255, 255, 0.95)",
          border: `1px solid ${themeProps.colors.primary}15`,
          color: themeProps.colors.text,
          backdropFilter: "blur(8px)",
        };
    }
  };

  const getTitleColor = () => {
    switch (variant) {
      case "accent":
        return themeProps.colors.primary;
      case "secondary":
        return themeProps.colors.accent;
      case "highlight":
        return themeProps.colors.highlight;
      default:
        return themeProps.colors.text;
    }
  };

  return (
    <div
      style={getCardStyles()}
      className={`group hover:scale-[1.01] focus-within:ring-2 focus-within:ring-opacity-50 ${className}`}
      role={role}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {title && (
        <h4
          className="font-semibold mb-3 text-lg"
          style={{
            color: getTitleColor(),
            fontFamily: themeProps.typography.headingFont,
            fontWeight: themeProps.typography.headingWeight,
          }}
        >
          {title}
        </h4>
      )}
      <div
        style={{
          color: themeProps.colors.text,
          fontFamily: themeProps.typography.bodyFont,
          lineHeight: themeProps.typography.lineHeight,
        }}
      >
        {children}
      </div>

      {/* Hover effect overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${themeProps.colors.primary}10 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
