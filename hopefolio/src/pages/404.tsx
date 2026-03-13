import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function Custom404() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <>
      <Head>
        <title>404 - Page Not Found | Hope Atina</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div
        className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center"
        style={{ background: "var(--color-background)" }}
      >
        <p
          className="mb-2 text-sm font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--color-primary)", opacity: 0.7 }}
        >
          404
        </p>
        <h1
          className="mb-4 text-4xl font-bold md:text-5xl"
          style={{
            color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Page not found
        </h1>
        <p
          className="mb-8 max-w-md text-lg"
          style={{ color: "var(--color-text)", opacity: 0.7 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="rounded-lg px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              background: "var(--color-primary)",
              color: isDarkTheme ? "#0f172a" : "#ffffff",
            }}
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="rounded-lg border px-6 py-3 text-sm font-medium transition-opacity hover:opacity-80"
            style={{
              borderColor: isDarkTheme
                ? "rgba(56, 189, 248, 0.3)"
                : "rgba(15, 23, 42, 0.15)",
              color: "var(--color-text)",
            }}
          >
            View projects
          </Link>
        </div>
      </div>
    </>
  );
}
