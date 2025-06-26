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
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "16px",
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
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "16px",
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
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "16px",
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
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "16px",
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
      fontFamily: "Inter, system-ui, sans-serif",
      fontSize: 16,
      flowchart: {
        curve: "basis",
        padding: 30,
        nodeSpacing: 80,
        rankSpacing: 80,
        htmlLabels: true,
      },
      sequence: {
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
      },
      gantt: {
        fontSize: 16,
        gridLineStartPadding: 350,
        leftPadding: 75,
        topPadding: 50,
        rightPadding: 75,
      },
      securityLevel: "loose",
      wrap: true,
      maxTextSize: 90000,
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
        <p
          className={`mb-6 text-base ${
            theme === "futuristic" ? "text-gray-200" : "text-body-secondary"
          }`}
          style={
            theme === "futuristic" ? { color: "#F3F4F6", opacity: 0.95 } : {}
          }
        >
          {description}
        </p>
      )}

      <div
        ref={diagramRef}
        className="mermaid-container overflow-x-auto overflow-y-visible py-8 px-4 bg-surface-secondary/30 rounded-lg border border-primary/10"
        style={{
          minHeight: "500px",
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
          width: 100%;
          min-width: 800px;
        }
        .mermaid-container :global(svg) {
          width: 100%;
          min-width: 800px;
          height: auto !important;
          min-height: 400px;
          font-size: 16px !important;
        }
        .mermaid-container :global(.node rect),
        .mermaid-container :global(.node circle),
        .mermaid-container :global(.node ellipse),
        .mermaid-container :global(.node polygon) {
          stroke-width: 2px !important;
        }
        .mermaid-container :global(.node text) {
          font-size: 16px !important;
          font-weight: 500 !important;
          font-family: Inter, system-ui, sans-serif !important;
        }
        .mermaid-container :global(.edgeLabel) {
          font-size: 14px !important;
          font-weight: 500 !important;
          font-family: Inter, system-ui, sans-serif !important;
          background: rgba(255, 255, 255, 0.9) !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
        }
        .mermaid-container :global(.edgePath path) {
          stroke-width: 2px !important;
        }
        .mermaid-container :global(.flowchart-link) {
          stroke-width: 2px !important;
        }

        /* Dark theme adjustments */
        .mermaid-container :global(.node text) {
          fill: currentColor !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .mermaid-container :global(.mermaid) {
            min-width: 600px;
          }
          .mermaid-container :global(svg) {
            min-width: 600px;
          }
        }
      `}</style>
    </ProjectCard>
  );
}
