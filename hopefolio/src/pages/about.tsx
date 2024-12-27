import React from "react";
import AboutLayout from "@/components/about/AboutLayout";
import AboutSection from "@/components/about/AboutSection";
import MediaEmbed from "@/components/about/MediaEmbed";
import BrandStatement from "@/components/about/BrandStatement";
import Quote from "@/components/ui/Quote";
import styles from "@/styles/themes/base-theme.module.css";

const PERSONAL_QUOTE = {
  text: "No one can beat me at being me",
  attribution: "— and the same goes for you",
};

export default function About() {
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
    <AboutLayout>
      {/* Hero Quote Section */}
      <Quote
        text={PERSONAL_QUOTE.text}
        attribution={PERSONAL_QUOTE.attribution}
        className="mb-8"
      />

      {/* Journey Section */}
      <div className={styles.container}>
        <AboutSection
          title="My Journey"
          className={`${styles.fadeUp} ${styles.delayBase} mb-10`}
        >
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <p>
                My story begins in Cameroon, where my family's entrepreneurial
                spirit and love for education laid the foundation for who I am
                today. The move to Houston opened new horizons, introducing me
                to a vibrant blend of cultures and possibilities.
              </p>
              <p>
                At Rice University, I discovered my passion for technology and
                its potential to transform communities.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                The transition from electrical engineering to software
                development wasn't just a career change—it was a revelation. I
                realized that code could be a medium for creativity,
                problem-solving, and community building.
              </p>
              <p>
                Each line of code became a step toward bringing hope and
                innovation to others.
              </p>
            </div>
          </div>
        </AboutSection>
      </div>

      {/* Music & Art Section */}
      <div className={`${styles.surface} py-12 mb-10`}>
        <div className={styles.container}>
          <AboutSection
            title="Music & Art"
            accent={true}
            className={`${styles.fadeUp}`}
          >
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <p>
                  Music has always been my sanctuary—a place where engineering
                  precision meets creative expression. Whether I'm producing
                  beats or collaborating with other artists, I find that music
                  helps me think differently about problem-solving in tech.
                </p>
                <div className="mt-6 rounded-lg overflow-hidden shadow-lg">
                  <MediaEmbed
                    type="soundcloud"
                    soundcloudUrl="https://soundcloud.com/yourusername/your-track"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p>
                  Similarly, my journey into digital art has become a way to
                  visualize the intersection of culture, technology, and
                  imagination. Each piece tells a story of transformation and
                  possibility.
                </p>
                <div className="mt-6">
                  <MediaEmbed type="art-carousel" artPieces={artPieces} />
                </div>
              </div>
            </div>
          </AboutSection>
        </div>
      </div>

      <div className={styles.container}>
        <BrandStatement className={`${styles.fadeUp} mb-10`} />

        <AboutSection
          title="Gratitude & Community"
          className={`${styles.fadeUp} ${styles.delayBase} mb-10`}
        >
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <p>
                None of this would be possible without the incredible support
                system around me. My parents taught me the value of education
                and perseverance. My mentors at Rice showed me how to think
                beyond conventional boundaries.
              </p>
              <p>The Houston tech community welcomed me with open arms.</p>
            </div>
            <div className="space-y-4">
              <p>
                And soon, through "Rethink with Hope," I'll be sharing
                conversations with remarkable individuals who are reimagining
                what's possible in their fields.
              </p>
              <p>
                Stay tuned for discussions that challenge assumptions and
                inspire action.
              </p>
            </div>
          </div>
        </AboutSection>
      </div>
    </AboutLayout>
  );
}
