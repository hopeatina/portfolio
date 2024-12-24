import React from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";

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
        <Header />
        {/* Hero section will go here */}
        {/* Rest of homepage content */}
      </main>
    </>
  );
}
