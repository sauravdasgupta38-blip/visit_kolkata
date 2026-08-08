import React from 'react';
import { NIGHTLIFE_DINING } from '../data/conciergeData';
import { Utensils, Award, Shield, ChevronRight, Music } from 'lucide-react';

export const NightlifeDining: React.FC = () => {
  return (
    <section id="nightlife" className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C82323] tracking-wider uppercase mb-1">
              <Utensils className="w-4 h-4 text-[#C82323]" />
              Haute Cuisine & Heritage Nightlife
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-[#4A0E17]">
              Nightlife for Our London Guests & Fine Dining
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 mt-1">
              1960s Park Street jazz lounges, aristocratic private clubs, and award-winning Bengali gastronomy.
            </p>
          </div>
        </div>

        {/* Dining Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {NIGHTLIFE_DINING.map((spot) => (
            <div
              key={spot.id}
              className="glass-card p-6 rounded-2xl border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#4A0E17] text-[#D4AF37]">
                    {spot.type}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    {spot.neighborhood}
                  </span>
                </div>

                <h3 className="font-serif-heading text-xl font-bold text-[#4A0E17] mb-2 leading-tight">
                  {spot.name}
                </h3>

                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed mb-4">
                  {spot.ambiance}
                </p>

                {/* Signature Dishes Box */}
                <div className="space-y-1.5 mb-4 bg-white/70 p-3 rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold text-[#C82323] uppercase tracking-wider block mb-1">
                    Signature Gastronomic Delicacies:
                  </span>
                  {spot.signatureDishes.map((dish, i) => (
                    <div key={i} className="text-xs text-[#1A1A1A]/90 flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{dish}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dress Code & Reservation Protocol */}
              <div className="pt-3 border-t border-gray-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Dress Code:</span>
                  <span className="font-semibold text-[#4A0E17]">{spot.dressCode}</span>
                </div>

                <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#D4AF37]/30 text-[11px] text-[#4A0E17]">
                  <strong className="block text-[#C82323]">Reservation Liaison:</strong>
                  {spot.reservationLiaison}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
