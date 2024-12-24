import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Button from "@/components/ui/Button";

interface CTAButton {
  text: string;
  href: string;
  variant?: "primary" | "outline";
}

interface ProjectCTAProps {
  buttons: CTAButton[];
}

export default function ProjectCTA({ buttons }: ProjectCTAProps) {
  const { themeProps } = useTheme();

  return (
    <div
      className="flex justify-center space-x-4"
      style={{
        transition: themeProps.animation.transition,
      }}
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          as="a"
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          variant={button.variant}
          className="hover-scale"
          style={{
            transition: themeProps.animation.transition,
          }}
        >
          {button.text}
        </Button>
      ))}
      <style jsx global>{`
        .hover-scale:hover {
          transform: ${themeProps.animation.hoverScale};
        }
      `}</style>
    </div>
  );
}
