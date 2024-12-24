import React from "react";
import AboutLayout from "@/components/about/AboutLayout";
import AboutSection from "@/components/about/AboutSection";
import MediaEmbed from "@/components/about/MediaEmbed";
import BrandStatement from "@/components/about/BrandStatement";

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
      <AboutSection title="My Journey">
        <p>
          My story begins in Cameroon, where my family's entrepreneurial spirit
          and love for education laid the foundation for who I am today. The
          move to Houston opened new horizons, introducing me to a vibrant blend
          of cultures and possibilities. At Rice University, I discovered my
          passion for technology and its potential to transform communities.
        </p>
        <p>
          The transition from electrical engineering to software development
          wasn't just a career change—it was a revelation. I realized that code
          could be a medium for creativity, problem-solving, and community
          building. Each line of code became a step toward bringing hope and
          innovation to others.
        </p>
      </AboutSection>

      <AboutSection title="Music & Art" accent={true}>
        <p>
          Music has always been my sanctuary—a place where engineering precision
          meets creative expression. Whether I'm producing beats or
          collaborating with other artists, I find that music helps me think
          differently about problem-solving in tech.
        </p>

        <div className="mb-8">
          <MediaEmbed
            type="soundcloud"
            soundcloudUrl="https://soundcloud.com/yourusername/your-track"
          />
        </div>

        <p className="mb-8">
          Similarly, my journey into digital art has become a way to visualize
          the intersection of culture, technology, and imagination. Each piece
          tells a story of transformation and possibility.
        </p>

        <MediaEmbed type="art-carousel" artPieces={artPieces} />
      </AboutSection>

      <BrandStatement />

      <AboutSection title="Gratitude & Community">
        <p>
          None of this would be possible without the incredible support system
          around me. My parents taught me the value of education and
          perseverance. My mentors at Rice showed me how to think beyond
          conventional boundaries. The Houston tech community welcomed me with
          open arms.
        </p>
        <p>
          And soon, through "Rethink with Hope," I'll be sharing conversations
          with remarkable individuals who are reimagining what's possible in
          their fields. Stay tuned for discussions that challenge assumptions
          and inspire action.
        </p>
      </AboutSection>
    </AboutLayout>
  );
}
