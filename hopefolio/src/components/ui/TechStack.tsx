import React, { useState } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiPostgresql,
  SiReact,
  SiNextdotjs,
  SiSpring,
  SiAngular,
  SiFlask,
  SiDjango,
  SiExpress,
  SiNodedotjs,
  SiApachekafka,
  SiApachespark,
  SiCelery,
  SiVercel,
  SiGit,
  SiGithubactions,
  SiUnity,
  SiSupabase,
  SiRetool,
  SiSentry,
  SiOpenai,
  SiDatadog,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { DiScala } from "react-icons/di";
import { TbBrandMysql } from "react-icons/tb";
import { GrOracle } from "react-icons/gr";

type TechCategory = {
  name: string;
  items: {
    name: string;
    icon?: React.ComponentType<any>;
  }[];
};

const techCategories: TechCategory[] = [
  {
    name: "Languages",
    items: [
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Java", icon: FaJava },
      { name: "Scala", icon: DiScala },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS", icon: SiCss3 },
      { name: "SQL", icon: TbBrandMysql },
    ],
  },
  {
    name: "Frameworks",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Spring Boot", icon: SiSpring },
      { name: "Angular", icon: SiAngular },
      { name: "React Native", icon: SiReact },
      { name: "Flask", icon: SiFlask },
      { name: "Django", icon: SiDjango },
      { name: "Express", icon: SiExpress },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Kafka", icon: SiApachekafka },
      { name: "Apache Spark", icon: SiApachespark },
      { name: "Celery", icon: SiCelery },
    ],
  },
  {
    name: "Tools & Services",
    items: [
      { name: "AWS Lambda", icon: FaAws },
      { name: "Vercel", icon: SiVercel },
      { name: "DynamoDB", icon: FaAws },
      { name: "Git", icon: SiGit },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "EMR", icon: FaAws },
      { name: "Modal" },
      { name: "Unity", icon: SiUnity },
      { name: "Langtrace" },
      { name: "Supabase", icon: SiSupabase },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Retool", icon: SiRetool },
      { name: "Sentry", icon: SiSentry },
      { name: "Oracle", icon: GrOracle },
      { name: "OpenAI", icon: SiOpenai },
      { name: "Anthropic" },
      { name: "Fal.ai" },
      { name: "Datadog", icon: SiDatadog },
    ],
  },
];

const TechStack = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";
  const [activeTab, setActiveTab] = useState(0);

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
          className="relative p-8 rounded-2xl overflow-hidden"
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
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: "var(--gradient-primary)",
              opacity: isDarkTheme ? 1 : 0.8,
              borderTopLeftRadius: "inherit",
              borderTopRightRadius: "inherit",
            }}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techCategories[activeTab].items.map((item) => (
              <div
                key={item.name}
                className={`group relative flex items-center justify-center p-6 rounded-xl transition-all duration-500 hover:scale-[1.02] overflow-hidden ${styles.shimmerEffectHover}`}
                style={{
                  background: isDarkTheme ? "rgba(30, 30, 30, 0.6)" : "white",
                  border: `1px solid ${
                    isDarkTheme
                      ? "rgba(var(--primary-rgb), 0.1)"
                      : "var(--icon-border)"
                  }`,
                  height: "100px",
                  boxShadow: isDarkTheme
                    ? "0 4px 6px rgba(0, 0, 0, 0.2)"
                    : "0 4px 6px rgba(0, 0, 0, 0.05)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Shimmer Effect */}
                <div className={styles.shimmerEffect} />

                <div className="flex flex-col items-center justify-center gap-3 relative z-10">
                  {item.icon && (
                    <div className="flex justify-center transition-transform duration-500 group-hover:scale-110">
                      {React.createElement(item.icon, {
                        className: "w-7 h-7 transition-all duration-500",
                        style: {
                          color: isDarkTheme
                            ? "var(--primary)"
                            : "var(--accent)",
                        },
                      })}
                    </div>
                  )}
                  <div
                    className="font-medium text-center transition-all duration-500"
                    style={{
                      color: isDarkTheme
                        ? "var(--text-on-dark)"
                        : "var(--text)",
                    }}
                  >
                    {item.name}
                  </div>
                </div>

                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                  style={{
                    background: isDarkTheme
                      ? "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%)"
                      : "radial-gradient(circle at center, rgba(var(--accent-rgb), 0.15) 0%, transparent 70%)",
                    zIndex: 1,
                  }}
                />
              </div>
            ))}
          </div>

          <style jsx>{`
            .group {
              will-change: transform, box-shadow;
            }

            .group:hover {
              box-shadow: ${isDarkTheme
                ? "0 10px 40px -10px rgba(var(--primary-rgb), 0.3), 0 8px 16px -8px rgba(0, 0, 0, 0.2)"
                : "0 10px 40px -10px rgba(var(--accent-rgb), 0.3), 0 8px 16px -8px rgba(0, 0, 0, 0.2)"};
            }

            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }

            .group:hover .shimmer {
              animation: shimmer 2s infinite;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
