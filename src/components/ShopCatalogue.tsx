import React, { useState } from 'react';
import { SHOPPING_CATALOGUE } from '../data/conciergeData';
import { GiftItem } from '../types';
import { ShoppingBag, Truck, Check, Globe, ChevronRight, Gift } from 'lucide-react';

export const ShopCatalogue: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Silks & Textiles', 'GI Craft', 'Heritage Sweet'];

  const filteredItems = selectedCategory === 'All'
    ? SHOPPING_CATALOGUE
    : SHOPPING_CATALOGUE.filter(i => i.category === selectedCategory);

  return (
    <section id="shopping" className="py-12 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C82323] tracking-wider uppercase mb-1">
              <ShoppingBag className="w-4 h-4 text-[#C82323]" />
              Master Crafts & Heritage Keepsakes
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-[#4A0E17]">
              Shop & Gift Catalogue (Exportable)
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 mt-1">
              UNESCO Jacquard silks, 4,000-year-old lost-wax Dokra castings, and vacuum-sealed Nolen Gur delicacies.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#4A0E17] text-white font-bold shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass-card p-6 rounded-2xl border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#C82323] text-white">
                    {item.category}
                  </span>
                  {item.shippingAvailable && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <Globe className="w-3 h-3 text-emerald-600" />
                      Global Delivery Ready
                    </span>
                  )}
                </div>

                <h3 className="font-serif-heading text-xl font-bold text-[#4A0E17] mb-1 leading-tight">
                  {item.name}
                </h3>

                <div className="text-xs font-bold text-[#D4AF37] bg-[#4A0E17] px-2.5 py-1 rounded inline-block mb-3">
                  {item.priceRange}
                </div>

                <p className="text-xs text-[#1A1A1A]/80 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Ateliers List */}
                <div className="space-y-1.5 mb-4 bg-white/70 p-3 rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold text-[#4A0E17] uppercase tracking-wider block mb-1">
                    Recommended Executive Ateliers:
                  </span>
                  {item.recommendedAteliers.map((atelier, i) => (
                    <div key={i} className="text-xs text-[#1A1A1A]/90 flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{atelier}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 text-xs flex items-center justify-between text-gray-500">
                <span>Origin: <strong className="text-[#4A0E17]">{item.origin}</strong></span>
                <span className="text-[11px] font-semibold text-[#C82323]">Private Showroom Liaison Available</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
