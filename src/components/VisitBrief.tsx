import React, { useState } from 'react';
import { UserPreferences, WeatherData } from '../types';
import { FileText, Printer, Copy, Check, Calendar, ShieldCheck, Download, Sparkles } from 'lucide-react';

interface VisitBriefProps {
  preferences: UserPreferences;
  weatherData: WeatherData | null;
}

export const VisitBrief: React.FC<VisitBriefProps> = ({ preferences, weatherData }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const briefText = `
===================================================================
KOLKATA PUJA CONCIERGE 2026 - VISIT BRIEF FOR OUR LONDON GUESTS
Target Visit Window: 1 - 5 October 2026 (Pre-Festival Cultural Window)
===================================================================

GUEST CONFIGURATION:
- Profile: ${preferences.guestProfile.toUpperCase()}
- Preferred Pace: ${preferences.pace.toUpperCase()}
- Focus Interests: ${preferences.interests.join(', ') || 'Art, Heritage & Fine Dining'}

ATMOSPHERIC BENCHMARK:
- Climate: ${weatherData ? `${weatherData.temperature}°C, ${weatherData.condition}` : '29°C Pleasant Autumn'}
- Air Quality: ${weatherData ? `US AQI ${weatherData.aqi} (${weatherData.aqiStatus})` : 'US AQI 115 (Moderate)'}

5-DAY BLUEPRINT FOR OUR LONDON GUESTS (OCT 1-5, 2026):
Day 1 (Thu, Oct 1): Chauffeured hotel arrival transfer. 04:00 PM Hooghly River Sunset Catamaran Cruise. Welcome dinner at Trincas Jazz Bar, Park Street.
Day 2 (Fri, Oct 2): 08:00 AM Kumartuli Artisan Quarter walkthrough (clay sculptors finishing unpainted idols). Lunch at 6 Ballygunge Place. Marble Palace private collection visit.
Day 3 (Sat, Oct 3): 07:30 AM Victoria Memorial gardens curator walk. Private shopping appointments at Weavers Studio & Biswa Bangla. Sovabazar Rajbari 12-course feast.
Day 4 (Sun, Oct 4): 09:00 AM South Kolkata art installation previews (Suruchi Sangha, Chetla Agrani). College Street Adda experience at Indian Coffee House. Fine dining at Oh! Calcutta.
Day 5 (Mon, Oct 5): Morning Nolen Gur sweet tasting at Balaram Mullick. Vacuum-sealed package suite delivery. Airport VIP transfer.

EMERGENCY LIAISON:
- Apollo Gleneagles VIP Desk: +91 33 2320 3040
- AMRI Dhakuria Royal Wing: +91 33 2461 2626
- Tourist Police & Special Desk: 112 / +91 33 2214 5000

===================================================================
Confidential Brief for Our London Guests • Kolkata Puja Concierge 2026
===================================================================
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(briefText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="brief" className="py-12 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/30 pb-4 no-print">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C82323] tracking-wider uppercase mb-1">
              <FileText className="w-4 h-4 text-[#C82323]" />
              Exportable Summary for Our London Guests
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-[#4A0E17]">
              Dynamic Visit Brief & Exportable Itinerary
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 mt-1">
              Formatted document assembling your guest profile, pace, daily schedule, and emergency contacts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-300 text-[#4A0E17] text-xs font-semibold hover:border-[#D4AF37] shadow-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#D4AF37]" />}
              <span>{copied ? 'Copied Brief!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl vermilion-gradient text-white text-xs font-semibold hover:brightness-110 shadow-md gold-border transition-all"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>Print / Export PDF Brief</span>
            </button>
          </div>
        </div>

        {/* Printable Brief for Our London Guests Container */}
        <div className="bg-white p-8 rounded-2xl border-2 border-[#D4AF37] shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-[#4A0E17] gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xl font-bold text-[#C82323]">KOLKATA PUJA CONCIERGE</span>
                <span className="bg-[#D4AF37] text-[#4A0E17] text-xs font-black px-2 py-0.5 rounded">2026</span>
              </div>
              <h3 className="font-serif-heading text-2xl font-extrabold text-[#4A0E17] mt-1">
                Visit Brief for Our London Guests & Cultural Itinerary
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Target Visit Window: <strong>1 – 5 October 2026</strong> (Pre-Festival Cultural Window)
              </p>
            </div>

            <div className="text-right text-xs space-y-1 bg-[#FAF7F2] p-3 rounded-xl border border-[#D4AF37]/30">
              <div>Status: <strong className="text-emerald-700">CONFIRMED BLUEPRINT</strong></div>
              <div>Generated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
              <div>Security: <strong>Confidential for Our London Guests</strong></div>
            </div>
          </div>

          {/* Config Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FAF7F2] p-4 rounded-xl border border-gray-200 text-xs">
            <div>
              <span className="text-gray-500 block uppercase font-bold text-[10px]">Guest Profile</span>
              <span className="font-serif-heading text-base font-bold text-[#4A0E17] capitalize">
                {preferences.guestProfile}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block uppercase font-bold text-[10px]">Preferred Pace</span>
              <span className="font-serif-heading text-base font-bold text-[#C82323] capitalize">
                {preferences.pace}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block uppercase font-bold text-[10px]">Focus Interests</span>
              <span className="font-medium text-[#1A1A1A]">
                {preferences.interests.join(', ') || 'Art, Heritage & Dining'}
              </span>
            </div>
          </div>

          {/* Detailed 5-Day Schedule */}
          <div>
            <h4 className="font-serif-heading text-lg font-bold text-[#4A0E17] mb-4 pb-1 border-b border-gray-200">
              Curated 5-Day Cultural Itinerary (1–5 October 2026)
            </h4>

            <div className="space-y-4 text-xs">
              
              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1">
                <div className="font-bold text-[#C82323] text-sm">Day 1: Thursday, Oct 1, 2026 — Arrival & Riverfront Serenity</div>
                <p className="text-[#1A1A1A]/90">
                  • <strong>Morning:</strong> Chauffeured arrival transfer to JW Marriott / Taj Bengal. Private rest & orientation.<br />
                  • <strong>Afternoon:</strong> 04:00 PM Hooghly River Sunset Catamaran Cruise with live Baul folk music & Darjeeling tea.<br />
                  • <strong>Evening:</strong> Welcome dinner at Trincas Heritage Jazz Bar, Park Street.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1">
                <div className="font-bold text-[#C82323] text-sm">Day 2: Friday, Oct 2, 2026 — Kumartuli Artisan Quarter & Heritage Art</div>
                <p className="text-[#1A1A1A]/90">
                  • <strong>Morning:</strong> 08:00 AM Golf cart walkthrough in Kumartuli. Observe master sculptors finishing clay & straw idols.<br />
                  • <strong>Afternoon:</strong> Curated Bengali lunch at 6 Ballygunge Place. Visit Marble Palace Neoclassical mansion.<br />
                  • <strong>Evening:</strong> Private tea reception at Bengal Club or Oberoi Grand lounge.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1">
                <div className="font-bold text-[#C82323] text-sm">Day 3: Saturday, Oct 3, 2026 — Victoria Memorial Gardens & Royal Silk Ateliers</div>
                <p className="text-[#1A1A1A]/90">
                  • <strong>Morning:</strong> 07:30 AM Curator walk through Victoria Memorial manicured gardens & portrait gallery.<br />
                  • <strong>Afternoon:</strong> Private appointments at Weavers Studio (Jamdani silks) & Biswa Bangla Flagship.<br />
                  • <strong>Evening:</strong> 12-course Zamindari feast at Sovabazar Rajbari / The Rajbari Bawali.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1">
                <div className="font-bold text-[#C82323] text-sm">Day 4: Sunday, Oct 4, 2026 — South Kolkata Art Previews & Literary Salons</div>
                <p className="text-[#1A1A1A]/90">
                  • <strong>Morning:</strong> Early morning preview of South Kolkata art installations (Suruchi Sangha, Chetla Agrani).<br />
                  • <strong>Afternoon:</strong> Literary Adda experience at College Street & Indian Coffee House mezzanine.<br />
                  • <strong>Evening:</strong> Fine dining at Oh! Calcutta with seasonal Ilish Bhapa & Daab Chingri.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 bg-white space-y-1">
                <div className="font-bold text-[#C82323] text-sm">Day 5: Monday, Oct 5, 2026 — Sweet Souvenirs & Airport Farewell</div>
                <p className="text-[#1A1A1A]/90">
                  • <strong>Morning:</strong> Nolen Gur sweet tasting at Balaram Mullick Bhowanipore.<br />
                  • <strong>Afternoon:</strong> Vacuum-sealed confectionery package suite delivery. Airport VIP chauffeured departure.
                </p>
              </div>

            </div>
          </div>

          {/* Footer Liaison Note */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-2">
            <div>
              Provided by <strong>Kolkata Puja Concierge 2026 Liaison Office</strong>
            </div>
            <div>
              Helpline: <strong>+91 33 2214 5000</strong> • 24/7 Desk for Our London Guests
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
