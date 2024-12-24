import React from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import baseStyles from "@/styles/themes/base-theme.module.css";
import cameroonianStyles from "@/styles/themes/cameroonian-theme.module.css";
import riceStyles from "@/styles/themes/rice-theme.module.css";
import futuristicStyles from "@/styles/themes/futuristic-theme.module.css";

export default function Hero() {
  const { theme } = useTheme();

  // Get the current theme's styles
  const getThemeStyles = () => {
    switch (theme) {
      case "cameroonian":
        return cameroonianStyles;
      case "rice":
        return riceStyles;
      case "futuristic":
        return futuristicStyles;
      default:
        return baseStyles;
    }
  };

  const styles = getThemeStyles();

  // Get the appropriate pattern class based on theme
  const getPatternClass = () => {
    switch (theme) {
      case "cameroonian":
        return styles.kentePattern;
      case "rice":
        return styles.academicPattern;
      case "futuristic":
        return styles.cyberPattern;
      default:
        return styles.starfieldPattern;
    }
  };

  return (
    <div
      className={`min-h-[80vh] flex items-center justify-center relative overflow-hidden ${styles.theme}`}
    >
      {/* Background Pattern */}
      <div className={`absolute inset-0 z-0 ${getPatternClass()}`} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`text-5xl md:text-6xl mb-6 ${styles.heading} ${styles.gradientText}`}
          >
            Transforming Ideas into Digital Reality
          </h1>

          <p
            className={`text-xl md:text-2xl mb-8 ${styles.body}`}
            style={{ color: "var(--text)" }}
          >
            From Cameroon to Houston, I bring a unique perspective to software
            engineering, blending cultural richness with technical excellence to
            create impactful solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className={`px-8 py-3 ${styles.transitionBase} ${styles.buttonPulse}`}
              style={{
                background: "var(--gradient-primary)",
                color: "var(--background)",
                borderRadius: "var(--border-radius)",
                fontFamily: "var(--font-heading)",
                fontWeight: "600",
              }}
            >
              Explore My Projects
            </Link>
            <Link
              href="/contact"
              className={`px-8 py-3 ${styles.transitionBase} ${styles.hoverScale}`}
              style={{
                border: "2px solid var(--accent)",
                color: "var(--accent)",
                borderRadius: "var(--border-radius)",
                fontFamily: "var(--font-heading)",
                fontWeight: "600",
              }}
            >
              Work With Me
            </Link>
          </div>

          {/* Quick Intro Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Software Engineer",
                description:
                  "Building scalable solutions with modern technologies",
              },
              {
                title: "Creative Artist",
                description: "Blending technology with artistic expression",
              },
              {
                title: "Cultural Bridge",
                description:
                  "Connecting diverse perspectives through technology",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`p-6 ${styles.transitionBase} ${styles.hoverScale}`}
                style={{
                  background: "var(--card-bg)",
                  borderRadius: "var(--border-radius)",
                  boxShadow: "var(--box-shadow)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <h3
                  className={`text-xl mb-2 ${styles.heading}`}
                  style={{ color: "var(--primary)" }}
                >
                  {item.title}
                </h3>
                <p className={styles.body} style={{ color: "var(--text)" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
