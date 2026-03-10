"use client";

import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

type Receipt = {
  id: string;
  value: string;
  label: string;
  system: string;
  proof: string;
};

const receipts: Receipt[] = [
  {
    id: "1",
    value: "8+",
    label: "Years in production systems",
    system: "Alma • Vessel Health • Capital One",
    proof: "Shipping and operating systems in healthcare, enterprise data, and customer-facing product environments.",
  },
  {
    id: "2",
    value: "1,457+",
    label: "Commits on OrgX",
    system: "OrgX",
    proof: "A multi-agent orchestration platform built across a 19-repo ecosystem over the last 12 months.",
  },
  {
    id: "3",
    value: "93%",
    label: "Bug reduction",
    system: "Vessel Health",
    proof: "Measured after backend re-architecture and reliability-focused systems work.",
  },
];

export default function Testimonials() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background: isDarkTheme ? "var(--color-background)" : "var(--color-surface)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-3xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-primary)", opacity: 0.9 }}
          >
            Receipts
          </p>
          <h2
            className="mb-5 text-4xl md:text-5xl font-bold"
            style={{
              color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            By the numbers
          </h2>
          <p
            className="text-lg md:text-xl"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.88 : 0.78,
            }}
          >
            Metrics matter when they attach to a system, an environment, and a
            result. These are the numbers I can defend because they map back to
            real work.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {receipts.map((receipt) => (
            <article
              key={receipt.id}
              className="flex h-full flex-col rounded-[1.85rem] p-8"
              style={{
                background: isDarkTheme
                  ? "linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.82))"
                  : "rgba(255, 255, 255, 0.95)",
                border: isDarkTheme
                  ? "1px solid rgba(56, 189, 248, 0.16)"
                  : "1px solid rgba(15, 23, 42, 0.08)",
                boxShadow: isDarkTheme
                  ? "0 20px 50px rgba(2, 6, 23, 0.3)"
                  : "0 18px 40px rgba(15, 23, 42, 0.08)",
              }}
            >
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--color-primary)", opacity: 0.9 }}
              >
                {receipt.system}
              </p>

              <div
                className="mb-4 text-5xl md:text-6xl font-bold"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {receipt.value}
              </div>

              <h3
                className="mb-3 text-xl font-semibold"
                style={{
                  color: "var(--color-text)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {receipt.label}
              </h3>

              <p
                className="mt-auto text-sm leading-relaxed"
                style={{
                  color: "var(--color-text)",
                  opacity: isDarkTheme ? 0.84 : 0.74,
                }}
              >
                {receipt.proof}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
