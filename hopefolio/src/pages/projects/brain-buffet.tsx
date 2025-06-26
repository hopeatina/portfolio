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

export default function BrainBuffet() {
  const { themeProps } = useTheme();

  const techStack = [
    { category: "Frontend", technologies: "Next.js, React, TypeScript" },
    { category: "Backend", technologies: "Node.js, Express, GraphQL" },
    { category: "Database", technologies: "PostgreSQL, Redis" },
    { category: "AI/ML", technologies: "OpenAI GPT-4, Claude, Custom NLP" },
    { category: "Analytics", technologies: "Mixpanel, Custom Dashboards" },
    { category: "Infrastructure", technologies: "AWS, Vercel, Docker" },
    { category: "Payment", technologies: "Stripe, Revenue Analytics" },
    { category: "Content", technologies: "Markdown, Video Processing" },
  ];

  const coreFeatures = [
    {
      title: "🎯 Core Innovation",
      description:
        "AI-Driven Course Generation: Advanced LLM integration creates personalized learning paths that adapt in real-time based on student progress, learning style, and comprehension levels.",
    },
    {
      title: "📚 Dynamic Content Engine",
      description:
        "Adaptive Learning System: Intelligent content recommendation engine that personalizes difficulty, pacing, and teaching methods based on individual student performance analytics.",
    },
  ];

  const platformFeatures = [
    {
      title: "🎨 Course Creation Studio",
      description:
        "Advanced tools for creating personalized educational content",
      items: [
        "AI Content Generation: Automated lesson creation with customizable depth and complexity",
        "Interactive Elements: Built-in quizzes, assignments, and interactive exercises",
        "Multi-format Support: Text, video, audio, and interactive simulations",
        "Template Library: Pre-built course structures for different subjects and learning goals",
      ],
    },
    {
      title: "🧠 Personalization Engine",
      description:
        "Intelligent systems that adapt to individual learning styles",
      items: [
        "Learning Style Analysis: AI-powered assessment of visual, auditory, and kinesthetic preferences",
        "Adaptive Pacing: Dynamic adjustment of content delivery based on comprehension rates",
        "Knowledge Gap Detection: Intelligent identification and targeted remediation of learning gaps",
        "Progress Prediction: ML models forecast student success and suggest interventions",
      ],
    },
    {
      title: "📊 Analytics & Insights",
      description: "Comprehensive tracking and reporting capabilities",
      items: [
        "Real-time Dashboards: Comprehensive analytics for educators and administrators",
        "Engagement Metrics: Detailed tracking of student interaction and participation",
        "Performance Analytics: Advanced reporting on learning outcomes and course effectiveness",
        "Predictive Insights: Early warning systems for at-risk students",
      ],
    },
  ];

  const impactMetrics = [
    {
      title: "📈 Market Validation",
      description:
        "Global education technology sector targeting corporate training and higher education with SaaS subscription and usage-based pricing model. Competitive advantage through AI-first personalization approach.",
    },
    {
      title: "🎯 User Engagement",
      description:
        "Significant improvement in course completion rates over traditional platforms. Substantial reduction in course development time with positive feedback from early users and strong engagement metrics.",
    },
    {
      title: "🚀 Technical Excellence",
      description:
        "Reliable uptime with CDN distribution, auto-scaling infrastructure for concurrent users, enterprise-grade data protection, and responsive design with optimized mobile experience.",
    },
    {
      title: "💡 Innovation",
      description:
        "Novel adaptive learning algorithm implementation, research focus on personalized learning methodologies, active participation in EdTech innovation, and contributions to open-source education tools.",
    },
  ];

  const useCases = [
    {
      title: "🏢 Corporate Training",
      description:
        "Corporate Training Implementation: Designed for employee technical skills training, focusing on faster certification completion and improved satisfaction rates.",
      items: [
        "Accelerated onboarding processes",
        "Improved compliance training completion rates",
        "Custom learning paths for different roles and departments",
      ],
    },
    {
      title: "🎓 Higher Education",
      description:
        "Academic Integration: Platform designed to support personalized STEM education with focus on improving course completion rates and accessibility.",
      items: [
        "Improved course completion rates",
        "Support for diverse learning needs",
        "Enhanced accessibility for students with learning differences",
      ],
    },
  ];

  const roadmapStats = [
    { value: "Q2 2024", label: "VR/AR Integration" },
    { value: "Q3 2024", label: "Multi-language Support" },
    { value: "Q4 2024", label: "AI Tutor Assistant" },
  ];

  return (
    <ProjectLayout
      title="Brain Buffet"
      description="AI-powered personalized learning platform that revolutionizes course creation and adaptive education"
    >
      <ProjectHero
        title="Brain Buffet"
        description="An innovative EdTech platform that leverages advanced AI to create personalized learning experiences, transforming how courses are designed, delivered, and consumed in the digital age."
        tags={[
          "EdTech",
          "LLM Integration",
          "Next.js",
          "Personalized Learning",
          "Course Creation",
          "AI",
        ]}
        image="/images/projects/brain-buffet.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="The Problem">
        <p className="text-lg mb-4">
          <strong>
            Traditional course creation is time-intensive and produces
            one-size-fits-all content.
          </strong>{" "}
          Educators spend months creating static courses that fail to adapt to
          individual learning styles, resulting in poor engagement and
          completion rates.
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li>
            <strong>Time barriers</strong>: Creating quality courses takes 100+
            hours of manual work
          </li>
          <li>
            <strong>Static content</strong>: Traditional courses can't adapt to
            individual learning patterns
          </li>
          <li>
            <strong>Low engagement</strong>: Average online course completion
            rates hover around 15%
          </li>
          <li>
            <strong>Accessibility gaps</strong>: Content doesn't accommodate
            diverse learning needs and preferences
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
          Learning Flow Architecture
        </h4>
        <ProjectCard variant="default" className="mb-6">
          <pre
            className="text-sm whitespace-pre-wrap overflow-x-auto"
            style={{
              color: themeProps.colors.text,
              fontFamily: "monospace",
            }}
          >
            {`Student Input → AI Analysis → Content Generation → Interactive Lessons → Progress Tracking
     ↑                                                                         ↓
Adaptive Recommendations ←―――――――――――――――――――――――――――――――――――――――――――――― Performance Analytics`}
          </pre>
        </ProjectCard>
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
        <StatsDisplay stats={roadmapStats} columns={3} className="mt-6" />
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/hopeatina/brain-buffet"
        demoUrl="https://brainbuffet.co"
      />
    </ProjectLayout>
  );
}
