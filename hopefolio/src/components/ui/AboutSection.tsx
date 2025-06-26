import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

const AboutSection = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
  const isCameroonianTheme = theme === "cameroonian";

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: isDarkTheme
          ? "var(--color-background)"
          : "var(--color-surface)",
        minHeight: "500px",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="relative">
            {/* Decorative Line */}
            <div
              className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
              style={{
                background: isDarkTheme
                  ? "var(--color-primary)"
                  : "var(--gradient-primary)",
                opacity: 0.8,
              }}
            />

            <div className="space-y-6">
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{
                  color: isDarkTheme
                    ? "var(--color-primary)"
                    : "var(--color-text)",
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "var(--letter-spacing-tight)",
                }}
              >
                About Me
              </h2>

              <div className="space-y-4">
                <p
                  className="text-lg md:text-xl"
                  style={{
                    color: "var(--color-text)",
                    fontFamily: "var(--font-body)",
                    lineHeight: "1.6",
                    opacity: isDarkTheme ? 0.9 : 1,
                  }}
                >
                  My journey began in Cameroon, where I learned the value of
                  community-driven solutions and resourceful innovation.
                </p>
                <p
                  className="text-lg md:text-xl"
                  style={{
                    color: "var(--color-text)",
                    fontFamily: "var(--font-body)",
                    lineHeight: "1.6",
                    opacity: isDarkTheme ? 0.9 : 1,
                  }}
                >
                  At Rice University, I discovered the power of combining
                  technology with human-centered design to create meaningful
                  impact.
                </p>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center group relative overflow-hidden rounded-full"
                style={{
                  background: isDarkTheme
                    ? "transparent"
                    : "var(--gradient-primary)",
                  color: isDarkTheme ? "var(--color-primary)" : "white",
                  padding: "0.75rem 2rem",
                  border: isDarkTheme
                    ? "2px solid var(--color-primary)"
                    : "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (isDarkTheme) {
                    e.currentTarget.style.background = "var(--color-primary)";
                    e.currentTarget.style.color = "var(--color-background)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (isDarkTheme) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--color-primary)";
                  }
                }}
              >
                <span className="relative z-10 font-medium">Learn More</span>
                <span className="ml-2 transform transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative group">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: isDarkTheme
                  ? "0 0 40px rgba(0, 238, 92, 0.2)"
                  : "0 10px 30px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="relative aspect-square">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "100%",
                    backgroundColor: isDarkTheme ? "#111" : "#f0f0f0",
                  }}
                >
                  <Image
                    src="/images/hope-profile.jpg"
                    alt="Hope Atina"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />

                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: isDarkTheme
                        ? "linear-gradient(to bottom, transparent 0%, rgba(0, 238, 92, 0.1) 100%)"
                        : "linear-gradient(to bottom, transparent 0%, rgba(109, 40, 217, 0.1) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
