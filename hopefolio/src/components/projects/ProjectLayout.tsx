import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

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
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>{title} | Projects | Hope Atina</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <main className="min-h-screen bg-background text-body">
        {/* Main Content Container */}
        <div className="container mx-auto px-4 py-24">
          {/* Back Navigation */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 mb-8 text-link hover:text-link-hover transition-colors group"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            <span>Back to Projects</span>
          </Link>

          {/* Project Content */}
          {children}
        </div>
      </main>
    </>
  );
}
