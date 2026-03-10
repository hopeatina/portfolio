"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

type Company = {
  name: string;
  logo?: string;
  url: string;
  role: string;
  impact: string;
  environment: string;
  shipped: string;
};

const companies: Company[] = [
  {
    name: "Alma",
    logo: "/images/logos/alma.png",
    url: "https://helloalma.com",
    role: "Software Engineer, Quality Enablement",
    impact: "999 commits over 2.7 years — automated reassessments, compliant progress notes, Brellium audit integration, RBAC document management",
    environment: "Mental health • HIPAA-compliant production",
    shipped: "7 major backend feature areas in Django/Celery/PostgreSQL",
  },
  {
    name: "Vessel Health",
    logo: "/images/logos/vessel.png",
    url: "https://wearevessel.co",
    role: "Lead Backend Engineer",
    impact: "Backend re-architecture for reliability and data pipeline improvements",
    environment: "Consumer health • production platform",
    shipped: "Data pipelines, backend reliability, system hardening",
  },
  {
    name: "Capital One",
    logo: "/images/logos/capital-one.png",
    url: "https://www.capitalone.com",
    role: "Software & Data Engineer",
    impact: "Pre-approval Auto Loans team — internal D0-D3 self-service platform for building real-time streams",
    environment: "Enterprise data • high-scale internal systems",
    shipped: "Spark/Scala pipelines, real-time streaming platform",
  },
  {
    name: "MD Anderson",
    logo: "/images/logos/md-anderson.png",
    url: "https://www.mdanderson.org",
    role: "Research Extern",
    impact: "OR capacity monitoring dashboards with React, D3.js, and AngularJS",
    environment: "Research • scientific computing",
    shipped: "AngularJS dashboards, D3 data visualizations, OR capacity monitoring",
  },
];

export default function CompanyLogos() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        background: isDarkTheme ? "var(--color-background)" : "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              color: "var(--color-primary)",
              opacity: 0.9,
            }}
          >
            Production Proof
          </p>
          <h2
            className="mb-4 text-4xl md:text-5xl font-bold"
            style={{
              color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            Shipped in production
          </h2>
          <p
            className="text-lg md:text-xl"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.88 : 0.78,
            }}
          >
            The difference between a promising demo and a senior systems
            engineer is what actually ships under real constraints. These are
            the environments where I&apos;ve built, operated, and improved systems.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {companies.map((company) => (
            <a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group no-underline"
            >
              <article
                className="flex h-full flex-col rounded-[1.75rem] p-6 transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: isDarkTheme
                    ? "linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.8))"
                    : "rgba(255, 255, 255, 0.94)",
                  border: isDarkTheme
                    ? "1px solid rgba(56, 189, 248, 0.16)"
                    : "1px solid rgba(15, 23, 42, 0.08)",
                  boxShadow: isDarkTheme
                    ? "0 18px 50px rgba(2, 6, 23, 0.3)"
                    : "0 16px 38px rgba(15, 23, 42, 0.08)",
                }}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]"
                      style={{
                        color: "var(--color-primary)",
                        opacity: 0.9,
                      }}
                    >
                      {company.environment}
                    </p>
                    <h3
                      className="mb-2 text-2xl font-semibold"
                      style={{
                        color: "var(--color-text)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {company.name}
                    </h3>
                    <p
                      className="text-sm"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.78 : 0.7,
                      }}
                    >
                      {company.role}
                    </p>
                  </div>

                  {company.logo && (
                    <div className="relative h-10 w-20 flex-shrink-0 opacity-75 transition-opacity duration-200 group-hover:opacity-100">
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        fill
                        className="object-contain"
                        style={{
                          filter: isDarkTheme
                            ? "brightness(0) invert(1) opacity(0.9)"
                            : "grayscale(100%)",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div
                  className="mb-5 rounded-2xl px-4 py-4"
                  style={{
                    background: isDarkTheme
                      ? "rgba(15, 23, 42, 0.68)"
                      : "rgba(15, 23, 42, 0.04)",
                    border: isDarkTheme
                      ? "1px solid rgba(148, 163, 184, 0.16)"
                      : "1px solid rgba(15, 23, 42, 0.06)",
                  }}
                >
                  <p
                    className="mb-1 text-xs font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Impact
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.92 : 0.78,
                    }}
                  >
                    {company.impact}
                  </p>
                </div>

                <div className="mt-auto">
                  <p
                    className="mb-1 text-xs font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--color-primary)" }}
                  >
                    What shipped
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.82 : 0.74,
                    }}
                  >
                    {company.shipped}
                  </p>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
