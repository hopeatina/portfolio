import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

interface ProjectLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export default function ProjectLayout({
  children,
  title,
  description,
}: ProjectLayoutProps) {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();
  const isDarkTheme = theme === "futuristic";

  return (
    <>
      <Head>
        <title>{title} | Projects | Emerging Hope</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <main
        className={`min-h-screen ${styles.starTwilightBg}`}
        style={{
          background: "var(--background)",
          color: "var(--text)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Navigation Bar with Back Button */}
        <nav
          className={`${styles.container} sticky top-0 z-50 py-4`}
          style={{
            background: isDarkTheme
              ? "rgba(10, 10, 10, 0.8)"
              : "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--icon-border)",
          }}
        >
          <Link
            href="/projects"
            className={`group inline-flex items-center transition-all duration-300 ${
              isDarkTheme ? "hover:scale-105" : "hover:translate-x-[-2px]"
            }`}
            style={{
              color: isDarkTheme ? "var(--primary)" : "var(--accent)",
            }}
          >
            <span
              className="mr-2 transform transition-transform group-hover:translate-x-[-2px]"
              style={{
                color: "inherit",
              }}
            >
              ←
            </span>
            <span className="relative font-medium">Back to Projects</span>
          </Link>
        </nav>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Orbs */}
          <div
            className="absolute inset-0"
            style={{
              background: isDarkTheme
                ? `
                  radial-gradient(circle at 20% 20%, rgba(0, 255, 102, 0.15) 0%, transparent 40%),
                  radial-gradient(circle at 80% 80%, rgba(123, 97, 255, 0.15) 0%, transparent 40%),
                  radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 60%)
                `
                : `
                  radial-gradient(circle at 20% 20%, var(--gradient-start) 0%, transparent 40%),
                  radial-gradient(circle at 80% 80%, var(--gradient-end) 0%, transparent 40%)
                `,
              opacity: isDarkTheme ? 0.8 : 0.15,
              mixBlendMode: "overlay",
              animation: "gradientShift 15s ease-in-out infinite",
            }}
          />

          {/* Decorative Patterns */}
          <div
            className={`absolute inset-0 ${styles.cosmicSwirlOverlay}`}
            style={{
              opacity: isDarkTheme ? 0.2 : 0.1,
              animation: "subtleFloat 20s ease-in-out infinite",
            }}
          />

          {/* Accent Lines */}
          {isDarkTheme && (
            <>
              <div
                className="absolute top-0 left-[5%] w-px h-full"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--primary) 0%, transparent 70%)",
                  opacity: 0.3,
                }}
              />
              <div
                className="absolute top-0 right-[5%] w-px h-full"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--primary) 0%, transparent 70%)",
                  opacity: 0.3,
                }}
              />
            </>
          )}
        </div>

        {/* Main Content Container */}
        <div className={`${styles.container} relative z-10`}>
          {/* Project Content */}
          <div
            className="relative mt-8 mb-16"
            style={{
              background: isDarkTheme
                ? "rgba(10, 10, 10, 0.75)"
                : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(12px)",
              borderRadius: "var(--border-radius-lg)",
              border: "1px solid var(--icon-border)",
              boxShadow: "var(--box-shadow-card)",
              overflow: "hidden",
            }}
          >
            {/* Decorative Top Border */}
            <div
              className="absolute inset-x-0 top-0 h-1 overflow-hidden rounded-t-[inherit]"
              style={{
                background: "var(--gradient-primary)",
                opacity: isDarkTheme ? 1 : 0.8,
              }}
            />

            {/* Content Wrapper */}
            <div className="p-8 md:p-12">{children}</div>

            {/* Bottom Pattern */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-32 ${styles.gentleWaveDivider}`}
              style={{
                opacity: 0.05,
                transform: "scaleY(0.5)",
              }}
            />
          </div>
        </div>

        {/* Theme-specific Decorative Elements */}
        {isDarkTheme && (
          <div
            className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent)",
              backdropFilter: "blur(20px)",
            }}
          />
        )}

        <style jsx global>{`
          @keyframes gradientShift {
            0%,
            100% {
              transform: rotate(0deg) scale(1);
            }
            50% {
              transform: rotate(1deg) scale(1.02);
            }
          }

          @keyframes subtleFloat {
            0%,
            100% {
              transform: translate(0, 0) rotate(0deg);
            }
            50% {
              transform: translate(10px, 10px) rotate(1deg);
            }
          }
        `}</style>
      </main>
    </>
  );
}
