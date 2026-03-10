import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import ProjectCard from "@/components/projects/ProjectCard";
import MermaidDiagram from "@/components/projects/MermaidDiagram";
import StatsDisplay from "@/components/projects/StatsDisplay";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function FrameFX() {
  const { themeProps } = useTheme();

  const techStack = [
    { category: "Animation", technologies: "Remotion, React" },
    {
      category: "Architecture",
      technologies: "8-package monorepo, Turborepo",
    },
    {
      category: "Design System",
      technologies: "Design tokens, FPS-aware conversion",
    },
    {
      category: "Hooks",
      technologies: "Animation hooks, Spring physics",
    },
    {
      category: "Components",
      technologies: "Declarative components, Composition API",
    },
  ];

  const architectureDiagram = `
    flowchart LR
      subgraph "Design System"
        A[Design Tokens] --> B[FPS-Aware Conversion]
      end

      subgraph "Animation Engine"
        B --> C[Animation Hooks]
        C --> D[Spring Physics]
        C --> E[Easing Functions]
      end

      subgraph "Component Layer"
        D --> F[Declarative Components]
        E --> F
        F --> G[Composition API]
      end

      subgraph "Output"
        G --> H[Remotion Render]
        H --> I[Video Output]
      end

      style A fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style C fill:#3B82F6,stroke:#2563EB,color:#fff
      style H fill:#10B981,stroke:#059669,color:#fff
  `;

  const features = [
    {
      title: "Token-Driven Animation",
      description:
        "Design tokens serve as the single source of truth for all motion parameters, ensuring consistency across the entire animation system",
      items: [
        "Centralized token definitions for duration, easing, spacing, and color",
        "Tokens automatically propagate to all components and hooks",
        "Override system for per-component token customization",
        "Type-safe token references with TypeScript inference",
      ],
    },
    {
      title: "FPS-Aware Conversion",
      description:
        "Automatic conversion of time-based tokens to frame-based values, ensuring animations render correctly at any frame rate",
      items: [
        "Millisecond-to-frame conversion respecting target FPS (24, 30, 60)",
        "Dynamic recalculation when composition FPS changes",
        "Sub-frame interpolation for smooth motion at lower frame rates",
        "Consistent animation timing regardless of render target",
      ],
    },
    {
      title: "Declarative Motion Components",
      description:
        "React components that express complex animations through props rather than imperative code",
      items: [
        "FadeIn, SlideIn, ScaleIn and composite animation components",
        "Stagger groups for sequenced element animations",
        "Spring-based physics animations with configurable damping and stiffness",
        "Composition API for combining multiple animation effects",
      ],
    },
    {
      title: "Reusable Animation Hooks",
      description:
        "Custom React hooks that encapsulate animation logic for use across components and compositions",
      items: [
        "useAnimatedValue for interpolated numeric animations",
        "useSpring for physics-based motion with natural feel",
        "useSequence for orchestrating multi-step animation timelines",
        "useTokens for accessing design tokens within animation logic",
      ],
    },
  ];

  const stats = [
    {
      value: "8",
      label: "Packages",
      description: "Modular monorepo",
    },
    {
      value: "Token-driven",
      label: "Architecture",
      description: "Single source of truth",
    },
    {
      value: "FPS-aware",
      label: "Conversion",
      description: "Frame-rate adaptive",
    },
    {
      value: "Monorepo",
      label: "Structure",
      description: "Turborepo managed",
    },
  ];

  return (
    <ProjectLayout
      title="FrameFX"
      description="Token-driven motion design framework built as an 8-package Remotion monorepo"
    >
      <ProjectHero
        title="FrameFX"
        description="An 8-package Remotion monorepo for token-driven motion design. FrameFX bridges the gap between design systems and programmatic video by converting design tokens into FPS-aware animation parameters, enabling declarative motion components powered by a shared design language."
        tags={[
          "Remotion",
          "Monorepo",
          "Motion Design",
          "Design Tokens",
          "TypeScript",
        ]}
      />

      <TechStack items={techStack} />

      <ProjectSection title="System Architecture">
        <p className="text-lg mb-6">
          FrameFX follows a pipeline architecture where design tokens flow
          through FPS-aware conversion into animation hooks, which power
          declarative components that compose into Remotion renders. Each
          stage is a separate package in the monorepo.
        </p>

        <MermaidDiagram
          title="Token-to-Render Pipeline"
          diagram={architectureDiagram}
          description="Design tokens are converted to FPS-aware values, consumed by animation hooks with spring physics and easing, used by declarative components via a composition API, and ultimately rendered through Remotion's video pipeline."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Monorepo Architecture
          </h3>
          <p>
            The 8-package structure managed by Turborepo ensures clean
            separation of concerns: tokens, conversion utilities, hooks,
            components, compositions, and build tooling each live in their
            own package with explicit dependency boundaries. This makes each
            layer independently testable and publishable.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Core Features">
        <FeatureGrid features={features} columns={1} />
      </ProjectSection>

      <ProjectSection title="Metrics & Design Philosophy">
        <StatsDisplay stats={stats} className="mb-8" />

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Design Token Philosophy
            </h3>
            <p>
              FrameFX treats design tokens as the single source of truth for
              motion. By encoding duration, easing, spacing, and color as
              tokens, designers and developers share a common language. When
              a token changes, every animation across the system updates
              automatically.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Programmatic Video
            </h3>
            <p>
              Built on Remotion, FrameFX brings React's component model to
              video production. Compositions are defined as React component
              trees, making complex motion graphics maintainable,
              versionable, and reviewable through standard code review
              workflows.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA githubUrl="https://github.com/hopeatina/framefx" />
    </ProjectLayout>
  );
}
