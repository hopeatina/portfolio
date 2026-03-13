import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

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
  return (
    <>
      <Head>
        <title>{title} | Projects | Hope Atina</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <main className="min-h-screen bg-background text-body">
        <div className="mx-auto max-w-[1180px] px-4 pb-24 pt-24 md:px-6 md:pt-28">
          <Link
            href="/projects"
            className="mb-10 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium text-link shadow-[0_18px_50px_-36px_rgba(15,23,42,0.28)] transition-colors hover:text-link-hover"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--border-color)",
            }}
          >
            <span aria-hidden="true">←</span>
            <span>Back to Projects</span>
          </Link>

          <div className="space-y-14 md:space-y-16">{children}</div>
        </div>
      </main>
    </>
  );
}
