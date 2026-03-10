"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { attentionItems } from "@/data/homepage";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import StateBadge from "./StateBadge";

export default function WhatNeedsAttention() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        background: isDarkTheme ? "var(--color-background)" : "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-2xl">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              color: "var(--color-primary)",
              opacity: 0.9,
            }}
          >
            Review Queue
          </p>
          <h2
            className="mb-4 text-4xl md:text-5xl font-bold"
            style={{
              color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            What needs attention
          </h2>
          <p
            className="text-lg md:text-xl"
            style={{
              color: "var(--color-text)",
              opacity: isDarkTheme ? 0.88 : 0.78,
            }}
          >
            The strongest proof is not a slogan. It is a system you can inspect,
            an operating model you can understand, and a result you can trace.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {attentionItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group no-underline"
            >
              <article
                className="flex h-full flex-col rounded-[1.75rem] p-6 transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: isDarkTheme
                    ? "linear-gradient(180deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.78))"
                    : "rgba(255, 255, 255, 0.92)",
                  border: isDarkTheme
                    ? "1px solid rgba(56, 189, 248, 0.18)"
                    : "1px solid rgba(15, 23, 42, 0.08)",
                  boxShadow: isDarkTheme
                    ? "0 20px 50px rgba(2, 6, 23, 0.32)"
                    : "0 18px 40px rgba(15, 23, 42, 0.08)",
                  backdropFilter: "blur(18px)",
                }}
              >
                <div className="mb-4">
                  <StateBadge state={item.state} />
                </div>

                <div className="mb-4">
                  <p
                    className="mb-2 text-sm font-semibold uppercase tracking-[0.16em]"
                    style={{
                      color: "var(--color-primary)",
                      opacity: 0.9,
                    }}
                  >
                    {item.name}
                  </p>
                  <h3
                    className="mb-3 text-2xl font-semibold leading-tight"
                    style={{
                      color: "var(--color-text)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.92 : 0.74,
                    }}
                  >
                    {item.summary}
                  </p>
                </div>

                <div
                  className="mb-5 rounded-2xl px-4 py-4"
                  style={{
                    background: isDarkTheme
                      ? "rgba(15, 23, 42, 0.66)"
                      : "rgba(15, 23, 42, 0.04)",
                    border: isDarkTheme
                      ? "1px solid rgba(148, 163, 184, 0.18)"
                      : "1px solid rgba(15, 23, 42, 0.06)",
                  }}
                >
                  <p
                    className="mb-1 text-xs font-semibold uppercase tracking-[0.16em]"
                    style={{
                      color: "var(--color-primary)",
                    }}
                  >
                    Proof
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.9 : 0.76,
                    }}
                  >
                    {item.proof}
                  </p>
                </div>

                <div
                  className="mt-auto inline-flex items-center gap-2 text-sm font-medium"
                  style={{
                    color: "var(--color-primary)",
                  }}
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
