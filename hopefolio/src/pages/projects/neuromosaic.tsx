import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";

export default function Neuromosaic() {
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

      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-8 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">🔧 Tech Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <strong>Backend:</strong> FastAPI, SQLAlchemy, Alembic
          </div>
          <div>
            <strong>Database:</strong> PostgreSQL, SQLite
          </div>
          <div>
            <strong>ML/AI:</strong> PyTorch, Transformers, OpenAI
          </div>
          <div>
            <strong>Infrastructure:</strong> Docker, Kubernetes
          </div>
          <div>
            <strong>Frontend:</strong> Dash, Plotly, Bootstrap
          </div>
          <div>
            <strong>Cloud:</strong> AWS, HuggingFace Hub
          </div>
          <div>
            <strong>Testing:</strong> Pytest, Coverage
          </div>
          <div>
            <strong>DevOps:</strong> Git Hooks, Pre-commit
          </div>
        </div>
      </div>

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
        <ul className="space-y-2">
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
        <div className="grid md:grid-cols-2 gap-8 mb-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
            <h4 className="font-semibold mb-3">🎯 Core Innovation</h4>
            <p>
              <strong>LLM-powered Architecture Generation</strong>: Represents
              neural models as vectors encoding building blocks and
              hyperparameters, then uses Large Language Models to automatically
              generate PyTorch code from these vectors.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border">
            <h4 className="font-semibold mb-3">📊 Interactive Dashboard</h4>
            <p>
              <strong>3D Visualization Platform</strong>: Real-time dashboard
              with interactive 3D architecture space visualization, where each
              point represents an experiment color-coded by performance metrics.
            </p>
          </div>
        </div>

        <h4 className="text-lg font-semibold mb-4">System Architecture</h4>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm font-mono mb-6">
          <pre>{`Architecture Vector → LLM Code Gen → Docker Container → Training/Eval → Results DB → Visualization
     ↑                                                                              ↓
Meta-Learning & Search Strategy ←―――――――――――――――――――――――――――――――――――――――――――――――――――――――― Performance Metrics`}</pre>
        </div>
      </ProjectSection>

      <ProjectSection title="Technical Implementation">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">
              🏗️ Backend Infrastructure
            </h4>
            <ul className="space-y-2">
              <li>
                <strong>FastAPI Backend</strong>: 15+ endpoint categories with
                comprehensive CRUD operations
              </li>
              <li>
                <strong>Database Design</strong>: PostgreSQL with 20+ tables
                handling experiments, architectures, metrics, and resources
              </li>
              <li>
                <strong>Container Orchestration</strong>: Docker-based
                experiment isolation with automatic cleanup
              </li>
              <li>
                <strong>Real-time Communication</strong>: WebSocket
                implementation for live experiment monitoring
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">
              🔬 Architecture Search Engine
            </h4>
            <ul className="space-y-2">
              <li>
                <strong>Compositional Encoding</strong>: Vector representation
                of neural architectures with 50+ component types
              </li>
              <li>
                <strong>LLM Integration</strong>: Automated PyTorch code
                generation using GPT-4 and local LLaMA models
              </li>
              <li>
                <strong>Meta-Learning</strong>: Bayesian optimization and
                evolutionary search to guide architecture selection
              </li>
              <li>
                <strong>Experiment Tracking</strong>: Complete versioning of
                generated code, environments, and results
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">
              📈 Visualization & Analytics
            </h4>
            <ul className="space-y-2">
              <li>
                <strong>Interactive Dashboard</strong>: Dash/Plotly-based 3D
                visualization with real-time updates
              </li>
              <li>
                <strong>Performance Heatmaps</strong>: Architecture space
                visualization color-coded by metrics
              </li>
              <li>
                <strong>Cluster Analysis</strong>: Automated grouping of similar
                architectures and performance patterns
              </li>
              <li>
                <strong>Resource Monitoring</strong>: Real-time tracking of
                computational resource usage
              </li>
            </ul>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection title="Key Features & Results">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                🚀 Performance
              </h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>
                  • <strong>2000+ lines</strong> of production Python code
                </li>
                <li>
                  • <strong>15+ API endpoints</strong> with comprehensive
                  documentation
                </li>
                <li>
                  • <strong>Distributed training</strong> across multiple nodes
                </li>
                <li>
                  • <strong>Real-time monitoring</strong> with WebSocket
                  integration
                </li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200">
                🔧 Engineering Excellence
              </h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>
                  • <strong>Comprehensive testing</strong> with pytest and
                  coverage
                </li>
                <li>
                  • <strong>Type safety</strong> with Pydantic and SQLModel
                </li>
                <li>
                  • <strong>Database migrations</strong> with Alembic
                </li>
                <li>
                  • <strong>Pre-commit hooks</strong> for code quality
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                🧠 AI Innovation
              </h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>
                  • <strong>LLM code generation</strong> for novel architectures
                </li>
                <li>
                  • <strong>Meta-learning</strong> for search optimization
                </li>
                <li>
                  • <strong>Brain-inspired</strong> architectural components
                </li>
                <li>
                  • <strong>Literature integration</strong> from research papers
                </li>
              </ul>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 dark:text-orange-200">
                🌐 Scalability
              </h4>
              <ul className="text-sm space-y-1 mt-2">
                <li>
                  • <strong>Cloud integration</strong> with AWS and HuggingFace
                </li>
                <li>
                  • <strong>Container orchestration</strong> for scalable
                  experiments
                </li>
                <li>
                  • <strong>Resource optimization</strong> with automatic
                  cleanup
                </li>
                <li>
                  • <strong>Multi-language SDKs</strong> (Python, TypeScript,
                  Go)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection title="Research Impact">
        <p className="text-lg mb-4">
          <strong>Democratizing Neural Architecture Search</strong>: Neuromosaic
          makes advanced architecture exploration accessible to researchers
          without extensive infrastructure, accelerating ML innovation across
          the field.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              50+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Architecture Components
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              15+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              API Endpoints
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              2000+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Lines of Code
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/hopeatina/neuromosaic"
        demoUrl="https://neuromosaic.dev"
      />
    </ProjectLayout>
  );
}
