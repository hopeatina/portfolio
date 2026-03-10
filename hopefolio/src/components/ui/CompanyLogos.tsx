import React from "react";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

type Company = {
  name: string;
  logo?: string;
  url: string;
  shortName?: string;
  role: string;
  impact: string;
};

const companies: Company[] = [
  {
    name: "Alma",
    logo: "/images/logos/alma.png",
    url: "https://helloalma.com",
    role: "Software Engineer, Quality Enablement",
    impact: "AI-powered automated reassessments, therapist adoption 40% → 89%",
  },
  {
    name: "Vessel Health",
    logo: "/images/logos/vessel.png",
    url: "https://wearevessel.co",
    shortName: "Vessel",
    role: "Lead Backend Engineer",
    impact: "Backend re-architecture, 93% bug reduction",
  },
  {
    name: "Capital One",
    logo: "/images/logos/capital-one.png",
    url: "https://www.capitalone.com",
    role: "Software & Data Engineer",
    impact: "Automated ETL pipelines, Spark/Scala at scale",
  },
  {
    name: "MD Anderson Cancer Center",
    shortName: "MD Anderson",
    logo: "/images/logos/md-anderson.png",
    url: "https://www.mdanderson.org",
    role: "Research",
    impact: "Bioengineering research",
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
            Shipped in Production
          </h2>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company) => (
            <a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: isDarkTheme
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(8px)",
                border: isDarkTheme
                  ? "1px solid rgba(0, 238, 92, 0.2)"
                  : "1px solid var(--color-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isDarkTheme
                  ? "var(--color-primary)"
                  : "var(--color-primary)";
                e.currentTarget.style.boxShadow = isDarkTheme
                  ? "0 0 30px rgba(0, 238, 92, 0.15)"
                  : "0 10px 25px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDarkTheme
                  ? "rgba(0, 238, 92, 0.2)"
                  : "var(--color-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label={`${company.name} - ${company.role}`}
            >
              {/* Logo */}
              {company.logo && (
                <div className="relative w-24 h-10 mb-4 mx-auto">
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
                  />
                </div>
              )}

              {/* Role */}
              <p
                className="text-xs font-medium uppercase tracking-wider mb-2 text-center"
                style={{
                  color: isDarkTheme
                    ? "var(--color-primary)"
                    : "var(--color-primary)",
                  opacity: 0.8,
                }}
              >
                {company.role}
              </p>

              {/* Impact */}
              <p
                className="text-sm text-center"
                style={{
                  color: "var(--color-text)",
                  opacity: isDarkTheme ? 0.8 : 0.7,
                  lineHeight: "1.5",
                }}
              >
                {company.impact}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
