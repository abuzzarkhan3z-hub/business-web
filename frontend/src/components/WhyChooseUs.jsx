import React from 'react';
import { CheckCircle2, Star, Clock, ShieldCheck, Truck } from 'lucide-react';

export default function WhyChooseUs({ onOpenQuote }) {
  const points = [
    {
      title: 'Over 15 Years of Artisanal Heritage in UAE',
      desc: 'Trusted by over 3,500 villa owners, luxury interior designers, and 5-star hotels.'
    },
    {
      title: 'Free In-Home Measurement & Fabric Sampling',
      desc: 'Our consultant visits your location across Dubai, Abu Dhabi, and Sharjah at zero charge.'
    },
    {
      title: 'Fast 5 to 7 Working Days Turnaround',
      desc: 'Rapid production without compromising fine stitch craftsmanship and structural durability.'
    },
    {
      title: '100% Genuine Materials & High-Resilience Foams',
      desc: 'Certified high-density foams, kiln-dried hardwood framing, and European grade upholstery fabrics.'
    },
    {
      title: 'Comprehensive 5-Year Craftsmanship Warranty',
      desc: 'We stand behind our work with warranty coverage on seams, frames, springs, and upholstery.'
    }
  ];

  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Workshop Image */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl min-h-[380px]">
            <img
              src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80"
              alt="Royal Upholstery Craftsmen Workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Overlay pill */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">In-House Production</p>
                <p className="text-sm font-bold text-gray-900">12,000 sq.ft Dubai Facility</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold text-gray-800">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right: Blue Feature Box matching reference */}
          <div className="lg:col-span-6 bg-[#4f789e] text-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-blue-200 font-bold bg-white/10 px-3 py-1 rounded-full">
                The Royal Standard
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 tracking-tight">
                Why Choose Royal Upholstery?
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm mt-2 leading-relaxed">
                We combine traditional European upholstery techniques with state-of-the-art cutting tools to ensure flawless longevity for your furniture.
              </p>

              <div className="space-y-4 mt-6">
                {points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[#f5b027] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{pt.title}</h4>
                      <p className="text-xs text-blue-100/80 mt-0.5 leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-blue-100">
                <Truck size={16} className="text-[#f5b027]" />
                <span>Complimentary Pickup & Delivery</span>
              </div>
              <button
                onClick={onOpenQuote}
                className="bg-white hover:bg-gray-100 text-[#4f789e] px-6 py-2.5 rounded-md text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
              >
                Book Inspection
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
