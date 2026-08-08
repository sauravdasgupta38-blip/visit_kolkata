import React, { useState } from 'react';
import { WeatherData } from '../types';
import { CloudSun, RefreshCw, Thermometer, Droplets, Sun, Wind, CheckCircle2, Info } from 'lucide-react';

interface WeatherDashboardProps {
  weatherData: WeatherData | null;
  onRefreshWeather: () => void;
  loading: boolean;
}

export const WeatherDashboard: React.FC<WeatherDashboardProps> = ({
  weatherData,
  onRefreshWeather,
  loading
}) => {
  const [activeTab, setActiveTab] = useState<'current' | 'forecast' | 'advisory'>('current');

  if (!weatherData) {
    return (
      <div className="py-12 text-center glass-card max-w-7xl mx-auto px-4 rounded-xl">
        <div className="animate-spin w-8 h-8 border-4 border-[#C82323] border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm text-[#4A0E17] font-medium">Fetching Live Kolkata Weather & AQI Data...</p>
      </div>
    );
  }

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'text-emerald-700 bg-emerald-100 border-emerald-300';
    if (aqi <= 100) return 'text-amber-700 bg-amber-100 border-amber-300';
    if (aqi <= 150) return 'text-orange-700 bg-orange-100 border-orange-300';
    return 'text-rose-700 bg-rose-100 border-rose-300';
  };

  return (
    <section id="weather" className="py-12 bg-white/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#D4AF37]/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C82323] tracking-wider uppercase mb-1">
              <CloudSun className="w-4 h-4 text-[#C82323]" />
              Climate & Health Operations
            </div>
            <h2 className="font-serif-heading text-3xl font-bold text-[#4A0E17]">
              Live Kolkata Weather & AQI Dashboard
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 mt-1">
              Real-time atmospheric parameters and autumn climate advisory for Our London Guests in October 2026.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {weatherData.isFallback && (
              <span className="text-[11px] bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300 font-medium flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-600" />
                Historical October Benchmark
              </span>
            )}
            <button
              onClick={onRefreshWeather}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4A0E17] text-white text-xs font-semibold hover:bg-[#C82323] transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Climate</span>
            </button>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Weather Metric Box */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border-2 border-[#D4AF37]/30 shadow-lg space-y-6">
            
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold block">
                  Location Coordinates
                </span>
                <span className="font-serif-heading text-lg font-bold text-[#4A0E17]">
                  {weatherData.location}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {weatherData.condition}
                </span>
              </div>
            </div>

            {/* 4 Core Parameter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                <Thermometer className="w-5 h-5 text-[#C82323] mx-auto mb-1" />
                <div className="text-xs text-gray-500 uppercase font-semibold">Temperature</div>
                <div className="text-2xl font-bold font-serif-heading text-[#4A0E17] mt-0.5">
                  {weatherData.temperature}°C
                </div>
                <div className="text-[10px] text-gray-400 mt-1">
                  Range: {weatherData.tempMin}°C – {weatherData.tempMax}°C
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <div className="text-xs text-gray-500 uppercase font-semibold">Humidity</div>
                <div className="text-2xl font-bold font-serif-heading text-[#4A0E17] mt-0.5">
                  {weatherData.humidity}%
                </div>
                <div className="text-[10px] text-gray-400 mt-1">Moderate Autumn</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                <Sun className="w-5 h-5 text-[#E69F00] mx-auto mb-1" />
                <div className="text-xs text-gray-500 uppercase font-semibold">Max UV Index</div>
                <div className="text-2xl font-bold font-serif-heading text-[#4A0E17] mt-0.5">
                  {weatherData.uvIndex} / 10
                </div>
                <div className="text-[10px] text-gray-400 mt-1">Moderate Sunshine</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                <Wind className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <div className="text-xs text-gray-500 uppercase font-semibold">US AQI Index</div>
                <div className="text-2xl font-bold font-serif-heading text-[#4A0E17] mt-0.5">
                  {weatherData.aqi}
                </div>
                <div className={`text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded border inline-block ${getAqiColor(weatherData.aqi)}`}>
                  {weatherData.aqiStatus}
                </div>
              </div>

            </div>

            {/* 5-Day October Forecast Cards */}
            <div>
              <h4 className="text-xs font-bold text-[#4A0E17] uppercase tracking-wider mb-3">
                5-Day Forecast Window for Our London Guests
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {weatherData.forecast.map((fc, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-gray-200 text-center space-y-1">
                    <div className="text-xs font-bold text-[#4A0E17]">{fc.dayName}</div>
                    <div className="text-lg font-bold font-serif-heading text-[#C82323]">{fc.tempHigh}°C</div>
                    <div className="text-[10px] text-gray-500">{fc.condition}</div>
                    <div className="text-[10px] text-blue-600 font-medium">Rain: {fc.rainProb}%</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Climate Advisory Sidecard for Our London Guests */}
          <div className="glass-card p-6 rounded-2xl border-2 border-[#D4AF37]/30 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#D4AF37]/20">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-serif-heading text-lg font-bold text-[#4A0E17]">
                  Advisory for Our London Guests
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#1A1A1A]/80 leading-relaxed">
                <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-200">
                  <span className="font-bold text-[#4A0E17] block mb-1">
                    Optimal Daily Touring Windows:
                  </span>
                  <p>
                    Early Morning (07:00 AM – 10:30 AM) offers cool breezes (24°C–26°C) and fresh air for Kumartuli & Victoria Memorial visits. Late afternoons (04:30 PM – 07:00 PM) are best for Hooghly River cruises.
                  </p>
                </div>

                <div className="bg-blue-50/80 p-3.5 rounded-xl border border-blue-200">
                  <span className="font-bold text-[#4A0E17] block mb-1">
                    Attire & Hydration Guidelines:
                  </span>
                  <p>
                    Light linen or fine organic cotton for daytime touring. Air-conditioned private transport keeps humidity effortless. A light silk shawl or blazer is suitable for evening fine dining at Bengal Club or Park Street.
                  </p>
                </div>

                <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                  <span className="font-bold text-[#4A0E17] block mb-1">
                    Air Quality Advisory:
                  </span>
                  <p>
                    October AQI levels in Kolkata (100–125) are manageable. For guests with sensitive respiratory conditions, chauffeured vehicles are equipped with HEPA air filtration.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <span className="text-[11px] text-[#4A0E17] font-semibold italic">
                Concierge Medical & Climate Desk On-Call 24/7
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
