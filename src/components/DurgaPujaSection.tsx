import React from 'react';

export const DurgaPujaSection: React.FC = () => {
  return (
    <section id="durga-puja" className="py-24 bg-[#2C0810] border-y border-[#D4AF37]/30 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9B111E] rounded-full blur-[150px] opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[150px] opacity-15"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#D4AF37] uppercase mb-6 flex items-center gap-4">
            <span className="w-12 h-px bg-[#D4AF37]/50"></span>
            The Cultural Spectacle
            <span className="w-12 h-px bg-[#D4AF37]/50"></span>
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif font-normal text-[#FAF7F2] leading-tight mb-8 drop-shadow-2xl">
            Durga Puja <br />
            <span className="gold-gradient-text font-medium italic">The Heart of Bengal</span>
          </h3>
          <p className="text-lg md:text-2xl text-[#FAF7F2]/80 font-light leading-relaxed max-w-3xl mx-auto">
            The grandest festival for Bengalis worldwide. Every autumn, Kolkata transforms into a breathtaking open-air gallery—a vibrant carnival of devotion, colossal art installations, and radiant lights.
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:gap-16 items-center w-full">
          
          {/* Main Image - Pandal (Panorama) */}
          <div className="w-full group relative rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/20">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
            <img 
              src="/pandal_celebration.png" 
              alt="Lavish Durga Puja Pandal" 
              className="w-full h-[300px] md:h-[500px] lg:h-[650px] object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <span className="bg-black/60 backdrop-blur-md text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/30">
                Rajbari Heritage
              </span>
            </div>
          </div>

          {/* Secondary Section: Idol & Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            <div className="space-y-6 order-2 md:order-1 pr-0 md:pr-8">
              <h4 className="text-3xl md:text-4xl font-serif font-bold text-[#FAF7F2] border-l-4 border-[#D4AF37] pl-5 leading-snug">
                A City Reborn in Gold
              </h4>
              <p className="text-[#FAF7F2]/70 leading-relaxed font-light text-lg md:text-xl">
                Millions wander the illuminated streets, marveling at towering, meticulously crafted <em>Pandals</em> and the awe-inspiring idols of Goddess Durga. The ancestral Rajbaris open their doors, revealing a seamless, magical blend of deep spiritual reverence, heritage architecture, and vibrant haute couture.
              </p>
            </div>
            
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl border border-[#D4AF37]/20 order-1 md:order-2">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img 
                src="/durga_idol.png" 
                alt="Goddess Durga Idol" 
                className="w-full h-[300px] md:h-[450px] object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-in-out"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <span className="bg-black/60 backdrop-blur-md text-[#D4AF37] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-[#D4AF37]/30">
                  Divine Elegance
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
