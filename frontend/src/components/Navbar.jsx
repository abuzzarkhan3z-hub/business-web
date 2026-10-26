import React, { useState } from 'react';
import { Menu, X, Armchair } from 'lucide-react';

export default function Navbar({ onOpenQuote }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 border-2 border-[#4f789e] rounded-lg flex items-center justify-center p-1.5 text-[#4f789e] group-hover:bg-[#4f789e] group-hover:text-white transition-all duration-300">
            {/* Custom Armchair SVG matching the logo in screenshot */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full"
            >
              <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
              <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0z" />
              <path d="M5 18v2" />
              <path d="M19 18v2" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#4f789e]">ROYAL</span>
            <span className="text-lg font-bold tracking-tight text-[#34495e]">FURNISHING</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#4b5563] text-sm font-medium hover:text-[#4f789e] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#4f789e] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Get a Quote CTA */}
        <div className="hidden md:block">
          <button
            onClick={onOpenQuote}
            className="bg-[#4f789e] hover:bg-[#3d6284] text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900 p-1.5 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 font-medium py-2 hover:text-[#4f789e] border-b border-gray-50"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="mt-2 w-full bg-[#4f789e] hover:bg-[#3d6284] text-white py-2.5 rounded-md text-sm font-semibold text-center transition-all"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
