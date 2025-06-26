import React, { useState } from "react";
import Head from "next/head";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import styles from "@/styles/themes/base-theme.module.css";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { FaMedium } from "react-icons/fa";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
  const isCameroonianTheme = theme === "cameroonian";
  const bgIsDark = isDarkTheme;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Form submission logic will be implemented later
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Temporary simulation
      setFormStatus("success");
    } catch (error) {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Theme-specific styles
  const getCardStyle = () => {
    if (isRiceTheme) {
      return {
        background: "rgba(255, 255, 255, 0.98)",
        border: "1px solid rgba(0, 32, 91, 0.2)",
        boxShadow: "0 8px 16px rgba(0, 32, 91, 0.08)",
      };
    }
    if (isCameroonianTheme) {
      return {
        background: "rgba(255, 255, 255, 0.98)",
        border: "1px solid rgba(var(--primary-rgb), 0.2)",
        boxShadow: "0 8px 16px rgba(var(--primary-rgb), 0.08)",
      };
    }
    if (isDarkTheme) {
      return {
        background: "rgba(10, 10, 10, 0.7)",
        border: "1px solid rgba(var(--primary-rgb), 0.3)",
        boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.1)",
      };
    }
    return {
      background: "var(--card-bg)",
      border: "1px solid var(--border)",
      boxShadow: "var(--box-shadow-card)",
    };
  };

  const getInputStyle = () => {
    if (isRiceTheme) {
      return {
        background: "white",
        border: "1px solid rgba(0, 32, 91, 0.2)",
        color: "var(--text)",
      };
    }
    if (isCameroonianTheme) {
      return {
        background: "white",
        border: "1px solid rgba(var(--primary-rgb), 0.2)",
        color: "var(--text)",
      };
    }
    if (isDarkTheme) {
      return {
        background: "rgba(var(--primary-rgb), 0.05)",
        border: "1px solid rgba(var(--primary-rgb), 0.2)",
        color: "var(--text-on-dark)",
        boxShadow: "0 0 10px rgba(var(--primary-rgb), 0.05)",
      };
    }
    return {
      background: "var(--input-bg)",
      border: "1px solid var(--border)",
      color: "var(--text)",
    };
  };

  const getButtonStyle = () => {
    if (isRiceTheme) {
      return {
        background: "var(--primary)",
        color: "white",
        boxShadow: "0 4px 12px rgba(0, 32, 91, 0.15)",
        border: "none",
      };
    }
    if (isCameroonianTheme) {
      return {
        background: "var(--primary)",
        color: "white",
        boxShadow: "0 4px 12px rgba(var(--primary-rgb), 0.15)",
        border: "none",
      };
    }
    if (isDarkTheme) {
      return {
        background: "rgba(var(--primary-rgb), 0.1)",
        color: "var(--primary)",
        border: "1px solid var(--primary)",
        boxShadow: "0 0 15px rgba(var(--primary-rgb), 0.1)",
      };
    }
    return {
      background: "var(--gradient-primary)",
      color: "white",
      border: "none",
    };
  };

  return (
    <>
      <Head>
        <title>Contact | Emerging Hope</title>
        <meta
          name="description"
          content="Get in touch to discuss collaborations, projects, or just to say hello"
        />
      </Head>

      <main
        className={`min-h-screen relative ${styles.fadeIn}`}
        style={{
          background: isRiceTheme
            ? "linear-gradient(180deg, rgba(0, 32, 91, 0.05) 0%, rgba(0, 32, 91, 0.02) 100%)"
            : isCameroonianTheme
            ? "linear-gradient(180deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(var(--primary-rgb), 0.02) 100%)"
            : bgIsDark
            ? "var(--background)"
            : "var(--surface)",
          paddingTop: "6rem",
          paddingBottom: "4rem",
        }}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isRiceTheme
              ? "radial-gradient(circle at 20% 20%, rgba(0, 32, 91, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(0, 32, 91, 0.05) 0%, transparent 40%)"
              : isCameroonianTheme
              ? "radial-gradient(circle at 20% 20%, rgba(var(--primary-rgb), 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(var(--primary-rgb), 0.05) 0%, transparent 40%)"
              : "var(--background-pattern)",
            opacity: isRiceTheme ? 0.5 : bgIsDark ? 0.15 : 0.1,
            mixBlendMode: "overlay",
          }}
        />

        <div className={`${styles.container} relative z-10`}>
          <div className="text-center mb-12">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                styles.headingH1
              } ${bgIsDark ? styles.gradientText : ""}`}
              style={{
                color: isRiceTheme
                  ? "var(--primary)"
                  : isCameroonianTheme
                  ? "var(--primary)"
                  : bgIsDark
                  ? "transparent"
                  : "var(--text)",
                textShadow: isRiceTheme
                  ? "0 2px 4px rgba(0, 32, 91, 0.15)"
                  : isCameroonianTheme
                  ? "0 2px 4px rgba(var(--primary-rgb), 0.15)"
                  : bgIsDark
                  ? "0 0 10px rgba(var(--primary-rgb), 0.3)"
                  : "none",
                fontFamily: bgIsDark
                  ? "var(--font-mono)"
                  : "var(--font-heading)",
              }}
            >
              Let's Connect
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{
                color: isRiceTheme
                  ? "rgba(255, 255, 255, 0.9)"
                  : isCameroonianTheme
                  ? "rgba(255, 255, 255, 0.9)"
                  : bgIsDark
                  ? "var(--text-on-dark)"
                  : "var(--text)",
                opacity: 0.9,
                fontFamily: bgIsDark ? "var(--font-mono)" : "var(--font-body)",
                textShadow:
                  isRiceTheme || isCameroonianTheme
                    ? "0 1px 2px rgba(0, 0, 0, 0.1)"
                    : "none",
              }}
            >
              Feel free to reach out, and I'll get back to you soon!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className={`p-8 ${styles.fadeUp}`} style={getCardStyle()}>
              <h2
                className={`text-2xl font-bold mb-6 ${styles.headingH2}`}
                style={{
                  color: isRiceTheme
                    ? "var(--primary)"
                    : isCameroonianTheme
                    ? "var(--primary)"
                    : bgIsDark
                    ? "var(--primary)"
                    : "var(--text)",
                  textShadow: bgIsDark
                    ? "0 0 8px rgba(var(--primary-rgb), 0.2)"
                    : "none",
                  fontFamily: bgIsDark
                    ? "var(--font-mono)"
                    : "var(--font-heading)",
                }}
              >
                I'd love to hear from you!
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 flex items-center gap-2"
                    style={{
                      color: isRiceTheme
                        ? "var(--text)"
                        : isCameroonianTheme
                        ? "var(--text)"
                        : bgIsDark
                        ? "var(--primary)"
                        : "var(--text)",
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                  >
                    <FiUser
                      className={`w-4 h-4 ${bgIsDark ? "opacity-80" : ""}`}
                    />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-lg transition-all ${
                      bgIsDark ? "focus:ring-1" : "focus:ring-2"
                    } focus:ring-primary focus:ring-opacity-50`}
                    style={{
                      ...getInputStyle(),
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 flex items-center gap-2"
                    style={{
                      color: isRiceTheme
                        ? "var(--text)"
                        : isCameroonianTheme
                        ? "var(--text)"
                        : bgIsDark
                        ? "var(--primary)"
                        : "var(--text)",
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                  >
                    <FiMail
                      className={`w-4 h-4 ${bgIsDark ? "opacity-80" : ""}`}
                    />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 rounded-lg transition-all ${
                      bgIsDark ? "focus:ring-1" : "focus:ring-2"
                    } focus:ring-primary focus:ring-opacity-50`}
                    style={{
                      ...getInputStyle(),
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 flex items-center gap-2"
                    style={{
                      color: isRiceTheme
                        ? "var(--text)"
                        : isCameroonianTheme
                        ? "var(--text)"
                        : bgIsDark
                        ? "var(--primary)"
                        : "var(--text)",
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                  >
                    <FiMessageSquare
                      className={`w-4 h-4 ${bgIsDark ? "opacity-80" : ""}`}
                    />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="What would you like to discuss?"
                    className={`w-full px-4 py-3 rounded-lg transition-all ${
                      bgIsDark ? "focus:ring-1" : "focus:ring-2"
                    } focus:ring-primary focus:ring-opacity-50 resize-vertical`}
                    style={{
                      ...getInputStyle(),
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 text-lg font-medium transition-all hover:transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                    bgIsDark ? "hover:glow-primary" : ""
                  }`}
                  style={{
                    ...getButtonStyle(),
                    fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                {formStatus === "success" && (
                  <div
                    className="text-center mt-4 p-3 rounded-lg"
                    style={{
                      background: bgIsDark
                        ? "rgba(var(--success-rgb), 0.1)"
                        : "rgba(var(--success-rgb), 0.1)",
                      color: "var(--success)",
                      border: "1px solid var(--success)",
                      boxShadow: bgIsDark
                        ? "0 0 10px rgba(var(--success-rgb), 0.1)"
                        : "none",
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                  >
                    Thanks for your message! I'll get back to you soon.
                  </div>
                )}
                {formStatus === "error" && (
                  <div
                    className="text-center mt-4 p-3 rounded-lg"
                    style={{
                      background: bgIsDark
                        ? "rgba(var(--error-rgb), 0.1)"
                        : "rgba(var(--error-rgb), 0.1)",
                      color: "var(--error)",
                      border: "1px solid var(--error)",
                      boxShadow: bgIsDark
                        ? "0 0 10px rgba(var(--error-rgb), 0.1)"
                        : "none",
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                  >
                    Oops! Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </Card>

            <Card
              className={`p-8 ${styles.fadeUp} ${styles.delayBase}`}
              style={getCardStyle()}
            >
              <h2
                className={`text-2xl font-bold mb-6 ${styles.headingH2}`}
                style={{
                  color: isRiceTheme
                    ? "var(--primary)"
                    : isCameroonianTheme
                    ? "var(--primary)"
                    : bgIsDark
                    ? "var(--primary)"
                    : "var(--text)",
                  textShadow: bgIsDark
                    ? "0 0 8px rgba(var(--primary-rgb), 0.2)"
                    : "none",
                  fontFamily: bgIsDark
                    ? "var(--font-mono)"
                    : "var(--font-heading)",
                }}
              >
                Other Ways to Connect
              </h2>
              <div className="space-y-8">
                <div>
                  <h3
                    className="text-lg font-semibold mb-3 flex items-center gap-2"
                    style={{
                      color: isRiceTheme
                        ? "var(--text)"
                        : isCameroonianTheme
                        ? "var(--text)"
                        : bgIsDark
                        ? "var(--primary)"
                        : "var(--text)",
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                  >
                    <FiMail
                      className={`w-5 h-5 ${bgIsDark ? "opacity-80" : ""}`}
                    />
                    Email
                  </h3>
                  <a
                    href="mailto:hello@emerginghope.dev"
                    className={`inline-block transition-all hover:transform hover:translate-x-1 ${
                      bgIsDark ? "hover:glow-primary" : "hover:opacity-80"
                    }`}
                    style={{
                      color: isRiceTheme
                        ? "var(--primary)"
                        : isCameroonianTheme
                        ? "var(--primary)"
                        : bgIsDark
                        ? "var(--primary)"
                        : "var(--accent)",
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                  >
                    hello@emerginghope.dev
                  </a>
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold mb-4 flex items-center gap-2"
                    style={{
                      color: isRiceTheme
                        ? "var(--text)"
                        : isCameroonianTheme
                        ? "var(--text)"
                        : bgIsDark
                        ? "var(--primary)"
                        : "var(--text)",
                      fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                    }}
                  >
                    Social Media
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://github.com/hopeatina"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:transform hover:scale-105 ${
                        bgIsDark ? "hover:glow-primary" : ""
                      }`}
                      style={{
                        ...getButtonStyle(),
                        fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                      }}
                      aria-label="GitHub Profile"
                    >
                      <FiGithub className="w-5 h-5" />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/hopeatina"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:transform hover:scale-105 ${
                        bgIsDark ? "hover:glow-primary" : ""
                      }`}
                      style={{
                        ...getButtonStyle(),
                        fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                      }}
                      aria-label="LinkedIn Profile"
                    >
                      <FiLinkedin className="w-5 h-5" />
                      LinkedIn
                    </a>
                    <a
                      href="https://x.com/emerginghope_"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:transform hover:scale-105 ${
                        bgIsDark ? "hover:glow-primary" : ""
                      }`}
                      style={{
                        ...getButtonStyle(),
                        fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                      }}
                      aria-label="X Profile"
                    >
                      <FiTwitter className="w-5 h-5" />X
                    </a>
                    <a
                      href="https://medium.com/@hopeatina"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:transform hover:scale-105 ${
                        bgIsDark ? "hover:glow-primary" : ""
                      }`}
                      style={{
                        ...getButtonStyle(),
                        fontFamily: bgIsDark ? "var(--font-mono)" : "inherit",
                      }}
                      aria-label="Medium Profile"
                    >
                      <FaMedium className="w-5 h-5" />
                      Medium
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
