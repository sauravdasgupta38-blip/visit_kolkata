import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'schedule.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// ----------------------------------------------------
// Schema creation
// ----------------------------------------------------
db.exec(`
  CREATE TABLE IF NOT EXISTS agenda_days_A (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    date  TEXT NOT NULL,
    title TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS agenda_schedules_A (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    day_id   INTEGER NOT NULL REFERENCES agenda_days_A(id),
    time     TEXT NOT NULL,
    event    TEXT NOT NULL,
    location TEXT NOT NULL,
    status   TEXT NOT NULL DEFAULT 'Planned'
  );

  CREATE TABLE IF NOT EXISTS agenda_days_B (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    date  TEXT NOT NULL,
    title TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS agenda_schedules_B (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    day_id   INTEGER NOT NULL REFERENCES agenda_days_B(id),
    time     TEXT NOT NULL,
    event    TEXT NOT NULL,
    location TEXT NOT NULL,
    status   TEXT NOT NULL DEFAULT 'Planned'
  );
`);

// ----------------------------------------------------
// Seed data (only if the tables are empty)
// ----------------------------------------------------
const rowCountA = (db.prepare('SELECT COUNT(*) AS cnt FROM agenda_days_A').get() as { cnt: number }).cnt;
const rowCountB = (db.prepare('SELECT COUNT(*) AS cnt FROM agenda_days_B').get() as { cnt: number }).cnt;

if (rowCountA === 0 || rowCountB === 0) {
  const SEED_DATA = [
    {
      date: 'Oct 5',
      title: '5th October 2026',
      schedules: [
        { time: '09:30 AM', event: 'Executive Welcome & Briefing', location: 'Taj Bengal Hotel, Alipore', status: 'Planned' },
        { time: '11:00 AM', event: 'Corporate Strategy Meeting', location: 'Boardroom A, Taj Bengal', status: 'Planned' },
        { time: '01:30 PM', event: 'Executive Luncheon', location: 'Sonargaon, Taj Bengal', status: 'Planned' },
        { time: '04:00 PM', event: 'Hooghly River Sunset Cruise', location: 'Outram Ghat', status: 'Optional' },
      ]
    },
    {
      date: 'Oct 6',
      title: '6th October 2026',
      schedules: [
        { time: '10:00 AM', event: 'Keynote Address & Townhall', location: 'ITC Royal Bengal', status: 'Planned' },
        { time: '01:00 PM', event: 'Networking Lunch', location: 'Grand Pavilion', status: 'Planned' },
        { time: '06:30 PM', event: 'Victoria Memorial Private Tour', location: 'Victoria Memorial', status: 'Planned' },
        { time: '08:00 PM', event: 'Dinner & Jazz', location: 'Trincas, Park Street', status: 'Planned' },
      ]
    },
    {
      date: 'Oct 7',
      title: '7th October 2026',
      schedules: [
        { time: '09:00 AM', event: 'Quarterly Review Meeting', location: 'Taj Bengal Hotel', status: 'Planned' },
        { time: '01:00 PM', event: 'Business Lunch', location: 'Taj Bengal', status: 'Planned' },
        { time: '04:30 PM', event: 'Shopping Expedition', location: 'Gariahat & Park Street', status: 'Optional' },
        { time: '07:30 PM', event: 'Durga Puja Pandal Hopping - VIP Pass', location: 'South Kolkata', status: 'Planned' },
      ]
    },
    {
      date: 'Oct 8',
      title: '8th October 2026',
      schedules: [
        { time: '10:00 AM', event: 'Partnership Signings', location: 'Oberoi Grand', status: 'Planned' },
        { time: '12:30 PM', event: 'Farewell Luncheon', location: 'Threesixtythree°, Oberoi Grand', status: 'Planned' },
        { time: '03:00 PM', event: 'Heritage Walk', location: 'Dalhousie Square', status: 'Optional' },
        { time: '08:00 PM', event: 'Royal Banquet', location: 'Sovabazar Rajbari', status: 'Planned' },
      ]
    },
    {
      date: 'Oct 9',
      title: '9th October 2026',
      schedules: [
        { time: '09:00 AM', event: 'Free Morning for Leisure', location: 'Hotel / Spa', status: 'Planned' },
        { time: '12:00 PM', event: 'Checkout & Transfer', location: 'Kolkata International Airport', status: 'Planned' },
      ]
    }
  ];

  const seedTables = (user: 'A' | 'B') => {
    const insertDay = db.prepare(`INSERT INTO agenda_days_${user} (date, title) VALUES (?, ?)`);
    const insertSchedule = db.prepare(`INSERT INTO agenda_schedules_${user} (day_id, time, event, location, status) VALUES (?, ?, ?, ?, ?)`);

    const seedAll = db.transaction(() => {
      for (const day of SEED_DATA) {
        const result = insertDay.run(day.date, day.title);
        const dayId = result.lastInsertRowid;
        for (const s of day.schedules) {
          insertSchedule.run(dayId, s.time, s.event, s.location, s.status);
        }
      }
    });

    seedAll();
  };

  if (rowCountA === 0) seedTables('A');
  if (rowCountB === 0) seedTables('B');
  console.log('✅ SQLite agenda database seeded with schedule data.');
}

