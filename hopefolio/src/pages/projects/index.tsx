import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

const projects = [
  {
    id: "neuromosaic",
    title: "Neuromosaic",
    description:
      "Distributed ML research platform focused on scalable neural network training.",
    longDescription:
      "Building the future of machine learning infrastructure with scalable, efficient, and accessible tools for researchers and developers.",
    link: "/projects/neuromosaic",
    image: "/images/projects/neuromosaic.jpg",
    tags: ["Machine Learning", "Distributed Systems", "Python"],
    color: "purple",
    featured: true,
  },
  {
    id: "brain-buffet",
    title: "Brain Buffet",
    description:
      "LLM-powered course creation platform for personalized learning experiences.",
    longDescription:
      "Revolutionizing education with AI-driven personalization, making learning more engaging, effective, and accessible for everyone.",
    link: "/projects/brain-buffet",
    image: "/images/projects/brain-buffet.jpg",
    tags: ["AI", "Education", "Next.js"],
    color: "blue",
    featured: true,
  },
  {
    id: "deep-human",
    title: "Deep Human",
    description:
      "Personalized AI personas for richer human connection and preparation.",
    longDescription:
      "Creating AI versions of people that feel real enough to meaningfully interact with – exploring what makes us human through technology.",
    link: "/projects/deep-human",
    image: "/images/projects/deep-human.jpg",
    tags: ["AI Personas", "MCP Protocol", "Python"],
    color: "pink",
    featured: true,
  },
  {
    id: "orgx",
    title: "OrgX",
    description: "AI-accelerated product development platform for teams.",
    longDescription:
      "Where human creativity meets AI speed – helping teams turn great ideas into great products faster than ever before.",
    link: "/projects/orgx",
    image: "/images/projects/orgx.jpg",
    tags: ["Project Management", "AI Collaboration", "Next.js"],
    color: "green",
    featured: true,
  },
  {
    id: "tasktomodel",
    title: "TaskToModel",
    description: "Convert plain-text descriptions into custom AI models.",
    longDescription:
      "Democratizing AI development by making building a specialized AI as easy as writing out your idea – no coding required.",
    link: "/projects/tasktomodel",
    image: "/images/projects/tasktomodel.jpg",
    tags: ["AI Platform", "Code Generation", "TypeScript"],
    color: "orange",
  },
  {
    id: "transmorph",
    title: "Transmorph",
    description: "Transform any API into an AI-driven tool with a few clicks.",
    longDescription:
      "Making the powerful capabilities of MCP-Gen accessible through a simple UI – instantly turn APIs into intelligent services.",
    link: "/projects/transmorph",
    image: "/images/projects/transmorph.jpg",
    tags: ["Developer Tools", "AI Agents", "MCP Protocol"],
    color: "cyan",
  },
  {
    id: "belief-map",
    title: "Belief Map",
    description: "Interactive belief mapping to explore personal assumptions.",
    longDescription:
      "A visual conversation with yourself – externalize thoughts into an interactive graph to better understand and challenge your beliefs.",
    link: "/projects/belief-map",
    image: "/images/projects/belief-map.jpg",
    tags: ["Experimental", "Visualization", "Self-Reflection"],
    color: "indigo",
  },
  {
    id: "upload-to-mail",
    title: "Upload to Mail",
    description: "Upload documents online and send them as physical mail.",
    longDescription:
      "Bridging digital files and real mailboxes – bringing back that magical feeling when a letter arrives in the mail.",
    link: "/projects/upload-to-mail",
    image: "/images/projects/upload-to-mail.jpg",
    tags: ["Full Stack", "React", "Node.js"],
    color: "red",
  },
  {
    id: "evalvybes",
    title: "EvalVybes",
    description:
      "Conversational AI evaluation platform for comparing multiple AI models with voice control.",
    longDescription:
      "Compare AI models through natural conversation. Test prompts across GPT-4, Claude, and more using voice commands, with real-time comparison and smart rating systems.",
    link: "/projects/evalvybes",
    image: "/images/projects/evalvybes.jpg",
    tags: ["Voice AI", "Model Comparison", "Next.js", "WebRTC"],
    color: "pink",
    featured: true,
  },
  {
    id: "bodyfx",
    title: "BodyFX",
    description:
      "AI video segmentation for After Effects rotoscoping and OBS real-time streaming.",
    longDescription:
      "Eliminate manual rotoscoping and green screens. BodyFX uses Meta's SAM2 for automated After Effects workflows and real-time background removal in OBS Studio - perfect for VFX artists and streamers.",
    link: "/projects/bodyfx",
    image: "/images/projects/bodyfx.jpg",
    tags: ["Computer Vision", "Video Effects", "Python", "OBS Plugin"],
    color: "purple",
  },
  {
    id: "theaicookup",
    title: "The AI Cook-Up",
    description:
      "Community platform for AI hackathon events in Houston with intelligent team matching.",
    longDescription:
      "Fostering Houston's AI community through organized events, LLM-powered team formation, and collaborative project development – making team formation intelligent and inclusive.",
    link: "/projects/theaicookup",
    image: "/images/projects/theaicookup.jpg",
    tags: ["Event Platform", "Team Matching", "Supabase", "AI Integration"],
    color: "teal",
    featured: true,
  },
];

