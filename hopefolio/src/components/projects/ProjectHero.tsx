import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Tag from "@/components/ui/Tag";
import styles from "@/styles/themes/base-theme.module.css";

interface ProjectHeroProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

export default function ProjectHero({
  title,
  description,
  tags,
  image,
}: ProjectHeroProps) {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();
  const isDarkTheme = theme === "futuristic";

  return (
    <section className="relative">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Content Side */}
        <div className="flex-1 relative">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <Tag
                key={tag}
                variant={isDarkTheme ? "outline" : "default"}
                size="md"
                style={{
                  background: isDarkTheme
                    ? "rgba(var(--primary-rgb), 0.1)"
                    : "rgba(var(--accent-rgb), 0.1)",
                  borderColor: isDarkTheme ? "var(--primary)" : "var(--accent)",
                  color: isDarkTheme ? "var(--primary)" : "var(--accent)",
                  backdropFilter: "blur(4px)",
                  boxShadow: isDarkTheme
                    ? "0 0 20px rgba(var(--primary-rgb), 0.2)"
                    : "none",
                  transition: "all 0.3s ease",
                }}
                className="hover:scale-105"
              >
                {tag}
              </Tag>
            ))}
          </div>

          {/* Title with Decorative Elements */}
          <div className="relative mb-6">
            {/* Decorative Line */}
            <div
              className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
              style={{
                background: "var(--gradient-primary)",
                opacity: isDarkTheme ? 0.8 : 0.6,
              }}
            />

            <h1
              className={`text-5xl md:text-6xl font-bold ${styles.headingH1} ${
                isDarkTheme ? styles.gradientText : ""
              }`}
              style={{
                color: isDarkTheme ? "transparent" : "var(--text)",
                fontFamily: "var(--font-heading)",
                textShadow: isDarkTheme
                  ? "0 0 20px rgba(var(--primary-rgb), 0.4)"
                  : "none",
                letterSpacing: "var(--letter-spacing-heading)",
                lineHeight: "var(--line-height-heading)",
              }}
            >
              {title}
            </h1>

            {/* Decorative Underline */}
            <div
              className="absolute -bottom-3 left-0 h-px w-32"
              style={{
                background: isDarkTheme
                  ? "linear-gradient(to right, var(--primary), transparent)"
                  : "var(--accent)",
                opacity: isDarkTheme ? 0.8 : 0.6,
              }}
            />
          </div>

          {/* Description */}
          <p
            className={`text-xl md:text-2xl ${styles.bodyLarge} relative`}
            style={{
              color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
              fontFamily: "var(--font-body)",
              lineHeight: "var(--line-height-body)",
              opacity: 0.9,
              maxWidth: "40ch",
            }}
          >
            {description}
            {isDarkTheme && (
              <div
                className="absolute -left-12 top-1/2 w-8 h-px"
                style={{
                  background:
                    "linear-gradient(to right, var(--primary), transparent)",
                  opacity: 0.3,
                  transform: "translateY(-50%)",
                }}
              />
            )}
          </p>
        </div>

        {/* Image Side */}
        {image && (
          <div className="lg:flex-1 w-full lg:w-auto relative group">
            {/* Image Container with Effects */}
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                boxShadow: "var(--box-shadow-card)",
              }}
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: isDarkTheme
                    ? "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.2) 0%, transparent 70%)"
                    : "radial-gradient(circle at center, var(--gradient-start) 0%, transparent 70%)",
                  mixBlendMode: "overlay",
                }}
              />

              {/* Main Image */}
              <img
                src={image}
                alt={title}
                className="w-full h-auto relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
                style={{
                  border: isDarkTheme
                    ? "1px solid rgba(var(--primary-rgb), 0.2)"
                    : "none",
                }}
              />

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: isDarkTheme
                    ? "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 100%)"
                    : "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.2) 100%)",
                }}
              />

              {/* Corner Accents */}
              {isDarkTheme && (
                <>
                  <div
                    className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary) 0%, transparent 100%)",
                      opacity: 0.2,
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(-45deg, var(--primary) 0%, transparent 100%)",
                      opacity: 0.2,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
