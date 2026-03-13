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
    impact:
      "999 commits over 2.7 years — automated reassessments, compliant progress notes, Brellium audit integration, and RBAC document management in HIPAA production.",
    environment: "Mental health • HIPAA-compliant production",
    shipped: "7 major backend feature areas in Django, Celery, and PostgreSQL.",
  },
  {
    name: "Vessel Health",
    logo: "/images/logos/vessel.png",
    url: "https://wearevessel.co",
    role: "Lead Backend Engineer",
    impact:
      "Backend re-architecture for reliability and data pipeline improvements.",
    environment: "Consumer health • production platform",
    shipped: "Data pipelines, backend reliability, and system hardening.",
  },
  {
    name: "Capital One",
    logo: "/images/logos/capital-one.png",
    url: "https://www.capitalone.com",
    role: "Software & Data Engineer",
    impact:
      "Pre-approval Auto Loans team — internal D0-D3 self-service platform for building real-time streams.",
    environment: "Enterprise data • high-scale internal systems",
    shipped: "Spark/Scala pipelines and real-time streaming platform work.",
  },
  {
    name: "MD Anderson",
    logo: "/images/logos/md-anderson.png",
    url: "https://www.mdanderson.org",
    role: "Research Extern",
    impact:
      "OR capacity monitoring dashboards with React, D3.js, and AngularJS.",
    environment: "Research • scientific computing",
    shipped: "AngularJS dashboards, D3 visualizations, and OR monitoring.",
  },
];

