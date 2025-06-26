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
      category: "Frontend",
      technologies: "Next.js, React, TypeScript, Mobile-First Design",
    },
    { category: "Backend", technologies: "Node.js, Express, REST APIs" },
    { category: "Database", technologies: "PostgreSQL, Course Management" },
    { category: "AI/ML", technologies: "OpenAI GPT-4, Content Generation" },
    {
      category: "Media",
      technologies: "Video Processing, Mobile Optimization",
    },
    {
      category: "UI/UX",
      technologies: "Responsive Design, Progressive Web App",
    },
    {
      category: "Content",
      technologies: "Interactive Quizzes, Chapter-based Learning",
    },
    {
      category: "Analytics",
      technologies: "Progress Tracking, Completion Metrics",
    },
  ];

  const coreFeatures = [
    {
      title: "📱 Mobile-First Learning",
      description:
        "Designed specifically for mobile consumption with optimized video content, responsive design, and seamless touch interactions. Perfect for learning on-the-go with offline capabilities.",
    },
    {
      title: "🎯 Interactive Course Experience",
      description:
        "Chapter-based learning with integrated quizzes, progress tracking, and completion rewards. Features interactive elements like star completion icons and engagement metrics.",
    },
  ];

  const platformFeatures = [
    {
      title: "💰 Financial Freedom Courses",
      description:
        "Comprehensive personal finance education with practical applications",
      items: [
        "Chapter-based Financial Literacy: Structured lessons covering budgeting, investing, and wealth building",
        "Mobile-Optimized Content: Video lessons designed for smartphone viewing with clear, engaging visuals",
        "Interactive Examples: Real-world financial scenarios and calculators",
        "Progress Tracking: Visual progress indicators and completion rewards",
      ],
    },
    {
      title: "📱 Digital Wellness Programs",
      description:
        "Courses focused on healthy technology habits and digital detox",
      items: [
        "iPhone Addiction Recovery: Structured program for reducing phone dependency",
        "Mindful Technology Use: Strategies for balanced digital consumption",
        "Habit Formation: Evidence-based approaches to building healthier tech habits",
        "Community Support: Progress sharing and peer accountability features",
      ],
    },
    {
      title: "🎮 Gamified Learning Experience",
      description: "Engaging features that motivate continued learning",
      items: [
        "Quiz Integration: Built-in knowledge checks with instant feedback",
        "Star Completion System: Visual rewards for completing chapters and courses",
        "Progress Visualization: Clear indicators of learning journey advancement",
        "Achievement Badges: Recognition system for reaching learning milestones",
      ],
    },
  ];

  const impactMetrics = [
    {
      title: "📱 Mobile-First Design",
      description:
        "Responsive platform optimized for smartphone learning with touch-friendly interfaces, optimized video playback, and offline capabilities for learning anywhere.",
    },
    {
      title: "🎯 Focused Course Content",
      description:
        "Specialized courses in high-demand areas like financial literacy and digital wellness, with practical applications and real-world scenarios for immediate implementation.",
    },
    {
      title: "🎮 Interactive Learning",
      description:
        "Gamified experience with integrated quizzes, progress tracking, star completion rewards, and chapter-based progression to maintain learner engagement.",
    },
    {
      title: "🚀 Accessibility Focus",
      description:
        "Designed for busy professionals and students who need flexible, mobile-accessible education that fits into their daily routines and lifestyles.",
    },
  ];

  const useCases = [
    {
      title: "💼 Personal Development Learners",
      description:
        "Individuals seeking to improve their financial literacy and digital wellness habits through mobile-accessible courses.",
      items: [
        "Professionals building financial independence",
        "Young adults learning money management",
        "People struggling with technology addiction",
        "Anyone seeking structured personal growth",
      ],
    },
    {
      title: "🎯 Mobile-First Education",
      description:
        "Optimized for busy lifestyles with bite-sized lessons that fit into daily routines.",
      items: [
        "Commute-friendly learning sessions",
        "Quick daily progress tracking",
        "Offline-capable content for anywhere access",
        "Progressive course completion over time",
      ],
    },
  ];

  const roadmapStats = [
    { value: "Q2 2024", label: "VR/AR Integration" },
    { value: "Q3 2024", label: "Multi-language Support" },
    { value: "Q4 2024", label: "AI Tutor Assistant" },
  ];

  const learningFlowDiagram = `
    flowchart LR
      A[Student Input] --> B[AI Analysis Engine]
      B --> C[Learning Style Detection]
      C --> D[Content Generation]
      D --> E[Interactive Lessons]
      E --> F[Progress Tracking]
      
      F --> G[Performance Analytics]
      G --> H[Adaptive Recommendations]
      H --> B
      
      I[GPT-4/Claude] --> D
      J[Course Templates] --> D
      
      K[Real-time Dashboard] --> L[Educator Insights]
      F --> K
      G --> K
      
      style A fill:#3B82F6,stroke:#2563EB,color:#fff
      style D fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style H fill:#10B981,stroke:#059669,color:#fff
      style K fill:#F59E0B,stroke:#D97706,color:#fff
  `;

  return (
    <ProjectLayout
      title="Brain Buffet"
      description="AI-powered personalized learning platform that revolutionizes course creation and adaptive education"
    >
      <ProjectHero
        title="Brain Buffet"
        description="A mobile-first educational platform offering interactive courses on personal development topics like financial freedom and digital wellness. Features AI-powered content generation, chapter-based learning, and integrated quizzes for enhanced engagement."
        tags={[
          "EdTech",
          "Mobile Learning",
          "Next.js",
          "Interactive Courses",
          "AI Content",
          "Personal Development",
        ]}
        image="/images/projects/brain-buffet.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="The Problem">
        <p className="text-lg mb-4">
          <strong>
            Personal development education is often inaccessible, overwhelming,
            and designed for desktop consumption.
          </strong>{" "}
          People struggle to find practical, mobile-friendly courses that fit
          into their busy lives, especially for topics like financial literacy
          and digital wellness.
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <strong>Mobile accessibility</strong>: Most educational content
            isn't optimized for smartphone learning
          </li>
          <li>
            <strong>Time constraints</strong>: Traditional courses require large
            time commitments that busy people can't maintain
          </li>
          <li>
            <strong>Practical application</strong>: Many courses lack actionable
            steps for real-world implementation
          </li>
          <li>
            <strong>Engagement barriers</strong>: Static content without
            interactive elements leads to course abandonment
          </li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Solution Architecture">
        <FeatureGrid features={coreFeatures} columns={2} />

        <MermaidDiagram
          title="Adaptive Learning Flow"
          diagram={learningFlowDiagram}
          description="AI-driven learning pipeline with real-time adaptation based on student performance, learning style analysis, and comprehensive analytics dashboard."
          className="mt-8"
        />
      </ProjectSection>

      <ProjectSection title="Platform Features">
        <FeatureGrid features={platformFeatures} columns={1} />
      </ProjectSection>

      <ProjectSection title="Business Impact & Results">
        <FeatureGrid features={impactMetrics} columns={2} />
      </ProjectSection>

      <ProjectSection title="Use Cases & Success Stories">
        <FeatureGrid features={useCases} columns={2} />
      </ProjectSection>

      <ProjectSection title="Future Roadmap">
        <StatsDisplay stats={roadmapStats} className="mt-6" />
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/hopeatina/brain-buffet"
        demoUrl="https://brainbuffet.co"
      />
    </ProjectLayout>
  );
}
