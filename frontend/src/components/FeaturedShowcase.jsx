import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export default function FeaturedShowcase({ onOpenQuote }) {
  return (
    <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="bg-[#1f2937] text-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left: Atmospheric Image */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1580481077114-1e0586e903f8?auto=format&fit=crop&w=1000&q=80"
              alt="Modern Wooden Accent Chair"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1f2937]/30 to-[#1f2937] hidden lg:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f2937] via-transparent to-transparent lg:hidden"></div>
          </div>

          {/* Right: Modern Wooden Table / Chair card */}
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9bc3db]">
              <Sparkles size={14} />
              <span>Architectural Series</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Modern Wooden Table & Custom Chairs
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Precision carved solid European Ash and American Walnut wood structures matched with hand-stretched Italian aniline leather or textured bouclé.
            </p>

            <div className="space-y-2 pt-1 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#9bc3db]" />
                <span>Hand-finished natural wax & matte polyurethane</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#9bc3db]" />
                <span>High-density multi-layer orthopedic cushioning</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check size={16} className="text-[#9bc3db]" />
                <span>Custom seat height and stain matching available</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 bg-[#4f789e] hover:bg-[#3d6284] text-white px-6 py-3 rounded-md text-sm font-semibold transition-all shadow-md active:scale-95"
              >
                <span>Request Custom Dimensions</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
