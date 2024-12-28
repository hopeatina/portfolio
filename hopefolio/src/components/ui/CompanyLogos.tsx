import React from "react";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

type Company = {
  name: string;
  logo: string;
  url: string;
};

const companies: Company[] = [
  {
    name: "Rice University",
    logo: "/images/logos/rice.png",
    url: "https://www.rice.edu",
  },
  {
    name: "Cursor",
    logo: "/images/logos/cursor.png",
    url: "https://cursor.sh",
  },
  // Add more companies as needed
];

const CompanyLogos = () => {
  const { theme, getThemeStyles } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";

  return (
    <section
      className={`py-16 relative overflow-hidden ${styles.fadeUp}`}
      style={{
        background: bgIsDark ? "var(--background)" : "var(--surface)",
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: "var(--overlay-pattern)",
          opacity: bgIsDark ? 0.1 : 0.05,
          mixBlendMode: "overlay",
        }}
      />

      {/* Content Container */}
      <div className={`${styles.container} relative z-10`}>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              styles.headingH3
            } ${bgIsDark ? styles.gradientText : ""}`}
            style={{
              color: bgIsDark ? "transparent" : "var(--text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-heading)",
              lineHeight: "var(--line-height-heading)",
            }}
          >
            Proud to Have Worked With
          </h2>
        </div>

        {/* Logos Grid */}
        <div
          className="relative p-8 rounded-2xl"
          style={{
            background: bgIsDark
              ? "rgba(10, 10, 10, 0.3)"
              : "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Decorative Border */}
          <div
            className="absolute inset-0 rounded-2xl opacity-20"
            style={{
              border: `1px solid ${
                bgIsDark ? "var(--primary)" : "var(--accent)"
              }`,
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {companies.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-32 h-16 flex items-center justify-center"
              >
                {/* Logo Container */}
                <div
                  className="relative w-full h-full transition-transform duration-300 group-hover:scale-110"
                  style={{
                    filter: bgIsDark ? "brightness(0.9) contrast(1.1)" : "none",
                  }}
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain"
                    style={{
                      opacity: bgIsDark ? 0.9 : 1,
                    }}
                  />
                </div>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                  style={{
                    background: bgIsDark
                      ? "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%)"
                      : "radial-gradient(circle at center, rgba(var(--accent-rgb), 0.1) 0%, transparent 70%)",
                  }}
                />
              </a>
            ))}
          </div>

          {/* Corner Accents */}
          {bgIsDark && (
            <>
              <div
                className="absolute top-0 left-0 w-16 h-16"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary) 0%, transparent 100%)",
                  opacity: 0.05,
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-16 h-16"
                style={{
                  background:
                    "linear-gradient(-45deg, var(--primary) 0%, transparent 100%)",
                  opacity: 0.05,
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
