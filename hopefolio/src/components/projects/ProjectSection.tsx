import React, { ReactNode } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

interface ProjectSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ProjectSection({
  title,
  children,
  className = "",
}: ProjectSectionProps) {
  const { theme } = useTheme();

  return (
    <section className={`project-section py-2 ${className}`}>
      <h2 className="mb-6 text-3xl font-semibold tracking-[-0.04em] text-heading md:text-4xl">
        {title}
      </h2>
      <div
        className={`prose prose-lg max-w-none text-body [&>p:first-child]:mt-0 ${
          theme === "futuristic" ? "project-content" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}