// Project Card Component
interface ProjectCardProps {
  project: (typeof projects)[0];
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <Link href={project.link}>
      <Card
        variant={isDarkTheme ? "glass" : "elevated"}
        className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02]"
        padding={featured ? "lg" : "md"}
      >
        {/* Project Image */}
        <div
          className={`relative ${
            featured ? "h-56" : "h-48"
          } -mx-6 -mt-6 mb-6 overflow-hidden`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Project Title */}
        <h3
          className={`${
            featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          } font-bold mb-3`}
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--primary)",
          }}
        >
          {project.title}
        </h3>

        {/* Project Description */}
        <p
          className={`mb-4 ${
            featured ? "text-base md:text-lg" : "text-sm md:text-base"
          }`}
          style={{
            color: isDarkTheme
              ? "var(--text-on-dark-secondary)"
              : "var(--text-secondary)",
            lineHeight: "var(--line-height-body)",
          }}
        >
          {featured ? project.longDescription : project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, featured ? 3 : 2).map((tag) => (
            <Tag key={tag} size="sm" className="text-xs">
              {tag}
            </Tag>
          ))}
        </div>

        {/* Learn More Link */}
        <div
          className="flex items-center text-sm font-medium transition-colors duration-300"
          style={{ color: "var(--accent)" }}
        >
          <span>{featured ? "Explore Project" : "View Details"}</span>
          <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </Card>
    </Link>
  );
}

// Separate featured from non-featured projects
const featuredProjects = projects.filter((p) => p.featured);
const otherProjects = projects.filter((p) => !p.featured);

export default function Projects() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  return (
    <>
      <Head>
        <title>Projects | Hope Atina</title>
        <meta
          name="description"
          content="Featured projects exploring AI, developer tools, personal growth, and human potential"
        />
      </Head>

      <main
        className="min-h-screen"
        style={{ paddingTop: "var(--spacing-24)" }}
      >
        {/* Header Section */}
        <section className="relative">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl">
              <h1
                className="text-5xl md:text-7xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                  lineHeight: "var(--line-height-heading)",
                }}
              >
                Projects
              </h1>
              <p
                className="text-xl md:text-2xl"
                style={{
                  fontFamily: "var(--font-body)",
                  color: isDarkTheme
                    ? "var(--text-on-dark-secondary)"
                    : "var(--text-secondary)",
                  lineHeight: "var(--line-height-body)",
                }}
              >
                Exploring the intersection of AI, human potential, and social
                impact – from education and personal growth to developer tools
                and beyond
              </p>
            </div>
          </div>

          {/* Background decoration */}
          <div
            className="absolute inset-0 -z-10 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, var(--primary) 0%, transparent 50%)`,
            }}
          />
        </section>

        {/* Featured Projects Section */}
        <section
          className="relative py-16"
          style={{
            background: isDarkTheme ? "var(--background)" : "var(--surface)",
          }}
        >
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--primary)",
              }}
            >
              Featured Projects
            </h2>

            {/* Featured Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </div>
        </section>

        {/* More Projects Section */}
        {otherProjects.length > 0 && (
          <section
            className="relative py-16"
            style={{
              background: isDarkTheme
                ? "var(--background-secondary)"
                : "var(--background)",
            }}
          >
            <div className="container mx-auto px-4">
              <h2
                className="text-3xl md:text-4xl font-bold mb-12"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--primary)",
                }}
              >
                More Projects
              </h2>

              {/* Other Projects Grid - 3 columns */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {otherProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    featured={false}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section
          className="relative py-24"
          style={{
            background: isDarkTheme
              ? "linear-gradient(to bottom right, var(--background), var(--primary-dark))"
              : "linear-gradient(to bottom right, var(--primary-light), var(--accent-light))",
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
              }}
            >
              Have a project in mind?
            </h2>
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              style={{
                color: isDarkTheme
                  ? "var(--text-on-dark-secondary)"
                  : "var(--text-secondary)",
              }}
            >
              I'm always excited to collaborate on innovative ideas that push
              boundaries and create meaningful impact.
            </p>
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              className="mx-auto"
            >
              Let's Work Together
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
