import React from "react";
import ProjectLayout from "@/components/projects/ProjectLayout";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectCTA from "@/components/projects/ProjectCTA";

export default function Neuromosaic() {
  return (
    <ProjectLayout
      title="Neuromosaic"
      description="Distributed ML research platform focused on scalable neural network training"
    >
      <ProjectHero
        title="Neuromosaic"
        description="A distributed machine learning research platform that enables scalable neural network training across multiple nodes, with a focus on reproducibility and collaboration."
        tags={["Machine Learning", "Distributed Systems", "Python", "React"]}
        image="/images/projects/neuromosaic.jpg"
      />

      <ProjectSection title="Overview">
        <p>
          Neuromosaic is a platform designed to solve the challenges of
          distributed machine learning research. It provides:
        </p>
        <ul>
          <li>Seamless distribution of training across multiple nodes</li>
          <li>Real-time collaboration features for research teams</li>
          <li>Experiment tracking and reproducibility tools</li>
          <li>Integration with popular ML frameworks</li>
        </ul>
      </ProjectSection>

      <ProjectSection title="Technical Details">
        <h3>Architecture</h3>
        <ul>
          <li>Distributed training orchestration using Kubernetes</li>
          <li>Real-time metrics collection and visualization</li>
          <li>Automated hyperparameter optimization</li>
          <li>Version control for models and datasets</li>
        </ul>

        <h3>Technologies Used</h3>
        <ul>
          <li>Python, PyTorch, TensorFlow</li>
          <li>Kubernetes, Docker</li>
          <li>gRPC, Protocol Buffers</li>
          <li>React, TypeScript</li>
        </ul>
      </ProjectSection>

      <ProjectCTA
        demoUrl="https://neuromosaic.dev"
        githubUrl="https://github.com/yourusername/neuromosaic"
      />
    </ProjectLayout>
  );
}
