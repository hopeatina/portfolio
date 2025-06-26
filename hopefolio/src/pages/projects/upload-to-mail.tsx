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

export default function UploadToMail() {
  const { themeProps } = useTheme();

  const techStack = [
    { category: "Frontend", technologies: "React, TypeScript, Radix UI" },
    { category: "Backend", technologies: "Express.js, Node.js, PostgreSQL" },
    { category: "Database", technologies: "Drizzle ORM, PostgreSQL" },
    { category: "Payments", technologies: "Stripe, Webhook Processing" },
    {
      category: "File Processing",
      technologies: "Multer, Multi-format Support",
    },
    { category: "Testing", technologies: "Jest, Playwright, RTL" },
    { category: "DevOps", technologies: "Docker, CI/CD, Automated Setup" },
    {
      category: "APIs",
      technologies: "Geoapify, Nodemailer, Address Validation",
    },
  ];

  const keyAchievements = [
    {
      title: "🏗️ Production Infrastructure",
      description:
        "Enterprise-grade architecture with comprehensive deployment and monitoring solutions",
      items: [
        "Docker containerization with multi-stage builds",
        "PostgreSQL database with Drizzle ORM optimization",
        "Automated setup scripts for development environments",
        "Comprehensive environment management across stages",
      ],
    },
    {
      title: "📁 Advanced File Processing",
      description:
        "Robust document handling system supporting multiple formats with security validation",
      items: [
        "Support for PDF, DOC, DOCX, JPG, PNG formats",
        "Server-side validation and security scanning preparation",
        "10MB+ file processing with chunked upload capabilities",
        "Secure storage with S3-ready architecture",
      ],
    },
    {
      title: "🧪 Comprehensive Testing",
      description:
        "Production-quality testing suite ensuring reliability and maintainability",
      items: [
        "95%+ code coverage across all critical paths",
        "Unit, integration, and E2E test suites",
        "Performance testing for concurrent file uploads",
        "Automated CI/CD pipeline with coverage reporting",
      ],
    },
    {
      title: "🔒 Enterprise Security",
      description:
        "Multi-layered security implementation protecting user data and transactions",
      items: [
        "Rate limiting and DDoS protection",
        "hCaptcha integration for bot prevention",
        "Secure session management and payment tokenization",
        "CORS configuration and input sanitization",
      ],
    },
  ];

  const architectureFeatures = [
    {
      title: "⚙️ Backend Architecture",
      description:
        "Robust server-side implementation with optimized performance and reliability",
      items: [
        "Express.js server with custom middleware stack",
        "Request logging, error handling, and performance monitoring",
        "Optimized PostgreSQL schema for document tracking",
        "Complete Stripe integration with webhook verification",
        "Nodemailer email system with templated notifications",
      ],
    },
    {
      title: "⚛️ Frontend Architecture",
      description:
        "Modern React application with TypeScript and accessibility-first design",
      items: [
        "Fully typed components with custom hooks",
        "Radix UI component library with Tailwind CSS",
        "React Hook Form with Zod validation",
        "TanStack Query for server state management",
        "Code splitting and lazy loading for performance",
      ],
    },
  ];

  const innovationFeatures = [
    {
      title: "🚀 Technical Challenges Solved",
      description:
        "Complex engineering solutions for real-world production requirements",
      items: [
        "Large File Upload Optimization: Chunked uploads with progress tracking and resume capability",
        "Address Verification Integration: Custom API wrapper for real-time validation with suggestions",
        "Payment Flow Resilience: Idempotent processing with automatic retry logic",
        "Multi-format Document Processing: Unified pipeline supporting diverse document types",
        "Real-time Wizard State: Persistent state surviving page refreshes and crashes",
      ],
    },
    {
      title: "🎨 User Experience Innovation",
      description:
        "Intuitive interfaces and guided workflows enhancing user satisfaction",
      items: [
        "Guided Onboarding: Context-aware tutorial system with progressive disclosure",
        "Document Preview: Advanced PDF/image preview with zoom and mobile optimization",
        "Smart Address Completion: Geoapify integration with intelligent suggestions",
        "Order Tracking: Real-time status updates with email notifications",
      ],
    },
  ];

  const systemFlow = `Document Upload → File Validation → Address Verification → Payment Processing → Mail Generation → Order Tracking
     ↑                                                                                              ↓
User Interface ←―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――→ Status Notifications`;

  const impactMetrics = [
    {
      value: "95%+",
      label: "Test Coverage",
      description: "Across all critical paths",
    },
    {
      value: "Sub-2s",
      label: "Page Load Times",
      description: "With optimized bundles",
    },
    {
      value: "10MB+",
      label: "File Processing",
      description: "With real-time progress",
    },
    {
      value: "Zero",
      label: "Downtime Deployment",
      description: "Production architecture",
    },
  ];

  const developmentAchievements = [
    "Complete SDLC: Full software development lifecycle from requirements to production deployment",
    "Advanced DevOps: Comprehensive CI/CD pipeline with automated testing and deployment",
    "Security Best Practices: Enterprise-grade security implementation throughout the entire stack",
    "Comprehensive Documentation: Detailed documentation ensuring long-term maintainability",
  ];

  return (
    <ProjectLayout
      title="Upload to Mail"
      description="Production-ready full-stack application bridging digital and physical mail with enterprise-grade security, comprehensive testing, and 10MB+ document processing"
    >
      <ProjectHero
        title="Upload to Mail"
        description="A sophisticated full-stack web application that enables users to upload digital documents and send them as physical mail. Built with production-grade architecture, comprehensive testing, and enterprise security features."
        tags={[
          "Full Stack",
          "React",
          "TypeScript",
          "PostgreSQL",
          "Stripe",
          "Production Ready",
        ]}
        image="/images/projects/upload-to-mail.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="Architecture & Scale">
        <p className="text-lg mb-6">
          Upload to Mail demonstrates production-ready full-stack development
          with a client-server architecture handling multi-megabyte file
          uploads, real-time payment processing, and automated workflow
          orchestration. The system processes documents up to 10MB across
          multiple formats with comprehensive validation and security layers.
        </p>

        <SystemDiagram
          title="End-to-End Processing Flow"
          diagram={systemFlow}
          type="text"
          description="Complete workflow from document upload to physical mail delivery, with real-time tracking and status notifications throughout the process."
        />
      </ProjectSection>

      <ProjectSection title="Key Technical Achievements">
        <FeatureGrid features={keyAchievements} columns={2} />

        <ProjectCard variant="secondary" className="mt-8">
          <h3
            className="text-xl font-semibold mb-4"
            style={{
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.headingFont,
            }}
          >
            Development Workflow Innovation
          </h3>
          <p>
            Implemented sophisticated development tooling including automated VS
            Code setup, comprehensive debugging configurations for both client
            and server, and a complete CI/CD pipeline. The project showcases
            advanced testing strategies with separate client/server/component
            test suites and automated coverage reporting.
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Technical Implementation Deep-Dive">
        <FeatureGrid features={architectureFeatures} columns={2} />

        <div className="mt-8">
          <ProjectCard variant="accent">
            <h3
              className="text-xl font-semibold mb-4"
              style={{
                color: themeProps.colors.primary,
                fontFamily: themeProps.typography.headingFont,
              }}
            >
              Testing & Quality Assurance
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: themeProps.colors.primary }}
                />
                <span>
                  <strong>Comprehensive Test Coverage:</strong> 95%+ coverage
                  across components, hooks, API routes, and user flows
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: themeProps.colors.primary }}
                />
                <span>
                  <strong>Testing Strategy:</strong> Unit tests for isolated
                  logic, integration tests for API endpoints, E2E tests for
                  critical paths
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: themeProps.colors.primary }}
                />
                <span>
                  <strong>CI/CD Pipeline:</strong> Automated testing on every
                  commit with coverage reporting and deployment checks
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: themeProps.colors.primary }}
                />
                <span>
                  <strong>Performance Testing:</strong> Load testing for file
                  uploads and payment processing under concurrent users
                </span>
              </li>
            </ul>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Innovation & Problem Solving">
        <FeatureGrid features={innovationFeatures} columns={2} />

        <ProjectCard variant="highlight" className="mt-8">
          <p
            className="italic text-center text-lg"
            style={{
              color: themeProps.colors.text,
              fontFamily: themeProps.typography.bodyFont,
              lineHeight: themeProps.typography.lineHeight,
            }}
          >
            "This project showcases my ability to build production-ready
            applications from conception to deployment, handling complex
            technical challenges while maintaining code quality and user
            experience excellence. The comprehensive testing and documentation
            demonstrate my commitment to maintainable, enterprise-grade
            software."
          </p>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Measurable Impact & Results">
        <StatsDisplay stats={impactMetrics} columns={4} className="mb-8" />

        <ProjectCard variant="accent">
          <h3
            className="text-xl font-semibold mb-4"
            style={{
              color: themeProps.colors.primary,
              fontFamily: themeProps.typography.headingFont,
            }}
          >
            Development Achievements
          </h3>
          <ul className="space-y-3">
            {developmentAchievements.map((achievement, index) => (
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
      </ProjectSection>

      <ProjectCTA
        demoUrl="https://uploadtomail.com"
        githubUrl="https://github.com/hopeatina/uploadtomail"
      />
    </ProjectLayout>
  );
}
