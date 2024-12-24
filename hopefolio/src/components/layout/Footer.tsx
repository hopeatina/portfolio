import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Emerging Hope</h3>
            <p className="text-gray-400">
              Building transformative experiences through engineering,
              creativity, and entrepreneurship.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Projects</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/projects/neuromosaic">Neuromosaic</Link>
              </li>
              <li>
                <Link href="/projects/brain-buffet">Brain Buffet</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Social</h4>
            <div className="flex space-x-4">
              {/* Add social media icons/links here */}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Emerging Hope. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
