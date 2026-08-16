import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { createServer as createViteServer } from 'vite';
import { PANDAL_TRAILS, CITY_EXPERIENCES, SHOPPING_CATALOGUE, NIGHTLIFE_DINING } from './src/data/conciergeData.js';
import { getAgendaData, addScheduleEvent, updateScheduleEvent, getSchedulesByDayId } from './db/database.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ----------------------------------------------------
// API Route: Agenda Schedule from SQLite (/api/agenda)
// ----------------------------------------------------
app.get('/api/agenda', (req: Request, res: Response) => {
  try {
    const user = (req.query.user as 'A' | 'B') || 'A';
    const agenda = getAgendaData(user);
    return res.json(agenda);
  } catch (err) {
    console.error('Error fetching agenda from database:', err);
    return res.status(500).json({ error: 'Failed to load agenda data' });
  }
});

app.post('/api/schedule/add', (req: Request, res: Response) => {
  try {
    const { day_id, time, event, location, user = 'A' } = req.body;
    if (!day_id || !time || !event || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newEvent = addScheduleEvent(day_id, time, event, location, user);
    return res.json({ success: true, event: newEvent });
  } catch (err) {
    console.error('Error adding schedule event:', err);
    return res.status(500).json({ error: 'Failed to add event' });
  }
});

// Initialize OpenAI client lazily/safely
function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("OPENAI_API_KEY is missing. AI Chatbot will fall back to intelligent cultural responses.");
    return null;
  }
  return new OpenAI({
    apiKey,
  });
}

// ----------------------------------------------------
// API Route 1: Weather & AQI Dashboard (/api/weather)
// ----------------------------------------------------
app.get('/api/weather', async (req: Request, res: Response) => {
  try {
    // Attempt live fetch from Open-Meteo Weather & Air Quality APIs
    const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=22.5726&longitude=88.3639&current=temperature_2m,relative_humidity_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=Asia%2FKolkata';
    const aqiUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=22.5726&longitude=88.3639&current=us_aqi,pm2_5&timezone=Asia%2FKolkata';

    const [weatherRes, aqiRes] = await Promise.all([
      fetch(weatherUrl, { signal: AbortSignal.timeout(3000) }),
      fetch(aqiUrl, { signal: AbortSignal.timeout(3000) })
    ]);

    if (weatherRes.ok && aqiRes.ok) {
      const wData = await weatherRes.json();
      const aData = await aqiRes.json();

      const currentTemp = Math.round(wData.current.temperature_2m);
      const humidity = Math.round(wData.current.relative_humidity_2m);
      const uv = Math.round(wData.daily.uv_index_max?.[0] || 6);
      const usAqi = Math.round(aData.current.us_aqi || 110);

      let aqiStatus = 'Moderate';
      if (usAqi <= 50) aqiStatus = 'Good (Fresh)';
      else if (usAqi <= 100) aqiStatus = 'Satisfactory';
      else if (usAqi <= 150) aqiStatus = 'Moderate (Acceptable)';
      else if (usAqi <= 200) aqiStatus = 'Unhealthy for Sensitive Groups';
      else aqiStatus = 'Poor (Air Purifier Advised)';

      const forecastList = (wData.daily.time || []).slice(0, 5).map((tStr: string, idx: number) => {
        const dateObj = new Date(tStr);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        return {
          date: tStr,
          dayName: idx === 0 ? 'Today' : dayName,
          tempHigh: Math.round(wData.daily.temperature_2m_max[idx]),
          tempLow: Math.round(wData.daily.temperature_2m_min[idx]),
          condition: wData.daily.precipitation_probability_max[idx] > 40 ? 'Light Rain Likely' : 'Pleasant & Partly Cloudy',
          rainProb: wData.daily.precipitation_probability_max[idx] || 15
        };
      });

      return res.json({
        location: 'Kolkata, West Bengal (22.57° N, 88.36° E)',
        temperature: currentTemp,
        tempMin: Math.round(wData.daily.temperature_2m_min[0] || 25),
        tempMax: Math.round(wData.daily.temperature_2m_max[0] || 32),
        humidity,
        uvIndex: uv,
        aqi: usAqi,
        aqiStatus,
        condition: 'Partly Sunny with Autumnal Breeze',
        forecast: forecastList,
        isFallback: false,
        executiveAdvisory: 'October weather in Kolkata features pleasant early autumn sunshine (28°C - 32°C). For our Royal London guests, early morning walks (7:00 AM - 9:30 AM) offer ideal ambient temperatures and crisp air.'
      });
    }
  } catch (error) {
    console.log("Weather API timeout or error, utilizing historical October Kolkata benchmark:", error);
  }

  // Graceful Fallback Data
  return res.json({
    location: 'Kolkata (October Autumn Benchmark)',
    temperature: 29,
    tempMin: 24,
    tempMax: 32,
    humidity: 68,
    uvIndex: 6,
    aqi: 115,
    aqiStatus: 'Moderate (Acceptable)',
    condition: 'Pleasant Autumnal Sunshine & Light Breeze',
    forecast: [
      { date: '2026-10-01', dayName: 'Thu, Oct 1', tempHigh: 31, tempLow: 24, condition: 'Partly Sunny', rainProb: 20 },
      { date: '2026-10-02', dayName: 'Fri, Oct 2', tempHigh: 32, tempLow: 25, condition: 'Clear Autumn Sky', rainProb: 15 },
      { date: '2026-10-03', dayName: 'Sat, Oct 3', tempHigh: 31, tempLow: 24, condition: 'Pleasant & Mild', rainProb: 10 },
      { date: '2026-10-04', dayName: 'Sun, Oct 4', tempHigh: 30, tempLow: 24, condition: 'Light Evening Breeze', rainProb: 15 },
      { date: '2026-10-05', dayName: 'Mon, Oct 5', tempHigh: 31, tempLow: 25, condition: 'Sunny & Clear', rainProb: 10 }
    ],
    isFallback: true,
    executiveAdvisory: 'October brings post-monsoon clarity to Kolkata (28°C – 32°C). High humidity cools down significantly after sunset. Recommended attire: Light cottons/linen for day; smart casual blazer for evening jazz clubs.'
  });
});

