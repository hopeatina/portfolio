"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiArrowRight } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { focusSystem, heroSignals } from "@/data/homepage";
import StateBadge from "./StateBadge";

const StaticHeroBackdrop = () => (
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at 18% 18%, rgba(37, 99, 235, 0.22), transparent 30%), radial-gradient(circle at 82% 20%, rgba(14, 165, 233, 0.14), transparent 24%), linear-gradient(135deg, rgba(7, 14, 29, 0.98), rgba(2, 6, 23, 1))",
    }}
  >
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(148, 163, 184, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.36), rgba(0,0,0,0.94) 86%)",
      }}
    />
  </div>
);

class SceneErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const ConnectorScene = dynamic(() => import("./ConnectorScene"), {
  ssr: false,
  loading: () => <StaticHeroBackdrop />,
});

export default function Hero3D() {
  const { themeProps } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [shouldRenderScene, setShouldRenderScene] = useState(true);
  const headingFont =
    themeProps.typography.headingFont || "'Orbitron', sans-serif";
  const bodyFont =
    themeProps.typography.bodyFont || "'Titillium Web', sans-serif";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.navigator.webdriver) {
      setShouldRenderScene(false);
      return;
    }

    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      setShouldRenderScene(false);
    }
  }, []);

  const reveal = (delay = 0, y = 18) =>
    shouldReduceMotion
      ? {
          initial: { opacity: 1, y: 0 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.01, delay: 0 },
        }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.42, delay, ease: "easeOut" as const },
        };

  return (
    <div className="relative min-h-[46rem] w-full overflow-hidden md:min-h-screen">
      <div className="absolute inset-0">
        {shouldRenderScene ? (
          <SceneErrorBoundary fallback={<StaticHeroBackdrop />}>
            <Suspense fallback={<StaticHeroBackdrop />}>
              <ConnectorScene />
            </Suspense>
          </SceneErrorBoundary>
        ) : (
          <StaticHeroBackdrop />
        )}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),rgba(2,6,23,0.78)_38%,rgba(2,6,23,0.97)_78%)]" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.65 }}
        className="relative z-10 px-4 pb-16 pt-20 md:px-6 md:pb-20 md:pt-24 lg:px-8 lg:pb-24 lg:pt-28"
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="rounded-[2.35rem] border border-white/[0.08] bg-slate-950/[0.18] px-4 py-6 shadow-[0_26px_90px_rgba(2,6,23,0.28)] backdrop-blur-[3px] md:px-6 md:py-8 lg:px-8 lg:py-10"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-center">
              <div className="max-w-4xl text-left">
            <motion.p
              {...reveal(0.02, 10)}
              className="mb-4 max-w-2xl text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 md:text-sm"
              style={{ fontFamily: bodyFont }}
            >
              Agent infrastructure · multi-agent orchestration · developer tooling
            </motion.p>

            <motion.h1
              {...reveal(0.06, 18)}
              className="max-w-5xl text-[2.35rem] font-semibold text-white min-[380px]:text-[2.55rem] sm:text-[clamp(3.2rem,11vw,5.4rem)] lg:text-[clamp(3.9rem,6.4vw,6.5rem)]"
              style={{
                fontFamily: headingFont,
                lineHeight: 0.92,
                letterSpacing: "var(--letter-spacing-tight)",
                textShadow:
                  "0 8px 34px rgba(0, 0, 0, 0.48), 0 8px 30px rgba(37, 99, 235, 0.12)",
              }}
            >
              Infrastructure for autonomous AI agents
            </motion.h1>

            <motion.p
              {...reveal(0.1, 14)}
              className="mt-5 max-w-3xl text-base leading-relaxed text-white/[0.88] sm:text-lg md:text-[1.28rem] lg:text-[1.38rem]"
              style={{ fontFamily: bodyFont }}
            >
              Hope Atina builds orchestration, review surfaces, and production AI
              systems where delegation is aggressive, provenance stays visible,
              and human judgment still has a clear place.
            </motion.p>

            <motion.p
              {...reveal(0.14, 14)}
              className="mt-4 max-w-3xl text-sm font-medium text-white/70 md:text-base"
              style={{ fontFamily: bodyFont }}
            >
              Creator of OrgX and PerfPulse. Shipped across Alma, Vessel Health,
              and Capital One.
            </motion.p>

            <motion.div
              {...reveal(0.2, 12)}
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <Link
                href="/projects"
                className="no-underline inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 md:text-base"
                style={{
                  fontFamily: bodyFont,
                  boxShadow: "0 18px 46px rgba(2, 6, 23, 0.24)",
                }}
              >
                Review systems
                <FiArrowRight />
              </Link>
              <Link
                href="/blog"
                className="no-underline inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.14] px-6 py-3.5 text-sm font-medium text-white/90 transition-all duration-200 hover:border-white/[0.24] hover:bg-white/[0.06] md:text-base"
                style={{ fontFamily: bodyFont }}
              >
                Read technical writing
              </Link>
            </motion.div>

            <motion.div
              {...reveal(0.22, 14)}
              className="mt-6 overflow-hidden rounded-[1.4rem] border border-white/[0.12] bg-slate-950/[0.42] p-4 backdrop-blur-md lg:hidden"
              style={{
                boxShadow: "0 18px 44px rgba(2, 6, 23, 0.24)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/[0.46]"
                    style={{ fontFamily: bodyFont }}
                  >
                    Current review object
                  </p>
                  <p
                    className="mt-2 text-xl font-semibold text-white"
                    style={{ fontFamily: headingFont, lineHeight: 1 }}
                  >
                    {focusSystem.name}
                  </p>
                </div>
                <StateBadge state={focusSystem.state} className="pt-0.5" />
              </div>
              <p
                className="mt-3 text-sm leading-relaxed text-white/[0.78]"
                style={{ fontFamily: bodyFont }}
              >
                {focusSystem.summary}
              </p>
              <Link
                href={focusSystem.href}
                className="no-underline mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/90"
                style={{ fontFamily: bodyFont }}
              >
                {focusSystem.actionLabel}
                <FiArrowRight />
              </Link>
            </motion.div>

              <motion.dl
                {...reveal(0.24, 12)}
                className="mt-7 grid gap-4 overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/[0.42] p-4 sm:mt-8 sm:grid-cols-3"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.02)",
                }}
              >
                {heroSignals.map((signal) => (
                  <div key={signal.label} className="space-y-1">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/[0.42]">
                    {signal.label}
                  </dt>
                  <dd
                    className="text-sm leading-relaxed text-white/[0.82] md:text-[15px]"
                    style={{ fontFamily: bodyFont }}
                  >
                    {signal.value}
                  </dd>
                </div>
              ))}
              </motion.dl>
            </div>

            <motion.aside
              {...reveal(0.16, 18)}
              className="hidden overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/[0.62] backdrop-blur-xl lg:block"
              style={{
                boxShadow: "0 30px 90px rgba(2, 6, 23, 0.42)",
              }}
            >
              <div className="border-b border-white/10 px-5 py-5 md:px-6">
                <p
                  className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/[0.44]"
                  style={{ fontFamily: bodyFont }}
                >
                  Current review object
                </p>
                <StateBadge state={focusSystem.state} />
                <h2
                  className="mt-4 text-2xl font-semibold text-white md:text-[2rem]"
                  style={{ fontFamily: headingFont, lineHeight: 1 }}
                >
                  {focusSystem.title}
                </h2>
                <p
                  className="mt-3 text-sm leading-relaxed text-white/70 md:text-[15px]"
                  style={{ fontFamily: bodyFont }}
                >
                  {focusSystem.summary}
                </p>
              </div>

              <div className="px-5 py-5 md:px-6">
                <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] px-4 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/[0.42]">
                    Focus system
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="text-xl font-semibold text-white"
                        style={{ fontFamily: headingFont }}
                      >
                        {focusSystem.name}
                      </p>
                      <p
                        className="mt-2 max-w-xs text-sm leading-relaxed text-white/70"
                        style={{ fontFamily: bodyFont }}
                      >
                        {focusSystem.proof}
                      </p>
                    </div>
                    <Link
                      href={focusSystem.href}
                      className="no-underline inline-flex items-center gap-2 text-sm font-medium text-white/[0.88] transition-all duration-200 hover:text-white"
                    >
                      {focusSystem.actionLabel}
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>

                <dl className="mt-5 divide-y divide-white/8">
                  {focusSystem.checkpoints.map((checkpoint) => (
                    <div
                      key={checkpoint.label}
                      className="grid gap-2 py-4 md:grid-cols-[132px_minmax(0,1fr)] md:gap-4"
                    >
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                        {checkpoint.label}
                      </dt>
                      <dd
                        className="text-sm leading-relaxed text-white/[0.74]"
                        style={{ fontFamily: bodyFont }}
                      >
                        {checkpoint.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.aside>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
