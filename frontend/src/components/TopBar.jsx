import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { FacebookIcon, TwitterXIcon, InstagramIcon, LinkedinIcon } from './SocialIcons';

export default function TopBar() {
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
            href="mailto:info@royalupholstery.ae"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail size={14} className="text-gray-400" />
            <span>info@royalupholstery.ae</span>
          </a>
        </div>

        {/* Social Links */}
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
        </div>
      </div>
    </div>
  );
}