// ----------------------------------------------------
// API Route 2: Dynamic Itinerary Filtering (/api/filter-itinerary)
// ----------------------------------------------------
app.post('/api/filter-itinerary', (req: Request, res: Response) => {
  const { guestProfile = 'executive', pace = 'balanced', interests = [] } = req.body || {};

  const selectedTrails = PANDAL_TRAILS.filter(t => {
    if (pace === 'relaxed') return t.category === 'VIP Minimal-Walking' || t.category === 'North Heritage';
    return true;
  });

  const selectedExperiences = CITY_EXPERIENCES.filter(e => {
    if (interests.includes('Fine Dining') && e.category === 'Royal Feast') return true;
    if (interests.includes('Heritage') && (e.category === 'Private Grounds' || e.category === 'Architectural Walk')) return true;
    return true;
  });

  const selectedGifts = SHOPPING_CATALOGUE;
  const selectedDining = NIGHTLIFE_DINING;

  // Custom multi-day schedule assembly for 1-5 October 2026
  const customSchedule = [
    {
      day: 'Day 1: Thursday, Oct 1, 2026',
      theme: 'Arrival & Colonial Riverfront Serenity',
      morning: 'Chauffeured arrival transfer to JW Marriott / Taj Bengal. Private rest & orientation.',
      afternoon: 'Exclusive 04:00 PM Hooghly River Sunset Cruise on chartered catamaran with live Baul music & Darjeeling tea.',
      evening: 'Welcome Dinner at Trincas Heritage Jazz Bar, Park Street.'
    },
    {
      day: 'Day 2: Friday, Oct 2, 2026',
      theme: 'Kumartuli Artisan Heritage & Pre-Festival Sculpting',
      morning: '08:00 AM Chauffeured golf cart walkthrough in Kumartuli artisan quarter. Observe master sculptors finishing unpainted straw & clay idols.',
      afternoon: 'Curated lunch at 6 Ballygunge Place. Afternoon visit to Marble Palace Mansion private art collection.',
      evening: 'Private reception at Bengal Club or relaxed tea at Oberoi Grand.'
    },
    {
      day: 'Day 3: Saturday, Oct 3, 2026',
      theme: 'Victoria Memorial Private Grounds & Fine Silk Ateliers',
      morning: '07:30 AM Private curator walk through Victoria Memorial manicured gardens & portrait gallery.',
      afternoon: 'Private shopping appointments at Weavers Studio (Jamdani silks) & Biswa Bangla Flagship Store.',
      evening: 'Zamindari 12-course feast at The Rajbari Bawali or Sovabazar Rajbari.'
    },
    {
      day: 'Day 4: Sunday, Oct 4, 2026',
      theme: 'South Kolkata Pandal Previews & Fine Dining',
      morning: '09:00 AM Early morning preview of South Kolkata art installations (Suruchi Sangha, Chetla Agrani) with zero crowd pressure.',
      afternoon: 'Literary Adda experience at College Street & Indian Coffee House mezzanine.',
      evening: 'Fine dining experience at Oh! Calcutta with seasonal Ilish Bhapa & Daab Chingri.'
    },
    {
      day: 'Day 5: Monday, Oct 5, 2026',
      theme: 'Royal London Guest Departure & Sweet Souvenirs',
      morning: 'Breakfast tasting of Nolen Gur Sandesh & Rosogolla at Balaram Mullick Bhowanipore.',
      afternoon: 'Vacuum-sealed confectionery package delivery to hotel suite. Chauffeured transfer to Kolkata CCU Airport.'
    }
  ];

  return res.json({
    summary: `Tailored ${pace.toUpperCase()} cultural strategy for a ${guestProfile} guest focusing on ${interests.join(', ') || 'Art, Heritage, and Dining'}.`,
    schedule: customSchedule,
    recommendedTrails: selectedTrails,
    recommendedExperiences: selectedExperiences,
    recommendedGifts: selectedGifts,
    recommendedDining: selectedDining
  });
});

