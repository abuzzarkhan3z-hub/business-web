import React from 'react';

export default function Hero({ content, onContactClick }) {
  const heroData = {
    title: content?.title || 'Transform Your Furniture',
    subtitle: content?.subtitle || 'with Royal Furnishing',
    description: content?.description || 'Lorem ipsum dolor sit amet consectetur. In elementum tincidunt aliquet elementum montes. Phasellus nam dictum purus id eu. Elevate your living spaces with bespoke artisan craftsmanship in Dubai.',
    buttonText: content?.buttonText || 'Contact Us',
    imageUrl: content?.imageUrl || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
  };

  return (
    <section id="home" className="relative bg-[#51799c] pt-12 pb-24 md:pb-32 px-4 sm:px-8 overflow-hidden">
      {/* Subtle decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5b84a8] via-[#51799c] to-[#466a8a] opacity-95"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 text-white space-y-6 pt-4 lg:pt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal tracking-tight leading-[1.2]">
              {heroData.title} <br />
              <span className="font-extrabold text-white">{heroData.subtitle}</span>
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed max-w-lg font-light">
              {heroData.description}
            </p>
            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="inline-block bg-white text-[#456b8c] hover:bg-gray-100 px-8 py-3 rounded-md text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                {heroData.buttonText}
              </button>
            </div>
          </div>

          {/* Right Hero Image Column (Dynamic Image from Backend or default) */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl group">
              <div className="absolute -inset-2 bg-white/10 rounded-3xl blur-2xl transform group-hover:scale-105 transition-all duration-700"></div>
              <img
                src={heroData.imageUrl}
                alt="Royal Furnishing Luxury Sofa"
                className="relative z-10 w-full h-auto max-h-[460px] object-cover rounded-2xl shadow-2xl drop-shadow-2xl border border-white/20 transform hover:-translate-y-1 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
