import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";

export default function BrainBuffet() {
  return (
    <ProjectLayout
      title="Brain Buffet"
      description="LLM-powered course creation platform for personalized learning experiences"
    >
      <ProjectHero
        title="Brain Buffet"
        description="An AI-powered platform that revolutionizes course creation by leveraging large language models to generate personalized learning experiences."
        image="/images/projects/brain-buffet.jpg"
      />

      <ProjectSection title="Overview">
        <p>
          Brain Buffet uses advanced AI to create customized learning paths that
          adapt to each student's needs. Key features include:
        </p>
        <ul>
          <li>Automated course content generation</li>
          <li>Personalized learning paths</li>
          <li>Interactive exercises and quizzes</li>
          <li>Progress tracking and analytics</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Technical Details">
        <h3>Architecture</h3>
        <ul>
          <li>LLM-powered content generation pipeline</li>
          <li>Real-time adaptation based on student performance</li>
          <li>Scalable microservices architecture</li>
          <li>Advanced analytics and reporting system</li>
        </ul>

        <h3>Technologies Used</h3>
        <ul>
          <li>Next.js, TypeScript</li>
          <li>OpenAI GPT-4 API</li>
          <li>PostgreSQL, Redis</li>
          <li>AWS Infrastructure</li>
        </ul>
      </ProjectSection>

      <ProjectCTA
        githubUrl="https://github.com/yourusername/brain-buffet"
        demoUrl="https://brainbuffet.co"
      />
    </ProjectLayout>
  );
}
