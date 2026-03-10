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
      className="relative overflow-hidden py-20 md:py-24"
      style={{
        background: isDarkTheme
          ? "var(--color-background)"
          : "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-14">
        <div>
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--color-primary)", opacity: 0.9 }}
          >
            Supporting review queue
          </p>
          <h2
            className="mb-4 text-4xl font-bold md:text-5xl"
            style={{
              color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            Systems adjacent to the core story
          </h2>
          <p
            className="text-lg md:text-xl"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.84 : 0.76,
            }}
          >
            These are the next surfaces to inspect once the orchestration thesis
            is clear: real production AI, developer tooling, and agent workflow UX.
          </p>
        </div>

        <div
          className="rounded-[2rem] border px-5 py-2 md:px-8"
          style={{
            background: isDarkTheme
              ? "rgba(10, 18, 32, 0.42)"
              : "rgba(255, 255, 255, 0.72)",
            borderColor: isDarkTheme
              ? "rgba(148, 163, 184, 0.14)"
              : "rgba(15, 23, 42, 0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          {reviewQueue.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="group no-underline block"
            >
              <article
                className={`grid gap-4 py-6 transition-colors duration-200 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-start md:gap-6 ${
                  index !== reviewQueue.length - 1 ? "border-b" : ""
                }`}
                style={{
                  borderColor:
                    index !== reviewQueue.length - 1
                      ? isDarkTheme
                        ? "rgba(148, 163, 184, 0.12)"
                        : "rgba(15, 23, 42, 0.08)"
                      : "transparent",
                }}
              >
                <div>
                  <StateBadge state={item.state} />
                  <p
                    className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{
                      color: "var(--color-primary)",
                      opacity: 0.85,
                    }}
                  >
                    {item.name}
                  </p>
                  <h3
                    className="mt-2 text-2xl font-semibold leading-tight"
                    style={{ color: "var(--color-text)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-3 max-w-2xl text-sm leading-relaxed md:text-base"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.84 : 0.76,
                    }}
                  >
                    {item.summary}
                  </p>
                </div>

                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{
                      color: "var(--color-primary)",
                      opacity: 0.82,
                    }}
                  >
                    Proof
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed md:text-[15px]"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.84 : 0.74,
                    }}
                  >
                    {item.proof}
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-2 text-sm font-medium"
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
