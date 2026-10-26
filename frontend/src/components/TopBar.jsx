import React from 'react';
import { Phone, Mail, Lock } from 'lucide-react';
import { FacebookIcon, TwitterXIcon, InstagramIcon, LinkedinIcon } from './SocialIcons';

export default function TopBar({ onOpenAdmin }) {
  return (
    <div className="bg-[#343a40] text-gray-300 text-xs sm:text-sm py-2 px-4 sm:px-8 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Contact Info */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+971502135026"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone size={14} className="text-gray-400" />
            <span className="tracking-wide">+971502135026</span>
          </a>
          <a
            href="mailto:info@royalfurnishing.ae"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail size={14} className="text-gray-400" />
            <span>info@royalfurnishing.ae</span>
          </a>
        </div>

        {/* Social Links & Admin Login */}
        <div className="flex items-center gap-4 text-gray-400">
          <a href="#facebook" aria-label="Facebook" className="hover:text-white transition-colors">
            <FacebookIcon size={14} />
          </a>
          <a href="#twitter" aria-label="X Twitter" className="hover:text-white transition-colors">
            <TwitterXIcon size={14} />
          </a>
          <a href="#instagram" aria-label="Instagram" className="hover:text-white transition-colors">
            <InstagramIcon size={14} />
          </a>
          <a href="#linkedin" aria-label="LinkedIn" className="hover:text-white transition-colors">
            <LinkedinIcon size={14} />
          </a>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-semibold bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded transition-colors ml-2"
          >
            <Lock size={12} />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
}
