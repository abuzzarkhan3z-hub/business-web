import React, { useState } from 'react';
import { Eye, ExternalLink } from 'lucide-react';

export default function ProjectsGallery({ onOpenQuote }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Residential', 'Arabic Majlis', 'Custom Beds', 'Commercial'];

  const projects = [
    {
      id: 1,
      title: 'Emirates Hills Villa Sofa Suite',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      tag: 'Bespoke Velvet'
    },
    {
      id: 2,
      title: 'Royal Grand Majlis Seating',
      category: 'Arabic Majlis',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      tag: 'Gold Damask'
    },
    {
      id: 3,
      title: 'Palm Jumeirah Penthouse Master Bed',
      category: 'Custom Beds',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      tag: 'Diamond Tufted'
    },
    {
      id: 4,
      title: 'Downtown Executive Lounge Chairs',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1586158291800-2665f07bba79?auto=format&fit=crop&w=800&q=80',
      tag: 'Italian Leather'
    },
    {
      id: 5,
      title: 'Handcrafted Antique Chesterfield',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80',
      tag: 'Deep Tufting'
    },
    {
      id: 6,
      title: 'Boutique Hotel Accent Armchairs',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
      tag: 'Mustard Bouclé'
    }
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-[#4f789e] text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
            Our Royal Upholstery Projects
          </h2>
          <p className="text-gray-600 text-sm mt-2 max-w-xl">
            A showcase of recent bespoke projects delivered across Dubai, Abu Dhabi, and the wider UAE.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-[#4f789e] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={onOpenQuote}
            className="group relative h-72 sm:h-80 rounded-xl overflow-hidden shadow-md cursor-pointer bg-gray-100"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>

            {/* Tag badge */}
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-bold px-3 py-1 rounded shadow-sm">
              {project.tag}
            </span>

            {/* Overlay details */}
            <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
              <div>
                <p className="text-[#9bc3db] text-xs font-medium uppercase tracking-wider">
                  {project.category}
                </p>
                <h3 className="text-white text-base sm:text-lg font-bold mt-0.5 group-hover:text-blue-100 transition-colors">
                  {project.title}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#4f789e] group-hover:scale-110 transition-all">
                <Eye size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
