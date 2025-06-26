import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import SystemDiagram from "@/components/projects/SystemDiagram";
import StatsDisplay from "@/components/projects/StatsDisplay";
import ProjectCard from "@/components/projects/ProjectCard";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export default function TaskToModel() {
  const { themeProps } = useTheme();

  const techStack = [
    {
      category: "Frontend",
      technologies: "Next.js, TypeScript, React Hook Form",
    },
    { category: "Backend", technologies: "Node.js, Express, RESTful APIs" },
    { category: "Database", technologies: "MongoDB, Optimized Schemas" },
    { category: "Authentication", technologies: "NextAuth, Google OAuth" },
    { category: "Payments", technologies: "Stripe, Subscription Management" },
    { category: "AI/ML", technologies: "OpenAI Fine-tuning, LLM Integration" },
    { category: "Analytics", technologies: "Airtable, Conversion Tracking" },
    {
      category: "Infrastructure",
      technologies: "Docker, Production Deployment",
    },
  ];

  const stageFeatures = [
    {
      title: "🎯 Stage 0: Market Validation Platform",
      description:
        "Comprehensive market validation with systematic user feedback and conversion optimization",
      items: [
        "Landing Page Optimization: Compelling value proposition with conversion tracking and A/B testing",
        "Waitlist System: Airtable integration with automated email sequences and engagement metrics",
        "Pre-order Mechanism: Stripe integration for market validation with tiered pricing validation",
        "Analytics Pipeline: Comprehensive tracking for conversion optimization and user behavior analysis",
      ],
    },
    {
      title: "🚀 Stage 1: MVP Implementation",
      description:
        "Production-ready MVP with enterprise authentication and AI model generation capabilities",
      items: [
        "NextAuth Integration: Complete authentication system with Google OAuth, session management, and user profiles",
        "Task Description Engine: Sophisticated form system with validation, auto-save, and progress tracking",
        "OpenAI Fine-tuning: Direct API integration with job monitoring, progress tracking, and error handling",
        "Model Testing Interface: Interactive testing environment with A/B comparison against base models",
        "Payment Processing: Stripe integration with subscription handling and usage-based billing",
      ],
    },
    {
      title: "🔮 Stages 2-4: Advanced Features",
      description:
        "Enterprise-scale platform with team collaboration and white-label capabilities",
      items: [
        "AI-Assisted Generation: Automated example creation using LLMs with quality validation",
        "Comprehensive Evaluation: Multi-metric model assessment with custom evaluation frameworks",
        "API Integration: RESTful API for model deployment with authentication and rate limiting",
        "Team Collaboration: Multi-user project management with role-based access control",
        "Enterprise Features: White-label capabilities, custom deployment options, and advanced security",
      ],
    },
  ];

  const innovationFeatures = [
    {
      title: "📊 Market Validation Innovation",
      description:
        "Systematic approach to product-market fit validation with quantitative metrics",
      items: [
        "Systematic Validation: Comprehensive market research with quantitative validation metrics",
        "Risk Mitigation: Detailed analysis of potential challenges with mitigation strategies",
        "User Journey Optimization: Carefully designed onboarding and conversion funnels",
        "Feedback Integration: Systematic user feedback collection and product iteration cycles",
      ],
    },
    {
      title: "🤖 Technical Innovation",
      description:
        "Advanced AI pipeline automation with natural language processing capabilities",
      items: [
        "Automated ML Pipeline: End-to-end automation from task description to deployed model",
        "Natural Language Processing: Advanced parsing of task descriptions into training specifications",
        "Model Quality Assurance: Automated validation and testing frameworks for generated models",
        "Scalable Architecture: Design supporting enterprise-scale model generation and deployment",
      ],
    },
    {
      title: "📈 Product Management Excellence",
      description:
        "Strategic product development with comprehensive planning and execution frameworks",
      items: [
        "Stage-Gate Development: Structured approach with clear milestones and success criteria",
        "Edge Case Planning: Comprehensive analysis of potential failure modes and solutions",
        "Value Engineering: Systematic approach to maximizing perceived value at each stage",
        "Competitive Analysis: Detailed market positioning and differentiation strategies",
      ],
    },
  ];

  const systemFlow = `Task Description → NLP Analysis → Training Data Generation → OpenAI Fine-tuning → Model Validation → API Deployment
     ↑                                                                                              ↓
User Interface ←―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――→ Usage Analytics`;

  const developmentMetrics = [
    {
      value: "4-Stage",
      label: "Development Plan",
      description: "Systematic progression",
    },
    {
      value: "100+",
      label: "Documentation Pages",
      description: "Comprehensive specs",
    },
    {
      value: "Enterprise",
      label: "Authentication",
      description: "NextAuth & OAuth",
    },
    {
      value: "Full-Stack",
      label: "Implementation",
      description: "End-to-end platform",
    },
  ];

  const stageTimeline = [
    { value: "Weeks 1-2", label: "Market Validation" },
    { value: "Weeks 3-6", label: "MVP Development" },
    { value: "Weeks 7-10", label: "Enhanced Features" },
    { value: "Weeks 11-14", label: "Advanced Capabilities" },
    { value: "Weeks 15+", label: "Enterprise Platform" },
  ];

  const successMetrics = [
    "User Acquisition: Systematic waitlist growth targeting with conversion optimization",
    "Product-Market Fit: Quantitative validation metrics and systematic user feedback integration",
    "Technical Performance: Model quality assessment and generation speed optimization",
    "Business Metrics: Revenue targets, customer satisfaction scores, and retention analytics",
  ];

  return (
    <ProjectLayout
      title="TaskToModel"
      description="Enterprise AI platform with comprehensive product strategy – 4-stage development plan, market validation, NextAuth integration, Stripe payments, and automated fine-tuning pipeline"
    >
      <ProjectHero
        title="TaskToModel"
        description="A comprehensive AI platform that converts plain English task descriptions into fine-tuned AI models. Features sophisticated product development strategy, systematic market validation, enterprise authentication, and automated ML pipeline orchestration."
        tags={[
          "AI Platform",
          "Product Strategy",
          "Next.js",
          "Enterprise",
          "Market Validation",
        ]}
        image="/images/projects/tasktomodel.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="Strategic Product Development">
        <p className="text-lg mb-6">
          TaskToModel demonstrates enterprise-level product development with
          comprehensive market validation, phased rollout strategy, and
          sophisticated technical architecture. The platform addresses the
          critical gap between AI capability and accessibility, enabling domain
          experts to create specialized AI models without technical expertise.
        </p>

        <SystemDiagram
          title="AI Model Generation Pipeline"
          diagram={systemFlow}
          type="text"
          description="Complete workflow from task description to deployed AI model, with automated fine-tuning and comprehensive validation throughout the process."
        />

        <ProjectCard variant="secondary" className="mt-8">
          <h3
            className="text-xl font-semibold mb-4"
            style={{
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.headingFont,
            }}
          >
            Product Strategy Excellence
          </h3>
          <p>
            The project showcases advanced product management skills with
            detailed stage planning, risk assessment, edge case analysis, and
            systematic approach to feature development. Each stage includes
            specific success metrics, technical milestones, and user experience
            optimization strategies.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Technical Architecture & Implementation">
        <FeatureGrid features={stageFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Innovation & Product Excellence">
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
            "TaskToModel demonstrates my ability to conceptualize, plan, and
            execute complex AI products from market validation to enterprise
            deployment. The systematic approach to product development showcases
            both technical depth and strategic business thinking essential for
            senior engineering roles."
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Development Strategy & Execution">
        <StatsDisplay stats={developmentMetrics} columns={4} className="mb-8" />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <ProjectCard variant="accent">
            <h3
              className="text-xl font-semibold mb-4"
              style={{
                color: themeProps.colors.primary,
                fontFamily: themeProps.typography.headingFont,
              }}
            >
              Stage Development Timeline
            </h3>
            <div className="space-y-3">
              {stageTimeline.map((stage, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="font-medium">{stage.label}:</span>
                  <span style={{ color: themeProps.colors.highlight }}>
                    {stage.value}
                  </span>
                </div>
              ))}
            </div>
          </ProjectCard>

          <ProjectCard variant="secondary">
            <h3
              className="text-xl font-semibold mb-4"
              style={{
                color: themeProps.colors.primary,
                fontFamily: themeProps.typography.headingFont,
              }}
            >
              Key Success Metrics
            </h3>
            <ul className="space-y-3">
              {successMetrics.map((metric, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                    style={{ backgroundColor: themeProps.colors.primary }}
                  />
                  <span style={{ color: themeProps.colors.text }}>
                    <strong>{metric.split(":")[0]}:</strong>{" "}
                    {metric.split(":")[1]}
                  </span>
                </li>
              ))}
            </ul>
          </ProjectCard>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard variant="highlight">
            <h3
              className="text-xl font-semibold mb-3"
              style={{
                color: themeProps.colors.primary,
                fontFamily: themeProps.typography.headingFont,
              }}
            >
              Documentation & Planning Excellence
            </h3>
            <p>
              The project includes comprehensive documentation with detailed
              stage specifications, technical requirements, user experience
              flows, and business strategy. Each stage document includes edge
              case analysis, opportunity identification, and value enhancement
              strategies.
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
              Vision Statement
            </h3>
            <p>
              TaskToModel embodies the democratization of AI development, making
              advanced machine learning accessible to domain experts across
              industries. The platform bridges the gap between AI capability and
              practical application, enabling innovation without requiring deep
              technical expertise.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        demoUrl="https://tasktomodel.com"
        githubUrl="https://github.com/hopeatina/tasktomodel"
      />
    </ProjectLayout>
  );
}
