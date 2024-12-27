import React, { ReactNode } from "react";
import Head from "next/head";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

interface BlogLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  isPost?: boolean;
}

export default function BlogLayout({
  children,
  title,
  description,
  isPost = false,
}: BlogLayoutProps) {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();

  return (
    <>
      <Head>
        <title>{title} | Blog | Emerging Hope</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <main
        className={`min-h-screen ${styles.heroBackground}`}
        style={{
          background: "var(--background)",
          color: "var(--text)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient Orb Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              theme === "futuristic"
                ? "radial-gradient(circle at 30% 20%, rgba(0, 255, 102, 0.15) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(123, 97, 255, 0.15) 0%, transparent 60%)"
                : "radial-gradient(circle at 30% 20%, var(--gradient-start) 0%, transparent 60%), radial-gradient(circle at 70% 80%, var(--gradient-end) 0%, transparent 60%)",
            opacity: theme === "futuristic" ? 0.8 : 0.15,
            mixBlendMode: "overlay",
          }}
        />

        <div
          className={`${styles.container} py-8 md:py-12 relative`}
          style={{
            background:
              theme === "futuristic"
                ? "rgba(10, 10, 10, 0.85)"
                : "rgba(var(--background-rgb), 0.95)",
            backdropFilter: "blur(12px)",
            borderRadius: "var(--border-radius-lg)",
            border: "1px solid var(--icon-border)",
            boxShadow: "var(--box-shadow-card)",
          }}
        >
          {/* Decorative Top Border */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-lg overflow-hidden"
            style={{
              background: "var(--gradient-primary)",
              opacity: theme === "futuristic" ? 1 : 0.8,
            }}
          />

          <div className="relative z-10">{children}</div>
        </div>

        {/* Enhanced Background Pattern */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "var(--cosmic-swirl), var(--starry-pattern)",
            backgroundBlendMode: "overlay",
            opacity: theme === "futuristic" ? 0.2 : 0.1,
            animation: "subtleFloat 20s ease-in-out infinite",
          }}
        />

        {/* Theme-specific Accent Lines */}
        {theme === "futuristic" && (
          <>
            <div
              className="absolute top-0 left-[10%] w-px h-full"
              style={{
                background:
                  "linear-gradient(to bottom, var(--primary) 0%, transparent 70%)",
                opacity: 0.3,
              }}
            />
            <div
              className="absolute top-0 right-[10%] w-px h-full"
              style={{
                background:
                  "linear-gradient(to bottom, var(--primary) 0%, transparent 70%)",
                opacity: 0.3,
              }}
            />
          </>
        )}

        <style jsx global>{`
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
