import React from "react";
import Head from "next/head";
import Link from "next/link";
import Card from "@/components/ui/Card";

const projects = [
  {
    title: "Neuromosaic",
    description:
      "Distributed ML research platform focused on scalable neural network training.",
    link: "/projects/neuromosaic",
    image: "/images/projects/neuromosaic.jpg",
  },
  {
    title: "Brain Buffet",
    description:
      "LLM-powered course creation platform for personalized learning experiences.",
    link: "/projects/brain-buffet",
    image: "/images/projects/brain-buffet.jpg",
  },
];

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects | Emerging Hope</title>
        <meta
          name="description"
          content="Featured projects including Neuromosaic and Brain Buffet"
        />
      </Head>

      <main className="container py-12">
        <h1>Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link key={project.title} href={project.link}>
              <Card className="h-full hover:shadow-xl transition-shadow">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <h2 className="text-2xl font-bold mt-4">{project.title}</h2>
                <p className="mt-2 text-gray-600">{project.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
