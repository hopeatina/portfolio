import React from "react";
import Image from "next/image";
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
      technologies: "MCP Protocol, Persona-as-a-Service",
    },
    { category: "AI/LLM", technologies: "OpenAI GPT-4, Anthropic Claude" },
    {
      category: "Algorithms",
      technologies: "Compatibility Scoring, Domain Intelligence",
    },
    { category: "Configuration", technologies: "YAML Persona Definitions (3 personas)" },
    {
      category: "Tools",
      technologies: "7 MCP Tools, 4 MCP Resources",
    },
    {
      category: "Intelligence",
      technologies: "LLM-Powered Generation, Domain Detection",
    },
    {
      category: "Control",
      technologies: "User Management, Kill Switch Systems",
    },
  ];

  const architectureFeatures = [
    {
      title: "MCP Server Implementation (~1,200 Lines of Python)",
      description:
        "FastMCP-based server with persona interaction tools and resources",
      items: [
        "FastMCP Framework: Server implementation with 7 MCP tools (get_basic_info, get_interests, get_skills, get_goals, hire_ios_engineer, find_job, converse) and 4 resources",
        "Dynamic Content Engine: Generation of interests, skills, and goals using configurable prompts",
        "Domain Intelligence: Domain detection system with core/emerging/LLM classification",
        "Compatibility Algorithms: LLM-powered scoring analyzing shared interests, skill complementarity, and goal alignment",
        "Conversation Engine: Context-aware dialogue system with personality-consistent response generation",
      ],
    },
    {
      title: "YAML-Based Persona Configuration",
      description:
        "Configuration framework with 3 persona definitions and domain management",
      items: [
        "Persona Definition: YAML schemas defining personality, expertise, and interaction patterns for 3 personas",
        "Prompt Template Engine: Templating system for domain-specific content generation",
        "Matching Weight Algorithms: Configurable algorithms for computing human compatibility scores",
        "LLM Configuration: Multi-provider support (OpenAI, Anthropic) with optimized prompts per persona",
        "Domain Architecture: Structured knowledge domains with aliases, keywords, and specialized behaviors",
      ],
    },
    {
      title: "MCP Protocol Integration",
      description:
        "Persona-as-a-service architecture using the Model Context Protocol",
      items: [
        "MCP Tool Exposure: Each persona's capabilities exposed as callable MCP tools",
        "Resource Endpoints: 4 MCP resources for accessing persona data programmatically",
        "User Control Interface: Kill switch and persona management capabilities",
        "Hackathon Prototype: Built as an exploration of persona-as-a-service via MCP",
      ],
    },
  ];

  const innovationFeatures = [
    {
      title: "AI Persona Architecture",
      description:
        "LLM-powered approach to AI persona development with domain detection and configurable persona definitions",
      items: [
        "Domain Detection: Core domains defined in YAML, with LLM-powered generation for emerging topics",
        "Domain-Specific Expertise: Dynamic adaptation to technical, creative, and interpersonal contexts",
        "Personality Consistency: Prompt engineering ensuring authentic, consistent persona responses",
        "Configurable Personas: 3 persona definitions with distinct personalities and expertise areas",
      ],
    },
    {
      title: "LLM-Powered Compatibility Scoring",
      description:
        "Compatibility assessment between personas using multi-dimensional LLM analysis",
      items: [
        "Multi-Dimensional Scoring: LLM-powered analysis considering interests (weighted overlap), skills (complementarity), and goals (alignment)",
        "Temporal Compatibility: Timezone analysis for optimal collaboration scheduling",
        "Communication Style Matching: Analysis of personality styles for effective collaboration",
        "Collaboration Opportunity Detection: Identification of productive partnership opportunities",
      ],
    },
    {
      title: "Potential Use Cases",
      description:
        "Envisioned applications of persona-as-a-service technology",
      items: [
        "Meeting Preparation: AI personas simulating specific individuals for practice and preparation",
        "Team Formation: Matching algorithms for optimal team composition",
        "Networking: Persona-based introductions based on compatibility scoring",
        "Knowledge Representation: Persona-based preservation of individual expertise and communication patterns",
      ],
    },
  ];

  const algorithmFeatures = [
    {
      title: "Compatibility Scoring",
      description:
        "Multi-dimensional analysis considering interests, skills, goals, and timezones",
    },
    {
      title: "Skill Complementarity",
      description:
        "Mathematical models identifying synergistic skill combinations",
    },
    {
      title: "Goal Alignment Analysis",
      description:
        "Sophisticated algorithms for measuring shared objectives and motivations",
    },
    {
      title: "Startup Ideation Engine",
      description:
        "AI system generating business concepts from skill and interest intersections",
    },
    {
      title: "Social Network Modeling",
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
      value: "~1,200",
      label: "Lines of Python",
      description: "FastMCP implementation",
    },
    { value: "7+4", label: "Tools & Resources", description: "MCP endpoints" },
    { value: "3", label: "Personas", description: "YAML-defined" },
    {
      value: "MCP",
      label: "Hackathon Prototype",
      description: "Persona-as-a-service",
    },
  ];

  const researchInnovations = [
    "LLM Compatibility Scoring: Multi-dimensional compatibility analysis via LLM for persona matching",
    "Prompt Engineering: Techniques ensuring personality consistency across interactions",
    "Dynamic Content Generation: Creation of contextual interests, skills, and goals with domain awareness",
    "Ethical AI Framework: User control mechanisms with oversight and kill switch capabilities",
  ];

  return (
    <ProjectLayout
      title="Deep Human"
      description="MCP hackathon prototype exploring persona-as-a-service with FastMCP, YAML persona definitions, and LLM-powered compatibility scoring"
    >
      <ProjectHero
        title="Deep Human"
        description="An MCP hackathon prototype exploring persona-as-a-service. Creates personalized MCP servers representing digital personas with 7 tools and 4 resources. Features YAML-defined personas, LLM-powered compatibility scoring, and domain-aware conversation generation."
        tags={[
          "MCP Protocol",
          "FastMCP",
          "Python",
          "Hackathon Prototype",
          "Persona-as-a-Service",
        ]}
        image="/images/projects/deep-human/hero-landing.png"
      />

      <TechStack items={techStack} />

      <ProjectSection title="Concept">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h3
              className="text-2xl font-semibold mb-4"
              style={{ color: themeProps.colors.primary }}
            >
              Persona-as-a-Service via MCP
            </h3>
            <p className="text-lg mb-4">
              Deep Human explores the idea of representing people as MCP servers
              — exposing their interests, skills, and goals as callable tools.
              Built as a hackathon prototype, it demonstrates how the MCP
              protocol can be used beyond developer tooling.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>YAML Personas</strong>: Define personality, expertise,
                  and interaction patterns in configuration
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>MCP Tools</strong>: Expose persona capabilities as
                  7 callable tools and 4 resources
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Compatibility Scoring</strong>: LLM-powered analysis
                  of interest, skill, and goal alignment
                </span>
              </li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-xl aspect-[16/10]">
            <Image
              src="/images/projects/deep-human/hero-landing.png"
              alt="Deep Human Landing Page"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </ProjectSection>

      <ProjectSection title="How Deep Human Works">
        <p className="text-lg mb-8">
          Deep Human creates a personalized MCP server that represents you in
          the digital world. Here&apos;s the elegant 4-step process that brings your
          digital twin to life:
        </p>

        <div className="space-y-12">
          {/* Step 1 & 2 */}
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard variant="default">
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-text font-bold text-lg">
                  1
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-3">
                Create Your Profile
              </h4>
              <p className="mb-4">
                Complete your profile with your interests, skills, goals, and
                conversation style. This information forms the foundation of
                your digital twin&apos;s personality and capabilities.
              </p>
              <div className="relative overflow-hidden rounded-lg mt-4 aspect-[16/10]">
                <Image
                  src="/images/projects/deep-human/how-it-works-1.png"
                  alt="Create Profile Step"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </ProjectCard>

            <ProjectCard variant="default">
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-text font-bold text-lg">
                  2
                </span>
              </div>
              <h4 className="text-xl font-semibold mb-3">
                Deploy Your MCP Server
              </h4>
              <p className="mb-4">
                With a single click, deploy your MCP server that hosts your
                digital twin. Your server runs continuously, representing you
                even when you&apos;re offline.
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4">
                <code className="text-sm">
                  Deployment Status: 37s remaining...
                </code>
              </div>
            </ProjectCard>
          </div>

          {/* Step 3 & 4 */}
          <div className="relative overflow-hidden rounded-lg shadow-xl aspect-[16/10]">
            <Image
              src="/images/projects/deep-human/how-it-works-2.png"
              alt="Connect and Review Steps"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard variant="accent">
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-text font-bold text-lg">
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
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-text font-bold text-lg">
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

          <div className="relative overflow-hidden rounded-lg shadow-xl mb-8 aspect-[16/10]">
            <Image
              src="/images/projects/deep-human/demo-interface.png"
              alt="Deep Human Demo Interface"
              fill
              sizes="100vw"
              className="object-cover"
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

      <ProjectSection title="AI Persona Development">
        <p className="text-lg mb-6">
          Deep Human is an MCP hackathon prototype exploring persona-as-a-service,
          built on the FastMCP framework. It implements LLM-powered compatibility
          scoring, YAML-defined persona configurations, and domain-aware content
          generation through 7 MCP tools and 4 resources.
        </p>

        <MermaidDiagram
          title="Multi-Agent Persona Framework"
          diagram={multiAgentDiagram}
          description="Comprehensive AI persona system with multi-agent coordination, domain intelligence, and sophisticated compatibility analysis for human-AI collaboration."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Hackathon Prototype
          </h3>
          <p>
            Built during a hackathon to explore persona-as-a-service via MCP.
            Each persona can dynamically generate responses based on
            configurable personality traits, expertise domains, and interaction
            styles defined in YAML configuration files.
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

      <ProjectSection title="Exploration & Innovation">
        <FeatureGrid features={innovationFeatures} columns={1} />
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
              user command with comprehensive &quot;kill switch&quot; capabilities and
              transparent operation modes.
            </p>
          </ProjectCard>

          <ProjectCard variant="highlight">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              What I Learned
            </h3>
            <p>
              This hackathon prototype demonstrated that MCP can serve as a
              protocol for persona representation, not just developer tooling.
              The experience of building persona-as-a-service highlighted both
              the potential and the constraints of the MCP tool/resource model
              for non-traditional use cases.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/hopeatina/deep-human"
      />
    </ProjectLayout>
  );
}
