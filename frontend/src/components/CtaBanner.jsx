import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

export default function CtaBanner({ onOpenQuote }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 my-10">
      <div className="rounded-xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12 border border-gray-100">
        {/* Blue Brand Side */}
        <div className="md:col-span-4 bg-[#4a7295] text-white p-6 sm:p-8 flex items-center justify-between">
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
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-blue-100">ROYAL</p>
              <p className="text-base font-bold">FURNISHING</p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs bg-white/15 px-3 py-1 rounded-full text-blue-100">
            UAE Wide
          </span>
        </div>

        {/* Yellow CTA Side */}
        <div className="md:col-span-8 bg-[#f5b027] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Contact Us For Services
            </h4>
            <p className="text-xs sm:text-sm text-gray-800 font-medium mt-0.5">
              Instant quote with free pickup and on-site material sample kit
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+971502135026"
              className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-md text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
            >
              <Phone size={14} className="text-[#f5b027]" />
              <span>+971 50 213 5026</span>
            </a>
            <button
              onClick={onOpenQuote}
              className="flex items-center gap-1.5 bg-white hover:bg-gray-100 text-gray-900 px-4 py-2.5 rounded-md text-xs sm:text-sm font-bold shadow-sm transition-all active:scale-95"
            >
              <span>Get Quote</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
