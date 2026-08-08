import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle } from 'lucide-react';

interface Schedule {
  time: string;
  event: string;
  location: string;
  status: string;
}

interface AgendaDay {
  date: string;
  title: string;
  schedules: Schedule[];
}

export const AgendaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [agendaData, setAgendaData] = useState<AgendaDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agenda')
      .then(res => res.json())
      .then((data: AgendaDay[]) => {
        setAgendaData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch agenda:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-transparent" id="agenda">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold tracking-widest text-[#C82323] uppercase mb-2">Executive Itinerary</h2>
            <h3 className="text-4xl font-serif font-bold text-[#4A0E17]">Visit Agenda Overview</h3>
          </div>
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#D4AF37]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (agendaData.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-transparent" id="agenda">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-[#C82323] uppercase mb-2">Executive Itinerary</h2>
          <h3 className="text-4xl font-serif font-bold text-[#4A0E17]">Visit Agenda Overview</h3>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 p-1 bg-[#1A1A1A] rounded-xl border border-[#D4AF37]/30 shadow-lg">
          {agendaData.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === idx
                  ? 'bg-[#D4AF37] text-[#4A0E17] shadow-lg'
                  : 'text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/10'
              }`}
            >
              <div className="font-bold">{day.date}</div>
              <div className="text-[10px] uppercase tracking-wider opacity-80">{day.title.split(' ')[0]}</div>
            </button>
          ))}
        </div>

        {/* Agenda Content */}
        <div className="bg-white rounded-2xl border border-[#D4AF37]/30 p-6 md:p-8 shadow-xl">
          <h4 className="text-xl font-serif font-bold text-[#4A0E17] mb-6 pb-4 border-b border-gray-200">
            {agendaData[activeTab].title}
          </h4>
          
          <div className="space-y-6">
            {agendaData[activeTab].schedules.map((schedule, sIdx) => (
              <div key={sIdx} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-colors shadow-sm">
                <div className="flex items-center md:items-start md:w-32 flex-shrink-0">
                  <Clock className="w-4 h-4 text-[#C82323] mr-2 mt-0.5" />
                  <span className="text-sm font-bold text-[#4A0E17]">{schedule.time}</span>
                </div>
                
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-[#1A1A1A] mb-1">{schedule.event}</h5>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {schedule.location}
                  </div>
                </div>

                <div className="flex items-center md:items-start flex-shrink-0">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    schedule.status === 'Planned' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {schedule.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
