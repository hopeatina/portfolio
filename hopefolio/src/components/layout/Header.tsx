import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full py-4 px-6">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Emerging Hope
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/projects">Projects</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="ml-4 p-2 rounded"
          >
            <option value="base">Base Mode</option>
            <option value="cameroonian">Cameroonian</option>
            <option value="rice">Rice</option>
            <option value="futuristic">Futuristic</option>
          </select>
        </div>
      </nav>
    </header>
  );
}
