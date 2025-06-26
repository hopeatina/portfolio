import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import SystemDiagram from "@/components/projects/SystemDiagram";
import ProjectCard from "@/components/projects/ProjectCard";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function BeliefMap() {
  const { themeProps } = useTheme();

  const techStack = [
    { category: "Frontend", technologies: "React, TypeScript, D3.js" },
    {
      category: "Visualization",
      technologies: "Canvas API, SVG, Interactive Charts",
    },
    { category: "Data", technologies: "Graph Database, Local Storage" },
    { category: "AI/ML", technologies: "Pattern Recognition, Insight Engine" },
    {
      category: "Design",
      technologies: "Responsive UI, Dark Mode, Gamification",
    },
    { category: "Architecture", technologies: "Local-First, Privacy-Focused" },
  ];

  const coreFeatures = [
    {
      title: "🗺️ Guided Path Discovery",
      description:
        "Navigate through carefully crafted questions that help uncover deeper beliefs. The system adapts based on your responses, creating a personalized exploration journey.",
      items: [
        "Progressive questioning system (8+ areas)",
        "Quickstart and Deep Dive modes",
        "Adaptive question paths based on responses",
        "Real-time progress tracking",
      ],
    },
    {
      title: "🔍 Insight Engine",
      description:
        "Advanced pattern recognition analyzes your beliefs to reveal hidden connections and potential growth areas across multiple life domains.",
      items: [
        "Pattern detection across belief categories",
        "Conflict and alignment analysis",
        "Growth opportunity identification",
        "Experience points and gamification",
      ],
    },
    {
      title: "📊 Interactive Visualization",
      description:
        "Beautiful, interactive visualizations bring your belief system to life through multiple viewing modes and real-time interactions.",
      items: [
        "Dynamic radar charts for belief categories",
        "Interactive node-based belief mapping",
        "Connection strength visualization",
        "Multiple view modes (Summary/Beliefs)",
      ],
    },
    {
      title: "🎯 Belief Categories",
      description:
        "Comprehensive coverage of life areas ensures holistic self-understanding across all aspects of personal philosophy.",
      items: [
        "Self-Worth & Identity",
        "Relationships & Trust",
        "Work & Achievement",
        "Money & Security",
        "Health & Body",
        "Morality & Justice",
        "Spirituality & Meaning",
        "Worldview & Future",
      ],
    },
  ];

  const technicalFeatures = [
    {
      title: "⚛️ Frontend Excellence",
      description:
        "Modern React architecture with advanced visualization capabilities",
      items: [
        "React with TypeScript for type safety",
        "D3.js for sophisticated data visualizations",
        "Canvas API for smooth graph interactions",
        "Responsive design for all devices",
        "Dark mode with elegant UI themes",
      ],
    },
    {
      title: "🧠 Data & Intelligence",
      description:
        "Advanced data modeling and AI-powered insights for belief analysis",
      items: [
        "Graph-based data model for belief networks",
        "Local-first architecture for privacy",
        "AI-powered insight generation",
        "Real-time pattern analysis",
        "Persistent state management",
      ],
    },
  ];

  const uxInnovations = [
    {
      title: "🎮 Gamification",
      description:
        "Experience points, progress tracking, and achievement systems make self-discovery engaging and rewarding.",
    },
    {
      title: "🔒 Privacy-First",
      description:
        "All data stored locally with optional export. Your beliefs remain private and under your control.",
    },
    {
      title: "🎨 Adaptive UI",
      description:
        "Interface adapts to user progress, showing relevant features as the belief map grows.",
    },
  ];

  const systemFlow = `User Input → Belief Extraction → Pattern Analysis → Graph Generation → Visualization → Insights
     ↑                                                                                    ↓
Question Engine ←―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――→ Growth Recommendations`;

  const achievements = [
    "Innovative UX Design: Created an intuitive flow that makes deep introspection accessible to everyone",
    "Advanced Visualizations: Developed custom D3.js visualizations for complex belief networks",
    "AI Integration: Implemented intelligent pattern recognition for meaningful insights",
    "Privacy-Focused: Built with local-first architecture to ensure user data remains private",
  ];

  return (
    <ProjectLayout
      title="Belief Map"
      description="An interactive self-discovery platform that visualizes and analyzes personal beliefs through guided exploration, pattern recognition, and dynamic mapping"
    >
      <ProjectHero
        title="Belief Map"
        description="Transform self-reflection into an interactive journey. BeliefMap is a groundbreaking tool that helps you explore, visualize, and understand your deepest beliefs through AI-powered insights, guided questioning, and beautiful data visualizations."
        tags={[
          "React",
          "D3.js",
          "AI Integration",
          "Graph Visualization",
          "Self-Discovery",
          "Interactive Design",
        ]}
        image="/images/projects/belief-map.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="The Journey of Self-Discovery">
        <p className="text-lg mb-4">
          BeliefMap began with a simple yet profound question from a friend:
          "What's a belief you hold that most others don't?" This sparked a
          journey into creating a tool that could help anyone explore their
          inner landscape of beliefs, values, and assumptions.
        </p>
        <p className="mb-6">
          The result is an immersive platform that transforms introspection into
          an interactive, visual experience. Through guided paths, dynamic
          visualizations, and AI-powered insights, BeliefMap helps users
          understand not just what they believe, but why they believe it and how
          their beliefs interconnect.
        </p>

        <SystemDiagram
          title="Belief Discovery Flow"
          diagram={systemFlow}
          type="text"
          description="The system guides users through a structured discovery process, analyzing responses to build a comprehensive belief map with actionable insights."
        />
      </ProjectSection>

      <ProjectSection title="Core Features">
        <FeatureGrid features={coreFeatures} columns={2} />
      </ProjectSection>

      <ProjectSection title="Technical Implementation">
        <FeatureGrid features={technicalFeatures} columns={2} />

        <div className="mt-8">
          <h3
            className="text-xl font-semibold mb-6"
            style={{
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.headingFont,
            }}
          >
            User Experience Innovation
          </h3>
          <FeatureGrid features={uxInnovations} columns={3} />
        </div>
      </ProjectSection>

      <ProjectSection title="Impact & Vision">
        <p className="text-lg mb-6">
          BeliefMap represents a new paradigm in personal development tools. By
          making our internal dialogues visual and interactive, we can better
          understand ourselves and challenge our assumptions in a structured,
          approachable way.
        </p>

        <ProjectCard variant="accent" className="mb-6">
          <h3
            className="text-xl font-semibold mb-4"
            style={{
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.headingFont,
            }}
          >
            Key Achievements
          </h3>
          <ul className="space-y-3">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: themeProps.colors.primary }}
                />
                <span style={{ color: themeProps.colors.text }}>
                  <strong>{achievement.split(":")[0]}:</strong>{" "}
                  {achievement.split(":")[1]}
                </span>
              </li>
            ))}
          </ul>
        </ProjectCard>

        <ProjectCard variant="highlight">
          <p
            className="italic text-center text-lg"
            style={{
              color: themeProps.colors.text,
              fontFamily: themeProps.typography.bodyFont,
              lineHeight: themeProps.typography.lineHeight,
            }}
          >
            "BeliefMap has been as much about developing myself as it is about
            developing software. It's designed to make introspection and healthy
            self-debate visual, interactive, and genuinely transformative."
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectCTA
        demoUrl="https://beliefmap.replit.app"
        githubUrl="https://github.com/hopeatina/mybeliefmap"
      />
    </ProjectLayout>
  );
}
