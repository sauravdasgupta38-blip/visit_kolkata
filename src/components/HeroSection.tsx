import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full min-h-[550px] md:min-h-[600px] h-[85vh] md:h-[80vh] flex flex-col justify-end pb-16 md:pb-0 md:justify-center items-center overflow-hidden bg-[#1A1A1A]">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-[length:100%_auto] md:bg-cover bg-top md:bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/hero_cinematic.png")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A1A1A] md:from-[#1A1A1A]/60 md:via-[#4A0E17]/20 md:to-[#1A1A1A]/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 mt-0 md:mt-20">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-[#D4AF37] uppercase border border-[#D4AF37]/50 rounded-full bg-[#1A1A1A]/50 backdrop-blur-sm">
          October 5th – 10th, 2026
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#FAF7F2] font-serif tracking-tight leading-tight mb-6 drop-shadow-2xl">
          Kolkata Rolls Out  <br />
          <span className="text-[#D4AF37]">The Red Carpet For London</span>
        </h1>
        <p className="text-lg md:text-xl text-[#FAF7F2] font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          Your single-stop destination for schedules, from flight status to meeting timings.
          Beyond the boardroom, discover a curated guide to Durga Puja, live weather, premium shopping,
          heritage landmarks, and exquisite nightlife.
        </p>
      </div>
    </div>
  );
};
