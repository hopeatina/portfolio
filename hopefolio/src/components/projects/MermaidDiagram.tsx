"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import ProjectCard from "./ProjectCard";

interface MermaidDiagramProps {
  title?: string;
  diagram: string;
  description?: string;
  className?: string;
}

export default function MermaidDiagram({
  title = "System Architecture",
  diagram,
  description,
  className = "",
}: MermaidDiagramProps) {
  const { theme } = useTheme();
  const diagramRef = useRef<HTMLDivElement>(null);
  const diagramId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    // Configure mermaid with theme-aware settings
    const themeVariables = {
      base: {
        primaryColor: "#8E5BEF",
        primaryTextColor: "#fff",
        primaryBorderColor: "#7A4DD8",
        lineColor: "#8E5BEF",
        background: "#F9FAFB",
        mainBkg: "#FFFFFF",
        secondBkg: "#F3F4F6",
        tertiaryColor: "#E5E7EB",
      },
      cameroonian: {
        primaryColor: "#C07848",
        primaryTextColor: "#fff",
        primaryBorderColor: "#A85A2E",
        lineColor: "#D4A574",
        background: "#FFF8F3",
        mainBkg: "#FFFFFF",
        secondBkg: "#FAF0E6",
        tertiaryColor: "#F5E6D3",
      },
      rice: {
        primaryColor: "#003C71",
        primaryTextColor: "#fff",
        primaryBorderColor: "#002B52",
        lineColor: "#003C71",
        background: "#F7F9FC",
        mainBkg: "#FFFFFF",
        secondBkg: "#EEF2F7",
        tertiaryColor: "#D6E0EB",
      },
      futuristic: {
        primaryColor: "#0EA5E9",
        primaryTextColor: "#000",
        primaryBorderColor: "#0284C7",
        lineColor: "#38BDF8",
        background: "#0F172A",
        mainBkg: "#1E293B",
        secondBkg: "#334155",
        tertiaryColor: "#475569",
      },
    };

    const currentTheme =
      themeVariables[theme as keyof typeof themeVariables] ||
      themeVariables.base;
    const isDarkTheme = theme === "futuristic";

    mermaid.initialize({
      startOnLoad: true,
      theme: isDarkTheme ? "dark" : "default",
      themeVariables: currentTheme,
      fontFamily: "inherit",
      flowchart: {
        curve: "basis",
        padding: 20,
        nodeSpacing: 50,
        rankSpacing: 50,
      },
      securityLevel: "loose",
    });

    if (diagramRef.current) {
      diagramRef.current.innerHTML = "";
      diagramRef.current.innerHTML = `<div class="mermaid" id="${diagramId}">${diagram}</div>`;
      mermaid.contentLoaded();
    }
  }, [diagram, theme, diagramId]);

  return (
    <ProjectCard title={title} variant="default" className={className}>
      {description && (
        <p className="mb-4 text-base text-body-secondary">{description}</p>
      )}

      <div
        ref={diagramRef}
        className="mermaid-container overflow-x-auto py-4"
        style={{
          minHeight: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      <style jsx>{`
        .mermaid-container :global(.mermaid) {
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 100%;
        }
        .mermaid-container :global(svg) {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </ProjectCard>
  );
}
