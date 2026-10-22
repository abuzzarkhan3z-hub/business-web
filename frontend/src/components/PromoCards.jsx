import React from 'react';

export default function PromoCards({ onCardClick }) {
  const cards = [
    {
      id: 1,
      title: 'Custom Furniture',
      subtitle: null,
      badge: null,
      action: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'New Arrivals',
      subtitle: 'sale up to',
      discount: '50% off',
      action: null,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Arabic Majlis',
      subtitle: null,
      badge: null,
      action: 'Shop Now',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 -mt-12 sm:-mt-16 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onCardClick && onCardClick(card.title)}
            className="group relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-xl cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
          >
            {/* Background Image */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-95"
            />
            
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 group-hover:via-black/30 transition-colors"></div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-md">
                {card.title}
              </h3>

              {card.subtitle && (
                <p className="text-xs sm:text-sm text-gray-200 uppercase tracking-widest mt-1">
                  {card.subtitle}
                </p>
              )}

              {card.discount && (
                <p className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5 tracking-tight drop-shadow-md">
                  {card.discount}
                </p>
              )}

              {card.action && (
                <span className="mt-3 text-xs sm:text-sm font-semibold tracking-wide underline decoration-2 underline-offset-4 text-gray-100 group-hover:text-white transition-colors">
                  {card.action}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
