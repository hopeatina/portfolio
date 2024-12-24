import React from "react";
import Head from "next/head";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Neuromosaic() {
  return (
    <>
      <Head>
        <title>Neuromosaic | Projects | Emerging Hope</title>
        <meta
          name="description"
          content="Distributed ML research platform focused on scalable neural network training"
        />
      </Head>

      <main className="container py-12">
        <Link
          href="/projects"
          className="text-primary hover:text-hover mb-6 block"
        >
          ← Back to Projects
        </Link>

        <div className="grid gap-8">
          <div>
            <h1>Neuromosaic</h1>
            <p className="text-xl text-gray-600 mt-4">
              A distributed machine learning research platform that enables
              scalable neural network training across multiple nodes, with a
              focus on reproducibility and collaboration.
            </p>
          </div>

          <img
            src="/images/projects/neuromosaic.jpg"
            alt="Neuromosaic Platform Screenshot"
            className="w-full rounded-lg shadow-lg"
          />

          <Card>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="prose max-w-none">
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
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
            <div className="prose max-w-none">
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
            </div>
          </Card>

          <div className="flex justify-center space-x-4">
            <Button
              as="a"
              href="https://github.com/yourusername/neuromosaic"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
            <Button
              as="a"
              href="https://neuromosaic.dev"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              Visit Website
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
