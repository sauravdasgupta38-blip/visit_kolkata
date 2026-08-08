import React from 'react';
import { HISTORIC_KOLKATA } from '../data/conciergeData';
import { Landmark, BookOpen, Compass, ShieldAlert, ChevronRight } from 'lucide-react';

export const HistoricKolkata: React.FC = () => {
  return (
    <section id="history" className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C82323] tracking-wider uppercase mb-1">
              <Landmark className="w-4 h-4 text-[#C82323]" />
              Architectural & Intellectual Renaissance
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-[#4A0E17]">
              Historic Kolkata: Rajbaris & Colonial Heritage
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 mt-1">
              Explore 19th-century neoclassical mansions, Greek revival halls, and the legendary Adda literary salons.
            </p>
          </div>
        </div>

        {/* Historic Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {HISTORIC_KOLKATA.map((item) => (
            <div
              key={item.id}
              className="glass-card p-6 rounded-2xl border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#4A0E17] text-[#D4AF37]">
                    {item.era}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-500">
                    {item.location}
                  </span>
                </div>

                <h3 className="font-serif-heading text-xl font-bold text-[#4A0E17] mb-2 leading-tight">
                  {item.title}
                </h3>

                <div className="mb-3 text-xs">
                  <span className="font-bold text-[#C82323]">Architectural Style: </span>
                  <span className="text-[#1A1A1A]/80">{item.architecturalStyle}</span>
                </div>

                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed mb-4">
                  {item.historicalSignificance}
                </p>

                {/* Curator Note Box */}
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#D4AF37]/30 text-xs text-[#4A0E17] space-y-1 mb-4">
                  <div className="font-bold flex items-center gap-1.5 text-[#C82323]">
                    <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Curator Note:</span>
                  </div>
                  <p className="leading-snug text-[#1A1A1A]/80">{item.curatorNote}</p>
                </div>
              </div>

              {/* Visiting Protocol */}
              <div className="pt-3 border-t border-gray-200 text-xs">
                <span className="font-bold text-[#4A0E17] block mb-1">
                  Visiting Protocol for Our London Guests:
                </span>
                <p className="text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-200 text-[11px]">
                  {item.visitingProtocol}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
