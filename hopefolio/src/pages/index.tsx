import React from "react";
import Head from "next/head";
import Hero from "@/components/ui/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Emerging Hope Portfolio</title>
        <meta
          name="description"
          content="Portfolio showcasing engineering, creativity, and entrepreneurship"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <Hero />
        {/* Additional sections will be added here */}
      </main>
    </>
  );
}
