import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Hope's ability to combine technical expertise with human-centered design principles is truly remarkable. Her work on our AI education platform has been transformative.",
    name: "Dr. Sarah Chen",
    role: "Director of Innovation",
    company: "EdTech Solutions",
  },
  {
    quote:
      "Working with Hope was an incredible experience. Her deep understanding of both technology and cultural nuances brought a unique perspective to our projects.",
    name: "James Wilson",
    role: "Lead Developer",
    company: "Tech Innovators",
  },
  {
    quote:
      "Hope's commitment to creating inclusive and accessible technology solutions has made a real difference in our community engagement initiatives.",
    name: "Michelle Rodriguez",
    role: "Community Manager",
    company: "Social Impact Hub",
  },
];

const Testimonials = () => {
  const { theme, getThemeStyles } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";

  return (
    <section
      className={`py-24 relative overflow-hidden ${styles.fadeUp}`}
      style={{
        background: isRiceTheme
          ? "var(--background)"
          : bgIsDark
          ? "var(--background)"
          : "var(--surface)",
      }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0"
        style={{
          background: "var(--cosmic-swirl)",
          opacity: isRiceTheme ? 0.05 : bgIsDark ? 0.15 : 0.1,
          mixBlendMode: "overlay",
        }}
      />

      {/* Content Container */}
      <div className={`${styles.container} relative z-10`}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              styles.headingH2
            } ${bgIsDark && !isRiceTheme ? styles.gradientText : ""}`}
            style={{
              color: isRiceTheme
                ? "var(--text-on-dark)"
                : bgIsDark
                ? "transparent"
                : "var(--text)",
              fontFamily: "var(--font-heading)",
              letterSpacing: "var(--letter-spacing-heading)",
              lineHeight: "var(--line-height-heading)",
              textShadow: isRiceTheme
                ? "0 2px 4px rgba(0, 32, 91, 0.1)"
                : "none",
            }}
          >
            What People Say
          </h2>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto ${styles.bodyLarge}`}
            style={{
              color: isRiceTheme
                ? "var(--text-on-dark)"
                : bgIsDark
                ? "var(--text-on-dark)"
                : "var(--text)",
              fontFamily: "var(--font-body)",
              lineHeight: "var(--line-height-body)",
              opacity: 0.9,
            }}
          >
            Testimonials from collaborators and partners
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="group relative">
              <div
                className="relative p-8 rounded-2xl h-full transition-all duration-500 group-hover:transform group-hover:scale-[1.02]"
                style={{
                  background: isRiceTheme
                    ? "rgba(255, 255, 255, 0.95)"
                    : bgIsDark
                    ? "rgba(10, 10, 10, 0.5)"
                    : "var(--card-bg)",
                  border: `1px solid ${
                    isRiceTheme
                      ? "rgba(var(--primary-rgb), 0.2)"
                      : bgIsDark
                      ? "rgba(var(--primary-rgb), 0.2)"
                      : "var(--icon-border)"
                  }`,
                  boxShadow: isRiceTheme
                    ? "0 4px 6px rgba(0, 32, 91, 0.1)"
                    : "var(--box-shadow-card)",
                }}
              >
                {/* Quote Icon */}
                <div
                  className="absolute -top-4 left-8"
                  style={{
                    color: isRiceTheme
                      ? "var(--primary)"
                      : bgIsDark
                      ? "var(--primary)"
                      : "var(--accent)",
                    opacity: 0.2,
                    fontSize: "4rem",
                  }}
                >
                  "
                </div>

                {/* Quote Text */}
                <p
                  className={`mb-6 relative ${styles.body}`}
                  style={{
                    color: isRiceTheme
                      ? "var(--text)"
                      : bgIsDark
                      ? "var(--text-on-dark)"
                      : "var(--text)",
                    opacity: 0.9,
                    fontStyle: "italic",
                  }}
                >
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <div className="mt-auto">
                  <h4
                    className="font-semibold mb-1"
                    style={{
                      color: isRiceTheme
                        ? "var(--primary)"
                        : bgIsDark
                        ? "var(--primary)"
                        : "var(--accent)",
                    }}
                  >
                    {testimonial.name}
                  </h4>
                  <p
                    className="text-sm"
                    style={{
                      color: isRiceTheme
                        ? "var(--text-muted)"
                        : bgIsDark
                        ? "var(--text-muted-on-dark)"
                        : "var(--text-muted)",
                    }}
                  >
                    {testimonial.role}
                    {testimonial.company && (
                      <>
                        <span className="mx-2">•</span>
                        {testimonial.company}
                      </>
                    )}
                  </p>
                </div>

                {/* Corner Accents */}
                {(bgIsDark || isRiceTheme) && (
                  <>
                    <div
                      className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--primary) 0%, transparent 100%)",
                        opacity: 0.2,
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(-45deg, var(--primary) 0%, transparent 100%)",
                        opacity: 0.2,
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
