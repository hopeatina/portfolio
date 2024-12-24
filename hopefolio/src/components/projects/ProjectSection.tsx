import React, { ReactNode } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Card from "@/components/ui/Card";

interface ProjectSectionProps {
  title: string;
  children: ReactNode;
}

export default function ProjectSection({
  title,
  children,
}: ProjectSectionProps) {
  const { themeProps } = useTheme();

  return (
    <Card>
      <h2
        className="text-2xl font-bold mb-4"
        style={{
          color: themeProps.colors.primary,
          fontFamily: themeProps.typography.headingFont,
          fontWeight: themeProps.typography.headingWeight,
          letterSpacing: themeProps.typography.letterSpacing,
        }}
      >
        {title}
      </h2>
      <div
        className="prose max-w-none"
        style={{
          color: themeProps.colors.text,
          fontFamily: themeProps.typography.bodyFont,
          lineHeight: themeProps.typography.lineHeight,
        }}
      >
        {children}
      </div>
      <style jsx>{`
        .prose h3 {
          color: ${themeProps.colors.accent};
          font-family: ${themeProps.typography.headingFont};
          font-weight: ${themeProps.typography.headingWeight};
        }
        .prose ul {
          color: ${themeProps.colors.text};
        }
      `}</style>
    </Card>
  );
}