export default function CompanyLogos() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const [leadCompany, ...supportingCompanies] = companies;
  const [topSupport, ...bottomSupport] = supportingCompanies;

  return (
    <section
      className="relative overflow-hidden border-y py-24"
      style={{
        background: isDarkTheme
          ? "rgba(7, 12, 24, 0.98)"
          : "rgba(255, 255, 255, 0.5)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                color: "var(--color-primary)",
                opacity: 0.9,
              }}
            >
              Production proof
            </p>
            <h2
              className="text-4xl font-bold md:text-5xl"
              style={{
                color: isDarkTheme
                  ? "var(--color-primary)"
                  : "var(--color-text)",
                fontFamily: "var(--font-heading)",
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              Shipped in production
            </h2>
          </div>

          <p
            className="max-w-2xl text-base leading-relaxed md:text-lg"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.78 : 0.72,
            }}
          >
            One environment should carry the most weight. The rest should make it
            clear the judgment holds under healthcare compliance, consumer
            reliability, enterprise data scale, and scientific tooling.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <a
            href={leadCompany.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group no-underline"
          >
            <article
              className="flex h-full flex-col overflow-hidden rounded-[2.35rem] border px-7 py-7 md:px-9 md:py-9"
              style={{
                background: isDarkTheme
                  ? "linear-gradient(160deg, rgba(9, 17, 31, 0.98), rgba(8, 47, 73, 0.78))"
                  : "linear-gradient(160deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))",
                borderColor: isDarkTheme
                  ? "rgba(56, 189, 248, 0.16)"
                  : "rgba(15, 23, 42, 0.08)",
                boxShadow: isDarkTheme
                  ? "0 24px 80px rgba(2, 6, 23, 0.32)"
                  : "0 20px 60px rgba(15, 23, 42, 0.08)",
              }}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="max-w-xl">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--color-primary)", opacity: 0.88 }}
                  >
                    Lead production story
                  </p>
                  <h3
                    className="mt-3 text-[2.4rem] font-semibold"
                    style={{
                      color: "var(--color-text)",
                      fontFamily: "var(--font-heading)",
                      lineHeight: 0.94,
                    }}
                  >
                    {leadCompany.name}
                  </h3>
                  <p
                    className="mt-2 text-sm"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.7 : 0.64,
                    }}
                  >
                    {leadCompany.role}
                  </p>
                </div>

                {leadCompany.logo && (
                  <div className="relative h-12 w-24 flex-shrink-0 opacity-80 transition-opacity duration-200 group-hover:opacity-100">
                    <Image
                      src={leadCompany.logo}
                      alt={`${leadCompany.name} logo`}
                      fill
                      className="object-contain"
                      style={{
                        filter: isDarkTheme
                          ? "brightness(0) invert(1) opacity(0.92)"
                          : "grayscale(100%)",
                      }}
                    />
                  </div>
                )}
              </div>

              <p
                className="mt-10 max-w-2xl text-2xl leading-tight md:text-[2rem]"
                style={{
                  color: "var(--color-text)",
                  opacity: isDarkTheme ? 0.96 : 0.88,
                  fontFamily: "var(--font-heading)",
                }}
              >
                {leadCompany.impact}
              </p>

              <dl className="mt-10 grid gap-6 border-t border-white/10 pt-6 md:grid-cols-2">
                <div>
                  <dt
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--color-primary)", opacity: 0.82 }}
                  >
                    Environment
                  </dt>
                  <dd
                    className="mt-2 text-sm leading-relaxed md:text-[15px]"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.8 : 0.72,
                    }}
                  >
                    {leadCompany.environment}
                  </dd>
                </div>
                <div>
                  <dt
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--color-primary)", opacity: 0.82 }}
                  >
                    What shipped
                  </dt>
                  <dd
                    className="mt-2 text-sm leading-relaxed md:text-[15px]"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.8 : 0.72,
                    }}
                  >
                    {leadCompany.shipped}
                  </dd>
                </div>
              </dl>
            </article>
          </a>

          <div className="grid gap-4">
            <a
              href={topSupport.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group no-underline"
            >
              <article
                className="rounded-[1.8rem] border px-6 py-6"
                style={{
                  background: isDarkTheme
                    ? "rgba(9, 17, 31, 0.84)"
                    : "rgba(255, 255, 255, 0.92)",
                  borderColor: isDarkTheme
                    ? "rgba(148, 163, 184, 0.16)"
                    : "rgba(15, 23, 42, 0.08)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: "var(--color-primary)", opacity: 0.82 }}
                    >
                      {topSupport.environment}
                    </p>
                    <h3
                      className="mt-3 text-2xl font-semibold"
                      style={{
                        color: "var(--color-text)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {topSupport.name}
                    </h3>
                    <p
                      className="mt-1 text-sm"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.72 : 0.64,
                      }}
                    >
                      {topSupport.role}
                    </p>
                  </div>

                  {topSupport.logo && (
                    <div className="relative h-10 w-20 flex-shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
                      <Image
                        src={topSupport.logo}
                        alt={`${topSupport.name} logo`}
                        fill
                        className="object-contain"
                        style={{
                          filter: isDarkTheme
                            ? "brightness(0) invert(1) opacity(0.86)"
                            : "grayscale(100%)",
                        }}
                      />
                    </div>
                  )}
                </div>

                <p
                  className="mt-5 text-base leading-relaxed"
                  style={{
                    color: "var(--color-text)",
                    opacity: isDarkTheme ? 0.84 : 0.74,
                  }}
                >
                  {topSupport.impact}
                </p>
                <p
                  className="mt-5 text-sm leading-relaxed"
                  style={{
                    color: "var(--color-text)",
                    opacity: isDarkTheme ? 0.68 : 0.64,
                  }}
                >
                  {topSupport.shipped}
                </p>
              </article>
            </a>

            <div className="grid gap-4 md:grid-cols-2">
              {bottomSupport.map((company) => (
                <a
                  key={company.name}
                  href={company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group no-underline"
                >
                  <article
                    className="h-full rounded-[1.6rem] border px-5 py-5"
                    style={{
                      background: isDarkTheme
                        ? "rgba(255, 255, 255, 0.03)"
                        : "rgba(255, 255, 255, 0.9)",
                      borderColor: isDarkTheme
                        ? "rgba(148, 163, 184, 0.12)"
                        : "rgba(15, 23, 42, 0.08)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p
                          className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                          style={{
                            color: "var(--color-primary)",
                            opacity: 0.82,
                          }}
                        >
                          {company.environment}
                        </p>
                        <h3
                          className="mt-3 text-xl font-semibold"
                          style={{
                            color: "var(--color-text)",
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          {company.name}
                        </h3>
                      </div>

                      {company.logo && (
                        <div className="relative h-9 w-16 flex-shrink-0 opacity-70 transition-opacity duration-200 group-hover:opacity-100">
                          <Image
                            src={company.logo}
                            alt={`${company.name} logo`}
                            fill
                            className="object-contain"
                            style={{
                              filter: isDarkTheme
                                ? "brightness(0) invert(1) opacity(0.84)"
                                : "grayscale(100%)",
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <p
                      className="mt-4 text-sm leading-relaxed"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.8 : 0.72,
                      }}
                    >
                      {company.impact}
                    </p>
                    <p
                      className="mt-4 text-sm leading-relaxed"
                      style={{
                        color: "var(--color-text)",
                        opacity: isDarkTheme ? 0.64 : 0.6,
                      }}
                    >
                      {company.shipped}
                    </p>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
