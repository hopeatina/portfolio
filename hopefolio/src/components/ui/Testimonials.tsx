"use client";

import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

type Receipt = {
  id: string;
  value: string;
  label: string;
  system: string;
  proof: string;
  emphasis?: string;
};

const receipts: Receipt[] = [
  {
    id: "orgx",
    value: "1,270+",
    label: "Commits across OrgX ecosystem",
    system: "OrgX · 7 repos · last 15 months",
    proof:
      "A multi-agent orchestration platform built across memory, scoring, orchestration, and tooling instead of one isolated demo.",
    emphasis: "Primary current proof",
  },
  {
    id: "years",
    value: "8+",
    label: "Years in production systems",
    system: "Alma · Vessel Health · Capital One",
    proof:
      "Shipping and operating systems in healthcare, enterprise data, and customer-facing product environments.",
  },
  {
    id: "alma",
    value: "999",
    label: "Commits at Alma",
    system: "Alma (Cove Health) · 2.7 years",
    proof:
      "Core backend contributor for automated reassessments, compliance, and audit integration in HIPAA production.",
  },
];

export default function Testimonials() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const [primary, ...secondary] = receipts;

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{
        background: isDarkTheme
          ? "rgba(2, 6, 23, 0.98)"
          : "var(--color-surface)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-3xl">
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
            By the numbers
          </h2>
          <p
            className="mt-5 text-lg leading-relaxed md:text-xl"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.82 : 0.74,
            }}
          >
            The numbers should read like argument, not ornament. Lead with the
            proof that best matches the current target, then use the rest to show
            depth, range, and operating history.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
          <article
            className="rounded-[2.15rem] border px-7 py-7 md:px-8 md:py-8"
            style={{
              background: isDarkTheme
                ? "linear-gradient(150deg, rgba(9, 17, 31, 0.96), rgba(8, 47, 73, 0.68))"
                : "linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.94))",
              borderColor: isDarkTheme
                ? "rgba(56, 189, 248, 0.16)"
                : "rgba(15, 23, 42, 0.08)",
              boxShadow: isDarkTheme
                ? "0 22px 70px rgba(2, 6, 23, 0.3)"
                : "0 18px 48px rgba(15, 23, 42, 0.08)",
            }}
          >
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--color-primary)", opacity: 0.84 }}
            >
              {primary.emphasis}
            </p>
            <p
              className="mt-3 text-sm font-medium"
              style={{
                color: "var(--color-text)",
                opacity: isDarkTheme ? 0.72 : 0.64,
              }}
            >
              {primary.system}
            </p>

            <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div
                className="text-[4.25rem] font-semibold md:text-[5rem]"
                style={{
                  color: "var(--color-primary)",
                  fontFamily: "var(--font-heading)",
                  lineHeight: 0.88,
                }}
              >
                {primary.value}
              </div>

              <div className="max-w-sm">
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    color: "var(--color-text)",
                    fontFamily: "var(--font-heading)",
                    lineHeight: 1,
                  }}
                >
                  {primary.label}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed md:text-[15px]"
                  style={{
                    color: "var(--color-text)",
                    opacity: isDarkTheme ? 0.82 : 0.74,
                  }}
                >
                  {primary.proof}
                </p>
              </div>
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {secondary.map((receipt) => (
              <article
                key={receipt.id}
                className="flex h-full flex-col rounded-[1.8rem] border px-6 py-6"
                style={{
                  background: isDarkTheme
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(255, 255, 255, 0.95)",
                  borderColor: isDarkTheme
                    ? "rgba(148, 163, 184, 0.14)"
                    : "rgba(15, 23, 42, 0.08)",
                }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--color-primary)", opacity: 0.84 }}
                >
                  {receipt.system}
                </p>
                <div
                  className="mt-6 text-[3.4rem] font-semibold"
                  style={{
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-heading)",
                    lineHeight: 0.92,
                  }}
                >
                  {receipt.value}
                </div>
                <h3
                  className="mt-4 text-2xl font-semibold"
                  style={{
                    color: "var(--color-text)",
                    fontFamily: "var(--font-heading)",
                    lineHeight: 1.02,
                  }}
                >
                  {receipt.label}
                </h3>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{
                    color: "var(--color-text)",
                    opacity: isDarkTheme ? 0.78 : 0.72,
                  }}
                >
                  {receipt.proof}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
