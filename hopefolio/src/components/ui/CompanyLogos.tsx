"use client";

import React from "react";
import Image from "next/image";

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
  return (
    <section className="relative w-full py-40 px-6 lg:px-12 bg-transparent z-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-32 max-w-3xl mx-auto text-center">
          <p className="mb-6 text-xs font-mono uppercase tracking-[0.25em] text-text-muted">
            Production environment proof
          </p>
          <h2 className="text-5xl md:text-6xl font-heading font-medium tracking-tight text-text">
            Shipped in production
          </h2>
          <p className="mt-8 text-xl font-body font-light text-text-muted leading-relaxed max-w-2xl mx-auto">
            Judgment that holds under healthcare compliance, consumer reliability, enterprise data scale, and scientific tooling.
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {companies.map((company, index) => (
            <div key={company.name} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}>
              
              <div className="w-full md:w-1/3 flex justify-center">
                {company.logo && (
                  <div className="relative h-24 w-48 opacity-80 hover:opacity-100 transition-opacity duration-500 mix-blend-difference filter grayscale invert">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="w-full md:w-2/3 flex flex-col gap-6">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
                  {company.environment}
                </p>
                <h3 className="text-4xl md:text-5xl font-heading text-text">
                  {company.name}
                </h3>
                <p className="text-xl font-body font-light text-text-muted italic">
                  {company.role}
                </p>
                <p className="text-2xl font-body font-light text-text leading-relaxed mt-4">
                  {company.impact}
                </p>
                <div className="mt-8 pl-6 border-l border-white/20">
                  <p className="text-sm font-mono uppercase tracking-widest text-text-muted mb-2">What shipped</p>
                  <p className="text-lg font-body font-light text-text-muted">{company.shipped}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
