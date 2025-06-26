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
    <section className={`my-12 project-section ${className}`}>
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-heading">
        {title}
      </h2>

      {/* Content */}
      <div
        className={`prose prose-lg max-w-none text-body ${
          theme === "futuristic" ? "project-content" : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}
