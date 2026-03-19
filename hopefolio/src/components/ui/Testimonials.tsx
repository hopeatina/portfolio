"use client";

import React from "react";
import { ThemeAnimatedSection } from "../animations/ThemePhysics";
import { ThemeText } from "../animations/ThemeText";

type Receipt = {
  id: string;
  value: string;
  label: string;
  system: string;
  proof: string;
};

const receipts: Receipt[] = [
  {
    id: "orgx",
    value: "1.2k+",
    label: "Commits across OrgX",
    system: "OrgX · 7 repos",
    proof:
      "A multi-agent orchestration platform built across memory, scoring, orchestration, and tooling.",
  },
  {
    id: "years",
    value: "8+",
    label: "Years in production",
    system: "Alma · Vessel Health · Capital One",
    proof:
      "Shipping and operating systems in healthcare, enterprise data, and customer-facing environments.",
  },
  {
    id: "alma",
    value: "999",
    label: "Commits at Alma",
    system: "Alma · 2.7 years",
    proof:
      "Core backend contributor for automated reassessments, compliance, and audit integration in HIPAA production.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative w-full py-40 px-6 lg:px-12 bg-transparent border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <ThemeAnimatedSection className="mb-32 text-center">
          <p className="mb-6 text-xs font-mono uppercase tracking-[0.25em] text-text-muted">
            <ThemeText>The receipts</ThemeText>
          </p>
          <h2 className="text-5xl md:text-6xl font-heading font-medium tracking-tight text-text">
            Operating <span className="italic text-primary font-light">history</span>
          </h2>
        </ThemeAnimatedSection>

        <div className="flex flex-col gap-32">
          {receipts.map((receipt, index) => (
            <ThemeAnimatedSection key={receipt.id} className="relative flex flex-col md:flex-row items-center justify-between gap-12 group">
              
              {/* Massive Typographic Number acting as art */}
              <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'justify-start' : 'md:order-2 justify-end'}`}>
                <div className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-heading font-normal text-text opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all duration-700 leading-none tracking-tighter">
                  <ThemeText>{receipt.value}</ThemeText>
                </div>
              </div>

              {/* Supporting details */}
              <div className={`w-full md:w-1/2 flex flex-col gap-6 ${index % 2 === 0 ? '' : 'md:order-1 items-end text-right'}`}>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-text-muted">
                  {receipt.system}
                </p>
                <h3 className="text-4xl md:text-5xl font-heading text-text group-hover:text-text transition-colors">
                  {receipt.label}
                </h3>
                <p className={`text-xl font-body font-light text-text-muted leading-relaxed max-w-md ${index % 2 !== 0 ? 'ml-auto' : ''}`}>
                  {receipt.proof}
                </p>
              </div>

            </ThemeAnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
