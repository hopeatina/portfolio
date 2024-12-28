import React, { useState } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

type TechCategory = {
  name: string;
  items: {
    name: string;
    icon?: string;
    proficiency?: "expert" | "advanced" | "intermediate";
  }[];
};

const techCategories: TechCategory[] = [
  {
    name: "Languages",
    items: [
      { name: "Python", proficiency: "expert" },
      { name: "JavaScript", proficiency: "expert" },
      { name: "TypeScript", proficiency: "expert" },
      { name: "Java", proficiency: "advanced" },
      { name: "Scala", proficiency: "advanced" },
      { name: "HTML5", proficiency: "expert" },
      { name: "CSS", proficiency: "expert" },
      { name: "SQL", proficiency: "expert" },
      { name: "MATLAB", proficiency: "intermediate" },
    ],
  },
  {
    name: "Frameworks",
    items: [
      { name: "React", proficiency: "expert" },
      { name: "Next.js", proficiency: "expert" },
      { name: "Spring Boot", proficiency: "advanced" },
      { name: "Angular", proficiency: "advanced" },
      { name: "React Native", proficiency: "advanced" },
      { name: "Flask", proficiency: "expert" },
      { name: "Django", proficiency: "expert" },
      { name: "Express", proficiency: "advanced" },
      { name: "Node.js", proficiency: "expert" },
      { name: "Kafka", proficiency: "intermediate" },
      { name: "Apache Spark", proficiency: "advanced" },
      { name: "Celery", proficiency: "advanced" },
    ],
  },
  {
    name: "Tools & Services",
    items: [
      { name: "AWS Lambda", proficiency: "expert" },
      { name: "Vercel", proficiency: "expert" },
      { name: "DynamoDB", proficiency: "advanced" },
      { name: "Git", proficiency: "expert" },
      { name: "GitHub Actions", proficiency: "advanced" },
      { name: "EMR", proficiency: "intermediate" },
      { name: "Modal", proficiency: "advanced" },
      { name: "Unity", proficiency: "intermediate" },
      { name: "Langtrace", proficiency: "advanced" },
      { name: "Supabase", proficiency: "advanced" },
      { name: "PostgreSQL", proficiency: "expert" },
      { name: "Retool", proficiency: "intermediate" },
      { name: "Sentry", proficiency: "advanced" },
      { name: "Rollbar", proficiency: "advanced" },
      { name: "OpenAI", proficiency: "expert" },
      { name: "Anthropic", proficiency: "advanced" },
      { name: "Fal.ai", proficiency: "advanced" },
      { name: "Datadog", proficiency: "advanced" },
    ],
  },
];

const TechStack = () => {
  const { theme, getThemeStyles } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";
  const [activeTab, setActiveTab] = useState(0);

  // Calculate the maximum number of rows needed for any tab
  const maxRows = Math.max(
    ...techCategories.map((cat) => Math.ceil(cat.items.length / 4))
  );
  const gridHeight = maxRows * 64; // 64px per row (adjust as needed)

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
          background: "var(--background-pattern)",
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
            Tech Stack
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
            Technologies I use to bring ideas to life
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 space-x-4">
          {techCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-full transition-all duration-300 relative group`}
              style={{
                background:
                  activeTab === index
                    ? isDarkTheme
                      ? "rgba(var(--primary-rgb), 0.1)"
                      : "var(--gradient-primary)"
                    : "transparent",
                color:
                  activeTab === index
                    ? isDarkTheme
                      ? "var(--primary)"
                      : "white"
                    : isDarkTheme
                    ? "var(--text-on-dark)"
                    : "var(--text)",
                border: `1px solid ${
                  activeTab === index
                    ? isDarkTheme
                      ? "var(--primary)"
                      : "transparent"
                    : isDarkTheme
                    ? "rgba(var(--primary-rgb), 0.2)"
                    : "var(--icon-border)"
                }`,
              }}
            >
              <span className="relative z-10 font-medium">{category.name}</span>
              {isDarkTheme && activeTab === index && (
                <div
                  className="absolute inset-0 rounded-full opacity-10"
                  style={{
                    background: "var(--gradient-primary)",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div
          className="relative p-8 rounded-2xl"
          style={{
            background: isDarkTheme
              ? "rgba(10, 10, 10, 0.5)"
              : "var(--card-bg)",
            border: `1px solid ${
              isDarkTheme
                ? "rgba(var(--primary-rgb), 0.2)"
                : "var(--icon-border)"
            }`,
            boxShadow: "var(--box-shadow-card)",
          }}
        >
          {/* Decorative Top Border */}
          <div
            className="absolute inset-x-0 top-0 h-1 rounded-t-[inherit]"
            style={{
              background: "var(--gradient-primary)",
              opacity: isDarkTheme ? 1 : 0.8,
            }}
          />

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ minHeight: `${gridHeight}px` }}
          >
            {techCategories[activeTab].items.map((item) => (
              <div
                key={item.name}
                className="group relative p-4 rounded-xl transition-all duration-300 hover:transform hover:scale-105"
                style={{
                  background: isDarkTheme
                    ? "rgba(var(--primary-rgb), 0.05)"
                    : "white",
                  border: `1px solid ${
                    isDarkTheme
                      ? "rgba(var(--primary-rgb), 0.1)"
                      : "var(--icon-border)"
                  }`,
                }}
              >
                <div className="text-center space-y-1">
                  <div
                    className="font-medium"
                    style={{
                      color: isDarkTheme
                        ? "var(--text-on-dark)"
                        : "var(--text)",
                    }}
                  >
                    {item.name}
                  </div>
                  {item.proficiency && (
                    <div
                      className="text-sm"
                      style={{
                        color: isDarkTheme
                          ? "var(--text-muted-on-dark)"
                          : "var(--text-muted)",
                      }}
                    >
                      {item.proficiency}
                    </div>
                  )}
                </div>

                {/* Hover Effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: isDarkTheme
                      ? "linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, transparent 100%)"
                      : "linear-gradient(135deg, rgba(var(--accent-rgb), 0.1) 0%, transparent 100%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
