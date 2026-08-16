import React, { useState, useEffect } from 'react';
import { UserPreferences, WeatherData } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatusBar } from './components/StatusBar';
import { AgendaSection } from './components/AgendaSection';
import { PremiumCardsSection } from './components/PremiumCardsSection';
import { DurgaPujaSection } from './components/DurgaPujaSection';
import { ChatWidget } from './components/ChatWidget';
import { SHOPPING_GUIDE, HERITAGE_PLACES, NIGHTLIFE_PLACES } from './data/royalData';

export default function App() {
  const [user, setUser] = useState<'A' | 'B' | 'Admin' | null>(() => {
    return (localStorage.getItem('kpc_user') as 'A' | 'B' | 'Admin' | null) || null;
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [chatOpen, setChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [agendaRefreshKey, setAgendaRefreshKey] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'UserA' && password === 'UserA@Password') { setUser('A'); localStorage.setItem('kpc_user', 'A'); }
    else if (username === 'UserB' && password === 'UserB@Password') { setUser('B'); localStorage.setItem('kpc_user', 'B'); }
    else if (username === 'UserAdmin' && password === 'UserAdmin@Password') { setUser('Admin'); localStorage.setItem('kpc_user', 'Admin'); }
    else setError('Invalid credentials');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('kpc_user');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl border border-[#D4AF37] max-w-sm w-full">
          <h2 className="text-2xl font-serif text-[#4A0E17] font-bold mb-6 text-center">Executive Login</h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-1">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded p-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#1A1A1A] mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded p-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]" required />
            </div>
            <button type="submit" className="w-full bg-[#4A0E17] text-white p-2 rounded font-bold hover:bg-[#8A1515] transition-colors">Login</button>
          </div>
        </form>
      </div>
    );
  }

  const chatUser = user === 'Admin' ? 'A' : user;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1A1A1A] flex flex-col font-sans">

      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenChat={() => setChatOpen(true)}
        activeSection={activeSection}
        onLogout={handleLogout}
      />

      <main className="flex-1">

        {/* Hero Section */}
        <HeroSection />

        {/* Status Bar */}
        <StatusBar />

        {/* Agenda Section */}
        {user === 'Admin' ? (
          <>
            <AgendaSection key={agendaRefreshKey + '-a'} user="A" />
            <AgendaSection key={agendaRefreshKey + '-b'} user="B" />
          </>
        ) : (
          <AgendaSection key={agendaRefreshKey} user={user} />
        )}

        {/* Durga Puja 2026 */}
        <DurgaPujaSection />

        {/* Shopping Guide */}
        <PremiumCardsSection
          id="shopping"
          title="Premium Shopping Guide"
          subtitle="Curated Ateliers & Boutiques"
          data={SHOPPING_GUIDE}
          darkBackground={false}
          user={chatUser}
        />

        {/* Heritage Kolkata */}
        <PremiumCardsSection
          id="heritage"
          title="Historic Landmarks"
          subtitle="Colonial Grandeur"
          data={HERITAGE_PLACES}
          darkBackground={true}
          user={chatUser}
        />

        {/* Nightlife & Fine Dining */}
        <PremiumCardsSection
          title="Nightlife & Fine Dining"
          subtitle="Gastronomy & Jazz"
          data={NIGHTLIFE_PLACES}
          darkBackground={false}
          user={chatUser}
        />

      </main>

      {/* Floating Embedded AI Concierge Chatbot Widget */}
      <ChatWidget
        isOpen={chatOpen}
        onClose={() => setChatOpen(!chatOpen)}
        onScheduleChanged={() => setAgendaRefreshKey(k => k + 1)}
        user={chatUser}
      />

      {/* Footer */}
      <footer className="bg-[#4A0E17] text-[#FAF7F2] border-t-2 border-[#D4AF37] pt-12 pb-8 mt-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#D4AF37]/30">

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center font-cinzel text-xs font-bold text-[#D4AF37]">
                  KPC
                </div>
                <span className="font-serif-heading text-lg font-bold text-[#FAF7F2]">Kolkata Puja Concierge</span>
                <span className="bg-[#D4AF37] text-[#4A0E17] text-[10px] font-bold px-1.5 py-0.5 rounded">2026</span>
              </div>
              <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                From city of Joy to Thames shore, Kolkata welcomes hearts galore.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-[#D4AF37] font-bold uppercase tracking-wider block">
                Executive Visit Notice
              </span>
              <p className="text-[#FAF7F2]/80 leading-relaxed">
                Proposed Visit Window: <strong>5 – 10 October 2026</strong>.<br />
                Experience the grandeur of Kolkata during its most vibrant and culturally rich festival.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-[#D4AF37] font-bold uppercase tracking-wider block">
                24/7 Diplomatic Liaison
              </span>
              <p className="text-[#FAF7F2]/80 leading-relaxed">
                Emergency Medical Desk: +91 08062972764 (Apollo)<br />
                Kolkata Tourist Police Helpline: (91-33) 22505000
              </p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/60 gap-4">
            <div>
              © 2026 Kolkata Puja Concierge • Curated for Our London Guests
            </div>
            <div className="flex items-center gap-4">
              <span>Shubho Sharadiya 2026</span>
              <span>•</span>
              <span>All Rights Reserved</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
