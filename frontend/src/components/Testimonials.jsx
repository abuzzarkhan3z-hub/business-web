import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: 'Sarah Al-Mansoor',
      role: 'Emirates Hills Villa Owner',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'Royal Furnishing completely transformed our 10-seater sectional. The velvet quality is breathtaking and their consultant arrived at our villa with huge fabric swatches. Delivery was right on time!',
    },
    {
      id: 2,
      name: 'David Harrington',
      role: 'Downtown Penthouse Resident',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'I thought my antique Italian dining chairs were beyond repair. The master artisans at Royal Furnishing rebuilt the webbing, restored the wood finish, and upholstered them in cognac leather. Absolutely superb.',
    },
    {
      id: 3,
      name: 'Fatima Al-Hashemi',
      role: 'Jumeirah 1 Residence',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'Our custom Arabic Majlis seating with golden embroidery looks like a palace set. Every guest compliments the firmness and opulent fabric texture. Highly recommended for authentic luxury.',
    },
    {
      id: 4,
      name: 'Marcus Weber',
      role: 'Dubai Marina Boutique Hotel',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment: 'We commissioned 24 custom lounge armchairs for our executive club. The precision stitch work and fire-retardant fabric compliance made them our preferred upholstery partner.',
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 2 >= reviews.length ? 0 : prev + 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 2 : prev - 2));
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + 2);

  return (
    <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[#4f789e] text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
            Customer's Feedback
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Real reviews from our esteemed residential and corporate clients across the UAE.
          </p>
        </div>

        {/* Carousel Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#4f789e] flex items-center justify-center text-gray-600 hover:text-[#4f789e] hover:bg-blue-50/50 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#4f789e] flex items-center justify-center text-gray-600 hover:text-[#4f789e] hover:bg-blue-50/50 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visibleReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative"
          >
            <Quote size={36} className="text-[#4f789e]/15 absolute top-6 right-6" />

            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#4f789e]/20"
              />
              <div>
                <h4 className="text-sm font-bold text-gray-900">{rev.name}</h4>
                <p className="text-xs text-[#4f789e] font-medium">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
