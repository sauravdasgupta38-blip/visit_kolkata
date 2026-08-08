import React, { useState } from 'react';
import { Calendar, Check, ArrowRight, ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';

export const StrategySelector: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<number>(1);

  const strategies = [
    {
      id: 1,
      title: 'Strategy 1: Pre-Festival Artisan & Heritage Window',
      dates: 'October 1 – 5, 2026',
      badge: 'PROPOSED WINDOW FOR OUR LONDON GUESTS',
      badgeColor: 'bg-[#D4AF37] text-[#4A0E17]',
      focus: 'Serene Crafts, Heritage Architecture, Luxury Dining & High-Society Culture',
      crowdIndex: 'Low (0% – 15% Crowd Pressure)',
      walkingLevel: 'Minimal (Direct Vehicle Access)',
      highlights: [
        'Exclusive access to Kumartuli artisan quarter as sculptors apply final clay & straw details',
        'Uncrowded early-morning curator walkthroughs at Victoria Memorial & Marble Palace',
        'Private chartered Hooghly River sunset catamaran cruises',
        'Uninterrupted fine dining reservations at 6 Ballygunge Place, Oh! Calcutta & Bengal Club'
      ],
      idealFor: 'Our London Guests, International Dignitaries, Art Connoisseurs'
    },
    {
      id: 2,
      title: 'Strategy 2: Peak Public Durga Puja Festival',
      dates: 'October 16/17 – 21, 2026',
      badge: 'PEAK FESTIVAL IMMERSION',
      badgeColor: 'bg-[#C82323] text-white',
      focus: 'Illuminated Mega Pandals, Traditional Rituals, Grand Street Celebrations',
      crowdIndex: 'Extremely High (Millions of Public Revelers)',
      walkingLevel: 'High Walking (VIP Passes Required)',
      highlights: [
        'Walk through award-winning illuminated pandals decorated with architectural grandeur',
        'Experience Maha Ashtami traditional Anjali rituals and Dhunuchi Naach dances',
        'Witness Sindoor Khela & Dashami immersion processions along the Hooghly river',
        'Requires police VIP traffic passes & chauffeured buggy coordinates'
      ],
      idealFor: 'Cultural Enthusiasts, Returning Visitors, Active Travelers Seeking High Energy'
    },
    {
      id: 3,
      title: 'Strategy 3: Dual-Phase Visit for Our London Guests',
      dates: 'Oct 1–3 (Phase I) + Oct 18–19 (Phase II)',
      badge: 'HYBRID STRATEGY',
      badgeColor: 'bg-indigo-900 text-white',
      focus: 'High-Level Business & Heritage First, Followed by 48-Hour Peak Celebration',
      crowdIndex: 'Balanced (Calm Business Days + 2 Peak Nights)',
      walkingLevel: 'Moderate (Chauffeured VIP Logistics)',
      highlights: [
        'Complete exclusive meetings, trade discussions & quiet museum tours Oct 1–3',
        'Return for a 48-hour curated weekend fly-in during peak Puja illumination',
        'Combine serene Kumartuli studio visits with peak night pandal viewing',
        'Private suite retention at JW Marriott / Taj Bengal throughout'
      ],
      idealFor: 'Our London Guests Combining Corporate Meetings with Cultural Spectacle'
    }
  ];

  return (
    <section id="strategy" className="py-12 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold text-[#C82323] tracking-widest uppercase bg-[#C82323]/10 px-3.5 py-1 rounded-full border border-[#C82323]/20 inline-block">
            Strategic Planning Options
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#4A0E17]">
            Festival Window & Strategy Selector
          </h2>
          <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">
            Choose the visit strategy that aligns with your desired pace, crowd tolerance, and schedule.
          </p>
        </div>

        {/* Strategy Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {strategies.map((strat) => {
            const isSelected = selectedStrategy === strat.id;
            return (
              <button
                key={strat.id}
                onClick={() => setSelectedStrategy(strat.id)}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#4A0E17] text-white border-[#D4AF37] shadow-xl scale-[1.02]'
                    : 'bg-white text-[#1A1A1A] border-gray-200 hover:border-[#D4AF37]/50 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider ${strat.badgeColor}`}>
                      {strat.badge}
                    </span>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#4A0E17] flex items-center justify-center font-bold">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <h3 className={`font-serif-heading text-lg font-bold mb-1 ${isSelected ? 'text-[#FAF7F2]' : 'text-[#4A0E17]'}`}>
                    {strat.title}
                  </h3>
                  <div className={`text-xs font-semibold flex items-center gap-1.5 mb-2 ${isSelected ? 'text-[#D4AF37]' : 'text-[#C82323]'}`}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{strat.dates}</span>
                  </div>
                </div>

                <div className={`text-[11px] pt-3 border-t ${isSelected ? 'border-[#D4AF37]/30 text-white/80' : 'border-gray-100 text-gray-500'}`}>
                  Crowd Index: <strong className={isSelected ? 'text-[#D4AF37]' : 'text-[#4A0E17]'}>{strat.crowdIndex}</strong>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Strategy Deep-Dive Card */}
        {(() => {
          const active = strategies.find(s => s.id === selectedStrategy)!;
          return (
            <div className="glass-card p-6 md:p-8 rounded-2xl border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-200">
                <div>
                  <span className="text-xs font-bold text-[#C82323] uppercase tracking-wider block mb-1">
                    Detailed Blueprint for Our London Guests
                  </span>
                  <h3 className="font-serif-heading text-2xl font-bold text-[#4A0E17]">
                    {active.title} ({active.dates})
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/80 mt-1">
                    Primary Focus: <strong className="text-[#C82323]">{active.focus}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
                    <span className="text-gray-500 block text-[10px] uppercase">Crowd Level</span>
                    <span className="text-[#4A0E17] font-bold">{active.crowdIndex}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-gray-200 text-center">
                    <span className="text-gray-500 block text-[10px] uppercase">Walking Demand</span>
                    <span className="text-[#4A0E17] font-bold">{active.walkingLevel}</span>
                  </div>
                </div>
              </div>

              <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    Key Strategy Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {active.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#1A1A1A]/90">
                        <Check className="w-4 h-4 text-[#C82323] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/80 p-5 rounded-xl border border-gray-200 space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider mb-1">
                      Ideal Target Guest Profile
                    </h5>
                    <p className="text-xs text-[#1A1A1A]/80 leading-relaxed">
                      {active.idealFor}
                    </p>
                  </div>

                  {active.id === 1 && (
                    <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#D4AF37]/40 text-[11px] text-[#4A0E17]">
                      <strong className="text-[#C82323] block mb-0.5">Concierge Recommendation:</strong>
                      Strategy 1 (Oct 1–5) is strongly advised for Our London Guests visiting Kolkata for the first time or seeking zero stress, instant luxury reservations, and deep cultural appreciation.
                    </div>
                  )}

                  {active.id === 2 && (
                    <div className="bg-rose-50 p-3 rounded-lg border border-rose-200 text-[11px] text-rose-900">
                      <strong className="text-rose-700 block mb-0.5">Logistical Requirement:</strong>
                      Strategy 2 requires police VIP traffic passes, dedicated local guides, and willingness to navigate high-density pedestrian streets.
                    </div>
                  )}
                </div>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
};
