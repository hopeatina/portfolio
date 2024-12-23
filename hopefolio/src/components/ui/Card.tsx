import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import baseStyles from "@/styles/themes/base-theme.module.css";
import cameroonianStyles from "@/styles/themes/cameroonian-theme.module.css";
import riceStyles from "@/styles/themes/rice-theme.module.css";
import futuristicStyles from "@/styles/themes/futuristic-theme.module.css";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  gradient = false,
}: CardProps) {
  const { theme } = useTheme();

  // Get the current theme's styles
  const getThemeStyles = () => {
    switch (theme) {
      case "cameroonian":
        return cameroonianStyles;
      case "rice":
        return riceStyles;
      case "futuristic":
        return futuristicStyles;
      default:
        return baseStyles;
    }
  };

  const styles = getThemeStyles();

  return (
    <div
      className={`p-6 ${styles.theme} ${styles.transitionBase} ${
        hover ? styles.hoverScale : ""
      } ${className}`}
      style={{
        background: gradient ? "var(--gradient-primary)" : "var(--card-bg)",
        color: gradient ? "var(--background)" : "var(--text)",
        borderRadius: "var(--border-radius)",
        boxShadow: "var(--box-shadow)",
      }}
    >
      {children}
    </div>
  );
}