// ----------------------------------------------------
// Query helper
// ----------------------------------------------------
interface ScheduleRow {
  day_id: number;
  date: string;
  title: string;
  time: string;
  event: string;
  location: string;
  status: string;
}

export interface AgendaScheduleItem {
  id: number;
  time: string;
  event: string;
  location: string;
  status: string;
}

export interface AgendaDay {
  date: string;
  title: string;
  schedules: AgendaScheduleItem[];
}

function parseTime(timeStr: string): number {
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hours < 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

export function getAgendaData(user: 'A' | 'B'): AgendaDay[] {
  const rows = db.prepare(`
    SELECT
      d.id   AS day_id,
      d.date,
      d.title,
      s.id   AS schedule_id,
      s.time,
      s.event,
      s.location,
      s.status
    FROM agenda_days_${user} d
    JOIN agenda_schedules_${user} s ON s.day_id = d.id
    ORDER BY d.id, s.id
  `).all() as (ScheduleRow & { schedule_id: number })[];

  // Group by day
  const dayMap = new Map<number, AgendaDay>();
  for (const row of rows) {
    if (!dayMap.has(row.day_id)) {
      dayMap.set(row.day_id, { date: row.date, title: row.title, schedules: [] });
    }
    dayMap.get(row.day_id)!.schedules.push({
      id: row.schedule_id,
      time: row.time,
      event: row.event,
      location: row.location,
      status: row.status,
    });
  }

  const days = Array.from(dayMap.values());
  days.forEach(day => {
    day.schedules.sort((a, b) => parseTime(a.time) - parseTime(b.time));
  });
  return days;
}

// ----------------------------------------------------
// Mutation helpers (used by chatbot tools)
// ----------------------------------------------------

export function getSchedulesByDayId(dayId: number, user: 'A' | 'B'): AgendaScheduleItem[] {
  const rows = db.prepare(
    `SELECT id, time, event, location, status FROM agenda_schedules_${user} WHERE day_id = ? ORDER BY id`
  ).all(dayId) as AgendaScheduleItem[];
  return rows.sort((a, b) => parseTime(a.time) - parseTime(b.time));
}

export function addScheduleEvent(
  dayId: number,
  time: string,
  event: string,
  location: string,
  user: 'A' | 'B'
): AgendaScheduleItem {
  const result = db.prepare(
    `INSERT INTO agenda_schedules_${user} (day_id, time, event, location, status) VALUES (?, ?, ?, ?, ?)`
  ).run(dayId, time, event, location, 'Planned');

  return {
    id: Number(result.lastInsertRowid),
    time,
    event,
    location,
    status: 'Planned',
  };
}

export function updateScheduleEvent(
  scheduleId: number,
  fields: { time?: string; event?: string; location?: string; status?: string },
  user: 'A' | 'B'
): AgendaScheduleItem | null {
  // Build dynamic SET clause from provided fields
  const setClauses: string[] = [];
  const values: (string | number)[] = [];

  if (fields.time !== undefined) { setClauses.push('time = ?'); values.push(fields.time); }
  if (fields.event !== undefined) { setClauses.push('event = ?'); values.push(fields.event); }
  if (fields.location !== undefined) { setClauses.push('location = ?'); values.push(fields.location); }
  if (fields.status !== undefined) { setClauses.push('status = ?'); values.push(fields.status); }

  if (setClauses.length === 0) return null;

  values.push(scheduleId);
  db.prepare(`UPDATE agenda_schedules_${user} SET ${setClauses.join(', ')} WHERE id = ?`).run(...values);

  // Return updated row
  const row = db.prepare(
    `SELECT id, time, event, location, status FROM agenda_schedules_${user} WHERE id = ?`
  ).get(scheduleId) as AgendaScheduleItem | undefined;

  return row || null;
}

export default db;
