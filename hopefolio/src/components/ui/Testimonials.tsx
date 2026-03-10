import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

type Metric = {
  id: string;
  value: string;
  label: string;
  proof: string;
};

const metrics: Metric[] = [
  {
    id: "1",
    value: "8+",
    label: "Years in Production",
    proof: "Shipping systems at Alma, Vessel Health, and Capital One",
  },
  {
    id: "2",
    value: "1,457+",
    label: "Commits on OrgX",
    proof: "Multi-agent orchestration platform built over 12 months",
  },
  {
    id: "3",
    value: "93%",
    label: "Bug Reduction",
    proof: "Backend re-architecture at Vessel Health",
  },
];

const Testimonials = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: isDarkTheme
          ? "var(--color-background)"
          : "var(--color-surface)",
      }}
    >
      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              color: isDarkTheme ? "var(--color-primary)" : "var(--color-text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            By the Numbers
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-body)",
              opacity: isDarkTheme ? 0.9 : 1,
            }}
          >
            Verifiable metrics from real production systems
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="relative p-8 rounded-2xl transition-all duration-500 hover:scale-[1.02] text-center"
              style={{
                background: isDarkTheme ? "rgba(255, 255, 255, 0.02)" : "white",
                border: isDarkTheme
                  ? "1px solid var(--color-primary)"
                  : "1px solid var(--color-border)",
                boxShadow: isDarkTheme
                  ? "0 0 40px rgba(0, 238, 92, 0.1)"
                  : "0 10px 30px rgba(0, 0, 0, 0.1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = isDarkTheme
                  ? "0 0 60px rgba(0, 238, 92, 0.2)"
                  : "0 20px 40px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = isDarkTheme
                  ? "0 0 40px rgba(0, 238, 92, 0.1)"
                  : "0 10px 30px rgba(0, 0, 0, 0.1)";
              }}
            >
              {/* Big Number */}
              <div
                className="text-5xl md:text-6xl font-bold mb-4"
                style={{
                  color: isDarkTheme
                    ? "var(--color-primary)"
                    : "var(--color-primary)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {metric.value}
              </div>

              {/* Label */}
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  color: isDarkTheme
                    ? "var(--color-primary)"
                    : "var(--color-text)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {metric.label}
              </h3>

              {/* Proof */}
              <p
                className="text-sm"
                style={{
                  color: "var(--color-text)",
                  fontFamily: "var(--font-body)",
                  opacity: isDarkTheme ? 0.8 : 0.7,
                  lineHeight: "1.6",
                }}
              >
                {metric.proof}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
