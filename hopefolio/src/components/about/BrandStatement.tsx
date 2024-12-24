import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/futuristic-theme.module.css";

export default function BrandStatement() {
  const { themeProps, theme } = useTheme();

  return (
    <section
      className={`py-16 ${theme === "futuristic" ? styles.card : ""}`}
      style={{
        background:
          theme === "futuristic"
            ? "var(--card-bg)"
            : themeProps.colors.secondary,
        borderRadius: themeProps.borderRadius,
        boxShadow:
          theme === "futuristic"
            ? "var(--box-shadow-card)"
            : themeProps.boxShadow,
        border:
          theme === "futuristic" ? "1px solid var(--icon-border)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className={`container max-w-4xl mx-auto px-6 ${
          theme === "futuristic" ? styles.fadeIn : ""
        }`}
      >
        <h2
          className={`text-3xl mb-8 text-center ${
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
          Brand Statement
        </h2>

        <div
          className={`space-y-6 ${theme === "futuristic" ? styles.body : ""}`}
          style={{
            color: themeProps.colors.text,
            fontFamily: themeProps.typography.bodyFont,
            lineHeight: themeProps.typography.lineHeight,
            opacity: theme === "futuristic" ? 0.85 : 1,
          }}
        >
          <p>
            I am a Cameroonian-Houstonian-Rice engineer who believes in the
            power of technology to create hope. Through my work in software
            development, I bridge cultural perspectives to build solutions that
            matter.
          </p>

          <p>
            My unique journey—from Cameroon to Houston, from electrical
            engineering to software development—has taught me that innovation
            happens at the intersection of diverse experiences.
          </p>

          <p>
            I combine technical expertise with creative expression to build
            products that not only work well but resonate with users on a human
            level. Whether it's through code, music, or digital art, I'm always
            exploring new ways to make technology more accessible and
            meaningful.
          </p>
        </div>

        {theme === "futuristic" && (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "var(--cosmic-swirl)",
                opacity: 0.1,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--card-bg))",
                opacity: 0.5,
              }}
            />
          </>
        )}
      </div>
    </section>
  );
}
