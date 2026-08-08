import React, { useState } from 'react';
import { CITY_EXPERIENCES } from '../data/conciergeData';
import { ExperienceItem } from '../types';
import { Anchor, Clock, Star, Calendar, CheckCircle, ChevronRight, X, PhoneCall } from 'lucide-react';

export const CityExperiences: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setSelectedExp(null);
    }, 2500);
  };

  return (
    <section id="experiences" className="py-12 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C82323] tracking-wider uppercase mb-1">
              <Anchor className="w-4 h-4 text-[#C82323]" />
              Bespoke Cultural Immersions
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-[#4A0E17]">
              City Experiences & Heritage Kolkata
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 mt-1">
              Private riverfront charters, early morning curator walks, and aristocratic royal feasts.
            </p>
          </div>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CITY_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="glass-card p-6 rounded-2xl border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#C82323] text-white">
                    {exp.category}
                  </span>
                  <span className="text-xs font-bold text-[#D4AF37] bg-[#4A0E17] px-2.5 py-0.5 rounded">
                    {exp.executiveRating}
                  </span>
                </div>

                <h3 className="font-serif-heading text-xl font-bold text-[#4A0E17] mb-1 leading-tight">
                  {exp.title}
                </h3>
                
                <p className="text-xs font-semibold text-[#C82323] mb-3">
                  {exp.subtitle}
                </p>

                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-4 bg-white/70 p-3 rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold text-[#4A0E17] uppercase tracking-wider block mb-1">
                    Signature Inclusions:
                  </span>
                  {exp.highlights.map((h, idx) => (
                    <div key={idx} className="text-xs text-[#1A1A1A]/90 flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

              </div>

              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    Duration:
                  </span>
                  <span className="font-semibold text-[#4A0E17]">{exp.duration}</span>
                </div>

                <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 italic">
                  Note: {exp.bookingNotice}
                </div>

                <button
                  onClick={() => setSelectedExp(exp)}
                  className="w-full py-2.5 rounded-xl vermilion-gradient text-white text-xs font-semibold hover:brightness-110 transition-all gold-border shadow-sm flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>Reserve via Concierge Liaison</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Reservation Inquiry Modal */}
      {selectedExp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] rounded-2xl border-2 border-[#D4AF37] shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedExp(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:text-black hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            {inquirySuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif-heading text-xl font-bold text-[#4A0E17]">
                  Reservation Request Dispatched
                </h4>
                <p className="text-xs text-gray-600">
                  Your VIP Concierge Liaison has received your request for <strong>{selectedExp.title}</strong> and will confirm your credentials shortly.
                </p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] font-bold text-[#C82323] uppercase tracking-wider block mb-1">
                  Concierge Booking Desk
                </span>
                <h3 className="font-serif-heading text-xl font-bold text-[#4A0E17] mb-2">
                  {selectedExp.title}
                </h3>
                <p className="text-xs text-gray-600 mb-4">
                  Please provide your guest details for priority scheduling during October 1–5, 2026.
                </p>

                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#4A0E17] uppercase block mb-1">
                      Guest Name & Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amb. Richard Vance"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#4A0E17] uppercase block mb-1">
                      Preferred Date (October 1–5, 2026)
                    </label>
                    <input
                      type="date"
                      defaultValue="2026-10-02"
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#4A0E17] uppercase block mb-1">
                      Special Requirements / Dietary Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Chauffeured golf cart required at jetty; vegetarian feast preferred."
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl vermilion-gradient text-white text-xs font-semibold hover:brightness-110 transition-all gold-border shadow-md"
                  >
                    Submit Priority Concierge Request
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
