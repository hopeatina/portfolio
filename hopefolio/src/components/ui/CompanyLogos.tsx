import React from "react";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

type Company = {
  name: string;
  logo?: string;
  url: string;
  shortName?: string;
};

const companies: Company[] = [
  {
    name: "Alma",
    logo: "/images/logos/alma.png",
    url: "https://helloalma.com",
  },
  {
    name: "Vessel",
    logo: "/images/logos/vessel.png",
    url: "https://wearevessel.co",
  },
  {
    name: "Capital One",
    logo: "/images/logos/capital-one.png",
    url: "https://www.capitalone.com",
  },
  {
    name: "MD Anderson Cancer Center",
    shortName: "MD Anderson",
    logo: "/images/logos/md-anderson.png",
    url: "https://www.mdanderson.org",
  },
];

const CompanyLogos = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
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
          className="relative p-8 rounded-2xl overflow-hidden"
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

          <div className="flex items-center justify-center space-x-8">
            {companies.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-32 h-16 flex items-center justify-center"
              >
                {company.logo ? (
                  <>
                    {/* Logo Container */}
                    <div
                      className="relative w-full h-full transition-transform duration-300 group-hover:scale-110"
                      style={{
                        filter: bgIsDark
                          ? "brightness(0.9) contrast(1.1)"
                          : "none",
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
                  </>
                ) : (
                  // Text Fallback for Missing Logos
                  <div className="relative w-full h-full flex items-center justify-center text-center transition-transform duration-300 group-hover:scale-110 px-2">
                    <span
                      className="font-semibold text-sm"
                      style={{
                        color: bgIsDark ? "var(--primary)" : "var(--accent)",
                      }}
                    >
                      {company.shortName || company.name}
                    </span>
                  </div>
                )}

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

<style jsx>{`
  .animate-scroll {
    display: flex;
    animation: none;
  }
`}</style>;
