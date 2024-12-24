import React, { ReactNode, CSSProperties } from "react";
import Head from "next/head";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/futuristic-theme.module.css";

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
  const { themeProps, theme } = useTheme();

  const getBackgroundStyles = (): CSSProperties => {
    switch (theme) {
      case "futuristic":
        return {
          background: "var(--background)",
          backgroundImage: `
            linear-gradient(0deg, rgba(0, 255, 102, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 102, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          position: "relative" as const,
        };
      case "cameroonian":
        return {
          background: themeProps.patterns.backgroundPattern,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4A373' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
          backgroundSize: "cover, 20px 20px, 20px 20px",
        };
      default:
        return {
          background: themeProps.patterns.backgroundPattern,
          backgroundImage: `
            linear-gradient(0deg, rgba(31, 41, 55, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31, 41, 55, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        };
    }
  };

  return (
    <>
      <Head>
        <title>{title} | Blog | Emerging Hope</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <main
        className={`min-h-screen py-12 ${
          isPost ? "max-w-4xl mx-auto px-4" : "px-4"
        }`}
        style={getBackgroundStyles()}
      >
        {!isPost && (
          <div className="mb-12 text-center">
            <h1
              className={`text-4xl mb-4 ${
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
              Blog
            </h1>
            <p
              className={`text-xl ${
                theme === "futuristic" ? styles.fadeUp : ""
              }`}
              style={{
                color: themeProps.colors.text,
                fontFamily: themeProps.typography.bodyFont,
                lineHeight: themeProps.typography.lineHeight,
                opacity: theme === "futuristic" ? 0.85 : 1,
              }}
            >
              Dive into my thoughts, experiments, and learning notes
            </p>
          </div>
        )}

        <div
          className={`${
            theme === "futuristic" ? styles.fadeIn : ""
          } relative z-10`}
          style={{
            backdropFilter: theme === "futuristic" ? "blur(10px)" : "none",
          }}
        >
          {children}
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
