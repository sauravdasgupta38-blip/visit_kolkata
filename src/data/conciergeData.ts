import { 
  TrailItem, 
  ExperienceItem, 
  HeritageItem, 
  GiftItem, 
  DiningSpot, 
  EmergencyContact 
} from '../types';

export const PANDAL_TRAILS: TrailItem[] = [
  {
    id: 'trail-1',
    name: 'Kumartuli Artisan Quarter & Heritage North Trail',
    zone: 'North Kolkata',
    category: 'North Heritage',
    description: 'Immerse in 300 years of clay idol craftsmanship before the idols depart for pandals. Walk through narrow alleys lined with straw, terracotta, and unpainted idols brought to life by master artisans (mritshilpis).',
    highlights: [
      'Private walkthrough in master sculptor Ramesh Pal & China Pal workshops',
      'Chokhu Daan (ritual painting of Goddess Durga’s third eye) preview',
      'Sovabazar Rajbari 230-year-old traditional family Puja courtyard',
      'Bagbazar Sarbojanin traditional ekchala pratima installation'
    ],
    seniorAccessibility: 'Moderate. Chauffeured golf cart arrangement available within Kumartuli lane entry points.',
    crowdLevel: 'Low',
    bestTime: '07:30 AM – 10:30 AM (Morning light & quiet artisan sessions)',
    unverifiedBadge: true
  },
  {
    id: 'trail-2',
    name: 'South Kolkata Contemporary Art & Illumination Trail',
    zone: 'South Kolkata',
    category: 'South Art',
    description: 'South Kolkata is celebrated for hyper-creative theme pandals blending installation art, eco-architecture, and classical Indian music scores. Features visionary installations designed by award-winning fine artists.',
    highlights: [
      'Suruchi Sangha – State cultural theme installation featuring handloom & rural folk art',
      'Chetla Agrani – Architectural marvel featuring traditional metalcraft and bronze works',
      'Tridhara Sammilani & Mudiali Club – Classical lighting displays from Chandannagar electrical masters',
      'Ballygunge Cultural Association – High-contrast traditional fine art aesthetics'
    ],
    seniorAccessibility: 'High with VIP Pass. Reserved vehicle drop-offs within 50 meters of main entrance.',
    crowdLevel: 'Moderate',
    bestTime: '06:00 PM – 08:30 PM (Early evening before peak crowds)',
    unverifiedBadge: true
  },
  {
    id: 'trail-3',
    name: 'VIP Executive Minimal-Walking & Private Access Trail',
    zone: 'Central & South Heritage',
    category: 'VIP Minimal-Walking',
    description: 'Tailored specifically for Our London Guests, dignitaries, and families desiring zero crowd pressure. Direct vehicle transfers, air-conditioned hospitality lounges, and expedited VIP access passes.',
    highlights: [
      'Private air-conditioned SUV transfer with dedicated cultural historian guide',
      'Exclusive morning access to College Square & Santosh Mitra Square before public opening',
      'Chauffeured golf cart escorts inside long barrier walkways',
      'Private tea & refreshments lounge at Bengal Club / Taj Bengal stops'
    ],
    seniorAccessibility: 'Maximum Comfort. Wheelchair-friendly buggies and zero stair-climbing options.',
    crowdLevel: 'Low',
    bestTime: '08:00 AM – 11:30 AM or 04:30 PM – 07:00 PM',
    unverifiedBadge: true
  }
];

export const CITY_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Private Hooghly River Heritage Sunset Cruise',
    subtitle: 'Luxury Catamaran Sail along Kolkata’s Historical Riverfront',
    category: 'River Cruise',
    duration: '3.5 Hours (04:00 PM – 07:30 PM)',
    executiveRating: '5.0 ★ (Ultra-Exclusive)',
    description: 'Chartered luxury vessel cruising past Howrah Bridge, Prinsep Ghat, Millenium Park, and illuminated ghats. Accompanied by live Baul folk musicians, executive Bengali afternoon tea, and champagne service.',
    highlights: [
      'Unobstructed sunset views of the iconic Howrah Bridge and Vidyasagar Setu',
      'Live classical Sitar and traditional Baul vocal performances on deck',
      'Artisanal tea tasting curated with Darjeeling First Flush & Nolen Gur delicacies',
      'Chauffeured land connection to Prinsep Ghat private jetty'
    ],
    bookingNotice: 'Requires 48-hour advance reservation via Concierge Liaison Desk.',
    unverifiedBadge: false
  },
  {
    id: 'exp-2',
    title: 'Victoria Memorial Private Gardens & Marble Gallery',
    subtitle: 'Exclusive Early Morning Curator Walk & Botanical Tour',
    category: 'Private Grounds',
    duration: '2 Hours (07:00 AM – 09:00 AM)',
    executiveRating: '4.9 ★ (Heritage Preferred)',
    description: 'Walk through 64 acres of manicured gardens surrounding the magnificent Indo-Saracenic white Makrana marble monument before general public gates open. Includes access to royal portraits and Queen Victoria collection galleries.',
    highlights: [
      'Private entry before public visiting hours under personal curator escort',
      'Exclusive viewing of Thomas and William Daniell 18th-century landscape oil paintings',
      'Fresh morning breeze across Lord Curzon’s historical reflecting pools',
      'Private breakfast hamper served under royal banyan canopy'
    ],
    bookingNotice: 'Special diplomatic/executive clearance arranged by concierge.',
    unverifiedBadge: true
  },
  {
    id: 'exp-3',
    title: 'Grand Rajbari Feast & Zamindari Royal Dining',
    subtitle: 'Culinary Journey through 19th Century Aristocratic Bengal',
    category: 'Royal Feast',
    duration: '2.5 Hours (12:30 PM or 07:30 PM)',
    executiveRating: '5.0 ★ (Gourmet Heritage)',
    description: 'Experience a 12-course traditional Rajbari Thali served on silver brassware at The Rajbari Bawali or Sovabazar Rajbari. Features authentic lost recipes of Bengali royalty, such as Ilish Bhapa, Chingri Malaikari, and Kosha Mangsho.',
    highlights: [
      'Traditional Shehnai & Sitar welcoming melody upon courtyard entrance',
      '12-course authentic feast prepared by hereditary royal khansamas',
      'Interactions with 8th generation family descendants detailing palace history',
      'Chandi Mandap courtyard lighting ceremony with brass lamps (sandhya aarti)'
    ],
    bookingNotice: 'Strictly limited to 16 guests per session.',
    unverifiedBadge: false
  }
];

