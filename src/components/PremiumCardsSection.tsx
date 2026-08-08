import React, { useState } from 'react';
import { MapPin, CalendarPlus, Check, X } from 'lucide-react';

interface CardData {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  location?: string;
  tags?: string[];
  mapLink?: string;
  showScheduleForm?: boolean;
}

interface PremiumCardsSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  data: CardData[];
  darkBackground?: boolean;
}

export const PremiumCardsSection: React.FC<PremiumCardsSectionProps> = ({ id, title, subtitle, data, darkBackground = true }) => {
  const bgClass = darkBackground ? 'bg-[#1A1A1A]' : 'bg-[#FAF7F2]';
  const textColorClass = darkBackground ? 'text-[#FAF7F2]' : 'text-[#4A0E17]';
  const descColorClass = darkBackground ? 'text-[#FAF7F2]/80' : 'text-gray-600';
  const cardBgClass = darkBackground ? 'bg-[#4A0E17]' : 'bg-white';
  const tagBgClass = darkBackground ? 'bg-black/40 text-[#D4AF37]' : 'bg-[#FAF7F2] text-[#4A0E17] border border-[#D4AF37]/30';

  const [activeFormId, setActiveFormId] = useState<number | null>(null);
  const [scheduleDate, setScheduleDate] = useState('1');
  const [scheduleHour, setScheduleHour] = useState('10');
  const [scheduleMinute, setScheduleMinute] = useState('00');
  const [scheduleAmPm, setScheduleAmPm] = useState('AM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleScheduleSubmit = async (e: React.FormEvent, item: CardData) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/schedule/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day_id: parseInt(scheduleDate),
          time: `${scheduleHour}:${scheduleMinute} ${scheduleAmPm}`,
          event: 'Visit ' + item.title,
          location: item.location || 'Kolkata'
        })
      });
      if (res.ok) {
        alert('Successfully added to schedule!');
        setActiveFormId(null);
        window.location.reload();
      } else {
        alert('Failed to add schedule');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding schedule');
    }
    setIsSubmitting(false);
  };

  return (
    <section id={id} className={`py-20 ${bgClass} border-t border-[#D4AF37]/20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-[#C82323] uppercase mb-3">{subtitle}</h2>
          <h3 className={`text-4xl md:text-5xl font-serif font-bold ${textColorClass} leading-tight`}>{title}</h3>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${data.length === 2 ? 'max-w-4xl mx-auto' : 'lg:grid-cols-3'} gap-8`}>
          {data.map((item) => (
            <div key={item.id} className={`group rounded-2xl overflow-hidden ${cardBgClass} border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-500 shadow-xl flex flex-col`}>
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {item.location && (
                  <div className="absolute top-4 right-4 z-20 bg-black/70 backdrop-blur-md border border-[#D4AF37]/50 px-3 py-1 rounded-full text-xs font-bold text-[#D4AF37] tracking-wider">
                    {item.location}
                  </div>
                )}
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                {item.subtitle && (
                  <h4 className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase mb-2">
                    {item.subtitle}
                  </h4>
                )}
                <div className="flex items-start justify-between mb-4">
                  <h3 className={`text-2xl font-serif font-bold ${textColorClass} line-clamp-2 pr-2`}>
                    {item.mapLink ? (
                      <a href={item.mapLink} target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2">
                        {item.title} <MapPin size={18} className="text-[#D4AF37]" />
                      </a>
                    ) : (
                      item.title
                    )}
                  </h3>
                </div>
                <p className={`text-sm ${descColorClass} leading-relaxed mb-6 flex-1`}>
                  {item.description}
                </p>
                
                
                {item.tags && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${tagBgClass}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {item.showScheduleForm && (
                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/20">
                    {activeFormId === item.id ? (
                      <form onSubmit={(e) => handleScheduleSubmit(e, item)} className="space-y-3 bg-black/20 p-3 rounded-lg border border-[#D4AF37]/30">
                        <div className="flex items-center justify-between">
                          <h5 className="text-[#D4AF37] text-sm font-bold uppercase tracking-wide">Add to Schedule</h5>
                          <button type="button" onClick={() => setActiveFormId(null)} className="text-gray-400 hover:text-white"><X size={16} /></button>
                        </div>
                        <div className="flex flex-col gap-2">
                          <select 
                            value={scheduleDate} 
                            onChange={e => setScheduleDate(e.target.value)} 
                            className="w-full bg-black/40 border border-[#D4AF37]/30 text-white text-sm rounded p-2 focus:border-[#D4AF37] outline-none cursor-pointer"
                            required
                          >
                            <option value="1">5th Oct (Day 1)</option>
                            <option value="2">6th Oct (Day 2)</option>
                            <option value="3">7th Oct (Day 3)</option>
                            <option value="4">8th Oct (Day 4)</option>
                            <option value="5">9th Oct (Day 5)</option>
                          </select>
                          <div className="flex items-center gap-2">
                            <select 
                              value={scheduleHour} 
                              onChange={e => setScheduleHour(e.target.value)} 
                              className="flex-1 bg-black/40 border border-[#D4AF37]/30 text-white text-sm rounded p-2 focus:border-[#D4AF37] outline-none cursor-pointer"
                            >
                              {Array.from({length: 12}, (_, i) => i + 1).map(h => (
                                <option key={h} value={h.toString().padStart(2, '0')}>{h.toString().padStart(2, '0')}</option>
                              ))}
                            </select>
                            <span className="text-white font-bold">:</span>
                            <select 
                              value={scheduleMinute} 
                              onChange={e => setScheduleMinute(e.target.value)} 
                              className="flex-1 bg-black/40 border border-[#D4AF37]/30 text-white text-sm rounded p-2 focus:border-[#D4AF37] outline-none cursor-pointer"
                            >
                              {Array.from({length: 60}, (_, i) => i).map(m => (
                                <option key={m} value={m.toString().padStart(2, '0')}>{m.toString().padStart(2, '0')}</option>
                              ))}
                            </select>
                            <select 
                              value={scheduleAmPm} 
                              onChange={e => setScheduleAmPm(e.target.value)} 
                              className="flex-1 bg-black/40 border border-[#D4AF37]/30 text-white text-sm rounded p-2 focus:border-[#D4AF37] outline-none cursor-pointer"
                            >
                              <option value="AM">AM</option>
                              <option value="PM">PM</option>
                            </select>
                          </div>
                        </div>
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-[#D4AF37] text-[#4A0E17] font-bold text-sm py-2 rounded flex items-center justify-center gap-2 hover:bg-[#F3E5AB] transition-colors"
                        >
                          {isSubmitting ? 'Adding...' : <><Check size={16} /> Confirm</>}
                        </button>
                      </form>
                    ) : (
                      <button 
                        onClick={() => setActiveFormId(item.id)}
                        className="w-full bg-transparent border border-[#D4AF37] text-[#D4AF37] font-bold text-sm py-2 rounded flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-[#4A0E17] transition-all"
                      >
                        <CalendarPlus size={16} /> Add to Schedule
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
