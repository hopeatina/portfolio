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
  const { theme } = useTheme();

  const renderTextDiagram = () => (
    <pre className="text-sm whitespace-pre-wrap overflow-x-auto p-4 rounded-lg bg-surface border border-border font-mono text-body">
      {diagram}
    </pre>
  );

  const renderFlowDiagram = () => {
    // Enhanced text flow with theme-aware styling
    const steps = diagram.split("→").map((step) => step.trim());

    return (
      <div className="flow-diagram space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-primary text-white">
              {index + 1}
            </div>
            <div className="flex-grow p-3 rounded-lg bg-primary/10 border border-primary/30 text-body">
              {step}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-shrink-0 w-6 h-0.5 bg-primary opacity-60" />
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
    <ProjectCard title={title} variant="default" className={className}>
      {description && (
        <p className="mb-4 text-base text-body-secondary">{description}</p>
      )}

      {renderDiagram()}
    </ProjectCard>
  );
}
