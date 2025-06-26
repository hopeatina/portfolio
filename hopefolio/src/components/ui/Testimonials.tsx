import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { FaQuoteLeft } from "react-icons/fa";

type Testimonial = {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "CTO",
    company: "TechForward Inc.",
    content:
      "Hope's ability to bridge the gap between complex technical concepts and user-friendly solutions is remarkable. Her work on our AI systems has been transformative.",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    title: "Product Director",
    company: "InnovateLab",
    content:
      "Working with Hope was a game-changer for our product development. She brings both deep technical expertise and a creative approach to problem-solving.",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    title: "Research Lead",
    company: "BioTech Solutions",
    content:
      "Hope's bioengineering background combined with her software skills created innovative solutions we didn't think were possible. Truly interdisciplinary thinking.",
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
            What People Say
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-body)",
              opacity: isDarkTheme ? 0.9 : 1,
            }}
          >
            Feedback from colleagues and clients I've had the pleasure of
            working with
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative p-8 rounded-2xl transition-all duration-500 hover:scale-[1.02]"
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
              {/* Quote Icon */}
              <div
                className="mb-6"
                style={{
                  color: isDarkTheme
                    ? "var(--color-primary)"
                    : "var(--color-primary)",
                  opacity: 0.3,
                }}
              >
                <FaQuoteLeft size={32} />
              </div>

              {/* Content */}
              <p
                className="mb-6 text-lg"
                style={{
                  color: "var(--color-text)",
                  fontFamily: "var(--font-body)",
                  lineHeight: "1.8",
                  opacity: isDarkTheme ? 0.9 : 1,
                }}
              >
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <h4
                  className="font-bold text-lg"
                  style={{
                    color: isDarkTheme
                      ? "var(--color-primary)"
                      : "var(--color-text)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {testimonial.name}
                </h4>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--color-text)",
                    opacity: 0.7,
                  }}
                >
                  {testimonial.title} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
