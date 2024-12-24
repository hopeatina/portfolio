import React from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function BrainBuffet() {
  return (
    <>
      <Head>
        <title>Brain Buffet | Projects | Emerging Hope</title>
        <meta
          name="description"
          content="LLM-powered course creation platform for personalized learning experiences"
        />
      </Head>

      <Header />

      <main className="container py-12">
        <Link
          href="/projects"
          className="text-primary hover:text-hover mb-6 block"
        >
          ← Back to Projects
        </Link>

        <div className="grid gap-8">
          <div>
            <h1>Brain Buffet</h1>
            <p className="text-xl text-gray-600 mt-4">
              An AI-powered platform that revolutionizes course creation by
              leveraging large language models to generate personalized learning
              experiences.
            </p>
          </div>

          <img
            src="/images/projects/brain-buffet.jpg"
            alt="Brain Buffet Platform Screenshot"
            className="w-full rounded-lg shadow-lg"
          />

          <Card>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="prose max-w-none">
              <p>
                Brain Buffet uses advanced AI to create customized learning
                paths that adapt to each student's needs. Key features include:
              </p>
              <ul>
                <li>Automated course content generation</li>
                <li>Personalized learning paths</li>
                <li>Interactive exercises and quizzes</li>
                <li>Progress tracking and analytics</li>
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
            <div className="prose max-w-none">
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
            </div>
          </Card>

          <div className="flex justify-center space-x-4">
            <Button
              as="a"
              href="https://github.com/yourusername/brain-buffet"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
            <Button
              as="a"
              href="https://brainbuffet.ai"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              Visit Website
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
