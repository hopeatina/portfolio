import React from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

const CTASection = () => {
  const { theme, getThemeStyles } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";

  return (
    <section
      className={`py-24 relative overflow-hidden ${styles.fadeUp}`}
      style={{
        background: isRiceTheme
          ? "var(--background)"
          : bgIsDark
          ? "var(--background)"
          : "var(--surface)",
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: bgIsDark
            ? `
              radial-gradient(circle at 20% 20%, rgba(var(--primary-rgb), 0.15) 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, rgba(var(--accent-rgb), 0.15) 0%, transparent 40%)
            `
            : "var(--gradient-surface)",
          opacity: isRiceTheme ? 0.05 : bgIsDark ? 1 : 0.5,
          mixBlendMode: "overlay",
        }}
      />

      {/* Content Container */}
      <div className={`${styles.container} relative z-10`}>
        <div
          className="max-w-4xl mx-auto text-center p-12 rounded-2xl relative"
          style={{
            background: isRiceTheme
              ? "rgba(255, 255, 255, 0.95)"
              : bgIsDark
              ? "rgba(10, 10, 10, 0.5)"
              : "var(--card-bg)",
            border: `1px solid ${
              isRiceTheme
                ? "rgba(var(--primary-rgb), 0.2)"
                : bgIsDark
                ? "rgba(var(--primary-rgb), 0.2)"
                : "var(--icon-border)"
            }`,
            boxShadow: isRiceTheme
              ? "0 4px 6px rgba(0, 32, 91, 0.1)"
              : "var(--box-shadow-card)",
          }}
        >
          {/* Decorative Top Border */}
          <div
            className="absolute -top-[1px] left-0 right-0 h-1 overflow-hidden"
            style={{
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
              background: "var(--gradient-primary)",
              opacity: isRiceTheme ? 0.8 : bgIsDark ? 1 : 0.8,
              transform: "translateY(1px)",
            }}
          />

          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              styles.headingH2
            } ${bgIsDark && !isRiceTheme ? styles.gradientText : ""}`}
            style={{
              color: isRiceTheme
                ? "var(--primary)"
                : bgIsDark
                ? "transparent"
                : "var(--text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-heading)",
              lineHeight: "var(--line-height-heading)",
              textShadow: isRiceTheme
                ? "0 2px 4px rgba(0, 32, 91, 0.1)"
                : "none",
            }}
          >
            Ready to Build Something Incredible?
          </h2>

          <p
            className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto ${styles.bodyLarge}`}
            style={{
              color: isRiceTheme
                ? "var(--text)"
                : bgIsDark
                ? "var(--text-on-dark)"
                : "var(--text)",
              fontFamily: "var(--font-body)",
              lineHeight: "var(--line-height-body)",
              opacity: 0.9,
            }}
          >
            I'm always open to discussing new projects, creative ideas, or
            opportunities to make a difference.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center group relative overflow-hidden rounded-full"
            style={{
              background: isRiceTheme
                ? "var(--primary)"
                : bgIsDark
                ? "rgba(var(--primary-rgb), 0.1)"
                : "var(--gradient-primary)",
              color: isRiceTheme || !bgIsDark ? "white" : "var(--primary)",
              padding: "1rem 3rem",
              border:
                bgIsDark && !isRiceTheme ? "1px solid var(--primary)" : "none",
              transition: "var(--transition-base)",
            }}
          >
            <span className="relative z-10 font-medium text-lg">
              Let's Talk
            </span>
            {bgIsDark && !isRiceTheme && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: "var(--gradient-primary)",
                  transition: "var(--transition-base)",
                }}
              />
            )}
            <span
              className="ml-2 transform transition-transform group-hover:translate-x-1"
              style={{
                color: isRiceTheme || !bgIsDark ? "white" : "var(--primary)",
              }}
            >
              →
            </span>
          </Link>

          {/* Corner Accents */}
          {(bgIsDark || isRiceTheme) && (
            <>
              <div
                className="absolute top-0 left-0 w-24 h-24"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary) 0%, transparent 100%)",
                  opacity: 0.1,
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-24 h-24"
                style={{
                  background:
                    "linear-gradient(-45deg, var(--primary) 0%, transparent 100%)",
                  opacity: 0.1,
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
