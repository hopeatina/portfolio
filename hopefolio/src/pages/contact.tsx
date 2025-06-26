import React, { useState } from "react";
import Head from "next/head";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
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
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Form submission logic will be implemented later
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Temporary simulation
      setFormStatus("success");
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
          content="Get in touch to discuss collaborations, projects, or just to say hello"
        />
      </Head>

      <main className="min-h-screen bg-background py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Let's Connect</span>
            </h1>
            <p className="text-lg md:text-xl text-body-secondary max-w-2xl mx-auto">
              Feel free to reach out, and I'll get back to you soon!
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card variant="elevated" className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-heading">
                I'd love to hear from you!
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 flex items-center gap-2 text-label"
                  >
                    <FiUser className="w-4 h-4" />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-body focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 flex items-center gap-2 text-label"
                  >
                    <FiMail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-body focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 flex items-center gap-2 text-label"
                  >
                    <FiMessageSquare className="w-4 h-4" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-body focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-vertical"
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  Send Message
                </Button>

                {formStatus === "success" && (
                  <div className="text-center p-4 rounded-lg bg-success/10 text-success border border-success/30">
                    Thanks for your message! I'll get back to you soon.
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="text-center p-4 rounded-lg bg-error/10 text-error border border-error/30">
                    Oops! Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </Card>

            {/* Contact Info */}
            <Card variant="elevated" className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-heading">
                Other Ways to Connect
              </h2>

              <div className="space-y-8">
                {/* Email */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-heading">
                    <FiMail className="w-5 h-5" />
                    Email
                  </h3>
                  <a
                    href="mailto:hopeatina@gmail.com"
                    className="text-link hover:text-link-hover transition-colors inline-flex items-center group"
                  >
                    hopeatina@gmail.com
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </a>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-heading">
                    Social Media
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      href="https://github.com/hopeatina"
                      external
                      icon={<FiGithub />}
                      size="lg"
                      className="flex-1 sm:flex-initial"
                    >
                      GitHub
                    </Button>

                    <Button
                      href="https://linkedin.com/in/hopeatina"
                      external
                      icon={<FiLinkedin />}
                      size="lg"
                      className="flex-1 sm:flex-initial"
                    >
                      LinkedIn
                    </Button>

                    <Button
                      href="https://x.com/emerginghope_"
                      external
                      icon={<FiTwitter />}
                      size="lg"
                      className="flex-1 sm:flex-initial"
                    >
                      X (Twitter)
                    </Button>

                    <Button
                      href="https://medium.com/@hopeatina"
                      external
                      icon={<FaMedium />}
                      size="lg"
                      className="flex-1 sm:flex-initial"
                    >
                      Medium
                    </Button>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-heading">
                    Looking for collaboration?
                  </h3>
                  <p className="text-body-secondary mb-4">
                    I'm always excited to work on innovative projects that push
                    boundaries and create meaningful impact. Whether you have a
                    startup idea, need technical consulting, or want to explore
                    new technologies together, let's chat!
                  </p>
                  <p className="text-body-secondary">
                    I'm particularly interested in projects involving AI/ML,
                    bioengineering, creative technology, and social impact.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
