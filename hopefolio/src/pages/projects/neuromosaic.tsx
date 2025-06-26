import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import StatsDisplay from "@/components/projects/StatsDisplay";
import ProjectCard from "@/components/projects/ProjectCard";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function Neuromosaic() {
  const { themeProps } = useTheme();

  const techStack = [
    { category: "Backend", technologies: "FastAPI, SQLAlchemy, Alembic" },
    { category: "Database", technologies: "PostgreSQL, SQLite" },
    { category: "ML/AI", technologies: "PyTorch, Transformers, OpenAI" },
    { category: "Infrastructure", technologies: "Docker, Kubernetes" },
    { category: "Frontend", technologies: "Dash, Plotly, Bootstrap" },
    { category: "Cloud", technologies: "AWS, HuggingFace Hub" },
    { category: "Testing", technologies: "Pytest, Coverage" },
    { category: "DevOps", technologies: "Git Hooks, Pre-commit" },
  ];

  const coreFeatures = [
    {
      title: "🎯 Core Innovation",
      description:
        "LLM-powered Architecture Generation: Represents neural models as vectors encoding building blocks and hyperparameters, then uses Large Language Models to automatically generate PyTorch code from these vectors.",
    },
    {
      title: "📊 Interactive Dashboard",
      description:
        "3D Visualization Platform: Real-time dashboard with interactive 3D architecture space visualization, where each point represents an experiment color-coded by performance metrics.",
    },
  ];

  const technicalFeatures = [
    {
      title: "🏗️ Backend Infrastructure",
      description: "Comprehensive backend systems for experiment management",
      items: [
        "FastAPI Backend: 15+ endpoint categories with comprehensive CRUD operations",
        "Database Design: PostgreSQL with 20+ tables handling experiments, architectures, metrics, and resources",
        "Container Orchestration: Docker-based experiment isolation with automatic cleanup",
        "Real-time Communication: WebSocket implementation for live experiment monitoring",
      ],
    },
    {
      title: "🔬 Architecture Search Engine",
      description: "Advanced neural architecture discovery and optimization",
      items: [
        "Compositional Encoding: Vector representation of neural architectures with 50+ component types",
        "LLM Integration: Automated PyTorch code generation using GPT-4 and local LLaMA models",
        "Meta-Learning: Bayesian optimization and evolutionary search to guide architecture selection",
        "Experiment Tracking: Complete versioning of generated code, environments, and results",
      ],
    },
    {
      title: "📈 Visualization & Analytics",
      description: "Comprehensive monitoring and analysis tools",
      items: [
        "Interactive Dashboard: Dash/Plotly-based 3D visualization with real-time updates",
        "Performance Heatmaps: Architecture space visualization color-coded by metrics",
        "Cluster Analysis: Automated grouping of similar architectures and performance patterns",
        "Resource Monitoring: Real-time tracking of computational resource usage",
      ],
    },
  ];

  const keyResults = [
    {
      title: "🚀 Performance",
      description:
        "Comprehensive implementation with production-ready code, extensive API coverage, distributed training capabilities, and real-time monitoring through WebSocket integration.",
      items: [
        "2000+ lines of production Python code",
        "15+ API endpoints with comprehensive documentation",
        "Distributed training across multiple nodes",
        "Real-time monitoring with WebSocket integration",
      ],
    },
    {
      title: "🔧 Engineering Excellence",
      description:
        "Robust development practices ensuring code quality and maintainability",
      items: [
        "Comprehensive testing with pytest and coverage",
        "Type safety with Pydantic and SQLModel",
        "Database migrations with Alembic",
        "Pre-commit hooks for code quality",
      ],
    },
    {
      title: "🧠 AI Innovation",
      description:
        "Cutting-edge artificial intelligence research and implementation",
      items: [
        "LLM code generation for novel architectures",
        "Meta-learning for search optimization",
        "Brain-inspired architectural components",
        "Literature integration from research papers",
      ],
    },
    {
      title: "🌐 Scalability",
      description:
        "Cloud-ready infrastructure designed for scale and efficiency",
      items: [
        "Cloud integration with AWS and HuggingFace",
        "Container orchestration for scalable experiments",
        "Resource optimization with automatic cleanup",
        "Multi-language SDKs (Python, TypeScript, Go)",
      ],
    },
  ];

  const impactStats = [
    { value: "50+", label: "Architecture Components" },
    { value: "15+", label: "API Endpoints" },
    { value: "2000+", label: "Lines of Code" },
  ];

  return (
    <ProjectLayout
      title="Neuromosaic"
      description="Neural Architecture Search Platform with LLM-powered code generation and distributed training orchestration"
    >
      <ProjectHero
        title="Neuromosaic"
        description="A comprehensive neural architecture search platform that explores and optimizes novel neural network architectures using automated LLM code generation, compositional search spaces, and meta-learning."
        tags={[
          "Neural Architecture Search",
          "FastAPI",
          "Machine Learning",
          "PyTorch",
          "Docker",
          "LLM Integration",
        ]}
        image="/images/projects/neuromosaic.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="The Problem">
        <p className="text-lg mb-4">
          <strong>
            Manual neural architecture design is inefficient and limits
            innovation.
          </strong>{" "}
          Researchers spend weeks manually coding model variations, often
          missing promising architectural patterns that could significantly
          improve performance.
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <strong>Time-consuming</strong>: Manual architecture experimentation
            takes weeks per variation
          </li>
          <li>
            <strong>Limited exploration</strong>: Human bias constrains
            architectural search space
          </li>
          <li>
            <strong>Poor reproducibility</strong>: Difficulty tracking and
            reproducing experimental configurations
          </li>
          <li>
            <strong>Resource waste</strong>: Inefficient allocation of
            computational resources across experiments
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Solution Architecture">
        <FeatureGrid features={coreFeatures} columns={2} />

        <h4
          className="text-lg font-semibold mb-4 mt-8"
          style={{
            color: themeProps.colors.text,
            fontFamily: themeProps.typography.headingFont,
          }}
        >
          System Architecture
        </h4>
        <ProjectCard variant="default" className="mb-6">
          <pre
            className="text-sm whitespace-pre-wrap overflow-x-auto"
            style={{
              color: themeProps.colors.text,
              fontFamily: "monospace",
            }}
          >
            {`Architecture Vector → LLM Code Gen → Docker Container → Training/Eval → Results DB → Visualization
     ↑                                                                              ↓
Meta-Learning & Search Strategy ←―――――――――――――――――――――――――――――――――――――――――――――――――――――――― Performance Metrics`}
          </pre>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Technical Implementation">
        <FeatureGrid features={technicalFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Key Features & Results">
        <FeatureGrid features={keyResults} columns={2} />
      </ProjectSection>

      <ProjectSection title="Research Impact">
        <p className="text-lg mb-4">
          <strong>Democratizing Neural Architecture Search</strong>: Neuromosaic
          makes advanced architecture exploration accessible to researchers
          without extensive infrastructure, accelerating ML innovation across
          the field.
        </p>
        <StatsDisplay stats={impactStats} columns={3} className="mt-6" />
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/hopeatina/neuromosaic"
        demoUrl="https://neuromosaic.dev"
      />
    </ProjectLayout>
  );
}
