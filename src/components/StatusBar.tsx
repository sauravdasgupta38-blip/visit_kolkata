import React, { useState, useEffect } from 'react';
import { Clock, Plane, Building2, CloudRain } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [weatherText, setWeatherText] = useState('Fetching...');
  const [weatherSubtitle, setWeatherSubtitle] = useState('Loading...');

  useEffect(() => {
    const targetDate = new Date('2026-10-05T00:00:00');
    const now = new Date();
    const diffTime = Math.abs(targetDate.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays);

    // Fetch Weather
    const fetchWeather = async () => {
      try {
        const res = await fetch('/api/weather');
        if (res.ok) {
          const data = await res.json();
          setWeatherText(`${data.temperature}°C, ${data.condition}`);
          setWeatherSubtitle(`AQI: ${data.aqi} (${data.aqiStatus})`);
        } else {
          setWeatherText('31°C, Partly Cloudy');
          setWeatherSubtitle('15% Chance of Rain');
        }
      } catch (err) {
        setWeatherText('31°C, Partly Cloudy');
        setWeatherSubtitle('15% Chance of Rain');
      }
    };

    fetchWeather();
  }, []);

  const cards = [
    {
      title: 'Visit Countdown',
      value: `${daysRemaining} Days`,
      subtitle: 'Until October 5th, 2026',
      icon: <Clock className="w-6 h-6 text-[#D4AF37]" />,
    },
    {
      title: 'Flight Status',
      value: 'Awaiting Details',
      subtitle: 'Pending Confirmation',
      icon: <Plane className="w-6 h-6 text-[#D4AF37]" />,
    },
    {
      title: 'Hotel Status',
      value: 'Awaiting Details',
      subtitle: 'Pending Confirmation',
      icon: <Building2 className="w-6 h-6 text-[#D4AF37]" />,
    },
    {
      title: 'Current Weather',
      value: weatherText,
      subtitle: weatherSubtitle,
      icon: <CloudRain className="w-6 h-6 text-[#D4AF37]" />,
    }
  ];

  return (
    <div className="relative -mt-16 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-[#4A0E17]/95 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl p-6 shadow-2xl hover:border-[#D4AF37]/80 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-wider">{card.title}</h3>
              {card.icon}
            </div>
            <div className="text-2xl font-bold text-[#FAF7F2] mb-1 truncate">{card.value}</div>
            <div className="text-xs text-[#FAF7F2]/70">{card.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

