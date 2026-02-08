"use client";

import Link from "next/link";
import { Button } from "@/components/ui";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-border-light sticky top-0 z-50">
      <div className="max-w-container mx-auto px-page-x py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="font-serif text-2xl font-bold text-primary">
            Menew
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-base text-text-primary hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm">
            Login
          </Button>
          <Button variant="primary" size="md">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
