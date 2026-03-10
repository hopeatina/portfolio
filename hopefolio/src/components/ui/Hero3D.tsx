"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { attentionItems, heroProofStats } from "@/data/homepage";
import StateBadge from "./StateBadge";

const StaticHeroBackdrop = () => (
  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at top left, rgba(56, 189, 248, 0.22), transparent 30%), radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.18), transparent 24%), linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(2, 6, 23, 1))",
    }}
  >
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.95) 85%)",
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
  const focusItems = attentionItems.slice(0, 3);

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

  const reveal = (delay: number, y = 20) =>
    shouldReduceMotion
      ? {
          initial: { opacity: 1, y: 0 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.01, delay: 0 },
        }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: "easeOut" as const },
        };

  const scrollToNextSection = useCallback(() => {
    const nextSection = document.querySelector("main section:nth-child(2)");

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
      return;
    }

    window.scrollTo({
      top: window.innerHeight,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [shouldReduceMotion]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden lg:h-screen">
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.15),rgba(2,6,23,0.78)_72%,rgba(2,6,23,0.94))]" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.65 }}
        className="absolute inset-0 z-10 flex items-start px-4 pt-28 pb-24 md:px-6 lg:items-center lg:pt-24 lg:pb-28"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div className="text-center lg:text-left">
            <motion.p
              {...reveal(0.12, 12)}
              className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-white/72 md:text-base"
              style={{
                fontFamily: bodyFont,
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              Agent Infrastructure • Multi-Agent Orchestration • Developer Tooling
            </motion.p>

            <motion.h1
              {...reveal(0.2, 24)}
              className="mb-4"
              style={{ fontFamily: headingFont }}
            >
              <span
                className="block text-6xl font-bold text-white md:text-7xl lg:text-8xl"
                style={{
                  fontSize:
                    "clamp(var(--font-size-5xl), 10vw, var(--font-size-6xl))",
                  lineHeight: "var(--line-height-none)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  textShadow:
                    "0 8px 30px rgba(0, 0, 0, 0.48), 0 10px 40px rgba(14, 165, 233, 0.18)",
                }}
              >
                Hope Atina
              </span>
            </motion.h1>

            <motion.h2
              {...reveal(0.28, 24)}
              className="mb-6 text-3xl font-semibold text-white/95 md:text-4xl lg:text-5xl"
              style={{
                fontFamily: headingFont,
                lineHeight: "var(--line-height-tight)",
                textShadow: "0 4px 18px rgba(0, 0, 0, 0.35)",
              }}
            >
              Building infrastructure for autonomous AI agents
            </motion.h2>

            <motion.p
              {...reveal(0.36, 20)}
              className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl lg:mx-0 lg:text-2xl"
              style={{
                fontFamily: bodyFont,
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              Creator of OrgX and PerfPulse. I build orchestration, tooling, and
              production systems where delegation, review, provenance, and
              judgment all have a clear place.
            </motion.p>

            <motion.div
              {...reveal(0.44, 18)}
              className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {heroProofStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 text-left backdrop-blur-md"
                  style={{
                    boxShadow: "0 18px 40px rgba(2, 6, 23, 0.14)",
                  }}
                >
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/52">
                    {stat.label}
                  </p>
                  <p className="text-base font-medium text-white md:text-lg">
                    {stat.value}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              {...reveal(0.52, 18)}
              className="flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <Link
                href="/projects"
                className="no-underline inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition-all duration-200 hover:-translate-y-0.5 md:text-base"
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
                className="no-underline inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/6 px-7 py-4 text-sm font-medium text-white/90 transition-all duration-200 hover:border-white/30 hover:bg-white/12 md:text-base"
                style={{
                  fontFamily: bodyFont,
                  backdropFilter: "blur(12px)",
                }}
              >
                Read technical writing
              </Link>
            </motion.div>
          </div>

          <motion.aside
            {...reveal(0.4, 28)}
            className="hidden rounded-[1.9rem] border border-white/12 bg-slate-950/42 p-5 text-left backdrop-blur-xl lg:block"
            style={{
              boxShadow: "0 30px 90px rgba(2, 6, 23, 0.4)",
            }}
          >
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/55"
              style={{ fontFamily: bodyFont }}
            >
              What needs attention
            </p>
            <h3
              className="mb-5 text-2xl font-semibold text-white"
              style={{ fontFamily: headingFont }}
            >
              Review the systems that best show how I build.
            </h3>

            <div className="space-y-3">
              {focusItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group no-underline block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition-all duration-200 hover:border-white/18 hover:bg-white/10"
                >
                  <div className="mb-3">
                    <StateBadge state={item.state} />
                  </div>
                  <p
                    className="mb-1 text-sm font-semibold uppercase tracking-[0.16em] text-white/50"
                    style={{ fontFamily: bodyFont }}
                  >
                    {item.name}
                  </p>
                  <p className="mb-2 text-lg font-semibold text-white">
                    {item.title}
                  </p>
                  <p
                    className="mb-3 text-sm leading-relaxed text-white/72"
                    style={{ fontFamily: bodyFont }}
                  >
                    {item.proof}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-white/84">
                    <span>{item.actionLabel}</span>
                    <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.aside>
        </div>
      </motion.div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: shouldReduceMotion ? 0 : 0.68 }}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 md:block"
      >
        <button
          onClick={scrollToNextSection}
          aria-label="Scroll to the next section"
          className="group inline-flex flex-col items-center gap-3 no-underline"
        >
          <span
            className="text-xs font-medium uppercase tracking-[0.18em] text-white/56"
            style={{ fontFamily: bodyFont }}
          >
            Scroll to review
          </span>
          <motion.span
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, 3, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white/88 backdrop-blur-md transition-all duration-200 group-hover:border-white/28 group-hover:bg-white/12"
          >
            <FiChevronDown />
          </motion.span>
        </button>
      </motion.div>
    </div>
  );
}