export const HISTORIC_KOLKATA: HeritageItem[] = [
  {
    id: 'hist-1',
    title: 'Marble Palace Mansion & Private Art Gallery',
    era: '1835 AD (Built by Raja Rajendra Mullick)',
    location: 'Muktaram Babu Street, Chorbagan, North Kolkata',
    architecturalStyle: 'Neoclassical & Traditional Bengali Courtyard Fusion',
    historicalSignificance: 'Houses one of Asia’s finest private art collections, including original oil paintings by Sir Joshua Reynolds, Peter Paul Rubens, and Bartolomé Esteban Murillo.',
    curatorNote: 'Marvel at 90 varieties of Italian marble floorings, antique Victorian chandeliers, Chinese porcelain vases, and Victorian garden sculptures.',
    visitingProtocol: 'Special written permit required from West Bengal Tourism Information Bureau (handled seamlessly by Concierge).'
  },
  {
    id: 'hist-2',
    title: 'Metcalfe Hall & Colonial Financial Corridor',
    era: '1840–1844 AD (Modeled on the Temple of his Winds, Athens)',
    location: 'Strand Road & Dalhousie Square (BBD Bagh)',
    architecturalStyle: 'Greek Revival Neoclassical with Corinthian Columns',
    historicalSignificance: 'Originally housed the Calcutta Public Library (where Lord Curzon founded the Imperial Library). Stood as the intellectual heart of British India.',
    curatorNote: 'Exhibits titled "Kolkata: Reflection of a City" showcase 200 years of Bengal renaissance literature, printing presses, and maritime trade maps.',
    visitingProtocol: 'Open 10:00 AM – 05:00 PM. Highly recommended for afternoon architecture photography.'
  },
  {
    id: 'hist-3',
    title: 'College Street & Literary Adda Culture',
    era: 'Established 1817 AD (Boi Para – World’s Largest Secondhand Book Market)',
    location: 'College Street, Central Kolkata',
    architecturalStyle: 'Heritage Academic Arcade & Colonial Vernacular',
    historicalSignificance: 'Nerve center of the Bengal Renaissance. Surrounds Presidency University, Calcutta University, and Sanskrit College where Rabindranath Tagore, Swami Vivekananda, and Satyajit Ray debated.',
    curatorNote: 'Enjoy coffee at the iconic Indian Coffee House (est. 1942), sitting under high ceilings where Nobel laureates and filmmakers conducted legendary "Adda" debates.',
    visitingProtocol: 'chauffeur drop-off for our London guests directly outside Coffee House with reserved mezzanine seating.'
  }
];

