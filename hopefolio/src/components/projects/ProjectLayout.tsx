import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

interface ProjectLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function ProjectLayout({
  children,
  title,
  description,
}: ProjectLayoutProps) {
  const { themeProps } = useTheme();

  return (
    <>
      <Head>
        <title>{title} | Projects | Emerging Hope</title>
        <meta name="description" content={description} />
      </Head>

      <main
        className="container py-12"
        style={{
          background: themeProps.patterns.backgroundPattern,
          color: themeProps.colors.text,
        }}
      >
        <Link
          href="/projects"
          className="mb-6 block"
          style={{
            color: themeProps.colors.primary,
            transition: themeProps.animation.transition,
          }}
        >
          ← Back to Projects
        </Link>

        <div className="grid gap-8">{children}</div>
      </main>
    </>
  );
}
