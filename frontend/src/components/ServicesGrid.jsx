import React from 'react';
import { Sparkles, Shield, Clock, Scissors, ArrowUpRight } from 'lucide-react';

export default function ServicesGrid({ onSelectService }) {
  const serviceCards = [
    {
      title: 'Custom Sofa Making & Repair',
      desc: 'Complete restoration, foam replacement, and bespoke upholstery tailored to your living space.',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      badge: 'Bestseller'
    },
    {
      title: 'Luxury Arabic Majlis',
      desc: 'Traditional and contemporary Arabian floor seating with rich velvet, jacquard and custom woodwork.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
      badge: 'Signature'
    },
    {
      title: 'Dining & Accent Chairs',
      desc: 'Premium fabric and leather re-padding for dining sets, armchairs, and lounge seating.',
      image: 'https://images.unsplash.com/photo-1586158291800-2665f07bba79?auto=format&fit=crop&w=600&q=80',
      badge: 'Popular'
    },
    {
      title: 'Tufted Headboards & Beds',
      desc: 'Bespoke diamond tufting, wall panelling, and customized bed frames crafted to order.',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
      badge: 'Custom'
    },
    {
      title: 'Commercial & Hospitality',
      desc: 'Durable fire-retardant upholstery solutions for hotels, restaurants, cafes, and executive offices.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      badge: 'Corporate'
    },
    {
      title: 'Antique & Vintage Restoration',
      desc: 'Delicate structural repairs, traditional webbing, springs, and archival fabric preservation.',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
      badge: 'Heritage'
    }
  ];

  return (
    <section className="py-16 bg-[#f8fafc] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#4f789e] text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Our Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
            Specialized Upholstery Services
          </h2>
          <p className="text-gray-600 text-sm mt-3">
            From modern residential renovations to bespoke commercial furniture, we bring unmatched precision and luxury materials to every piece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectService && onSelectService(item.title)}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#4f789e] text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                  {item.badge}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#4f789e] transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight size={18} className="text-gray-400 group-hover:text-[#4f789e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#4f789e] font-semibold">
                  <span>Explore Options</span>
                  <span className="text-gray-400 font-normal">Free UAE Pickup</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
