import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import ProjectCard from "./ProjectCard";

interface SystemDiagramProps {
  title?: string;
  diagram: string;
  type?: "text" | "flow";
  description?: string;
  className?: string;
}

export default function SystemDiagram({
  title = "System Architecture",
  diagram,
  type = "text",
  description,
  className = "",
}: SystemDiagramProps) {
  const { themeProps, theme } = useTheme();

  const renderTextDiagram = () => (
    <pre
      className="text-sm whitespace-pre-wrap overflow-x-auto p-4 rounded-lg leading-relaxed"
      style={{
        color: themeProps.colors.text,
        fontFamily:
          'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        backgroundColor:
          theme === "futuristic"
            ? "rgba(0, 0, 0, 0.4)"
            : theme === "rice"
            ? "rgba(0, 32, 91, 0.05)"
            : theme === "cameroonian"
            ? "rgba(0, 150, 57, 0.05)"
            : "rgba(109, 40, 217, 0.05)",
        border: `1px solid ${themeProps.colors.primary}20`,
        textShadow:
          theme === "futuristic"
            ? `0 0 10px ${themeProps.colors.primary}40`
            : "none",
      }}
      role="img"
      aria-label={`System architecture diagram: ${title}`}
    >
      {diagram}
    </pre>
  );

  const renderFlowDiagram = () => {
    // Enhanced text flow with theme-aware styling
    const steps = diagram.split("→").map((step) => step.trim());

    return (
      <div
        className="flow-diagram space-y-4"
        role="img"
        aria-label={`Flow diagram: ${title}`}
      >
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: themeProps.colors.primary,
                color: theme === "futuristic" ? "#000" : "#fff",
                boxShadow:
                  theme === "futuristic"
                    ? `0 0 15px ${themeProps.colors.primary}50`
                    : "none",
              }}
            >
              {index + 1}
            </div>
            <div
              className="flex-grow p-3 rounded-lg transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor:
                  theme === "futuristic"
                    ? "rgba(0, 238, 92, 0.1)"
                    : `${themeProps.colors.primary}10`,
                border: `1px solid ${themeProps.colors.primary}30`,
                color: themeProps.colors.text,
                fontFamily: themeProps.typography.bodyFont,
              }}
            >
              {step}
            </div>
            {index < steps.length - 1 && (
              <div
                className="flex-shrink-0 w-6 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: themeProps.colors.primary,
                  opacity: 0.6,
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderDiagram = () => {
    switch (type) {
      case "flow":
        return renderFlowDiagram();
      default:
        return renderTextDiagram();
    }
  };

  return (
    <ProjectCard
      title={title}
      variant="default"
      className={`${className}`}
      role="region"
      ariaLabel={`System diagram: ${title}`}
    >
      {description && (
        <p
          className="mb-4 text-base leading-relaxed"
          style={{
            color: themeProps.colors.text,
            fontFamily: themeProps.typography.bodyFont,
            opacity: 0.9,
          }}
        >
          {description}
        </p>
      )}

      {renderDiagram()}

      {/* Decorative elements for futuristic theme */}
      {theme === "futuristic" && (
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor: themeProps.colors.primary,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </ProjectCard>
  );
}
