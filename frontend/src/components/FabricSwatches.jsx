import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function FabricSwatches({ onSelectFabric }) {
  const [selectedFabric, setSelectedFabric] = useState('Royal Velvet');
  const [selectedColor, setSelectedColor] = useState('Deep Ocean');

  const fabrics = [
    { name: 'Royal Velvet', type: 'Plush & Soft', durability: '50,000 Rubs' },
    { name: 'Italian Leather', type: 'Full Grain', durability: 'Heavy Duty' },
    { name: 'Belgian Linen', type: 'Breathable Natural', durability: '35,000 Rubs' },
    { name: 'Textured Bouclé', type: 'Modern Cozy', durability: '40,000 Rubs' },
    { name: 'Damask Jacquard', type: 'Classic Ornamental', durability: '45,000 Rubs' },
  ];

  const colors = [
    { name: 'Deep Ocean', hex: '#1e3a5f' },
    { name: 'Slate Blue', hex: '#4f789e' },
    { name: 'Royal Emerald', hex: '#1b4d3e' },
    { name: 'Imperial Burgundy', hex: '#6b1d2f' },
    { name: 'Mustard Gold', hex: '#c59b27' },
    { name: 'Blush Terracotta', hex: '#b36b5c' },
    { name: 'Warm Taupe', hex: '#8c7b6d' },
    { name: 'Desert Sand', hex: '#d9cdb8' },
    { name: 'Charcoal Anthracite', hex: '#2b2d42' },
    { name: 'Pure Pearl', hex: '#f4f4f4', border: true },
  ];

  return (
    <section className="py-16 bg-[#f8fafc] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#4f789e] text-xs font-bold uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Material Library
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
            Curated Fabrics & Color Palette
          </h2>
          <p className="text-gray-600 text-sm mt-3">
            Choose from hundreds of premium European fabrics and stain-resistant finishes. Experience tactile luxury before we craft your furniture.
          </p>
        </div>

        {/* Fabric Type Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {fabrics.map((f) => (
            <button
              key={f.name}
              onClick={() => {
                setSelectedFabric(f.name);
                onSelectFabric && onSelectFabric(`${f.name} (${selectedColor})`);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                selectedFabric === f.name
                  ? 'bg-[#4f789e] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{f.name}</span>
              <span className="ml-2 text-[10px] opacity-75 font-normal">({f.type})</span>
            </button>
          ))}
        </div>

        {/* Color Palette Grid */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200/80 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-gray-100 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Selected Combination</p>
              <h3 className="text-lg font-bold text-gray-900 mt-0.5">
                {selectedFabric} in <span className="text-[#4f789e]">{selectedColor}</span>
              </h3>
            </div>
            <div className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-md font-medium border border-emerald-100 flex items-center gap-1.5 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Water-repellent & UV protected
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {colors.map((c) => (
              <div
                key={c.name}
                onClick={() => {
                  setSelectedColor(c.name);
                  onSelectFabric && onSelectFabric(`${selectedFabric} (${c.name})`);
                }}
                className={`group cursor-pointer p-3 rounded-xl border transition-all ${
                  selectedColor === c.name
                    ? 'border-[#4f789e] ring-2 ring-[#4f789e]/30 bg-blue-50/30'
                    : 'border-gray-100 hover:border-gray-300 bg-gray-50/50'
                }`}
              >
                <div
                  className="w-full h-14 rounded-lg shadow-inner flex items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundColor: c.hex,
                    border: c.border ? '1px solid #e2e8f0' : 'none'
                  }}
                >
                  {selectedColor === c.name && (
                    <div className="w-6 h-6 rounded-full bg-white/90 shadow text-[#4f789e] flex items-center justify-center">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <p className="text-center text-xs font-semibold text-gray-800 mt-2.5 truncate">
                  {c.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
