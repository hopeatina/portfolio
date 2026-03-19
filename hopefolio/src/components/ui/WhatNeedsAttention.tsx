"use client";

import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { reviewQueue } from "@/data/homepage";
import StateBadge from "./StateBadge";
import { ThemeAnimatedSection, ThemeHoverElement } from "../animations/ThemePhysics";

export default function WhatNeedsAttention() {
  return (
    <section className="relative w-full py-32 px-6 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Terminal Glass Floating Object */}
        <ThemeAnimatedSection className="relative overflow-hidden rounded-3xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)]">
          <div className="p-10 lg:p-16 border-b border-white/10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-mono uppercase tracking-[0.25em] text-white/50">
                System Log // Review Queue
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium text-white tracking-tight leading-[1.1]">
                Active architectural reviews
              </h2>
            </div>
          </div>

          <div className="flex flex-col">
            {reviewQueue.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group block relative border-b border-white/5 last:border-b-0 transition-colors hover:bg-white/[0.03]"
              >
                <ThemeHoverElement className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr_auto] gap-8 p-10 lg:p-16 items-start">
                  
                  <div className="flex items-center justify-between md:block">
                    <p className="text-4xl md:text-5xl font-heading font-light text-white/20 group-hover:text-white/40 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <div className="md:mt-6">
                      <StateBadge state={item.state} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl lg:text-3xl font-heading text-white mb-4 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm font-mono text-white/50 mb-4 uppercase tracking-widest">
                      {item.name}
                    </p>
                    <p className="text-lg text-white/70 font-body font-light leading-relaxed max-w-xl">
                      {item.summary}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-mono text-white/50 mb-4 uppercase tracking-widest">
                      Output Receipt
                    </p>
                    <p className="text-base text-white/60 font-body font-light leading-relaxed max-w-sm">
                      {item.proof}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-white/80 group-hover:text-white transition-colors mt-4 md:mt-0">
                    <span className="font-mono text-sm tracking-wide">{item.actionLabel}</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-2" />
                  </div>

                </ThemeHoverElement>
              </Link>
            ))}
          </div>
        </ThemeAnimatedSection>
      </div>
    </section>
  );
}
