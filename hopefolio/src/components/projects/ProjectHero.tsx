import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

interface ProjectHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
}

export default function ProjectHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: ProjectHeroProps) {
  const { themeProps } = useTheme();

  return (
    <>
      <div>
        <h1
          style={{
            color: themeProps.colors.primary,
            fontFamily: themeProps.typography.headingFont,
            fontWeight: themeProps.typography.headingWeight,
            letterSpacing: themeProps.typography.letterSpacing,
          }}
        >
          {title}
        </h1>
        <p
          className="text-xl mt-4"
          style={{
            color: themeProps.colors.text,
            fontFamily: themeProps.typography.bodyFont,
            lineHeight: themeProps.typography.lineHeight,
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-lg"
        style={{
          boxShadow: themeProps.boxShadow,
          transition: themeProps.animation.transition,
        }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto"
          style={{
            borderRadius: themeProps.borderRadius,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: themeProps.patterns.overlayPattern,
            opacity: 0.1,
          }}
        />
      </div>
    </>
  );
}
