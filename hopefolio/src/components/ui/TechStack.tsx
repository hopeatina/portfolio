import React, { useState } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
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
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: isDarkTheme
          ? "var(--color-background)"
          : "var(--color-surface)",
        minHeight: "600px",
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
            Tech Stack
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{
              color: "var(--color-text)",
              fontFamily: "var(--font-body)",
              opacity: isDarkTheme ? 0.9 : 1,
            }}
          >
            Technologies I use to bring ideas to life
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 space-x-4" role="tablist">
          {techCategories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              className="px-6 py-3 rounded-full transition-all duration-300 relative group"
              style={{
                background:
                  activeTab === index
                    ? isDarkTheme
                      ? "var(--color-primary)"
                      : "var(--gradient-primary)"
                    : "transparent",
                color:
                  activeTab === index
                    ? isDarkTheme
                      ? "var(--color-background)"
                      : "white"
                    : "var(--color-text)",
                border: `2px solid ${
                  activeTab === index
                    ? "transparent"
                    : isDarkTheme
                    ? "var(--color-primary)"
                    : "var(--color-border)"
                }`,
              }}
            >
              <span className="relative z-10 font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div
          className="relative p-8 rounded-2xl overflow-hidden"
          style={{
            background: isDarkTheme ? "rgba(255, 255, 255, 0.02)" : "white",
            border: isDarkTheme
              ? "1px solid var(--color-primary)"
              : "1px solid var(--color-border)",
            boxShadow: isDarkTheme
              ? "0 0 40px rgba(0, 238, 92, 0.1)"
              : "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techCategories[activeTab].items.map((item, index) => (
              <div
                key={item.name}
                className="group relative flex items-center justify-center p-6 rounded-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: isDarkTheme
                    ? "rgba(0, 238, 92, 0.05)"
                    : "var(--color-surface)",
                  border: isDarkTheme
                    ? "1px solid rgba(0, 238, 92, 0.2)"
                    : "1px solid var(--color-border)",
                  height: "100px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = isDarkTheme
                    ? "0 0 30px rgba(0, 238, 92, 0.3)"
                    : "0 10px 20px rgba(109, 40, 217, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  {item.icon && (
                    <div className="transition-transform duration-500 group-hover:scale-110">
                      {React.createElement(item.icon, {
                        className: "w-7 h-7",
                        style: {
                          color: isDarkTheme
                            ? "var(--color-primary)"
                            : "var(--color-primary)",
                        },
                      })}
                    </div>
                  )}
                  <div
                    className="font-medium text-center text-sm"
                    style={{
                      color: "var(--color-text)",
                      opacity: isDarkTheme ? 0.9 : 1,
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
