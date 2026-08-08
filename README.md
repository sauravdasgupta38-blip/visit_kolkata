<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Kolkata Puja Concierge 2026 🔱

An exclusive, highly curated VIP experience dashboard tailored for distinguished guests (specifically, the "Royal London" delegation) visiting Kolkata during the grand Durga Puja festival in October 2026. This platform acts as a digital concierge, providing handpicked itineraries, real-time schedule management, and cultural insights.

## ✨ Features

- **Curated Cultural Itineraries:** Premium recommendations for Durga Puja pandal hopping (VIP passes, minimal-walking options), historic site visits, luxury shopping, and high-end dining.
- **Smart Agenda & Schedule Management:** Easily add and manage daily events (from October 5th to October 9th) directly from the curated cards. The schedules are persisted via a local SQLite database (`schedule.db`).
- **AI Concierge Chatbot:** An integrated AI assistant (powered by OpenAI / Gemini) capable of answering cultural questions and dynamically reading or updating the guest's personal schedule.
- **Dynamic Weather Dashboard:** Real-time (and historical fallback) weather and AQI tracking for Kolkata during the October autumn season, providing executive advisories based on the conditions.
- **Elegant UI/UX:** A responsive, dark-themed, and gold-accented premium interface built with React, TailwindCSS, and Lucide Icons.

## 🚀 Tech Stack

- **Frontend:** React 19, TypeScript, Vite, TailwindCSS v4, Framer Motion
- **Backend:** Express, Better-SQLite3
- **AI Integration:** OpenAI Node.js SDK
- **Data & APIs:** Open-Meteo (Weather/AQI), Local JSON state for cultural data

## 🛠️ Run Locally

**Prerequisites:** Node.js (v18+)

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Set Environment Variables:**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   # or
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *This command spins up both the Vite frontend and the Express backend simultaneously.*

4. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure

- `/src/components/` - React components for sections like Hero, Premium Cards, Weather Dashboard, and ChatWidget.
- `/src/data/` - Static JSON structures for curated trails, heritage places, and shopping guides.
- `/db/` - Contains the `database.ts` initialization for the SQLite `agenda_schedules` database.
- `server.ts` - The Express backend that exposes `/api/schedule`, `/api/weather`, and `/api/chat`.