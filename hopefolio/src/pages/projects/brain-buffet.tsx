import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";
import TechStack from "@/components/projects/TechStack";
import FeatureGrid from "@/components/projects/FeatureGrid";
import StatsDisplay from "@/components/projects/StatsDisplay";
import ProjectCard from "@/components/projects/ProjectCard";
import MermaidDiagram from "@/components/projects/MermaidDiagram";

export default function BrainBuffet() {
  const techStack = [
    {
      category: "LLM Pipelines",
      technologies: "OpenAI GPT-4, Multi-step Chains, Structured Output",
    },
    {
      category: "Embeddings",
      technologies: "Embedding-based Course Recommendations, Vector Storage",
    },
    { category: "Frontend", technologies: "Next.js, React, TypeScript" },
    { category: "Backend", technologies: "Node.js, Express, REST APIs" },
    { category: "Database", technologies: "PostgreSQL, Vector Storage" },
    {
      category: "Content Generation",
      technologies: "Structured Generation, Template Engine, Validation",
    },
    {
      category: "Payments",
      technologies: "Stripe Integration, Subscription Management",
    },
    {
      category: "Analytics",
      technologies: "Progress Tracking, Completion Metrics",
    },
  ];

  const pipelineFeatures = [
    {
      title: "Multi-Step LLM Pipeline",
      description:
        "Course generation isn't a single prompt — it's a multi-step pipeline that produces structured, validated educational content",
      items: [
        "Step 1 — Topic Analysis: LLM analyzes the subject domain, identifies key concepts, and generates a course outline with learning objectives",
        "Step 2 — Content Generation: Each chapter is generated with structured output schemas ensuring consistent format, difficulty progression, and pedagogical flow",
        "Step 3 — Quiz Generation: Assessment questions are generated from course content to ensure relevance and pedagogical alignment",
        "Step 4 — Validation & Review: Generated content passes through validation checks for completeness, accuracy, and engagement quality",
      ],
    },
    {
      title: "Embedding-Based Course Recommendations",
      description:
        "Embeddings power course discovery and recommendation, helping users find relevant content across the catalog",
      items: [
        "Course Embedding: Each course is embedded for semantic similarity search and recommendation",
        "Topic Clustering: Related courses are grouped by embedding similarity for coherent learning paths",
        "Personalized Suggestions: User interests are matched against course embeddings for relevant recommendations",
        "Quality Scoring: Each generated section receives a quality score based on pedagogical criteria",
      ],
    },
  ];

  const productFeatures = [
    {
      title: "250+ Courses Generated",
      description:
        "BrainBuffet has generated a substantial course catalog through its LLM pipeline across multiple subject areas",
      items: [
        "250+ courses created through the LLM pipeline, covering financial literacy, digital wellness, and professional development",
        "Stripe integration for payment processing and subscription management",
        "774 commits over 3 years of active development since March 2023",
        "Responsive web design for cross-device learning experiences",
      ],
    },
    {
      title: "Structured Generation System",
      description:
        "Every piece of content follows a strict schema that ensures pedagogical quality",
      items: [
        "Chapter Structure: Title, objectives, content blocks, key takeaways, assessment — all generated to schema",
        "Difficulty Progression: LLM pipeline ensures concepts build on each other with appropriate complexity curves",
        "Interactive Elements: Quizzes, exercises, and knowledge checks generated inline with chapter content",
        "Engagement Optimization: Content length, reading level, and interactivity calibrated per audience segment",
      ],
    },
  ];

  const impactStats = [
    {
      value: "250+",
      label: "Courses Generated",
      description: "Via multi-step LLM pipeline",
    },
    {
      value: "774",
      label: "Commits",
      description: "Since March 2023",
    },
    {
      value: "Stripe",
      label: "Payments",
      description: "Integrated billing",
    },
    {
      value: "Multi-step",
      label: "LLM Pipeline",
      description: "Structured generation",
    },
  ];

  const pipelineDiagram = `
    flowchart LR
      A[Topic Input] --> B[Topic Analysis]
      B --> C[Outline Generation]
      C --> E[Content Generation]
      E --> F[Quiz Generation]
      F --> G[Validation]
      G --> H[Published Course]

      I[Course Catalog] --> J[Embedding]
      J --> K[Recommendations]

      L[Structured Schema] --> E
      L --> F

      style B fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style E fill:#3B82F6,stroke:#2563EB,color:#fff
      style G fill:#10B981,stroke:#059669,color:#fff
      style K fill:#F59E0B,stroke:#D97706,color:#fff
  `;

  return (
    <ProjectLayout
      title="BrainBuffet"
      description="LLM pipeline platform for automated course generation with structured output and embedding-based recommendations — 250+ courses generated, 774 commits"
    >
      <ProjectHero
        title="BrainBuffet"
        description="An LLM pipeline platform that generates structured educational courses through multi-step generation, validated structured output, and embedding-based recommendations. 250+ courses generated across financial literacy, digital wellness, and professional development. 774 commits since March 2023."
        tags={[
          "LLM Pipelines",
          "Structured Generation",
          "Embeddings",
          "Stripe",
          "Next.js",
        ]}
        image="/images/projects/brain-buffet.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="The Problem">
        <p className="text-lg mb-4">
          <strong>
            Creating quality educational content is slow and expensive.
          </strong>{" "}
          Manual course authoring takes weeks per course, doesn't scale, and
          content quality varies wildly depending on the author. The question
          wasn't whether AI could help — it was whether AI could produce
          content that's actually good enough to charge for.
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <strong>Speed</strong>: Manual course creation takes 2-4 weeks per
            course
          </li>
          <li>
            <strong>Consistency</strong>: Quality varies across authors and
            topics
          </li>
          <li>
            <strong>Scale</strong>: Can't cover hundreds of topics with manual
            authoring
          </li>
          <li>
            <strong>Discovery</strong>: Users need help finding relevant courses
            across a growing catalog
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="LLM Pipeline Architecture">
        <MermaidDiagram
          title="Multi-Step Course Generation Pipeline"
          diagram={pipelineDiagram}
          description="End-to-end pipeline from topic input to published course, with structured schemas for consistency and embeddings for course recommendations."
          className="mb-8"
        />

        <FeatureGrid features={pipelineFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Product & Scale">
        <FeatureGrid features={productFeatures} columns={1} />

        <div className="mt-8">
          <StatsDisplay stats={impactStats} />
        </div>
      </ProjectSection>

      <ProjectSection title="Technical Decisions">
        <div className="space-y-6">
          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Why Multi-Step Pipelines Over Single-Prompt Generation
            </h3>
            <p>
              A single prompt can't produce a quality 10-chapter course.
              Breaking generation into steps — outline, content, quizzes,
              validation — gives each step focused context and allows
              intermediate quality checks. If chapter 5 fails validation, you
              regenerate chapter 5, not the entire course.
            </p>
          </ProjectCard>

          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Why Embeddings for Course Recommendations
            </h3>
            <p>
              With 250+ courses in the catalog, discovery becomes a real
              problem. Embedding-based recommendations match user interests to
              courses semantically, surfacing relevant content that keyword
              search would miss. This drives engagement and helps users build
              coherent learning paths.
            </p>
          </ProjectCard>

          <ProjectCard variant="default">
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Why Structured Generation
            </h3>
            <p>
              Every course follows a strict schema: chapters have objectives,
              content blocks, key takeaways, and assessments. This isn't just
              formatting — it ensures pedagogical consistency across 250+
              courses and makes the content renderable across mobile, web, and
              future platforms.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/hopeatina/brainbuffet"
      />
    </ProjectLayout>
  );
}
