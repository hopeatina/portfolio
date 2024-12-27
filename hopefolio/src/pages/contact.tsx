import React, { useState } from "react";
import Head from "next/head";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import styles from "@/styles/themes/base-theme.module.css";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Form submission logic will be implemented later
    setTimeout(() => setIsSubmitting(false), 1000); // Temporary simulation
  };

  return (
    <>
      <Head>
        <title>Contact | Emerging Hope</title>
        <meta
          name="description"
          content="Get in touch to discuss collaborations, projects, or just to say hello"
        />
      </Head>

      <main
        className={`${styles.container} py-16 min-h-screen ${styles.fadeIn}`}
      >
        <h1
          className={`${styles.headingH1} text-4xl font-bold mb-8 text-center ${styles.gradientText}`}
        >
          Let's Connect
        </h1>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card
            className={`p-6 shadow-lg border border-accent/10 ${styles.fadeUp}`}
          >
            <h2 className={`${styles.headingH1} text-2xl font-bold mb-6`}>
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-input
                           focus:ring-2 focus:ring-primary focus:border-transparent
                           bg-background transition-colors
                           disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  aria-describedby="name-required"
                />
                <span id="name-required" className="sr-only">
                  Required field
                </span>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-input
                           focus:ring-2 focus:ring-primary focus:border-transparent
                           bg-background transition-colors
                           disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  aria-describedby="email-required"
                />
                <span id="email-required" className="sr-only">
                  Required field
                </span>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-input
                           focus:ring-2 focus:ring-primary focus:border-transparent
                           bg-background transition-colors resize-vertical
                           disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                  aria-describedby="message-required"
                />
                <span id="message-required" className="sr-only">
                  Required field
                </span>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          <Card
            className={`p-6 shadow-lg ${styles.fadeUp} ${styles.delayBase}`}
          >
            <h2 className={`${styles.headingH1} text-2xl font-bold mb-6`}>
              Other Ways to Connect
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <a
                  href="mailto:hello@emerginghope.dev"
                  className={`${styles.gradientText} hover:opacity-80 transition-opacity`}
                >
                  hello@emerginghope.dev
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Social Media</h3>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-accent 
                             text-white font-medium hover:opacity-90 transition-all 
                             hover:transform hover:scale-105"
                    aria-label="GitHub Profile"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-accent to-primary 
                             text-white font-medium hover:opacity-90 transition-all 
                             hover:transform hover:scale-105"
                    aria-label="LinkedIn Profile"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-primary-light to-accent-light 
                             text-white font-medium hover:opacity-90 transition-all 
                             hover:transform hover:scale-105"
                    aria-label="Twitter Profile"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
