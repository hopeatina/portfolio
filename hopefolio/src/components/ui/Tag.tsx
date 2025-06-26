"use client";

import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "muted";
  size?: "sm" | "md";
  href?: string;
  style?: React.CSSProperties;
}

export default function Tag({
  children,
  className = "",
  variant = "default",
  size = "sm",
  href,
  style,
}: TagProps) {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
  };

  const variantClasses = {
    default: "tag-default",
    outline: "tag-outline",
    muted: "tag-muted",
  };

  const TagComponent = href ? "a" : "span";
  const hrefProps = href ? { href } : {};

  return (
    <TagComponent
      {...hrefProps}
      className={`tag ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={style}
      data-theme={theme}
    >
      {children}
    </TagComponent>
  );
}
