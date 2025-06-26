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

export default function EvalVybes() {
  const { themeProps } = useTheme();

  const techStack = [
    {
      category: "Frontend",
      technologies: "Next.js, React, Tailwind CSS, WebRTC",
    },
    {
      category: "Backend",
      technologies: "Node.js, Express, PostgreSQL, WebSocket",
    },
    {
      category: "AI/ML",
      technologies: "OpenAI GPT-4, Claude, Whisper API, Multiple LLMs",
    },
    {
      category: "Voice",
      technologies: "Web Speech API, Real-time Transcription",
    },
    {
      category: "Infrastructure",
      technologies: "Stripe Payments, Zustand, React Query",
    },
  ];

  const features = [
    {
      title: "🎤 Conversational Interface",
      description:
        "Natural voice and text interaction for creating and managing AI evaluations",
      items: [
        "Voice-controlled evaluation setup using natural language",
        "Real-time speech transcription and task card generation",
        "Context-aware conversation flow that guides users",
        "Multi-modal input supporting both voice and text",
      ],
    },
    {
      title: "🤖 Multi-Model Comparison",
      description:
        "Compare outputs from different AI models side-by-side with detailed analysis",
      items: [
        "Support for GPT-4, GPT-3.5, Claude, and more models",
        "Real-time generation with progress tracking",
        "Side-by-side output comparison with syntax highlighting",
        "Cost estimation and performance metrics",
      ],
    },
    {
      title: "⭐ Smart Rating System",
      description: "Comprehensive rating and feedback system for AI outputs",
      items: [
        "Customizable evaluation criteria with 1-5 star ratings",
        "Weighted scoring based on task requirements",
        "Detailed feedback collection and analysis",
        "Historical comparison and improvement tracking",
      ],
    },
  ];

  const stats = [
    {
      value: "5+",
      label: "AI Models",
      description: "Available for comparison",
    },
    {
      value: "< 3s",
      label: "Voice Response",
      description: "Real-time processing",
    },
    {
      value: "20+",
      label: "Criteria Templates",
      description: "For evaluations",
    },
    { value: "MVP", label: "Stage", description: "Currently in development" },
  ];

  return (
    <ProjectLayout
      title="EvalVybes"
      description="A conversational AI model evaluation platform with voice control and multi-model comparison"
    >
      <ProjectHero
        title="EvalVybes"
        description="Compare AI models through natural conversation. EvalVybes lets you test prompts across multiple AI models using voice commands, with real-time comparison and smart rating systems."
        tags={[
          "Voice AI",
          "Model Comparison",
          "Next.js",
          "WebRTC",
          "Multi-LLM",
        ]}
        image="/images/projects/evalvybes.jpg"
      />

      <TechStack items={techStack} />

      <ProjectSection title="Overview">
        <p className="text-lg mb-6">
          EvalVybes is a conversational AI evaluation platform that makes
          comparing different AI models as easy as having a conversation. With a
          vibrant, artistic interface featuring paintbrush gradients and
          glassmorphism, the platform emphasizes fun, accessible AI exploration
          while maintaining professional functionality.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <ProjectCard variant="default">
            <h3 className="text-xl font-semibold mb-4 text-primary">Problem</h3>
            <p>
              Testing and comparing AI models is typically a technical, tedious
              process. Users need to manually craft prompts, switch between
              platforms, and track results separately - making it difficult to
              find the best AI for their needs.
            </p>
          </ProjectCard>

          <ProjectCard variant="default">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Solution
            </h3>
            <p>
              EvalVybes transforms AI evaluation into a natural conversation.
              Simply speak your tasks, and the platform generates evaluations
              across multiple models, presenting results in an intuitive, visual
              format with real-time comparisons.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Key Features">
        <FeatureGrid features={features} columns={1} />
      </ProjectSection>

      <ProjectSection title="User Experience Flow">
        <div className="space-y-6">
          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-4">
              1. Voice-First Onboarding
            </h3>
            <p>
              Users start with a pulsing microphone button in brand colors (pink
              #FF4ECC and green #00C09D). They simply speak what they want to do
              with AI - whether it's writing marketing copy, analyzing data, or
              creative tasks.
            </p>
          </ProjectCard>

          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-4">
              2. Dynamic Task Creation
            </h3>
            <p>
              As users speak, task cards appear in real-time with smooth
              animations. The system understands natural language commands like
              "I need to write a blog post" or "Let's evaluate this marketing
              email."
            </p>
          </ProjectCard>

          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-4">
              3. Smart Model Selection
            </h3>
            <p>
              Based on the task type, EvalVybes suggests relevant AI models and
              displays cost estimates, response times, and capabilities. Users
              can compare GPT-4, Claude, and other models at a glance.
            </p>
          </ProjectCard>

          <ProjectCard variant="accent">
            <h3 className="text-xl font-semibold mb-4">4. Real-Time Results</h3>
            <p>
              Watch as different AI models generate responses simultaneously.
              Results appear side-by-side with syntax highlighting, making it
              easy to compare quality, style, and accuracy.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Technical Architecture">
        <StatsDisplay stats={stats} className="mb-8" />

        <div className="space-y-6">
          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              WebRTC Voice System
            </h3>
            <p className="mb-4">
              EvalVybes is implementing cutting-edge WebRTC architecture for
              real-time voice interaction with OpenAI's Realtime API:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Direct audio streaming to OpenAI for minimal latency
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>WebSocket signaling for connection management</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Context-aware conversation handling with state persistence
                </span>
              </li>
            </ul>
          </ProjectCard>

          <ProjectCard variant="secondary">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              Design System
            </h3>
            <p>
              The platform features a unique visual identity with organic
              paintbrush gradients, glassmorphism effects, and a vibrant color
              palette. This creates an engaging, artistic experience that makes
              AI evaluation feel approachable and fun.
            </p>
          </ProjectCard>
        </div>
      </ProjectSection>

      <ProjectSection title="Development Status">
        <ProjectCard variant="highlight">
          <p className="text-center text-lg mb-4">
            EvalVybes is currently in MVP development with core features being
            actively built:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-primary">Completed ✅</h4>
              <ul className="space-y-1">
                <li>• State management architecture</li>
                <li>• Basic voice recognition</li>
                <li>• Task card UI system</li>
                <li>• Payment integration setup</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-primary">
                In Progress 🚧
              </h4>
              <ul className="space-y-1">
                <li>• WebRTC voice implementation</li>
                <li>• Multi-model API integration</li>
                <li>• Rating persistence system</li>
                <li>• Shareable evaluation links</li>
              </ul>
            </div>
          </div>
        </ProjectCard>
      </ProjectSection>

      <ProjectCTA
        demoUrl="https://evalvybes.com"
        githubUrl="https://github.com/hopeatina/evalvybes"
      />
    </ProjectLayout>
  );
}
