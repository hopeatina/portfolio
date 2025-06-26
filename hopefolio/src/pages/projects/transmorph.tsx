import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import MermaidDiagram from "@/components/projects/MermaidDiagram";
import StatsDisplay from "@/components/projects/StatsDisplay";
import ProjectCard from "@/components/projects/ProjectCard";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function Transmorph() {
  const { themeProps } = useTheme();

  const techStack = [
    { category: "Core", technologies: "Python, TypeScript, OCLIF Framework" },
    { category: "AI/LLM", technologies: "OpenAI GPT-4, Anthropic Claude" },
    {
      category: "Architecture",
      technologies: "Monorepo, Multi-Package System",
    },
    {
      category: "Generation",
      technologies: "Template Engine, Schema Validation",
    },
    { category: "Platform", technologies: "Railway, Supabase, GraphQL" },
    { category: "Deployment", technologies: "Docker, Multi-Platform Support" },
    {
      category: "Validation",
      technologies: "Zod, Pydantic, Schema Generation",
    },
    {
      category: "Documentation",
      technologies: "15+ Guides, Tutorials, API Docs",
    },
  ];

  const architectureFeatures = [
    {
      title: "🔧 Core Generation Engine",
      description:
        "Sophisticated pipeline transforming OpenAPI specs into production-ready MCP servers",
      items: [
        "OpenAPI Parser: Robust parsing engine supporting v2 and v3 specifications with comprehensive validation",
        "LLM Orchestration: Intelligent prompt engineering system with context-aware code generation",
        "Template System: Advanced templating with language-specific optimizations and security configurations",
        "Schema Generation: Automatic Zod (TypeScript) and Pydantic (Python) schema creation",
        "Validation Pipeline: Multi-stage validation ensuring generated code quality and MCP protocol compliance",
      ],
    },
    {
      title: "💻 CLI Framework & Developer Experience",
      description:
        "Professional-grade command-line interface with comprehensive developer tooling",
      items: [
        "OCLIF Framework: Professional CLI built with industry-standard framework and comprehensive command structure",
        "Interactive Generation: Step-by-step guided generation with real-time feedback and error handling",
        "Configuration Management: YAML-based configuration with environment variable support and validation",
        "Progress Tracking: Real-time generation progress with detailed logging and debugging capabilities",
        "Error Recovery: Sophisticated error handling with fallback mechanisms and detailed troubleshooting guidance",
      ],
    },
    {
      title: "🚀 Hosted Deployment Platform",
      description:
        "Complete SaaS offering with automated deployment and resource management",
      items: [
        "Railway Integration: Complete GraphQL API integration for automated project deployment and management",
        "Supabase Backend: PostgreSQL database with row-level security, custom functions, and real-time subscriptions",
        "RESTful API: Comprehensive deployment management API with authentication and plan-based resource allocation",
        "Resource Management: Sophisticated deployment lifecycle management with monitoring and cost tracking",
        "Security Layer: Token-based authentication, user plan validation, and secure deployment isolation",
      ],
    },
  ];

  const innovationFeatures = [
    {
      title: "🤖 Advanced LLM Integration",
      description:
        "Cutting-edge AI integration for intelligent code generation and analysis",
      items: [
        "Multi-Provider Support: Seamless switching between OpenAI and Anthropic Claude with optimized prompts",
        "Context-Aware Generation: Intelligent analysis of API patterns to generate semantically meaningful tool descriptions",
        "Fallback Mechanisms: Template-based generation when LLM services are unavailable, ensuring reliability",
        "Cost Optimization: Token usage optimization with intelligent prompt compression and response caching",
      ],
    },
    {
      title: "🏗️ Code Quality & Standards",
      description:
        "Enterprise-grade code generation with security and maintainability focus",
      items: [
        "TypeScript Integration: Full type safety with generated TypeScript definitions and strict validation",
        "Security-First Design: Multiple security levels (basic/enhanced/strict) with configurable validation",
        "Docker Optimization: Multi-stage Docker builds with production-optimized configurations",
        "Documentation Generation: Automatic README creation with usage examples and deployment instructions",
      ],
    },
    {
      title: "🌐 Deployment Innovation",
      description:
        "Multi-platform deployment support with advanced environment management",
      items: [
        "Multi-Platform Deployment: Support for Netlify, Railway, AWS, and Cloudflare Workers with optimized configurations",
        "Environment Management: Sophisticated environment variable handling with validation and security",
        "Monitoring Integration: Built-in logging and monitoring setup for production deployments",
        "Version Management: Semantic versioning with automated changelog generation and migration support",
      ],
    },
  ];

  const ecosystemComponents = [
    {
      title: "📦 Core Library",
      description: "Shared utilities and interfaces used across all packages",
    },
    {
      title: "⌨️ CLI Package",
      description:
        "OCLIF-based command-line interface with comprehensive testing",
    },
    {
      title: "🌐 Web Interface",
      description:
        "React-based frontend for drag-and-drop OpenAPI specification processing",
    },
    {
      title: "📚 Documentation Site",
      description:
        "Comprehensive documentation with tutorials and API references",
    },
    {
      title: "🧪 Testing Suite",
      description:
        "End-to-end testing framework validating generated code functionality",
    },
  ];

  const systemFlow = `OpenAPI Spec → LLM Analysis → Code Generation → Schema Validation → MCP Server → Docker Package → Deployment
     ↑                                                                                        ↓
Configuration Management ←―――――――――――――――――――――――――――――――――――――――――――――――――――――――――→ Monitoring & Analytics`;

  const impactMetrics = [
    {
      value: "2000+",
      label: "Lines of Code",
      description: "Core implementation",
    },
    {
      value: "15+",
      label: "Documentation Files",
      description: "Comprehensive guides",
    },
    {
      value: "Multi-Lang",
      label: "Code Generation",
      description: "TypeScript & Python",
    },
    {
      value: "Enterprise",
      label: "Security Levels",
      description: "Configurable compliance",
    },
  ];

  const innovationAchievements = [
    "LLM-Powered Code Generation: Scalable AI-driven code generation with multi-provider support",
    "OpenAPI to MCP Bridge: Novel protocol translation enabling traditional APIs to work with AI agents",
    "Complete Developer Ecosystem: End-to-end solution from CLI tool to hosted deployment platform",
    "Advanced Prompt Engineering: Sophisticated prompt optimization for reliable code generation output",
    "Production-Ready Output: Generated code requires zero manual editing for immediate deployment",
  ];

  const codeGenerationDiagram = `
    flowchart TB
      subgraph "Input Analysis"
        A[OpenAPI Spec] --> B[Schema Parser]
        B --> C[Endpoint Analyzer]
      end
      
      subgraph "LLM Pipeline"
        D[Prompt Engineering] --> E[GPT-4/Claude]
        E --> F[Code Generation]
        F --> G[Validation Engine]
      end
      
      subgraph "MCP Server Output"
        H[Tool Definitions] --> K[Complete Server]
        I[Handler Functions] --> K
        J[Docker Config] --> K
      end
      
      C --> D
      G --> H
      G --> I
      G --> J
      
      K --> L[Deployment Platform]
      L --> M[Railway/Supabase]
      
      N[Monitoring] --> O[Analytics Dashboard]
      K --> N
      
      style A fill:#F59E0B,stroke:#D97706,color:#fff
      style E fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style K fill:#10B981,stroke:#059669,color:#fff
  `;

  return (
    <ProjectLayout
      title="MCP-Gen"
      description="Enterprise CLI tool generating Model Context Protocol servers from OpenAPI specs – 2000+ lines of Python/TypeScript, monorepo architecture, LLM integration, hosted deployment platform"
    >
      <ProjectHero
        title="MCP-Gen"
        description="A comprehensive CLI tool that reads OpenAPI specifications and generates complete Model Context Protocol (MCP) servers in TypeScript or Python. Features monorepo architecture, multi-LLM support, Docker integration, and a hosted deployment platform with GraphQL API management."
        tags={[
          "CLI Tool",
          "Code Generation",
          "AI/LLM",
          "Monorepo",
          "GraphQL",
          "Enterprise",
        ]}
        image="/images/projects/transmorph.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="Enterprise-Scale Architecture">
        <p className="text-lg mb-6">
          MCP-Gen represents a sophisticated software generation platform built
          with enterprise-grade architecture. The system transforms OpenAPI
          specifications into complete, production-ready MCP servers through
          advanced LLM integration and comprehensive code generation pipelines.
        </p>

        <MermaidDiagram
          title="Code Generation Pipeline"
          diagram={codeGenerationDiagram}
          description="Complete workflow from OpenAPI specification analysis to deployed MCP server, with intelligent LLM-powered code generation and comprehensive validation."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3
            className="text-xl font-semibold mb-4"
            style={{
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.headingFont,
            }}
          >
            Advanced Code Generation Pipeline
          </h3>
          <p>
            The system employs sophisticated prompt engineering and template
            systems to analyze OpenAPI specifications, generate MCP tool
            definitions, create comprehensive validation schemas, and output
            production-ready server code with Docker configurations and
            deployment instructions.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Technical Architecture Deep-Dive">
        <FeatureGrid features={architectureFeatures} columns={1} />

        <div className="mt-8">
          <h3
            className="text-xl font-semibold mb-6"
            style={{
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.headingFont,
            }}
          >
            Multi-Package Ecosystem
          </h3>
          <FeatureGrid features={ecosystemComponents} columns={3} />
        </div>
      </ProjectSection>

      <ProjectSection title="Innovation & Technical Achievements">
        <FeatureGrid features={innovationFeatures} columns={1} />

        <ProjectCard variant="highlight" className="mt-8">
          <p
            className="italic text-center text-lg"
            style={{
              color: themeProps.colors.text,
              fontFamily: themeProps.typography.bodyFont,
              lineHeight: themeProps.typography.lineHeight,
            }}
          >
            "MCP-Gen demonstrates my ability to architect and implement complex
            developer tools that bridge traditional APIs with cutting-edge LLM
            technology. The comprehensive testing, documentation, and hosted
            platform showcase enterprise-level software engineering and product
            development skills."
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Measurable Impact">
        <h3
          className="text-2xl font-semibold mb-6"
          style={{
            color: themeProps.colors.primary,
            fontFamily: themeProps.typography.headingFont,
          }}
        >
          Platform Achievements
        </h3>
        <StatsDisplay stats={impactMetrics} className="mb-8" />

        <ProjectCard variant="accent" className="mb-6">
          <h3
            className="text-xl font-semibold mb-4"
            style={{
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.headingFont,
            }}
          >
            Innovation Achievements
          </h3>
          <ul className="space-y-3">
            {innovationAchievements.map((achievement, index) => (
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

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="secondary">
            <h3
              className="text-xl font-semibold mb-3"
              style={{
                color: themeProps.colors.primary,
                fontFamily: themeProps.typography.headingFont,
              }}
            >
              What is MCP?
            </h3>
            <p>
              Model Context Protocol (MCP) is an emerging standard for AI agent
              communication developed by Anthropic. MCP-Gen bridges the gap
              between traditional REST APIs and this new LLM-driven ecosystem,
              enabling developers to expose their existing services as
              AI-accessible tools with minimal effort.
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
              Market Positioning
            </h3>
            <p>
              As one of the first comprehensive tools in the MCP ecosystem,
              MCP-Gen positions itself at the forefront of AI agent development,
              providing essential infrastructure for the next generation of
              LLM-powered applications.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        demoUrl="https://mcpify.ai"
        githubUrl="https://github.com/hopeatina/mcp-gen"
      />
    </ProjectLayout>
  );
}
