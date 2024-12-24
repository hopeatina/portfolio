import React, { ReactNode } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/futuristic-theme.module.css";

interface AboutSectionProps {
  title: string;
  children: ReactNode;
  accent?: boolean;
}

export default function AboutSection({
  title,
  children,
  accent = false,
}: AboutSectionProps) {
  const { themeProps, theme } = useTheme();

  return (
    <section
      className={`${accent ? "py-12" : "py-8"} ${
        theme === "futuristic" ? styles.card : ""
      }`}
      style={{
        background: accent
          ? theme === "futuristic"
            ? "var(--card-bg)"
            : themeProps.colors.secondary
          : "transparent",
        borderRadius: accent ? themeProps.borderRadius : "none",
        boxShadow: accent
          ? theme === "futuristic"
            ? "var(--box-shadow-card)"
            : themeProps.boxShadow
          : "none",
        border:
          theme === "futuristic" && accent
            ? "1px solid var(--icon-border)"
            : "none",
      }}
    >
      <div
        className={`container max-w-4xl mx-auto px-6 ${
          theme === "futuristic" ? styles.fadeIn : ""
        }`}
      >
        <h2
          className={`text-3xl mb-6 ${
            theme === "futuristic" ? styles.gradientText : ""
          }`}
          style={{
            color:
              theme === "futuristic"
                ? "transparent"
                : themeProps.colors.primary,
            fontFamily: themeProps.typography.headingFont,
            fontWeight: themeProps.typography.headingWeight,
            letterSpacing: themeProps.typography.letterSpacing,
          }}
        >
          {title}
        </h2>

        <div
          className={theme === "futuristic" ? styles.body : ""}
          style={{
            color: themeProps.colors.text,
            fontFamily: themeProps.typography.bodyFont,
            lineHeight: themeProps.typography.lineHeight,
            opacity: theme === "futuristic" ? 0.85 : 1,
          }}
        >
          {children}
        </div>

        {theme === "futuristic" && accent && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "var(--cosmic-swirl)",
              opacity: 0.1,
              borderRadius: themeProps.borderRadius,
            }}
          />
        )}
      </div>
    </section>
  );
}