// ----------------------------------------------------
// API Route 3: Gemini AI Concierge Chatbot (/api/chat)
// with Function Calling for Schedule Management
// ----------------------------------------------------

// OpenAI Tool / Function Declarations
const scheduleTools = [
  {
    type: 'function' as const,
    function: {
      name: 'get_agenda_overview',
      description: 'Retrieve the full agenda schedule for all days (Oct 5–9). Use this to show the user the current schedule before making edits, or when the user asks to see the schedule. Returns an array of days, each with date, title, and a list of schedule items (each with id, time, event, location, status).',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'add_schedule_event',
      description: 'Add a new event to the agenda schedule. Use this when the user wants to add a new event to a specific day. The day_id maps to: 1=Oct 5, 2=Oct 6, 3=Oct 7, 4=Oct 8, 5=Oct 9. The new event will automatically get status "Planned".',
      parameters: {
        type: 'object',
        properties: {
          day_id: { type: 'number', description: 'The ID of the day to add the event to. 1=Oct 5, 2=Oct 6, 3=Oct 7, 4=Oct 8, 5=Oct 9.' },
          time: { type: 'string', description: 'The time of the event, e.g. "03:00 PM"' },
          event: { type: 'string', description: 'The name/title of the event' },
          location: { type: 'string', description: 'The venue or location of the event' },
        },
        required: ['day_id', 'time', 'event', 'location'],
      },
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'update_schedule_event',
      description: 'Update an existing event in the agenda schedule. Use this when the user wants to change details of an existing event. You must first call get_agenda_overview to find the schedule item id. Only provide the fields that need to be changed.',
      parameters: {
        type: 'object',
        properties: {
          schedule_id: { type: 'number', description: 'The ID of the schedule item to update (from the agenda overview)' },
          time: { type: 'string', description: 'New time for the event (optional)' },
          event: { type: 'string', description: 'New name/title for the event (optional)' },
          location: { type: 'string', description: 'New venue/location for the event (optional)' },
          status: { type: 'string', description: 'New status for the event, e.g. "Planned" or "Optional" (optional)' },
        },
        required: ['schedule_id'],
      },
    }
  },
];

// Execute a tool call and return the result
function executeToolCall(name: string, args: Record<string, unknown>, user: 'A' | 'B'): { result: unknown; mutated: boolean } {
  switch (name) {
    case 'get_agenda_overview': {
      const data = getAgendaData(user);
      return { result: data, mutated: false };
    }
    case 'add_schedule_event': {
      const newEvent = addScheduleEvent(
        args.day_id as number,
        args.time as string,
        args.event as string,
        args.location as string,
        user
      );
      console.log(`✅ Chatbot added schedule event: ${JSON.stringify(newEvent)}`);
      return { result: { success: true, addedEvent: newEvent }, mutated: true };
    }
    case 'update_schedule_event': {
      const { schedule_id, ...fields } = args as { schedule_id: number; time?: string; event?: string; location?: string; status?: string };
      const updated = updateScheduleEvent(schedule_id, fields, user);
      if (updated) {
        console.log(`✅ Chatbot updated schedule event #${schedule_id}: ${JSON.stringify(updated)}`);
        return { result: { success: true, updatedEvent: updated }, mutated: true };
      }
      return { result: { success: false, error: 'Event not found or no fields to update' }, mutated: false };
    }
    default:
      return { result: { error: `Unknown tool: ${name}` }, mutated: false };
  }
}

