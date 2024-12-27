"use client";

import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "muted";
  size?: "sm" | "md";
  href?: string;
  style?: React.CSSProperties;
}

type StyleVariant = {
  backgroundColor: string;
  color: string;
  border: string;
  borderColor?: string;
};

type StyleVariants = {
  [key in Required<TagProps>["variant"]]: StyleVariant;
};

export default function Tag({
  children,
  className = "",
  variant = "default",
  size = "sm",
  href,
  style,
}: TagProps) {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();

  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    transition: "var(--transition-base)",
    borderRadius: "9999px",
    padding: size === "sm" ? "0.25rem 0.75rem" : "0.5rem 1rem",
    fontSize: size === "sm" ? "0.875rem" : "1rem",
    lineHeight: "1.25",
  };

  const variantStyles: StyleVariants = {
    default: {
      backgroundColor: "var(--icon-bg)",
      color: "var(--text-on-light)",
      border: "1px solid var(--icon-border)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--text-on-light)",
      border: "1px solid var(--text-on-light)",
    },
    muted: {
      backgroundColor: "transparent",
      color: "var(--text-muted-on-light)",
      border: "1px solid var(--text-muted-on-light)",
    },
  };

  const hoverStyles: StyleVariants = {
    default: {
      backgroundColor: "var(--primary)",
      color: "var(--background)",
      border: "1px solid var(--primary)",
    },
    outline: {
      backgroundColor: "var(--text-on-light)",
      color: "var(--background)",
      border: "1px solid var(--text-on-light)",
    },
    muted: {
      backgroundColor: "var(--text-muted-on-light)",
      color: "var(--background)",
      border: "1px solid var(--text-muted-on-light)",
    },
  };

  const TagComponent = href ? "a" : "span";
  const hrefProps = href ? { href } : {};

  return (
    <TagComponent
      {...hrefProps}
      className={`${styles.tag} ${className}`}
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLElement;
        Object.entries(hoverStyles[variant]).forEach(([key, value]) => {
          target.style[key as any] = value;
        });
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLElement;
        Object.entries(variantStyles[variant]).forEach(([key, value]) => {
          target.style[key as any] = value;
        });
      }}
    >
      {children}
    </TagComponent>
  );
}
