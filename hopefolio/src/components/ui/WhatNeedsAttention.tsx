"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { reviewQueue } from "@/data/homepage";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import StateBadge from "./StateBadge";

export default function WhatNeedsAttention() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <section
      className="relative overflow-hidden border-t py-24"
      style={{
        background: isDarkTheme
          ? "rgba(2, 6, 23, 0.98)"
          : "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--color-primary)", opacity: 0.9 }}
            >
              Next proof surfaces
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
              Inspect the rest of the system story
            </h2>
          </div>

          <p
            className="max-w-2xl text-base leading-relaxed md:text-lg"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.76 : 0.72,
            }}
          >
            Production AI, local tooling, and browser-native supervision surfaces
            that reinforce the same operating thesis without repeating the same
            card pattern.
          </p>
        </div>

        <div
          className="overflow-hidden rounded-[2.1rem] border"
          style={{
            borderColor: isDarkTheme
              ? "rgba(56, 189, 248, 0.14)"
              : "rgba(15, 23, 42, 0.08)",
            background: isDarkTheme
              ? "linear-gradient(180deg, rgba(8, 15, 29, 0.94), rgba(5, 10, 20, 0.94))"
              : "rgba(255, 255, 255, 0.76)",
            boxShadow: isDarkTheme
              ? "0 20px 70px rgba(2, 6, 23, 0.38)"
              : "0 18px 42px rgba(15, 23, 42, 0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          {reviewQueue.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="group no-underline block"
            >
              <article
                className={`grid gap-5 px-5 py-6 transition-colors duration-200 md:grid-cols-[88px_minmax(0,1.45fr)_minmax(0,0.95fr)_auto] md:px-7 md:py-7 ${
                  index !== reviewQueue.length - 1 ? "border-b" : ""
                }`}
                style={{
                  borderColor:
                    index !== reviewQueue.length - 1
                      ? isDarkTheme
                        ? "rgba(148, 163, 184, 0.12)"
                        : "rgba(15, 23, 42, 0.08)"
                      : "transparent",
                  background:
                    index === 0
                      ? isDarkTheme
                        ? "rgba(255, 255, 255, 0.02)"
                        : "rgba(255, 255, 255, 0.24)"
                      : "transparent",
                }}
              >
                <div className="flex items-center justify-between gap-3 md:block">
                  <p
                    className="text-[2rem] font-semibold md:text-[2.4rem]"
                    style={{
                      color: "var(--color-primary)",
                      fontFamily: "var(--font-heading)",
                      lineHeight: 0.92,
                    }}
                  >
                    0{index + 1}
                  </p>
                  <StateBadge state={item.state} className="md:mt-4" />
                </div>

                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--color-primary)", opacity: 0.82 }}
                  >
                    {item.name}
                  </p>
                  <h3
                    className="mt-2 text-2xl font-semibold leading-tight md:text-[2rem]"
                    style={{
                      color: "var(--color-text)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-3 max-w-2xl text-sm leading-relaxed md:text-base"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.84 : 0.74,
                    }}
                  >
                    {item.summary}
                  </p>
                </div>

                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "var(--color-primary)", opacity: 0.82 }}
                  >
                    Receipt
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed md:text-[15px]"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.82 : 0.72,
                    }}
                  >
                    {item.proof}
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-2 self-start pt-1 text-sm font-medium"
                  style={{ color: "var(--color-primary)" }}
                >
                  <span>{item.actionLabel}</span>
                  <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
