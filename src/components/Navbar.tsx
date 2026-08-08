import React, { useState } from 'react';
import { Menu, MessageSquare, Phone, X } from 'lucide-react';

interface NavbarProps {
  onOpenChat: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#4A0E17]/95 backdrop-blur-md border-b border-[#D4AF37]/30 text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center font-cinzel text-sm font-bold text-[#D4AF37]">
                KPC
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-serif-heading text-xl font-bold text-[#FAF7F2] tracking-wide">
                    Kolkata Puja Concierge
                  </span>
                  <span className="bg-[#D4AF37] text-[#4A0E17] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    Dignitary Facilitation
                  </span>
                </div>
                <p className="text-xs text-[#D4AF37]/90 font-light tracking-wider">
                  A Curated Experience for Distinguished Visitors • October 5–10
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#agenda" className="text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors">Visit Agenda</a>
              <a href="#durga-puja" className="text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors">Durga Puja</a>
              <a href="#shopping" className="text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors">Shopping</a>
              <a href="#heritage" className="text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors">Heritage</a>

              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[#D4AF37]/30">
                <a href="tel:+918282844650" className="flex items-center text-[#D4AF37] hover:text-[#FAF7F2] transition-colors text-xs font-bold tracking-wider uppercase">
                  <Phone className="w-4 h-4 mr-1.5" />
                  Liaison
                </a>

                <button
                  onClick={onOpenChat}
                  className="bg-[#D4AF37] text-black px-4 py-2 rounded flex items-center gap-2 hover:bg-[#F3E5AB] transition-colors text-xs font-bold uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask Tilottama
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="text-[#FAF7F2] hover:text-[#D4AF37] p-2"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-64 h-full bg-[#4A0E17] shadow-2xl border-l border-[#D4AF37]/30 flex flex-col transform transition-transform duration-300 ease-in-out">
            <div className="p-4 flex items-center justify-between border-b border-[#D4AF37]/30">
              <span className="font-serif-heading font-bold text-[#D4AF37]">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#FAF7F2] hover:text-[#D4AF37] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 flex flex-col">
              <a href="#agenda" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors font-medium">Visit Agenda</a>
              <a href="#durga-puja" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors font-medium">Durga Puja</a>
              <a href="#shopping" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors font-medium">Shopping</a>
              <a href="#heritage" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FAF7F2]/80 hover:text-[#D4AF37] transition-colors font-medium">Heritage</a>

              <div className="pt-6 mt-6 border-t border-[#D4AF37]/30 flex flex-col gap-4">
                <a href="tel:+918282844650" className="flex items-center text-[#D4AF37] hover:text-[#FAF7F2] transition-colors text-sm font-bold tracking-wider uppercase">
                  <Phone className="w-4 h-4 mr-2" />
                  Liaison
                </a>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenChat();
                  }}
                  className="bg-[#D4AF37] text-black px-4 py-3 rounded flex items-center justify-center gap-2 hover:bg-[#F3E5AB] transition-colors text-sm font-bold uppercase tracking-wider w-full"
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask Tilottama
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

