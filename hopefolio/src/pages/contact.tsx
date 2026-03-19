import React, { useState } from "react";
import Head from "next/head";
import Button from "@/components/ui/Button";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { FaMedium } from "react-icons/fa";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch("https://formspree.io/f/xpwzgkpd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });
      if (response.ok) {
        setFormStatus("success");
        e.currentTarget.reset();
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact | Hope Atina</title>
        <meta
          name="description"
          content="Get in touch about AI agent infrastructure, multi-agent orchestration, MCP protocol, and developer tooling opportunities."
        />
      </Head>

      <main className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-24">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.04em] text-heading" style={{ fontFamily: "var(--font-heading)" }}>
              Let&apos;s Connect
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-body-secondary max-w-2xl leading-relaxed font-light">
              Feel free to reach out to discuss infrastructure, orchestration, or your next big project.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-16 lg:grid-cols-[1fr_400px] lg:gap-24">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-heading tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Start a conversation
              </h2>
              <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm uppercase tracking-[0.1em] font-medium mb-3 text-body-secondary"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full px-0 py-4 bg-transparent border-b border-border text-heading text-lg focus:outline-none focus:border-primary transition-all placeholder:text-body-secondary/40"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm uppercase tracking-[0.1em] font-medium mb-3 text-body-secondary"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="Your email address"
                      className="w-full px-0 py-4 bg-transparent border-b border-border text-heading text-lg focus:outline-none focus:border-primary transition-all placeholder:text-body-secondary/40"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm uppercase tracking-[0.1em] font-medium mb-3 text-body-secondary"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="What would you like to discuss?"
                      className="w-full px-0 py-4 bg-transparent border-b border-border text-heading text-lg focus:outline-none focus:border-primary transition-all resize-none placeholder:text-body-secondary/40"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    size="lg"
                    className="rounded-full px-8"
                  >
                    Send Message
                  </Button>
                </div>

                {formStatus === "success" && (
                  <div className="mt-8 p-6 bg-success/10 text-success border border-success/20 rounded-2xl">
                    Thanks for your message! I&apos;ll get back to you soon.
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="mt-8 p-6 bg-error/10 text-error border border-error/20 rounded-2xl">
                    Something went wrong sending your message. You can also
                    reach me directly at{" "}
                    <a
                      href="mailto:hopeatina@gmail.com"
                      className="underline font-medium"
                    >
                      hopeatina@gmail.com
                    </a>
                    .
                  </div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:pl-16 lg:border-l lg:border-border">
              <h2 className="text-2xl font-semibold mb-10 text-heading tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Other Ways
              </h2>

              <div className="space-y-12">
                {/* Email */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] mb-4 text-body-secondary font-medium">
                    Direct Email
                  </h3>
                  <a
                    href="mailto:hopeatina@gmail.com"
                    className="text-xl text-heading hover:text-primary transition-colors inline-flex items-center group"
                  >
                    hopeatina@gmail.com
                    <span className="ml-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      →
                    </span>
                  </a>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] mb-4 text-body-secondary font-medium">
                    Elsewhere
                  </h3>
                  <div className="flex flex-col gap-4">
                    <a href="https://github.com/hopeatina" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg text-body-secondary hover:text-heading transition-colors">
                      <FiGithub className="w-5 h-5" /> GitHub
                    </a>
                    <a href="https://linkedin.com/in/hopeatina" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg text-body-secondary hover:text-heading transition-colors">
                      <FiLinkedin className="w-5 h-5" /> LinkedIn
                    </a>
                    <a href="https://x.com/emerginghope_" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg text-body-secondary hover:text-heading transition-colors">
                      <FiTwitter className="w-5 h-5" /> X (Twitter)
                    </a>
                    <a href="https://medium.com/@hopeatina" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg text-body-secondary hover:text-heading transition-colors">
                      <FaMedium className="w-5 h-5" /> Medium
                    </a>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="pt-8 border-t border-border">
                  <h3 className="text-xs uppercase tracking-[0.2em] mb-4 text-body-secondary font-medium">
                    Current Focus
                  </h3>
                  <p className="text-body-secondary leading-relaxed">
                    Particularly interested in multi-agent orchestration,
                    MCP/tool-calling platforms, agent observability, and AI
                    infrastructure engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
