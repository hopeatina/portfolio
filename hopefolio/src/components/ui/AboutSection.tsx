import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

const AboutSection = () => {
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
          background: "var(--background-pattern)",
          opacity: isRiceTheme ? 0.05 : bgIsDark ? 0.15 : 0.1,
          mixBlendMode: "overlay",
        }}
      />

      {/* Content Container */}
      <div className={`${styles.container} relative z-10`}>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="relative">
            {/* Decorative Line */}
            <div
              className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
              style={{
                background: "var(--gradient-primary)",
                opacity: isRiceTheme ? 0.8 : bgIsDark ? 0.8 : 0.6,
              }}
            />

            <div className="space-y-6">
              <h2
                className={`text-4xl md:text-5xl font-bold ${
                  styles.headingH2
                } ${bgIsDark && !isRiceTheme ? styles.gradientText : ""}`}
                style={{
                  color: isRiceTheme
                    ? "var(--text)"
                    : theme === "cameroonian"
                    ? "var(--color-heading)"
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
                About Me
              </h2>

              <div className="space-y-4">
                <p
                  className={`text-lg md:text-xl ${styles.bodyLarge}`}
                  style={{
                    color: isRiceTheme
                      ? "var(--text)"
                      : theme === "cameroonian"
                      ? "var(--color-body)"
                      : bgIsDark
                      ? "var(--text-on-dark)"
                      : "var(--text)",
                    fontFamily: "var(--font-body)",
                    lineHeight: "var(--line-height-body)",
                    opacity: 0.9,
                  }}
                >
                  My journey began in Cameroon, where I learned the value of
                  community-driven solutions and resourceful innovation.
                </p>
                <p
                  className={`text-lg md:text-xl ${styles.bodyLarge}`}
                  style={{
                    color: isRiceTheme
                      ? "var(--text)"
                      : theme === "cameroonian"
                      ? "var(--color-body)"
                      : bgIsDark
                      ? "var(--text-on-dark)"
                      : "var(--text)",
                    fontFamily: "var(--font-body)",
                    lineHeight: "var(--line-height-body)",
                    opacity: 0.9,
                  }}
                >
                  At Rice University, I discovered the power of combining
                  technology with human-centered design to create meaningful
                  impact.
                </p>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center group relative overflow-hidden rounded-full"
                style={{
                  background: isRiceTheme
                    ? "var(--primary)"
                    : theme === "cameroonian"
                    ? "var(--button-primary-bg)"
                    : bgIsDark
                    ? "rgba(var(--primary-rgb), 0.1)"
                    : "var(--gradient-primary)",
                  color:
                    isRiceTheme || !bgIsDark
                      ? "var(--button-primary-text)"
                      : "var(--primary)",
                  padding: "0.75rem 2rem",
                  border:
                    bgIsDark && !isRiceTheme
                      ? "1px solid var(--button-secondary-border)"
                      : "none",
                  transition: "var(--transition-base)",
                }}
              >
                <span className="relative z-10 font-medium">Learn More</span>
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
                    color:
                      isRiceTheme || !bgIsDark ? "white" : "var(--primary)",
                  }}
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative group">
            {/* Image Container with Effects */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: isRiceTheme
                  ? "0 4px 6px rgba(0, 32, 91, 0.1)"
                  : "var(--box-shadow-card)",
              }}
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: isRiceTheme
                    ? "radial-gradient(circle at center, rgba(0, 32, 91, 0.2) 0%, transparent 70%)"
                    : bgIsDark
                    ? "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.2) 0%, transparent 70%)"
                    : "radial-gradient(circle at center, var(--gradient-start) 0%, transparent 70%)",
                  mixBlendMode: "overlay",
                }}
              />

              {/* Main Image */}
              <div className="relative aspect-square">
                <Image
                  src="/images/hope-profile.jpg"
                  alt="Hope Atina"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{
                    border: isRiceTheme
                      ? "1px solid rgba(0, 32, 91, 0.2)"
                      : bgIsDark
                      ? "1px solid rgba(var(--primary-rgb), 0.2)"
                      : "none",
                  }}
                />
              </div>

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: bgIsDark
                    ? "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 100%)"
                    : "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 100%)",
                }}
              />

              {/* Corner Accents */}
              {(bgIsDark || isRiceTheme) && (
                <>
                  <div
                    className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary) 0%, transparent 100%)",
                      opacity: 0.2,
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(-45deg, var(--primary) 0%, transparent 100%)",
                      opacity: 0.2,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
