import React from 'react';
import { Ruler, ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutSection({ onOpenQuote }) {
  const highlights = [
    {
      icon: Ruler,
      title: 'Free On-Site Measurement',
      desc: 'Our specialists visit your home or villa with fabric swatches to take laser-precise dimensions.'
    },
    {
      icon: Sparkles,
      title: '3,000+ Premium Fabrics',
      desc: 'Imported Belgian velvets, Italian top-grain leathers, durable linens, and stain-resistant jacquards.'
    },
    {
      icon: Award,
      title: 'Master Artisans',
      desc: 'Handcrafted by experienced craftsmen with over 15 years of luxury upholstery heritage in the UAE.'
    },
    {
      icon: ShieldCheck,
      title: '5-Year Guarantee',
      desc: 'Complete peace of mind with our structural foam and seam stitch warranty on all custom pieces.'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Modern Mustard Chair Image */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Subtle soft backdrop ring */}
            <div className="absolute -inset-4 bg-[#f1f5f9] rounded-3xl -z-10 transform -rotate-1"></div>
            <img
              src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80"
              alt="Royal Upholstery Yellow Armchair"
              className="w-full h-auto object-cover rounded-2xl shadow-xl border border-gray-100"
            />
            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#4f789e]/10 text-[#4f789e] flex items-center justify-center font-bold text-xl">
                15+
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Years Of</p>
                <p className="text-sm font-bold text-gray-900">Artisan Excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: About Content */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[#4f789e] text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            About Royal Upholstery
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            At Royal Upholstery, we breathe new life into cherished furniture and craft bespoke seating tailored to Dubai's most luxurious residences, hotels, and corporate spaces. Every stitch, spring, and cushion layer is meticulously executed by seasoned craftsmen dedicated to perfection.
          </p>

          {/* 4 Feature Points with Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#eef4f9] text-[#4f789e] flex-shrink-0 flex items-center justify-center shadow-xs">
                    <Icon size={19} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex flex-wrap gap-4 items-center">
            <button
              onClick={onOpenQuote}
              className="bg-[#4f789e] hover:bg-[#3d6284] text-white px-7 py-3 rounded-md text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              Request Free Consultation
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span>Free fabric catalog brought to your doorstep</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
