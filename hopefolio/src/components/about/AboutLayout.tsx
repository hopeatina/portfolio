import React, { ReactNode, CSSProperties } from "react";
import Head from "next/head";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/futuristic-theme.module.css";

interface AboutLayoutProps {
  children: ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  const { themeProps, theme } = useTheme();

  const getBackgroundStyles = (): CSSProperties => {
    switch (theme) {
      case "futuristic":
        return {
          background: "var(--background)",
          backgroundImage: `
            linear-gradient(0deg, rgba(0, 255, 102, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 102, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(0, 255, 102, 0.05) 0%, transparent 70%)
          `,
          backgroundSize: "20px 20px, 20px 20px, 100% 100%",
          position: "relative" as const,
        };
      case "cameroonian":
        return {
          background: "var(--background)",
          backgroundImage: themeProps.patterns.backgroundPattern,
          backgroundSize: "60px 60px, 40px 40px, 40px 40px",
          backgroundBlendMode: "overlay",
        };
      case "rice":
        return {
          background: "var(--background)",
          backgroundImage: themeProps.patterns.backgroundPattern,
          backgroundSize: "cover, 30px 30px, 30px 30px",
        };
      default:
        return {
          background: "var(--background)",
          backgroundImage: themeProps.patterns.backgroundPattern,
          backgroundSize: "20px 20px, 20px 20px, 100% 100%",
        };
    }
  };

  return (
    <>
      <Head>
        <title>About | Emerging Hope</title>
        <meta
          name="description"
          content="Learn about my journey as a Cameroonian-Houstonian-Rice engineer and creative"
        />
      </Head>

      <main className="min-h-screen py-12 mt-24" style={getBackgroundStyles()}>
        <div
          className={`max-w-4xl mx-auto px-4 ${
            theme === "futuristic" ? styles.fadeIn : ""
          }`}
        >
          <h1
            className={`text-4xl mb-8 text-center ${
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
              background:
                theme === "futuristic" ? "var(--gradient-primary)" : "none",
              WebkitBackgroundClip: theme === "futuristic" ? "text" : "none",
              WebkitTextFillColor:
                theme === "futuristic" ? "transparent" : "inherit",
              animation:
                theme === "futuristic"
                  ? "glitch 3s infinite linear alternate-reverse"
                  : "none",
            }}
          >
            No one can beat me at being me—and the same goes for you.
          </h1>

          <div
            className={`grid gap-12 relative z-10 ${
              theme === "futuristic" ? styles.fadeUp : ""
            }`}
          >
            {children}
          </div>
        </div>

        {theme === "futuristic" && (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "var(--cosmic-swirl)",
                opacity: 0.15,
                zIndex: 0,
              }}
            />
            <div
              className="fixed inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(0, 255, 102, 0.1) 0%, transparent 50%)",
                mixBlendMode: "overlay",
                zIndex: 0,
              }}
            />
          </>
        )}
      </main>
    </>
  );
}
