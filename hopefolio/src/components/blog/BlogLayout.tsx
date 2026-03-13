import React, { ReactNode } from "react";
import Head from "next/head";
import { isThemeDark, useTheme } from "@/modules/mode-switch/ThemeContext";

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
}: BlogLayoutProps) {
  const { theme } = useTheme();
  const darkTheme = isThemeDark(theme);

  return (
    <>
      <Head>
        <title>{title} | Blog | Hope Atina</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <main
        className="relative min-h-screen overflow-hidden"
        style={{
          background: "var(--background)",
          color: "var(--text)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: darkTheme
              ? "radial-gradient(circle at 24% 12%, rgba(var(--color-primary-rgb), 0.18) 0%, transparent 45%), radial-gradient(circle at 78% 18%, rgba(var(--color-secondary-rgb), 0.14) 0%, transparent 48%)"
              : "radial-gradient(circle at 18% 10%, rgba(var(--color-primary-rgb), 0.08) 0%, transparent 42%), radial-gradient(circle at 82% 14%, rgba(var(--color-secondary-rgb), 0.06) 0%, transparent 46%)",
            opacity: darkTheme ? 0.9 : 1,
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-28 md:px-6 md:pt-32">
          <div
            className="overflow-hidden rounded-[30px] border"
            style={{
              background: darkTheme
                ? "linear-gradient(180deg, rgba(var(--color-surface-rgb), 0.94) 0%, rgba(var(--background-rgb), 0.98) 100%)"
                : "linear-gradient(180deg, rgba(var(--background-rgb), 0.97) 0%, rgba(var(--color-surface-rgb), 0.82) 100%)",
              borderColor: "var(--border)",
              boxShadow: "var(--box-shadow-card)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            <div
              className="h-1 w-full"
              style={{
                background: "var(--gradient-primary)",
                opacity: darkTheme ? 0.95 : 0.82,
              }}
            />
            <div className="relative z-10 px-5 py-6 md:px-8 md:py-8">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
