import React from "react";
import Head from "next/head";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";

const PERSONAL_QUOTE = {
  text: "No one can beat me at being me",
  attribution: "— and the same goes for you",
};

export default function About() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "futuristic";

  const artPieces = [
    {
      src: "/images/art/piece1.jpg",
      caption: "Digital Dreams",
      story:
        "Created during a late-night exploration of AI-assisted art generation.",
    },
    {
      src: "/images/art/piece2.jpg",
      caption: "Cultural Fusion",
      story: "Blending Cameroonian patterns with futuristic elements.",
    },
    {
      src: "/images/art/piece3.jpg",
      caption: "Hope Rising",
      story: "A visual representation of emerging possibilities.",
    },
  ];

  return (
    <>
      <Head>
        <title>About | Hope Atina</title>
        <meta
          name="description"
          content="Software developer, bioengineer, and musician building at the intersection of technology, creativity, and culture."
        />
      </Head>

      <main
        className="min-h-screen"
        style={{ paddingTop: "var(--spacing-24)" }}
      >
        {/* Hero Quote Section */}
        <section
          className="relative py-24 md:py-32 text-center"
          style={{
            background: isDarkTheme
              ? "linear-gradient(to bottom, var(--background), var(--background-secondary))"
              : "linear-gradient(to bottom, var(--surface), var(--background))",
          }}
        >
          <div className="container mx-auto px-4">
            <blockquote className="max-w-4xl mx-auto">
              <p
                className="text-4xl md:text-6xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--primary)",
                  lineHeight: "var(--line-height-heading)",
                }}
              >
                {PERSONAL_QUOTE.text}
              </p>
              <cite
                className="text-xl"
                style={{
                  color: isDarkTheme
                    ? "var(--text-on-dark-secondary)"
                    : "var(--text-secondary)",
                  fontStyle: "normal",
                }}
              >
                {PERSONAL_QUOTE.attribution}
              </cite>
            </blockquote>
          </div>

          {/* Background pattern */}
          <div
            className="absolute inset-0 -z-10 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 50%)`,
            }}
          />
        </section>

        {/* Journey Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--primary)",
              }}
            >
              My Journey
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="p-8"
              >
                <p
                  className="mb-4"
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  My story begins in Cameroon, where my family's entrepreneurial
                  spirit and love for education laid the foundation for who I am
                  today. The move to Houston opened new horizons, introducing me
                  to a vibrant blend of cultures and possibilities.
                </p>
                <p
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  At Rice University, I discovered my passion for technology and
                  its potential to transform communities.
                </p>
              </Card>

              <Card
                variant={isDarkTheme ? "glass" : "elevated"}
                className="p-8"
              >
                <p
                  className="mb-4"
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  The transition from electrical engineering to software
                  development wasn't just a career change—it was a revelation. I
                  realized that code could be a medium for creativity,
                  problem-solving, and community building.
                </p>
                <p
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  Each line of code became a step toward bringing hope and
                  innovation to others.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Music & Art Section */}
        <section
          className="py-16 md:py-24"
          style={{
            background: isDarkTheme
              ? "var(--background-secondary)"
              : "var(--surface)",
          }}
        >
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--primary)",
              }}
            >
              Music & Art
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <Card variant="elevated" className="p-8 mb-6">
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--accent)",
                    }}
                  >
                    Sound & Rhythm
                  </h3>
                  <p
                    className="mb-6"
                    style={{
                      color: isDarkTheme
                        ? "var(--text-on-dark)"
                        : "var(--text)",
                      lineHeight: "var(--line-height-body)",
                    }}
                  >
                    Music has always been my sanctuary—a place where engineering
                    precision meets creative expression. Whether I'm producing
                    beats or collaborating with other artists, I find that music
                    helps me think differently about problem-solving in tech.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Tag size="sm">Music Production</Tag>
                    <Tag size="sm">Sound Design</Tag>
                    <Tag size="sm">Collaboration</Tag>
                  </div>
                </Card>
              </div>

              <div>
                <Card variant="elevated" className="p-8 mb-6">
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "var(--accent)",
                    }}
                  >
                    Visual Expression
                  </h3>
                  <p
                    className="mb-6"
                    style={{
                      color: isDarkTheme
                        ? "var(--text-on-dark)"
                        : "var(--text)",
                      lineHeight: "var(--line-height-body)",
                    }}
                  >
                    Similarly, my journey into digital art has become a way to
                    visualize the intersection of culture, technology, and
                    imagination. Each piece tells a story of transformation and
                    possibility.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Tag size="sm">Digital Art</Tag>
                    <Tag size="sm">Cultural Fusion</Tag>
                    <Tag size="sm">AI-Assisted</Tag>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Statement */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card
              variant={isDarkTheme ? "glass" : "elevated"}
              className="p-12 max-w-4xl mx-auto text-center"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--primary)",
                }}
              >
                Emerging Hope
              </h2>
              <p
                className="text-lg md:text-xl mb-8"
                style={{
                  color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                  lineHeight: "var(--line-height-body)",
                }}
              >
                My brand represents the continuous journey of growth, learning,
                and impact. It's about emerging from challenges with renewed
                purpose and helping others do the same through technology,
                creativity, and community.
              </p>
              <div className="flex justify-center gap-4">
                <Button href="/projects" variant="primary" size="lg">
                  View My Work
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Let's Connect
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Gratitude & Community */}
        <section
          className="py-16 md:py-24"
          style={{
            background: isDarkTheme
              ? "linear-gradient(to bottom, var(--background), var(--primary-dark))"
              : "linear-gradient(to bottom, var(--primary-light), var(--accent-light))",
          }}
        >
          <div className="container mx-auto px-4">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{
                fontFamily: "var(--font-heading)",
                color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
              }}
            >
              Gratitude & Community
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
              <Card variant="glass" className="p-8">
                <p
                  className="mb-4"
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  None of this would be possible without the incredible support
                  system around me. My parents taught me the value of education
                  and perseverance. My mentors at Rice showed me how to think
                  beyond conventional boundaries.
                </p>
                <p
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  The Houston tech community welcomed me with open arms.
                </p>
              </Card>

              <Card variant="glass" className="p-8">
                <p
                  className="mb-4"
                  style={{
                    color: isDarkTheme ? "var(--text-on-dark)" : "var(--text)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  And soon, through "Rethink with Hope," I'll be sharing
                  conversations with remarkable individuals who are reimagining
                  what's possible in their fields.
                </p>
                <p
                  style={{
                    color: isDarkTheme
                      ? "var(--text-on-dark-secondary)"
                      : "var(--text-secondary)",
                    lineHeight: "var(--line-height-body)",
                  }}
                >
                  Stay tuned for discussions that challenge assumptions and
                  inspire action.
                </p>
              </Card>
            </div>

            <div className="text-center">
              <Button
                href="/blog"
                variant="primary"
                size="lg"
                className="inline-flex items-center gap-2"
              >
                Coming Soon: Rethink with Hope Podcast
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