export const SHOPPING_CATALOGUE: GiftItem[] = [
  {
    id: 'gift-1',
    name: 'Handloom Dhakai Jamdani & Baluchari Silks',
    category: 'Silks & Textiles',
    origin: 'Phulia, Santipur & Bishnupur Weavers Guilds',
    priceRange: '₹25,000 – ₹2,500,000 ($300 – $3,000 USD)',
    description: 'Masterpiece UNESCO-recognized Jacquard and tapestry weave silks depicting mythological Mahabharata scenes woven with pure gold zari threads.',
    recommendedAteliers: ['Weavers Studio (Ballygunge Place)', 'Byloom (Gariahat)', 'Kanishka’s (Mirza Ghalib St)'],
    shippingAvailable: true
  },
  {
    id: 'gift-2',
    name: 'GI-Tagged Terracotta Bankura Horse & Dokra Brass Art',
    category: 'GI Craft',
    origin: 'Panchmura, Bankura & Bikna Metal Artisans',
    priceRange: '₹5,000 – ₹75,000 ($60 – $900 USD)',
    description: 'Ancient 4,000-year-old lost-wax technique brass castings (Dokra) and iconic terracotta horses representing Bengal rural craft heritage.',
    recommendedAteliers: ['Biswa Bangla Flagship Store (Park Street / CC2)', 'Manjusha State Emporium'],
    shippingAvailable: true
  },
  {
    id: 'gift-3',
    name: 'Heritage Nolen Gur Confectionery & Heritage Tins',
    category: 'Heritage Sweet',
    origin: 'Balaram Mullick & K.C. Das Royal Confectioners',
    priceRange: '₹1,500 – ₹10,000 ($20 – $120 USD)',
    description: 'Exquisite date-palm jaggery (Nolen Gur) Sandesh, Baked Rosogolla, and vacuum-sealed heritage tins designed for travel for Our London Guests.',
    recommendedAteliers: ['Balaram Mullick & Radharaman Mullick (Bhowanipore)', 'K.C. Das (Esplanade)', 'Flurys (Park Street)'],
    shippingAvailable: true
  }
];

export const NIGHTLIFE_DINING: DiningSpot[] = [
  {
    id: 'dine-1',
    name: 'Trincas Heritage Jazz Bar & Restaurant',
    category: 'Heritage Jazz Bar',
    type: 'Heritage Jazz Bar',
    neighborhood: 'Park Street',
    signatureDishes: ['Chicken Tetrazzini', 'Classic Devilled Eggs', 'Sizzling Garlic Prawns', 'Vintage Cocktails'],
    ambiance: '1960s Retro Glamour, Live Jazz & Blues Bands, Warm Crimson Leather Booths',
    dressCode: 'Smart Casual / Evening Attire for Our London Guests',
    reservationLiaison: 'VIP Corner Booth Reserved via Concierge'
  },
  {
    id: 'dine-2',
    name: '6 Ballygunge Place',
    category: 'Bengali Haute Cuisine',
    type: 'Bengali Haute Cuisine',
    neighborhood: 'Ballygunge',
    signatureDishes: ['Daab Chingri (Prawns in tender coconut)', 'Kasturi Ilish', 'Kosha Mangsho', 'Bhapa Sandesh'],
    ambiance: 'Restored 1920s Colonial Bungalow, Teakwood Furniture, Vintage Bengal Paintings',
    dressCode: 'Casual Attire for Our London Guests / Traditional Indian Elegance',
    reservationLiaison: 'Private Dining Room (PDR) Available'
  },
  {
    id: 'dine-3',
    name: 'The Bengal Club (Est. 1827)',
    category: 'Private Club for Our London Guests',
    type: 'Private Club for Our London Guests',
    neighborhood: 'Russell Street',
    signatureDishes: ['Smoked Hilsa', 'Chateaubriand Steak', 'Consommé Royal', 'Classic Dry Martini'],
    ambiance: 'Colonial Aristocratic Dining Hall, Mahogany Paneling, Historical Oil Portraits',
    dressCode: 'Formal Attire (Jacket & Collared Shirt Required for Gentlemen)',
    reservationLiaison: 'Reciprocal Club Access & Member Guest Reciprocal Pass'
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    institution: 'Apollo Gleneagles Hospital (VIP Liaison Desk)',
    type: 'Multi-Specialty Private Tertiary Care',
    address: '58 Canal Circular Road, Kadapara, Phool Bagan, Kolkata - 700054',
    phone: '+91 33 2320 3040 / Helpline for Our London Guests: +91 33 2320 2122',
    vipConciergeNotes: '24/7 dedicated International Patient & Emergency Liaison for Our London Guests.'
  },
  {
    institution: 'AMRI Hospitals (Dhakuria Royal Wing)',
    type: 'Super-Specialty Cardiac & Critical Care',
    address: 'P-218, CIT Scheme LXXII, Block A, Dhakuria, Kolkata - 700031',
    phone: '+91 33 2461 2626 / Emergency: 1066',
    vipConciergeNotes: 'Direct ambulance transfer protocol with English-speaking specialists.'
  },
  {
    institution: 'Fortis Hospital Anandapur',
    type: 'Emergency Medicine & Neurology Center',
    address: '730 Anandapur, EM Bypass Road, Kolkata - 700107',
    phone: '+91 33 6628 4444',
    vipConciergeNotes: 'Close proximity to JW Marriott & ITC Sonar hotels for Our London Guests.'
  },
  {
    institution: 'Kolkata Tourist Police & Special Protection Desk',
    type: 'VIP Escort & High Commission Liaison',
    address: 'Lalbazar Police Headquarters, BBD Bagh, Kolkata',
    phone: '112 / Tourist Helpline: +91 33 2214 5000',
    vipConciergeNotes: 'English, French, German language assistance for international guests.'
  }
];
