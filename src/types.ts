export type GuestProfile = 'first-time' | 'returning' | 'executive' | 'family';
export type PreferredPace = 'relaxed' | 'balanced' | 'immersive';
export type FocusInterest = 
  | 'Art & Culture' 
  | 'Heritage' 
  | 'Fine Dining' 
  | 'Luxury Shopping' 
  | 'Photography' 
  | 'Nightlife' 
  | 'Spiritual Traditions';

export interface UserPreferences {
  guestProfile: GuestProfile;
  pace: PreferredPace;
  interests: FocusInterest[];
}

export interface WeatherData {
  location: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  uvIndex: number;
  aqi: number;
  aqiStatus: string;
  condition: string;
  forecast: Array<{
    date: string;
    dayName: string;
    tempHigh: number;
    tempLow: number;
    condition: string;
    rainProb: number;
  }>;
  executiveAdvisory: string;
  isFallback?: boolean;
}

export interface TrailItem {
  id: string;
  name: string;
  zone: string;
  category: 'North Heritage' | 'South Art' | 'VIP Minimal-Walking';
  description: string;
  highlights: string[];
  seniorAccessibility: string;
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Extremely Dense';
  bestTime: string;
  unverifiedBadge: boolean;
  image?: string;
  latitude?: number;
  longitude?: number;
}

export interface ExperienceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'River Cruise' | 'Private Grounds' | 'Royal Feast' | 'Architectural Walk';
  duration: string;
  executiveRating: string;
  description: string;
  highlights: string[];
  bookingNotice: string;
  unverifiedBadge: boolean;
}

export interface HeritageItem {
  id: string;
  title: string;
  era: string;
  location: string;
  architecturalStyle: string;
  historicalSignificance: string;
  curatorNote: string;
  visitingProtocol: string;
}

export interface GiftItem {
  id: string;
  name: string;
  category: 'Silks & Textiles' | 'GI Craft' | 'Heritage Sweet' | 'Art & Collectibles';
  origin: string;
  priceRange: string;
  description: string;
  recommendedAteliers: string[];
  shippingAvailable: boolean;
}

export interface DiningSpot {
  id: string;
  name: string;
  category?: string;
  neighborhood: string;
  type: 'Bengali Haute Cuisine' | 'Heritage Jazz Bar' | 'Private Executive Club' | 'Colonial Bistro';
  signatureDishes: string[];
  ambiance: string;
  dressCode: string;
  reservationLiaison: string;
}

export interface EmergencyContact {
  institution: string;
  type: string;
  address: string;
  phone: string;
  vipConciergeNotes: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  language?: 'English' | 'Bengali';
}