app.post('/api/chat', async (req: Request, res: Response) => {
  const { message, language = 'English', history = [], user = 'A' } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message field is required' });
  }

  const systemInstruction = `
You are the Tilottama AI Guide, the dedicated cultural concierge for the "Kolkata Puja Concierge 2026" platform.
Your persona is extremely sophisticated, warm, culturally erudite, and tailored for our Royal London guests visiting Kolkata in October 2026.

CRITICAL FESTIVAL TIMELINE RULES:
- The Royal London visit window is October 5 to October 9, 2026.
- Mahalaya takes place around October 10, 2026.
- The principal Durga Puja public festival runs from October 16/17 to October 21, 2026.
- Never invent unverified 2026 pandal themes or VIP pass numbers.

LANGUAGE CAPABILITY:
- You are fully bilingual in English and Bengali.
- If the user writes in Bengali or requests Bengali greetings, respond warmly.

SCHEDULE MANAGEMENT CAPABILITY:
You have the ability to view and modify the visit agenda schedule using tools.
The schedule covers 5 days: Oct 5 (day_id=1), Oct 6 (day_id=2), Oct 7 (day_id=3), Oct 8 (day_id=4), Oct 9 (day_id=5).

When the user asks to change, modify, update, or manage the schedule:
1. First, ask the user whether they want to:
   a) **Edit an existing event** — In this case, first call get_agenda_overview to retrieve the current schedule, present the events for the relevant day to the user, ask which event they want to change and what the new details should be, then call update_schedule_event.
   b) **Add a new event** — In this case, ask the user for the day, time, event name, and location, then call add_schedule_event.
2. After making changes, confirm the update to the user with a summary of what was changed.
3. If the user directly provides enough detail (e.g. "Add a dinner at 8 PM on Oct 7 at Park Street"), you may skip asking and directly call the appropriate tool.

Keep answers elegant, clear, structured with bullet points when listing recommendations, and under 250 words unless detailed analysis is requested.
`;

  const ai = getOpenAIClient();

  if (ai) {
    try {
      // Build conversation history for multi-turn context
      const messages: any[] = [];
      messages.push({ role: 'system', content: systemInstruction });

      // Add previous messages from history
      for (const h of history) {
        if (h.role === 'user') {
          messages.push({ role: 'user', content: h.content });
        } else if (h.role === 'bot') {
          messages.push({ role: 'assistant', content: h.content });
        }
      }

      // Add the current user message
      messages.push({ role: 'user', content: message });

      let scheduleChanged = false;

      // Initial call with tools
      let response = await ai.chat.completions.create({
        model: 'gpt-5.4-mini',
        messages,
        temperature: 0.7,
        tools: scheduleTools,
      });

      let loopCount = 0;
      let responseMessage = response.choices[0].message;

      // Function calling loop: handle up to 5 tool calls
      while (responseMessage.tool_calls && responseMessage.tool_calls.length > 0 && loopCount < 5) {
        loopCount++;

        // Add the model's function call to the conversation
        messages.push(responseMessage);

        for (const toolCall of responseMessage.tool_calls) {
          const functionName = toolCall.function.name;
          const args = JSON.parse(toolCall.function.arguments);
          console.log(`🔧 OpenAI requested tool: ${functionName}(${JSON.stringify(args)})`);

          // Execute the tool
          const { result, mutated } = executeToolCall(functionName, args, user as 'A' | 'B');
          if (mutated) scheduleChanged = true;

          // Add our function response to the conversation
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            name: functionName,
            content: JSON.stringify(result)
          });
        }

        // Call OpenAI again with the tool result
        response = await ai.chat.completions.create({
          model: 'gpt-5.4-mini',
          messages,
          temperature: 0.7,
          tools: scheduleTools,
        });
        responseMessage = response.choices[0].message;
      }

      const replyText = responseMessage.content || "Nomoshkar! It is my pleasure to assist your Kolkata cultural journey. How may I refine your itinerary today?";

      return res.json({
        reply: replyText,
        scheduleChanged,
        suggestedPrompts: scheduleChanged
          ? [
              "Show me the updated schedule",
              "Add another event to the agenda",
              "Change an existing event",
              "Tell me about Durga Puja 2026"
            ]
          : [
              "I want to change the schedule",
              "Tell me about Kumartuli artisan studio visits",
              "What is the best way to arrange a private Hooghly River cruise?",
              "Recommend authentic Bengali fine dining for our guests"
            ]
      });
    } catch (err) {
      console.error("OpenAI API call failed:", err);
    }
  }

  // Smart fallback response if API key is not set or network fails
  let fallbackReply = `Nomoshkar! As the Tilottama AI Guide, I am delighted to welcome you to the 2026 Cultural Discovery Guide. \n\nRegarding your request: "${message}"\n\n- **October 5–9 Visit Window**: Our executive itinerary covers five premium days of cultural immersion.\n- **Schedule Management**: To modify the agenda, please ensure the OpenAI API key is configured so I can assist with adding or editing events.\n- **Liaison Support**: Our team can arrange VIP transport, reciprocal club entry at Bengal Club, and private dining at 6 Ballygunge Place.`;

  return res.json({
    reply: fallbackReply,
    scheduleChanged: false,
    suggestedPrompts: [
      "I want to change the schedule",
      "What medical emergency liaison options exist for VIP guests?",
      "Which shopping ateliers offer international delivery for Baluchari silks?",
      "Give me a 3-day Royal London guest itinerary"
    ]
  });
});

// ----------------------------------------------------
// Express & Vite Middleware setup
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Kolkata Puja Concierge Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
