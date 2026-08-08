import React, { useState } from 'react';
import { PANDAL_TRAILS } from '../data/conciergeData';
import { TrailItem } from '../types';
import { MapPin, Clock, Users, Shield, AlertTriangle, ChevronRight, Info } from 'lucide-react';

export const PandalTrails: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'North Heritage', 'South Art', 'VIP Minimal-Walking'];

  const filteredTrails = selectedCategory === 'All' 
    ? PANDAL_TRAILS 
    : PANDAL_TRAILS.filter(t => t.category === selectedCategory);

  return (
    <section id="pandals" className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C82323] tracking-wider uppercase mb-1">
              <MapPin className="w-4 h-4 text-[#C82323]" />
              Artisan & Pandal Architecture
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-[#4A0E17]">
              Pandal & Festive Trails (Senior Accessible)
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 mt-1">
              Curated cultural trails designed for low stress, smooth mobility, and immersive artistic appreciation.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#4A0E17] text-white font-bold shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Trail Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredTrails.map((trail) => (
            <div 
              key={trail.id}
              className="glass-card p-6 rounded-2xl border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                
                {/* Header Tag Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#4A0E17] text-[#FAF7F2]">
                    {trail.zone}
                  </span>
                  
                  {/* Unverified Data Warning Badge */}
                  {trail.unverifiedBadge && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                      <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                      [Requires Near-Date Verification]
                    </span>
                  )}
                </div>

                <h3 className="font-serif-heading text-xl font-bold text-[#4A0E17] mb-2 leading-tight">
                  {trail.name}
                </h3>

                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed mb-4">
                  {trail.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 mb-4 bg-white/70 p-3.5 rounded-xl border border-gray-200">
                  <span className="text-[11px] font-bold text-[#C82323] uppercase tracking-wider block">
                    Curated Route Highlights:
                  </span>
                  <ul className="space-y-1.5">
                    {trail.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-[#1A1A1A]/90 flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Footer Specs Box */}
              <div className="pt-4 border-t border-gray-200 space-y-2 text-xs">
                
                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    Best Visiting Window:
                  </span>
                  <span className="font-semibold text-[#4A0E17]">{trail.bestTime}</span>
                </div>

                <div className="flex items-center justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gray-400" />
                    Expected Crowd Pressure:
                  </span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {trail.crowdLevel}
                  </span>
                </div>

                <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#D4AF37]/30 text-[11px] text-[#4A0E17] flex items-start gap-2">
                  <Shield className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#C82323]">Senior Accessibility:</strong>
                    {trail.seniorAccessibility}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
