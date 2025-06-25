import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";

export default function BeliefMap() {
  return (
    <ProjectLayout
      title="Belief Map"
      description="Interactive belief mapping to explore and challenge your own assumptions"
    >
      <ProjectHero
        title="Belief Map"
        description="An experimental belief dialogue simulator – a tool where you can input or map out various beliefs, questions, and counterpoints, and see how they connect. Think of it as a mind map for deeply held ideas and questions."
        tags={[
          "Experimental",
          "React",
          "D3.js",
          "AI Integration",
          "Graph Visualization",
        ]}
        image="/images/projects/belief-map.jpg"
      />

      <ProjectSection title="Overview">
        <p>
          Ever wonder what beliefs you hold that others might not? Belief Map
          helps externalize those thoughts into a visual conversation with
          yourself. A thought-provoking question from a friend ("What's a belief
          you hold that most others don't?") sent me spiraling into
          self-reflection, and I realized I wanted a better way to map out my
          thoughts.
        </p>
        <ul>
          <li>
            Interactive graph visualization of beliefs and their connections
          </li>
          <li>Q&A format for exploring pro/con arguments on any issue</li>
          <li>Private, personal tool for honest self-expression</li>
          <li>
            Planned AI integration for suggesting counterpoints and expanding
            ideas
          </li>
        </ul>
        <p className="mt-4 italic text-gray-600 dark:text-gray-400">
          This project has been a journey in self-reflection for me – it's as
          much about developing myself as it is about developing software. It's
          designed to make introspection and healthy debate visual and fun.
        </p>
      </ProjectSection>

      <ProjectSection title="Technical Details">
        <h3>Architecture</h3>
        <ul>
          <li>Web-based visualization using React/Next.js frontend</li>
          <li>
            Graph data model with nodes and edges for beliefs and relationships
          </li>
          <li>Local-first design for privacy and personal control</li>
          <li>Potential for serverless or fully client-side operation</li>
        </ul>

        <h3>Key Technologies</h3>
        <ul>
          <li>
            Frontend: React/Next.js, D3.js or Canvas for graph visualization
          </li>
          <li>Data Model: Graph-based structure for belief networks</li>
          <li>
            AI Integration: Planned LLM API integration for debate assistance
          </li>
          <li>Storage: Local storage or in-memory for privacy</li>
        </ul>

        <h3>Vision</h3>
        <p>
          Belief Map is more than a typical app – it's a personal "thought
          experiment as a service." By making our internal dialogues visual and
          interactive, we can better understand ourselves and challenge our
          assumptions in a structured, approachable way.
        </p>
      </ProjectSection>

      <ProjectCTA demoUrl="#" githubUrl="#" />
    </ProjectLayout>
  );
}
