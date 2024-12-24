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
          background: themeProps.patterns.backgroundPattern,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A373' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"),
            linear-gradient(45deg, rgba(212, 163, 115, 0.05) 25%, transparent 25%, transparent 75%, rgba(212, 163, 115, 0.05) 75%),
            linear-gradient(-45deg, rgba(212, 163, 115, 0.05) 25%, transparent 25%, transparent 75%, rgba(212, 163, 115, 0.05) 75%)
          `,
          backgroundSize: "60px 60px, 40px 40px, 40px 40px",
          backgroundBlendMode: "overlay",
        };
      case "rice":
        return {
          background: themeProps.patterns.backgroundPattern,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(247, 249, 252, 0.8) 0%, rgba(247, 249, 252, 0.4) 100%),
            linear-gradient(45deg, rgba(26, 26, 26, 0.03) 25%, transparent 25%, transparent 75%, rgba(26, 26, 26, 0.03) 75%),
            linear-gradient(-45deg, rgba(26, 26, 26, 0.03) 25%, transparent 25%, transparent 75%, rgba(26, 26, 26, 0.03) 75%)
          `,
          backgroundSize: "cover, 30px 30px, 30px 30px",
        };
      default:
        return {
          background: themeProps.patterns.backgroundPattern,
          backgroundImage: `
            linear-gradient(0deg, rgba(31, 41, 55, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31, 41, 55, 0.03) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(31, 41, 55, 0.03) 0%, transparent 70%)
          `,
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
