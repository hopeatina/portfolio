import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import ProjectCard from "@/components/projects/ProjectCard";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function OrgX() {
  const { themeProps } = useTheme();

  const techStack = [
    {
      category: "Frontend",
      technologies: "Next.js App Router, React 18, TypeScript",
    },
    {
      category: "Visualization",
      technologies: "React Flow, Framer Motion, D3.js",
    },
    {
      category: "State Management",
      technologies: "Zustand, React Query, Immer",
    },
    { category: "Backend", technologies: "Supabase, PostgreSQL, Redis" },
    { category: "Real-time", technologies: "WebSockets, Server-Sent Events" },
    {
      category: "Performance",
      technologies: "Cloudflare Workers, Edge Computing",
    },
    { category: "Authentication", technologies: "Enterprise SSO, RBAC" },
    {
      category: "Analytics",
      technologies: "Critical Path Algorithms, ML Models",
    },
  ];

  const canvasFeatures = [
    {
      title: "🎯 Advanced Canvas Implementation",
      description:
        "Sophisticated visualization engine with enterprise-grade features",
      items: [
        "React Flow Integration: Sophisticated node-based workflow visualization with custom components and advanced interactions",
        "Critical Path Algorithms: Real-time calculation and visualization of project critical paths with animated edge highlighting",
        "Dynamic Node Positioning: Intelligent auto-layout algorithms with collision detection and optimization",
        "Real-time Collaboration: Multi-user canvas editing with conflict resolution and live cursor tracking",
        "Advanced Animations: Framer Motion integration for smooth transitions, node state changes, and path highlighting",
        "Performance Optimization: Virtualized rendering for large-scale project visualization with 1000+ nodes",
      ],
    },
    {
      title: "🧠 Intelligent Project Analytics",
      description:
        "Advanced algorithms for comprehensive project analysis and optimization",
      items: [
        "Critical Path Calculation: Sophisticated longest path analysis with dependency graph evaluation",
        "Resource Optimization: AI-driven recommendations for optimal team allocation and workload distribution",
        "Timeline Prediction: Machine learning models predicting project completion times and identifying risks",
        "Risk Assessment: Automated identification of project risks with mitigation recommendations",
        "Bottleneck Detection: Intelligent analysis of workflow bottlenecks with suggested optimizations",
        "Pattern Recognition: Historical project analysis to identify recurring patterns and improvement opportunities",
      ],
    },
  ];

  const technicalArchitecture = [
    {
      title: "🏗️ Canvas Visualization Engine",
      description:
        "Advanced React Flow implementation with custom components and algorithms",
      items: [
        "Custom Node Components: Specialized task nodes with status indicators, progress tracking, and contextual information",
        "Animated Edge System: Dynamic edge rendering with critical path highlighting, progress indicators, and status animations",
        "Real-time Updates: WebSocket integration for live collaboration with optimistic updates and conflict resolution",
        "Multi-Level Zoom: Seamless navigation from high-level project overview to detailed task implementation",
      ],
    },
    {
      title: "📊 Project Management Core",
      description:
        "Comprehensive task and resource management with advanced analytics",
      items: [
        "Advanced Task System: Comprehensive task management with dependencies, milestones, and resource allocation",
        "Timeline Analysis: Critical path calculation with slack time analysis and schedule optimization",
        "Resource Management: Team allocation, workload balancing, and capacity planning algorithms",
        "Version Control: Git-like versioning for project states with branching and merging capabilities",
      ],
    },
    {
      title: "🚀 Performance & Scalability",
      description:
        "Enterprise-grade performance optimization and scalability features",
      items: [
        "Virtualized Rendering: Efficient rendering of large project graphs with viewport optimization",
        "Edge Computing: Cloudflare Workers integration for global low-latency performance",
        "Caching Strategy: Multi-layer caching with Redis for session data and computed results",
        "Database Optimization: Optimized queries with indexing strategies for complex project relationships",
      ],
    },
  ];

  const innovationFeatures = [
    {
      title: "🎨 Critical Path Visualization Innovation",
      description:
        "Revolutionary approach to project timeline visualization with real-time animations and intelligent layout algorithms.",
      items: [
        "Animated Critical Paths: Real-time animated highlighting of critical project paths with dynamic stroke patterns",
        "Intelligent Node Layout: Advanced auto-positioning algorithms minimizing edge crossings and optimizing readability",
        "Interactive Timeline: Drag-and-drop task scheduling with automatic dependency validation and conflict resolution",
      ],
    },
    {
      title: "🤝 Advanced Collaboration",
      description:
        "Real-time multiplayer project management with sophisticated conflict resolution and activity tracking.",
      items: [
        "Real-time Multiplayer: Multi-user canvas editing with live cursors, selection sharing, and conflict resolution",
        "Comment System: Contextual commenting on tasks and project elements with threaded discussions",
        "Activity Streams: Real-time activity feeds with intelligent filtering and notification systems",
      ],
    },
  ];

  const achievements = [
    {
      title: "💻 Technical Complexity",
      description:
        "Sophisticated algorithms and performance engineering for enterprise-scale project management.",
      items: [
        "Advanced Algorithms: Critical path calculation and optimization",
        "Real-time Systems: Multi-user collaboration with conflict resolution",
        "Performance Engineering: Virtualized rendering for large datasets",
        "Complex State Management: Sophisticated global state with persistence",
        "Advanced Animations: Smooth, performant UI transitions and indicators",
      ],
    },
    {
      title: "🏢 Enterprise Value",
      description:
        "Measurable business impact through improved project management efficiency and team collaboration.",
      items: [
        "Visual Project Management: Intuitive canvas interface reducing cognitive load",
        "Critical Path Analysis: Automated identification of project bottlenecks",
        "Team Collaboration: Real-time editing improving team coordination",
        "Performance Insights: Data-driven project optimization recommendations",
        "Scalable Architecture: Support for enterprise-scale project portfolios",
      ],
    },
  ];

  return (
    <ProjectLayout
      title="OrgX"
      description="Advanced project management platform with real-time canvas visualization, critical path algorithms, animated workflows, and enterprise-grade collaboration features"
    >
      <ProjectHero
        title="OrgX"
        description="A sophisticated project management platform featuring real-time canvas visualization with critical path analysis, animated workflow representation, advanced dependency tracking, and AI-powered insights for enterprise teams."
        tags={[
          "Project Management",
          "Canvas Visualization",
          "React Flow",
          "Real-time",
          "Enterprise",
        ]}
        image="/images/projects/orgx.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="Advanced Visualization & Analytics">
        <p className="text-lg mb-6">
          OrgX represents cutting-edge project management with sophisticated
          canvas-based visualization, real-time critical path analysis, and
          advanced workflow orchestration. The platform combines
          enterprise-grade project tracking with innovative visual interfaces
          for complex project coordination.
        </p>

        <FeatureGrid features={canvasFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Technical Architecture Deep-Dive">
        <FeatureGrid features={technicalArchitecture} columns={1} />
      </ProjectSection>

      <ProjectSection title="Innovation & Advanced Features">
        <FeatureGrid features={innovationFeatures} columns={2} />

        <div className="mt-8">
          <ProjectCard variant="highlight" className="mt-6">
            <p
              className="italic text-center"
              style={{
                color: themeProps.colors.text,
                fontFamily: themeProps.typography.bodyFont,
                fontSize: "1.1rem",
                lineHeight: themeProps.typography.lineHeight,
              }}
            >
              "OrgX showcases my ability to build sophisticated enterprise
              applications with advanced visualization, complex algorithms, and
              real-time collaboration features. The project demonstrates
              expertise in performance optimization, user experience design, and
              scalable architecture for demanding enterprise environments."
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Technical Achievements & Impact">
        <FeatureGrid features={achievements} columns={2} />

        <div className="mt-8 space-y-6">
          <ProjectCard variant="secondary">
            <h3
              className="text-xl font-semibold mb-3"
              style={{
                color: themeProps.colors.primary,
                fontFamily: themeProps.typography.headingFont,
              }}
            >
              Innovation in Project Management
            </h3>
            <p>
              OrgX introduces novel approaches to project visualization,
              combining traditional Gantt chart functionality with modern
              canvas-based interfaces. The critical path visualization with
              animated highlighting provides immediate visual feedback on
              project health and potential issues.
            </p>
          </ProjectCard>

          <ProjectCard variant="accent">
            <h3
              className="text-xl font-semibold mb-3"
              style={{
                color: themeProps.colors.primary,
                fontFamily: themeProps.typography.headingFont,
              }}
            >
              Future Vision
            </h3>
            <p>
              The platform is designed to evolve with enterprise needs,
              incorporating machine learning for predictive project management,
              advanced resource optimization, and intelligent workflow
              recommendations based on historical project data and industry best
              practices.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA demoUrl="https://orgx.ai" githubUrl="#" />
    </ProjectLayout>
  );
}
