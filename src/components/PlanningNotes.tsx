import React from 'react';
import { EMERGENCY_CONTACTS } from '../data/conciergeData';
import { ShieldAlert, PhoneCall, Building2, MapPin, CheckCircle, HelpCircle } from 'lucide-react';

export const PlanningNotes: React.FC = () => {
  return (
    <section id="notes" className="py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C82323] tracking-wider uppercase mb-1">
              <ShieldAlert className="w-4 h-4 text-[#C82323]" />
              Health, Safety & Concierge Desk
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-[#4A0E17]">
              Planning Notes & Emergency Contacts
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 mt-1">
              Top Kolkata private tertiary hospitals, VIP liaison desks, escort helplines, and almanac references.
            </p>
          </div>
        </div>

        {/* Medical & Emergency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {EMERGENCY_CONTACTS.map((contact, idx) => (
            <div
              key={idx}
              className="glass-card p-5 rounded-2xl border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-lg bg-[#4A0E17] text-[#D4AF37] w-fit mb-3">
                  <Building2 className="w-5 h-5" />
                </div>

                <h3 className="font-serif-heading text-lg font-bold text-[#4A0E17] mb-1 leading-snug">
                  {contact.institution}
                </h3>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C82323] block mb-2">
                  {contact.type}
                </span>

                <div className="text-xs text-gray-600 mb-3 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 space-y-2 text-xs">
                <div className="font-bold text-[#4A0E17] flex items-center gap-1.5 bg-rose-50 p-2 rounded text-rose-900 border border-rose-200">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-700" />
                  <span>{contact.phone}</span>
                </div>

                <p className="text-[11px] text-gray-500 italic">
                  {contact.vipConciergeNotes}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Packing & Essential Guidelines for Our London Guests */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border-2 border-[#D4AF37] shadow-xl">
          <h3 className="font-serif-heading text-xl font-bold text-[#4A0E17] mb-4 pb-2 border-b border-gray-200">
            Essential Guidelines for Our London Guests & Almanac Reference (2026)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#1A1A1A]/80">
            
            <div className="space-y-2">
              <span className="font-bold text-[#C82323] uppercase tracking-wider block">
                1. Currency & Payments
              </span>
              <p className="leading-relaxed">
                Major hotels, fine dining establishments, and silk ateliers accept international credit cards (Visa, MasterCard, Amex). However, having ₹10,000 – ₹20,000 INR in fresh banknotes is useful for small artisanal donations and traditional craftsman tips.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-[#C82323] uppercase tracking-wider block">
                2. Cultural Etiquette & Photography
              </span>
              <p className="leading-relaxed">
                When entering traditional Rajbari courtyards or active pandal sanctuaries, footwear removal is customary. Photography of clay idol sculpting in Kumartuli is welcomed by master artisans, though polite consent is always appreciated.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-[#C82323] uppercase tracking-wider block">
                3. Almanac Reference (Sharad Ritu 1433 Bangabda)
              </span>
              <p className="leading-relaxed">
                According to the traditional Bengali almanac (Panjika), October 2026 marks the arrival of Sharad Ritu (Autumn). The air is fragrant with blooming Kash flowers and Night-flowering Jasmine (Shiuli), signaling Goddess Durga's descent.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
