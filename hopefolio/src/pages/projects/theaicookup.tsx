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

export default function TheAICookup() {
  const { themeProps } = useTheme();

  const techStack = [
    {
      category: "Frontend",
      technologies: "Next.js 15, React 18, TypeScript, Tailwind CSS",
    },
    {
      category: "Backend",
      technologies: "Supabase, PostgreSQL, Next.js API Routes",
    },
    { category: "Authentication", technologies: "Supabase Auth, Auth Helpers" },
    {
      category: "UI/UX",
      technologies: "Framer Motion, Radix UI, Custom Components",
    },
    {
      category: "AI Integration",
      technologies: "OpenAI API, LLM-based Team Matching",
    },
    { category: "State Management", technologies: "Zustand, React Hooks" },
  ];

  const coreFeatures = [
    {
      title: "Event Management",
      description:
        "Platform concept for organizing AI development events",
      items: [
        "Schedule and manage AI Cook-Up events",
        "Event status tracking (pending, active, completed)",
        "Customizable voting periods for idea selection",
        "Event-specific team size and configuration settings",
        "Participant registration with QR code support",
      ],
    },
    {
      title: "Intelligent Team Matching",
      description: "LLM-powered team formation based on skills and preferences",
      items: [
        "Multi-dimensional matching: skills, AI experience, and interests",
        "Player mode preferences: single or team participation",
        "Expertise categorization: Design, Engineering, Business, Marketing, Sales",
        "AI experience levels: Beginner to Expert classification",
        "Dynamic late registration handling with smart team assignment",
      ],
    },
    {
      title: "Idea Management & Voting",
      description: "Democratic project selection through community voting",
      items: [
        "Participant-submitted project ideas with descriptions",
        "Real-time voting system with live popularity tracking",
        "Must-work-on preferences for passionate project leaders",
        "Solo preference options for independent developers",
        "Top ideas automatically selected for team formation",
      ],
    },
  ];

  const teamMatchingFlow = `
    flowchart TB
      subgraph "Registration Phase"
        A[QR Code Scan] --> B[User Registration]
        B --> C[Skill & Experience Input]
      end
      
      subgraph "Ideation Phase"
        D[Submit Ideas] --> E[Community Voting]
        E --> F[Top Ideas Selected]
      end
      
      subgraph "Team Formation"
        G[LLM Analysis] --> H[Team Assignments]
        H --> I[Balance Check]
        I --> J[Final Teams]
      end
      
      subgraph "Late Registration"
        K[New User] --> L[Skill Analysis]
        L --> M[Team Recommendation]
      end
      
      C --> D
      F --> G
      J --> K
      M --> J
      
      style A fill:#10B981,stroke:#059669,color:#fff
      style G fill:#8B5CF6,stroke:#7C3AED,color:#fff
      style J fill:#3B82F6,stroke:#2563EB,color:#fff
  `;

  const platformMetrics = [
    {
      value: "6-8",
      label: "Teams/Event",
      description: "Target group count",
    },
    {
      value: "~5",
      label: "Members/Team",
      description: "Target team size",
    },
    {
      value: "15",
      label: "Commits",
      description: "Prototype development",
    },
    {
      value: "~4K",
      label: "Lines of Code",
      description: "Concept implementation",
    },
  ];

  const algorithmFeatures = [
    {
      title: "LLM-Powered Team Logic",
      description: "Advanced AI algorithms for optimal team composition",
      items: [
        "Structured prompt engineering for team formation constraints",
        "JSON-based team assignment output for automated processing",
        "Skill balance optimization across all teams",
        "Respect for must-work-on and solo preferences",
        "Conflict resolution for overlapping constraints",
      ],
    },
    {
      title: "Real-time Processing",
      description: "Efficient system for immediate team assignments",
      items: [
        "Instant team formation after voting period ends",
        "Dynamic recommendation engine for late arrivals",
        "Live updates to team compositions",
        "Automated notification system for team members",
        "Seamless integration with collaboration tools",
      ],
    },
    {
      title: "Data-Driven Insights",
      description: "Analytics and optimization for better events",
      items: [
        "Participant skill distribution analysis",
        "Popular idea trend tracking across events",
        "Team performance metrics and feedback",
        "AI experience level progression tracking",
        "Event success rate optimization",
      ],
    },
  ];

  return (
    <ProjectLayout
      title="The AI Cook-Up"
      description="Concept site for AI hackathon events in Houston with LLM-powered team matching — 15 commits, ~4K LOC"
    >
      <ProjectHero
        title="The AI Cook-Up"
        description="A concept site designed for community AI development events in Houston. The platform explores event management with LLM-powered team matching. 15 commits, ~4K LOC — built as a prototype for a community event idea."
        tags={[
          "Event Platform",
          "Team Matching",
          "Next.js",
          "Supabase",
          "AI Integration",
        ]}
        image="/images/projects/theaicookup.svg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="The Concept">
        <div className="space-y-6">
          <p className="text-lg">
            The AI Cook-Up is a concept site exploring how to organize AI
            hackathon events where participants with diverse skills and
            experience levels need to form balanced, productive teams.
            Built as a prototype for a community event idea.
          </p>

          <ProjectCard variant="secondary">
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: themeProps.colors.primary }}
            >
              Event Flow
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-semibold">1. Register</h4>
                <p className="text-sm mt-1">Quick QR code registration</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💡</div>
                <h4 className="font-semibold">2. Ideate</h4>
                <p className="text-sm mt-1">Submit & vote on ideas</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🤖</div>
                <h4 className="font-semibold">3. Match</h4>
                <p className="text-sm mt-1">AI forms balanced teams</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold">4. Build</h4>
                <p className="text-sm mt-1">Collaborate on projects</p>
              </div>
            </div>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Core Platform Features">
        <FeatureGrid features={coreFeatures} columns={1} />

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <ProjectCard variant="accent">
            <h4
              className="text-xl font-semibold mb-3"
              style={{ color: themeProps.colors.primary }}
            >
              For Participants
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Quick registration process via QR code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Submit ideas and vote on favorites</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Get matched with complementary teammates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Join teams even as a late arrival</span>
              </li>
            </ul>
          </ProjectCard>

          <ProjectCard variant="accent">
            <h4
              className="text-xl font-semibold mb-3"
              style={{ color: themeProps.colors.primary }}
            >
              For Organizers
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Create and manage events easily</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Automated team formation at scale</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Real-time event monitoring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Export team data for collaboration tools</span>
              </li>
            </ul>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Intelligent Team Matching System">
        <p className="text-lg mb-8">
          The heart of The AI Cook-Up is its sophisticated team matching
          algorithm that ensures balanced, productive teams while respecting
          participant preferences.
        </p>

        <MermaidDiagram
          title="Team Formation Flow"
          diagram={teamMatchingFlow}
          description="Complete flow from registration through team assignment, including handling of late arrivals"
        />

        <div className="mt-8">
          <h3
            className="text-xl font-semibold mb-6"
            style={{ color: themeProps.colors.primary }}
          >
            Matching Criteria
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <ProjectCard variant="default">
              <h4 className="text-lg font-semibold mb-2">Skill Diversity</h4>
              <p className="text-sm">
                Each team gets a balanced mix of designers, engineers, business
                strategists, and marketers
              </p>
            </ProjectCard>
            <ProjectCard variant="default">
              <h4 className="text-lg font-semibold mb-2">Experience Balance</h4>
              <p className="text-sm">
                Teams include members from beginner to expert levels to foster
                learning and mentorship
              </p>
            </ProjectCard>
            <ProjectCard variant="default">
              <h4 className="text-lg font-semibold mb-2">Interest Alignment</h4>
              <p className="text-sm">
                Participants are matched to ideas they voted for whenever
                possible
              </p>
            </ProjectCard>
          </div>
        </div>
      </ProjectSection>

      <ProjectSection title="Technical Implementation">
        <FeatureGrid features={algorithmFeatures} columns={1} />

        <div className="mt-12">
          <h3
            className="text-2xl font-semibold mb-6"
            style={{ color: themeProps.colors.primary }}
          >
            Platform Statistics
          </h3>
          <StatsDisplay stats={platformMetrics} className="mb-8" />
        </div>

        <ProjectCard variant="highlight" className="mt-8">
          <h3 className="text-xl font-semibold mb-4">User Experience Focus</h3>
          <p className="mb-4">
            Every aspect of The AI Cook-Up is designed for minimal friction and
            maximum engagement. From the QR code registration to the final team
            assignments, the platform ensures a smooth, intuitive experience for
            all participants.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-2">Mobile-First Design</h4>
              <p className="text-sm">
                Optimized for smartphones since most users register via QR code
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Real-time Updates</h4>
              <p className="text-sm">
                Live voting counts and instant team assignments keep engagement
                high
              </p>
            </div>
          </div>
        </ProjectCard>
      </ProjectSection>

      <ProjectSection title="Vision">
        <div className="space-y-6">
          <ProjectCard variant="secondary">
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: themeProps.colors.primary }}
            >
              Concept Goals
            </h3>
            <p className="mb-4">
              The AI Cook-Up is a concept site exploring how to foster
              Houston's AI community through organized events with LLM-powered
              team formation. Built as a prototype to validate the idea.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Cross-disciplinary collaboration through skill-balanced teams
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  LLM-powered team matching based on skills and preferences
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Democratic project selection through community voting
                </span>
              </li>
            </ul>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/hopeatina/theaicookup"
      />
    </ProjectLayout>
  );
}
