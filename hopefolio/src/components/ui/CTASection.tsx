import React from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

const CTASection = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: "var(--gradient-primary)",
        position: "relative",
      }}
    >
      {/* Background Gradient Overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: isDarkTheme
            ? "linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, transparent 50%, rgba(0, 0, 0, 0.3) 100%)"
            : "linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, transparent 50%, rgba(0, 0, 0, 0.1) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2
          className="text-4xl md:text-5xl font-bold mb-6"
          style={{
            color: "white",
            fontFamily: "var(--font-heading)",
            letterSpacing: "var(--letter-spacing-tight)",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Let's Build Something Amazing Together
        </h2>
        <p
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: "var(--font-body)",
            lineHeight: "1.6",
          }}
        >
          Whether you have a project in mind or just want to connect, I'd love
          to hear from you.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
            style={{
              background: "white",
              color: "var(--color-primary)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 15px 40px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0, 0, 0, 0.2)";
            }}
          >
            Get In Touch
            <span className="ml-2">→</span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
          >
            View My Work
          </Link>
        </div>

        {/* Email alternative */}
        <p
          className="mt-12 text-sm"
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontFamily: "var(--font-body)",
          }}
        >
          Prefer email?{" "}
          <a
            href="mailto:hopeatina@gmail.com"
            className="underline hover:no-underline transition-all"
            style={{ color: "white" }}
          >
            hopeatina@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default CTASection;
