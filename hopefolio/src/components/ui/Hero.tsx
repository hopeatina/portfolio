"use client";

import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import dynamic from "next/dynamic";
import Button from "./Button";

const Hero3D = dynamic(() => import("./Hero3D").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div
      className="relative w-full h-screen"
      style={{
        background:
          "linear-gradient(120deg, #001b0a 10%, #0c351e 40%, #102d1b 90%)",
      }}
    />
  ),
});

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryAction?: {
    label: string;
    href: string;
    external?: boolean;
  };
  variant?: "default" | "centered" | "split";
  backgroundEffect?: "none" | "gradient" | "pattern" | "animated";
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  variant = "default",
  backgroundEffect = "gradient",
  children,
}) => {
  const { theme } = useTheme();

  const containerClasses = {
    default: "text-left",
    centered: "text-center mx-auto",
    split: "grid md:grid-cols-2 gap-12 items-center",
  };

  const contentClasses =
    variant === "centered" ? "max-w-4xl mx-auto" : "max-w-2xl";

  return (
    <section className="relative overflow-hidden">
      {/* Background Effects */}
      {backgroundEffect === "gradient" && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
        </div>
      )}

      {backgroundEffect === "pattern" && (
        <div className="absolute inset-0 -z-10 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-primary) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      )}

      {backgroundEffect === "animated" && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-gradient-shift" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-96 h-96 rounded-full animate-float"
              style={{
                background: `radial-gradient(circle, var(--color-primary) 0%, transparent 70%)`,
                opacity: 0.05,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + i * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container py-20 md:py-28 lg:py-32">
        <div className={containerClasses[variant]}>
          <div className={contentClasses}>
            {/* Eyebrow */}
            {subtitle && (
              <p className="text-sm font-medium text-primary mb-4 animate-fade-in">
                {subtitle}
              </p>
            )}

            {/* Title */}
            <h1 className="mb-6 animate-fade-up">
              <span className="gradient-text">{title}</span>
            </h1>

            {/* Description */}
            {description && (
              <p className="text-lg md:text-xl text-muted mb-8 animate-fade-up delay-100">
                {description}
              </p>
            )}

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-4 animate-fade-up delay-200">
                {primaryAction && (
                  <Button
                    href={primaryAction.href}
                    external={primaryAction.external}
                    size="lg"
                    className="group"
                  >
                    {primaryAction.label}
                    <svg
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Button>
                )}

                {secondaryAction && (
                  <Button
                    href={secondaryAction.href}
                    external={secondaryAction.external}
                    variant="secondary"
                    size="lg"
                  >
                    {secondaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Split variant content */}
          {variant === "split" && children && (
            <div className="animate-fade-up delay-300">{children}</div>
          )}
        </div>

        {/* Default/Centered variant content */}
        {variant !== "split" && children && (
          <div className="mt-16 animate-fade-up delay-300">{children}</div>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
