import React from "react";
import Head from "next/head";
import Card from "@/components/ui/Card";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Emerging Hope</title>
        <meta
          name="description"
          content="Learn about my journey as a Cameroonian-Houstonian-Rice engineer and creative"
        />
      </Head>

      <main className="container py-12 mt-24">
        <h1>About Me</h1>

        <div className="grid gap-8">
          <Card>
            <h2>Background</h2>
            <p className="mt-4">
              As a Cameroonian-Houstonian who studied at Rice University, my
              unique perspective combines diverse cultural influences with
              technical expertise.
            </p>
          </Card>

          <Card>
            <h2>Mission</h2>
            <p className="mt-4">
              I'm passionate about using technology to build hope and transform
              communities. Through projects like Neuromosaic and Brain Buffet,
              I'm working to make advanced technology more accessible and
              impactful.
            </p>
          </Card>

          <Card>
            <h2>Skills & Interests</h2>
            <ul className="mt-4 list-disc list-inside">
              <li>Distributed Systems & ML Infrastructure</li>
              <li>Full-Stack Development</li>
              <li>UI/UX Design</li>
              <li>Music Production</li>
              <li>Digital Art & AI-Assisted Creation</li>
            </ul>
          </Card>
        </div>
      </main>
    </>
  );
}
