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

export default function DeepHuman() {
  const { themeProps } = useTheme();

  const techStack = [
    { category: "Core", technologies: "Python, FastMCP Framework" },
    {
      category: "Architecture",
      technologies: "Multi-Agent Systems, MCP Protocol",
    },
    { category: "AI/LLM", technologies: "OpenAI GPT-4, Anthropic Claude" },
    {
      category: "Algorithms",
      technologies: "Compatibility Scoring, Domain Intelligence",
    },
    { category: "Configuration", technologies: "YAML Schema, Template Engine" },
    {
      category: "Communication",
      technologies: "Inter-Agent Protocol, Event-Driven",
    },
    {
      category: "Intelligence",
      technologies: "3-Level Hybrid, Dynamic Generation",
    },
    {
      category: "Control",
      technologies: "User Management, Kill Switch Systems",
    },
  ];

  const architectureFeatures = [
    {
      title: "🤖 MCP Server Implementation (2000+ Lines)",
      description:
        "Advanced multi-agent server with sophisticated persona interaction capabilities",
      items: [
        "FastMCP Framework: Advanced server implementation with 50+ custom tools for persona interaction",
        "Dynamic Content Engine: Real-time generation of interests, skills, and goals using configurable prompts",
        "Multi-Domain Intelligence: Hierarchical domain detection system with core/emerging/LLM classification",
        "Compatibility Algorithms: Mathematical models analyzing shared interests, skill complementarity, and goal alignment",
        "Conversation Engine: Context-aware dialogue system with personality-consistent response generation",
      ],
    },
    {
      title: "⚙️ Advanced Configuration System",
      description:
        "Comprehensive configuration framework with sophisticated templating and domain management",
      items: [
        "Persona Definition: Comprehensive YAML schemas defining personality, expertise, and interaction patterns",
        "Prompt Template Engine: Sophisticated templating system for domain-specific content generation",
        "Matching Weight Algorithms: Configurable algorithms for computing human compatibility scores",
        "LLM Configuration: Multi-provider support (OpenAI, Anthropic) with optimized prompts per persona",
        "Domain Architecture: Structured knowledge domains with aliases, keywords, and specialized behaviors",
      ],
    },
    {
      title: "🔗 Multi-Agent Coordination",
      description:
        "Sophisticated orchestration system enabling collaborative AI agent interactions",
      items: [
        "Inter-Agent Communication: Protocol for multiple AI personas to interact and collaborate",
        "Collaborative Intelligence: System for combining multiple AI perspectives on complex problems",
        "Resource Management: Sophisticated orchestration of multiple MCP servers with load balancing",
        "User Control Interface: Advanced 'kill switch' and persona management capabilities",
        "Event-Driven Architecture: Real-time coordination between agents using event pub/sub patterns",
      ],
    },
  ];

  const innovationFeatures = [
    {
      title: "🧠 Novel AI Persona Architecture",
      description:
        "Revolutionary approach to AI persona development with hybrid intelligence systems",
      items: [
        "3-Level Hybrid Intelligence: Core domains (predefined), emerging domains (keyword-based), and pure LLM generation",
        "Domain-Specific Expertise: Dynamic adaptation to technical, creative, and interpersonal contexts",
        "Personality Consistency: Advanced prompt engineering ensuring authentic, consistent persona responses",
        "Context Preservation: Sophisticated memory systems maintaining conversation context across sessions",
      ],
    },
    {
      title: "🤝 Human-AI Compatibility Research",
      description:
        "Advanced algorithms for optimizing human-AI collaboration and relationship dynamics",
      items: [
        "Multi-Dimensional Scoring: Algorithms considering interests (weighted overlap), skills (complementarity), and goals (alignment)",
        "Temporal Compatibility: Timezone analysis for optimal collaboration scheduling",
        "Communication Style Matching: Analysis of personality styles for effective collaboration",
        "Collaboration Opportunity Detection: AI-driven identification of productive partnership opportunities",
      ],
    },
    {
      title: "🚀 Advanced Use Cases",
      description:
        "Sophisticated applications demonstrating real-world impact of AI persona technology",
      items: [
        "Meeting Preparation: AI personas simulating specific individuals for practice and preparation",
        "Team Formation: Intelligent matching algorithms for optimal team composition",
        "Startup Collaboration: AI-generated business ideas based on skill and interest intersection analysis",
        "Social Networking: Sophisticated algorithms for meaningful human connection facilitation",
        "Knowledge Archiving: Persona-based preservation of individual expertise and communication patterns",
      ],
    },
  ];

  const algorithmFeatures = [
    {
      title: "📊 Compatibility Scoring",
      description:
        "Multi-dimensional analysis considering interests, skills, goals, and timezones",
    },
    {
      title: "⚖️ Skill Complementarity",
      description:
        "Mathematical models identifying synergistic skill combinations",
    },
    {
      title: "🎯 Goal Alignment Analysis",
      description:
        "Sophisticated algorithms for measuring shared objectives and motivations",
    },
    {
      title: "💡 Startup Ideation Engine",
      description:
        "AI system generating business concepts from skill and interest intersections",
    },
    {
      title: "🌐 Social Network Modeling",
      description:
        "Algorithms for relationship mapping and social connection optimization",
    },
  ];

  const multiAgentDiagram = `
    flowchart TB
      subgraph "Human Interface"
        A[User Input] --> B[Persona Engine]
        B --> C[Domain Intelligence]
      end
      
      subgraph "Multi-Agent System"
        D[Agent 1: Interests] --> G[Coordination Layer]
        E[Agent 2: Skills] --> G
        F[Agent 3: Goals] --> G
      end
      
      subgraph "Compatibility Engine"
        H[Interest Matching] --> K[Compatibility Score]
        I[Skill Complementarity] --> K
        J[Goal Alignment] --> K
      end
      
      C --> D
      C --> E
      C --> F
      G --> H
      G --> I
      G --> J
      
      K --> L[Response Generation]
      L --> M[User Control Interface]
      
      style B fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style G fill:#3B82F6,stroke:#2563EB,color:#fff
      style K fill:#10B981,stroke:#059669,color:#fff
  `;

  const implementationMetrics = [
    {
      value: "2000+",
      label: "Lines of Python",
      description: "Sophisticated implementation",
    },
    { value: "50+", label: "Custom Tools", description: "Persona interaction" },
    { value: "900+", label: "Config Lines", description: "Schema definitions" },
    {
      value: "3-Level",
      label: "Hybrid Intelligence",
      description: "Advanced architecture",
    },
  ];

  const researchInnovations = [
    "Novel Compatibility Algorithms: Mathematical models for human-AI matching with multi-dimensional analysis",
    "Advanced Prompt Engineering: Sophisticated techniques ensuring personality consistency across interactions",
    "Dynamic Content Generation: Real-time creation of contextual interests, skills, and goals with domain awareness",
    "Multi-Modal Intelligence: Comprehensive expertise coverage across diverse technical and interpersonal areas",
    "Ethical AI Framework: User control mechanisms with comprehensive oversight and 'kill switch' capabilities",
  ];

  return (
    <ProjectLayout
      title="Deep Human"
      description="Advanced AI persona framework with multi-agent systems, human compatibility algorithms, and sophisticated personality modeling"
    >
      <ProjectHero
        title="Deep Human"
        description="A sophisticated multi-agent AI system that creates personalized MCP servers representing digital twins. Features advanced compatibility algorithms, dynamic personality modeling, and intelligent collaboration between AI agents and humans."
        tags={[
          "Multi-Agent AI",
          "MCP Protocol",
          "Python",
          "Persona Framework",
          "Digital Twin",
        ]}
        image="/images/projects/deep-human/hero-landing.png"
      />

      <TechStack items={techStack} />

      <ProjectSection title="Product Vision">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: themeProps.colors.primary }}
            >
              Create Your Digital Twin in 90 Seconds
            </h3>
            <p className="text-lg mb-4">
              Deep Human revolutionizes personal AI by creating digital twins
              that network and negotiate on your behalf while you stay human.
              The platform combines sophisticated multi-agent systems with
              intuitive user experiences.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Instant Setup</strong>: Create your digital twin in
                  just 90 seconds
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Autonomous Networking</strong>: Your twin connects
                  with others based on compatibility
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Stay in Control</strong>: Review and guide your twin's
                  learning over time
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="/images/projects/deep-human/hero-landing.png"
              alt="Deep Human Landing Page"
              className="w-full h-auto"
            />
          </div>
        </div>
      </ProjectSection>

      <ProjectSection title="How Deep Human Works">
        <p className="text-lg mb-8">
          Deep Human creates a personalized MCP server that represents you in
          the digital world. Here's the elegant 4-step process that brings your
          digital twin to life:
        </p>

        <div className="space-y-12">
          {/* Step 1 & 2 */}
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard variant="default">
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg">
                  1
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-3">
                Create Your Profile
              </h4>
              <p className="mb-4">
                Complete your profile with your interests, skills, goals, and
                conversation style. This information forms the foundation of
                your digital twin's personality and capabilities.
              </p>
              <div className="rounded-lg overflow-hidden mt-4">
                <img
                  src="/images/projects/deep-human/how-it-works-1.png"
                  alt="Create Profile Step"
                  className="w-full h-auto"
                />
              </div>
            </ProjectCard>

            <ProjectCard variant="default">
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg">
                  2
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-3">
                Deploy Your MCP Server
              </h4>
              <p className="mb-4">
                With a single click, deploy your MCP server that hosts your
                digital twin. Your server runs continuously, representing you
                even when you're offline.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
                <code className="text-sm">
                  Deployment Status: 37s remaining...
                </code>
              </div>
            </ProjectCard>
          </div>

          {/* Step 3 & 4 */}
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="/images/projects/deep-human/how-it-works-2.png"
              alt="Connect and Review Steps"
              className="w-full h-auto"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard variant="accent">
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg">
                  3
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-3">
                Connect & Collaborate
              </h4>
              <p>
                Your digital twin finds and connects with other humans and AI
                agents based on shared interests and compatibility, initiating
                meaningful conversations and building your network autonomously.
              </p>
            </ProjectCard>

            <ProjectCard variant="accent">
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg">
                  4
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-3">Review & Guide</h4>
              <p>
                Stay in control by reviewing conversations, answering questions
                when your twin is unsure, and guiding its learning to better
                represent you over time. Your twin evolves with your feedback.
              </p>
            </ProjectCard>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection title="Interactive Demo Experience">
        <div className="mb-8">
          <p className="text-lg mb-6">
            Experience how Deep Human represents you in the digital world,
            making connections and managing your interactions while you focus on
            what matters.
          </p>

          <div className="rounded-lg overflow-hidden shadow-xl mb-8">
            <img
              src="/images/projects/deep-human/demo-interface.png"
              alt="Deep Human Demo Interface"
              className="w-full h-auto"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">🧠</div>
              <h5 className="font-semibold">Personalized AI</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tailored to your unique personality
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">👥</div>
              <h5 className="font-semibold">Smart Matching</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connects with compatible people
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">💬</div>
              <h5 className="font-semibold">Meaningful Conversations</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Engages in relevant discussions
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">📅</div>
              <h5 className="font-semibold">Event Coordination</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manages your digital presence
              </p>
            </div>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection title="Cutting-Edge AI Persona Development">
        <p className="text-lg mb-6">
          Deep Human represents cutting-edge research in AI persona development,
          featuring a sophisticated multi-agent system built on Model Context
          Protocol (MCP) servers. The framework implements advanced algorithms
          for human compatibility assessment, dynamic personality modeling, and
          intelligent collaboration between AI agents.
        </p>

        <MermaidDiagram
          title="Multi-Agent Persona Framework"
          diagram={multiAgentDiagram}
          description="Comprehensive AI persona system with multi-agent coordination, domain intelligence, and sophisticated compatibility analysis for human-AI collaboration."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Research-Grade AI Implementation
          </h3>
          <p>
            The system employs advanced prompt engineering, context-aware
            generation, and sophisticated algorithms for personality modeling.
            Each persona can dynamically generate authentic responses based on
            configurable personality traits, expertise domains, and interaction
            styles.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Technical Architecture Deep-Dive">
        <FeatureGrid features={architectureFeatures} columns={1} />

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Advanced Algorithms & AI Features
          </h3>
          <FeatureGrid features={algorithmFeatures} columns={3} />
        </div>
      </ProjectSection>

      <ProjectSection title="Innovation & Research Contributions">
        <FeatureGrid features={innovationFeatures} columns={1} />

        <ProjectCard variant="highlight" className="mt-8">
          <p className="italic text-center text-lg text-body">
            "Deep Human represents pioneering research in AI persona
            development, combining advanced algorithms, sophisticated
            architecture, and human-centered design. The project demonstrates my
            ability to tackle complex AI challenges while maintaining ethical
            considerations and user control."
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Measurable Technical Achievements">
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6 text-primary">
            Implementation Metrics
          </h3>
          <StatsDisplay stats={implementationMetrics} className="mb-8" />
        </div>

        <ProjectCard variant="accent" className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Research Innovation
          </h3>
          <ul className="space-y-3">
            {researchInnovations.map((innovation, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 bg-primary" />
                <span className="text-body">
                  <strong>{innovation.split(":")[0]}:</strong>{" "}
                  {innovation.split(":")[1]}
                </span>
              </li>
            ))}
          </ul>
        </ProjectCard>

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Vision & Ethical Considerations
            </h3>
            <p>
              Deep Human explores the intersection of technology and humanity
              while maintaining strong ethical foundations. The system
              emphasizes user control, privacy, and augmentation rather than
              replacement of human connections. All AI personas operate under
              user command with comprehensive "kill switch" capabilities and
              transparent operation modes.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Research Impact
            </h3>
            <p>
              This project contributes to the emerging field of AI persona
              development, providing frameworks and algorithms that advance our
              understanding of human-AI interaction patterns and effective
              collaboration strategies between humans and artificial agents.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        demoUrl="#"
        githubUrl="https://github.com/hopeatina/deep-human"
      />
    </ProjectLayout>
  );
}
