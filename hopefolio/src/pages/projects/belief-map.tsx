import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import MermaidDiagram from "@/components/projects/MermaidDiagram";
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
    { category: "Data", technologies: "Local Storage" },
    {
      category: "Design",
      technologies: "Responsive UI, Dark Mode",
    },
    { category: "Architecture", technologies: "Local-First, Privacy-Focused" },
  ];

  const coreFeatures = [
    {
      title: "Guided Path Discovery (Planned)",
      description:
        "Structured questions designed to help uncover deeper beliefs, creating a personalized exploration journey.",
      items: [
        "Progressive questioning system across multiple life areas",
        "Quickstart and Deep Dive modes",
        "Question paths that adapt based on exploration",
        "Progress tracking through the discovery process",
      ],
    },
    {
      title: "Interactive Visualization (Planned)",
      description:
        "Interactive visualizations to bring belief systems to life through multiple viewing modes.",
      items: [
        "Dynamic radar charts for belief categories",
        "Interactive node-based belief mapping",
        "Connection strength visualization",
        "Multiple view modes (Summary/Beliefs)",
      ],
    },
    {
      title: "Belief Categories",
      description:
        "Coverage of life areas for holistic self-understanding across personal philosophy.",
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
      title: "Planned Frontend",
      description: "React architecture with D3.js visualization capabilities",
      items: [
        "React with TypeScript for type safety",
        "D3.js for data visualizations",
        "Canvas API for graph interactions",
        "Responsive design for all devices",
        "Dark mode support",
      ],
    },
    {
      title: "Privacy-First Data Design",
      description:
        "Local-first architecture to keep belief data fully private",
      items: [
        "Graph-based data model for belief networks",
        "Local storage only — no server-side data collection",
        "Optional export for personal backup",
        "No accounts required",
        "Persistent local state management",
      ],
    },
  ];

  const uxInnovations = [
    {
      title: "Gamification (Planned)",
      description:
        "Experience points, progress tracking, and achievement systems to make self-discovery engaging.",
    },
    {
      title: "Privacy-First",
      description:
        "All data stored locally with optional export. Beliefs remain private and under user control.",
    },
    {
      title: "Adaptive UI (Planned)",
      description:
        "Interface that adapts to user progress, showing relevant features as the belief map grows.",
    },
  ];

  const beliefMapDiagram = `
    flowchart LR
      subgraph "Discovery Process"
        A[User Input] --> B[Belief Extraction]
        B --> C[Pattern Analysis]
      end

      subgraph "Visualization Engine"
        D[Graph Generation] --> E[Node Network]
        E --> F[Interactive Canvas]
        E --> G[Radar Charts]
      end

      subgraph "Insight Generation"
        H[Pattern Detection] --> I[Growth Areas]
        H --> J[Conflict Detection]
      end

      C --> D
      C --> H
      F --> K[User Interaction]
      I --> L[Personalized Insights]
      J --> L
      K --> A

      style A fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style E fill:#3B82F6,stroke:#2563EB,color:#fff
      style L fill:#10B981,stroke:#059669,color:#fff
  `;

  const designGoals = [
    "Intuitive UX: An approachable flow that makes deep introspection feel accessible rather than overwhelming",
    "D3.js Visualizations: Custom graph visualizations for complex belief networks as a design target",
    "Privacy-Focused: Local-first architecture ensuring user data never leaves their device",
    "No Accounts Needed: Self-contained experience with optional data export",
  ];

  return (
    <ProjectLayout
      title="Belief Map"
      description="An early-stage experimental concept for an interactive self-discovery platform that visualizes personal beliefs through guided exploration and dynamic mapping"
    >
      <ProjectHero
        title="Belief Map"
        description="An early-stage concept exploring how guided questioning and graph visualization could help people map and understand their own belief systems. The GitHub repository (MyBeliefMap) is in its initial stages — this page documents the design vision and planned architecture."
        tags={[
          "Concept",
          "React",
          "D3.js",
          "Graph Visualization",
          "Self-Discovery",
          "Early Stage",
        ]}
        image="/images/projects/belief-map.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="The Idea">
        <p className="text-lg mb-4">
          BeliefMap began with a simple yet profound question from a friend:
          &ldquo;What&rsquo;s a belief you hold that most others don&rsquo;t?&rdquo; This sparked a
          journey into designing a tool that could help anyone explore their
          inner landscape of beliefs, values, and assumptions.
        </p>
        <p className="mb-6">
          The concept envisions an immersive platform that transforms
          introspection into an interactive, visual experience. Through guided
          paths and dynamic visualizations, BeliefMap aims to help users
          understand not just what they believe, but why they believe it and
          how their beliefs interconnect. The repository is in early stages
          &mdash; this is a design exploration rather than a shipped product.
        </p>

        <MermaidDiagram
          title="Planned Belief Discovery Flow"
          diagram={beliefMapDiagram}
          description="The envisioned system would guide users through a structured discovery process, analyzing responses to build a comprehensive belief map."
        />
      </ProjectSection>

      <ProjectSection title="Planned Features">
        <FeatureGrid features={coreFeatures} columns={2} />
      </ProjectSection>

      <ProjectSection title="Technical Design">
        <FeatureGrid features={technicalFeatures} columns={2} />

        <div className="mt-8">
          <h3
            className="text-xl font-semibold mb-6"
            style={{
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.headingFont,
            }}
          >
            UX Principles
          </h3>
          <FeatureGrid features={uxInnovations} columns={3} />
        </div>
      </ProjectSection>

      <ProjectSection title="Vision">
        <p className="text-lg mb-6">
          BeliefMap explores a new direction in personal development tools: by
          making internal dialogues visual and interactive, people can better
          understand themselves and challenge their assumptions in a structured,
          approachable way. The project is an ongoing design and research effort.
        </p>

        <ProjectCard variant="accent" className="mb-6">
          <h3
            className="text-xl font-semibold mb-4"
            style={{
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.headingFont,
            }}
          >
            Design Goals
          </h3>
          <ul className="space-y-3">
            {designGoals.map((goal, index) => (
              <li key={index} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: themeProps.colors.primary }}
                />
                <span style={{ color: themeProps.colors.text }}>
                  <strong>{goal.split(":")[0]}:</strong>{" "}
                  {goal.split(":")[1]}
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
            &ldquo;BeliefMap has been as much about developing myself as it is about
            developing software. It&rsquo;s designed to make introspection and healthy
            self-debate visual, interactive, and genuinely transformative.&rdquo;
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectCTA githubUrl="https://github.com/hopeatina/mybeliefmap" />
    </ProjectLayout>
  );
}
