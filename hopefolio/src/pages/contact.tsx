import React from "react";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic will be implemented later
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

      <Header />

      <main className="container py-12">
        <h1>Contact</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold mb-4">Connect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-600">hello@emerginghope.dev</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Social Media</h3>
                <div className="flex space-x-4 mt-2">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
