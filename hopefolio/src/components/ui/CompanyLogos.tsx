import React from "react";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

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

  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{
        background: isDarkTheme
          ? "var(--color-background)"
          : "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{
              color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Proud to Have Worked With
          </h2>
        </div>

        {/* Logos Grid */}
        <div
          className="relative p-8 rounded-2xl overflow-hidden"
          style={{
            background: isDarkTheme
              ? "rgba(255, 255, 255, 0.02)"
              : "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(8px)",
            border: isDarkTheme
              ? "1px solid var(--color-primary)"
              : "1px solid var(--color-border)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {companies.map((company) => (
              <a
                key={company.name}
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-full h-16 transition-all duration-300 hover:scale-110"
                aria-label={`Visit ${company.name} website`}
              >
                {company.logo ? (
                  <div className="relative w-32 h-full">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      fill
                      className="object-contain"
                      style={{
                        filter: isDarkTheme
                          ? "brightness(0) invert(1) opacity(0.8)"
                          : "grayscale(100%) opacity(0.7)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = isDarkTheme
                          ? "brightness(0) invert(1) opacity(1)"
                          : "grayscale(0%) opacity(1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = isDarkTheme
                          ? "brightness(0) invert(1) opacity(0.8)"
                          : "grayscale(100%) opacity(0.7)";
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span
                      className="font-semibold text-lg transition-all duration-300"
                      style={{
                        color: isDarkTheme
                          ? "var(--color-primary)"
                          : "var(--color-text)",
                        opacity: 0.7,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "0.7";
                      }}
                    >
                      {company.shortName || company.name}
                    </span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
