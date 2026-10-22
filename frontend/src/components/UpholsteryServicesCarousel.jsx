import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function UpholsteryServicesCarousel({ onOpenQuote }) {
  const [startIndex, setStartIndex] = useState(0);

  const services = [
    {
      id: 1,
      title: 'Sofa Upholstery',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      title: 'Bed Upholstery',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      title: 'Chair Upholstery',
      image: 'https://images.unsplash.com/photo-1586158291800-2665f07bba79?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      title: 'Cushion Upholstery',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      title: 'Majlis Upholstery',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 6,
      title: 'Curtains & Drapes',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 >= services.length - 3 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? services.length - 4 : prev - 1));
  };

  return (
    <section id="services" className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Description Column */}
        <div className="lg:col-span-4 space-y-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Upholstery Services
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem Ipsum dolor sit amet consectetur. In elementum tincidunt aliquet elementum montes. Phasellus nam dictum purus id eu.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem Ipsum dolor sit amet consectetur. In elementum tincidunt aliquet elementum.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenQuote}
              className="bg-[#4f789e] hover:bg-[#3d6284] text-white px-7 py-2.5 rounded-md text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              Get a Quote
            </button>
          </div>
        </div>

        {/* Right 4 Cards Carousel Column */}
        <div className="lg:col-span-8 relative">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {services.slice(startIndex, startIndex + 4).map((service) => (
              <div
                key={service.id}
                onClick={onOpenQuote}
                className="group relative h-80 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end"
              >
                {/* Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                {/* Blue pill badge button matching the reference design */}
                <div className="relative z-10 p-3 w-full">
                  <div className="bg-[#4f789e] group-hover:bg-[#3d6284] text-white text-xs sm:text-sm font-medium py-2 px-3 rounded text-center transition-colors shadow-md">
                    {service.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Next Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next services"
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#4f789e] hover:scale-110 transition-all z-20"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
