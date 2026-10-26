import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { FacebookIcon, TwitterXIcon, InstagramIcon, LinkedinIcon } from './SocialIcons';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#38597a] text-gray-200 text-xs sm:text-sm pt-16 pb-8 border-t border-[#466a8f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center p-1.5 text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                  <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0z" />
                  <path d="M5 18v2" />
                  <path d="M19 18v2" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] font-semibold text-blue-200 block">ROYAL</span>
                <span className="text-lg font-bold tracking-tight text-white">FURNISHING</span>
              </div>
            </div>

            <p className="text-blue-100/80 text-xs leading-relaxed max-w-sm">
              Dubai's premier destination for bespoke luxury upholstery, antique restoration, handcrafted Arabic majlis, and custom headboards. Elevating interiors across the UAE with perfection and heritage craftsmanship.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#facebook" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <FacebookIcon size={14} />
              </a>
              <a href="#twitter" aria-label="X Twitter" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <TwitterXIcon size={14} />
              </a>
              <a href="#instagram" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <InstagramIcon size={14} />
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                <LinkedinIcon size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2 text-blue-100/80 text-xs">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Our Portfolio</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Get a Quote</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Our Services</h4>
            <ul className="space-y-2 text-blue-100/80 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Sofa Upholstery & Repair</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Arabic Majlis Seating</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Custom Tufted Headboards</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Dining & Lounge Chair Restoration</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Custom Cushions & Drapes</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Commercial & Hotel Fitouts</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Contact Details</h4>
            <div className="space-y-2.5 text-blue-100/80 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#f5b027] flex-shrink-0 mt-0.5" />
                <span>Warehouse 14, Al Quoz Industrial Area 3, Dubai, United Arab Emirates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#f5b027] flex-shrink-0" />
                <a href="tel:+971502135026" className="hover:text-white transition-colors">+971 50 213 5026</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#f5b027] flex-shrink-0" />
                <a href="mailto:info@royalfurnishing.ae" className="hover:text-white transition-colors">info@royalfurnishing.ae</a>
              </div>
              <p className="pt-2 text-[11px] text-blue-200">
                Operating Hours: Sat - Thu (8:30 AM - 8:30 PM)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200/70 gap-4">
          <div className="flex items-center gap-3">
            <p>© 2026 Royal Furnishing LLC. All Rights Reserved. Crafted with precision.</p>
            <button
              onClick={onOpenAdmin}
              className="text-[11px] text-blue-200/60 hover:text-amber-300 underline transition-colors"
            >
              Admin Portal
            </button>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
