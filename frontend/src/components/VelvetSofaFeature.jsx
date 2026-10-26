import React from 'react';
import { Sparkles, Layers, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function VelvetSofaFeature({ onOpenQuote }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#4f789e] text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Featured Craft
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
            Royal Furnishing Services
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Experience unparalleled comfort with our signature custom velvet pieces designed to become the centerpiece of your home.
          </p>
        </div>

        {/* Big Showcase Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b from-gray-50 to-gray-100 max-w-4xl mx-auto mb-12 border border-gray-100">
          <div className="p-4 sm:p-8 flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=1000&q=80"
              alt="Magenta Velvet Designer Sofa"
              className="w-full max-h-[380px] object-contain rounded-xl drop-shadow-2xl"
            />
          </div>
          {/* Sale / Feature Tag */}
          <div className="absolute top-6 left-6 bg-[#4f789e] text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-md">
            Custom Velvet Edition
          </div>
        </div>

        {/* 3 Detail Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-[#f8fafc] p-6 rounded-xl border border-gray-100 hover:border-[#4f789e]/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#4f789e]/10 text-[#4f789e] flex items-center justify-center mb-4">
              <Layers size={20} />
            </div>
            <h4 className="text-base font-bold text-gray-900">Multi-Density Orthopedic Foam</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              We replace sagging seats with 40-45 density memory foam and pocket spring coils for lifetime lumbar support.
            </p>
          </div>

          <div className="bg-[#f8fafc] p-6 rounded-xl border border-gray-100 hover:border-[#4f789e]/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#4f789e]/10 text-[#4f789e] flex items-center justify-center mb-4">
              <Sparkles size={20} />
            </div>
            <h4 className="text-base font-bold text-gray-900">Stain-Shield Fabric Treatment</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              Nano-coating technology applied to fabrics to repel coffee, juice, and liquid spills with simple wipe-clean ease.
            </p>
          </div>

          <div className="bg-[#f8fafc] p-6 rounded-xl border border-gray-100 hover:border-[#4f789e]/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#4f789e]/10 text-[#4f789e] flex items-center justify-center mb-4">
              <HeartHandshake size={20} />
            </div>
            <h4 className="text-base font-bold text-gray-900">Complimentary White Glove Delivery</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              Safe transportation, placement in your preferred room, and full inspection by our senior installation team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
