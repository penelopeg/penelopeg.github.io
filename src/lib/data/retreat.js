/**
 * Community Lead Retreat: sample agenda + timing maths.
 * All times are minutes from midnight; lengths are minutes.
 *
 * @typedef {{ id: string, title: string, minutes: number, needs?: number, note?: string }} Session
 * @typedef {{ id: string, day: string, label: string, start: number, available: number, sessions: Session[] }} Block
 * @typedef {Session & { start: number, length: number, overrun: number, carried: number, tooShort: boolean }} SessionResult
 * @typedef {Omit<Block, 'sessions'> & { sessions: SessionResult[], carriedIn: number, content: number, buffer: number, fits: boolean, carriedOut: number }} BlockResult
 * @typedef {{ id: string, title: string, minutes: number, perPerson?: boolean }} Exercise
 * @typedef {{ id: string, day: string, label: string, start: number, available: number }} BuilderSlot
 */

/** @type {Block[]} */
export const AGENDA = [
  {
    id: "fri",
    day: "Friday",
    label: "Evening",
    start: 17 * 60,
    available: 200,
    sessions: [
      { id: "arrivals", title: "Arrivals", minutes: 60 },
      { id: "opening", title: "Opening circle", minutes: 45 },
      { id: "rules", title: "House rules", minutes: 15 },
      { id: "dinner", title: "Shared dinner", minutes: 70 },
    ],
  },
  {
    id: "sat-am",
    day: "Saturday",
    label: "Morning",
    start: 9 * 60,
    available: 195,
    sessions: [
      { id: "leader", title: "What a leader is", minutes: 45 },
      { id: "why", title: "Why you lead", minutes: 40 },
      { id: "host", title: "How to host gatherings", minutes: 60 },
      {
        id: "struggle",
        title: "Your biggest struggle",
        minutes: 10,
        needs: 12,
        note: "1 minute each, 12 people",
      },
      { id: "coffee", title: "Coffee", minutes: 15 },
    ],
  },
  {
    id: "sat-pm",
    day: "Saturday",
    label: "Afternoon",
    start: 14 * 60,
    available: 240,
    sessions: [
      { id: "north", title: "The group's North Star", minutes: 75 },
      { id: "pool", title: "Pool break", minutes: 60 },
      { id: "hands", title: "Hands-on session", minutes: 90 },
    ],
  },
  {
    id: "sun",
    day: "Sunday",
    label: "Morning",
    start: 9 * 60 + 30,
    available: 180,
    sessions: [
      { id: "walk", title: "Walk-and-talk in pairs", minutes: 50 },
      { id: "roadmap", title: "Now / Next / Later roadmap, a name on every item", minutes: 80 },
      { id: "closing", title: "Closing ritual", minutes: 30 },
    ],
  },
];

/**
 * Delay inside a block carries session to session. Whatever the block's
 * buffer can't absorb carries into the next block's start.
 *
 * @param {Block[]} agenda
 * @param {Record<string, number>} overruns extra minutes per session id
 * @returns {BlockResult[]}
 */
export function computeAgenda(agenda, overruns) {
  let carry = 0;
  return agenda.map((b) => {
    const carriedIn = carry;
    let t = b.start + carriedIn;
    let planned = b.start;
    const sessions = b.sessions.map((s) => {
      const overrun = overruns[s.id] ?? 0;
      const length = Math.max(s.minutes, s.needs ?? 0) + overrun;
      const r = {
        ...s,
        start: t,
        length,
        overrun,
        carried: t - planned,
        tooShort: (s.needs ?? 0) > s.minutes
      };
      t += length;
      planned += s.minutes;
      return r;
    });
    const content = sessions.reduce((a, s) => a + s.length, 0);
    const buffer = b.available - carriedIn - content;
    carry = Math.max(0, -buffer);
    return { ...b, sessions, carriedIn, content, buffer, fits: buffer >= 0, carriedOut: carry };
  });
}

/** @param {number} min */
export function clock(min) {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/* ---------- Builder: pick days, start time, group size and exercises ---------- */

/** @type {Exercise[]} */
export const EXERCISES = [
  { id: 'arrive', title: 'Arrivals and welcome', minutes: 60 },
  { id: 'opening', title: 'Opening circle', minutes: 45 },
  { id: 'icebreak', title: 'Icebreaker game', minutes: 20 },
  { id: 'talk', title: 'Short talk + discussion', minutes: 45 },
  { id: 'round', title: 'Round: 1 minute each', minutes: 10, perPerson: true },
  { id: 'pairs', title: 'Walk-and-talk in pairs', minutes: 50 },
  { id: 'workshop', title: 'Hands-on workshop', minutes: 90 },
  { id: 'north', title: "The group's North Star", minutes: 75 },
  { id: 'roadmap', title: 'Now / Next / Later roadmap', minutes: 80 },
  { id: 'free', title: 'Free time / pool', minutes: 60 },
  { id: 'meal', title: 'Shared meal', minutes: 70 },
  { id: 'coffee', title: 'Coffee', minutes: 15 },
  { id: 'closing', title: 'Closing ritual', minutes: 30 }
];

/** @type {Record<number, string[]>} */
const DAY_NAMES = {
  1: ['Saturday'],
  2: ['Saturday', 'Sunday'],
  3: ['Friday', 'Saturday', 'Sunday']
};

/**
 * Blocks for a given number of days and morning start time (minutes from midnight).
 * A 3-day retreat opens with a Friday evening; mornings end at 13:00, afternoons run 14:00–18:00.
 *
 * @param {number} days
 * @param {number} start
 * @returns {BuilderSlot[]}
 */
export function builderBlocks(days, start) {
  /** @type {BuilderSlot[]} */
  const out = [];
  for (const day of DAY_NAMES[days] ?? DAY_NAMES[2]) {
    if (day === 'Friday') {
      out.push({ id: 'fri-eve', day, label: 'Evening', start: 17 * 60, available: 200 });
      continue;
    }
    const k = day.slice(0, 3).toLowerCase();
    out.push({ id: `${k}-am`, day, label: 'Morning', start, available: 13 * 60 - start });
    out.push({ id: `${k}-pm`, day, label: 'Afternoon', start: 14 * 60, available: 240 });
  }
  return out;
}

/**
 * @param {BuilderSlot[]} blocks
 * @returns {Record<string, string[]>}
 */
export function defaultPicks(blocks) {
  /** @type {Record<string, string[]>} */
  const picks = {};
  const mornings = blocks.filter((b) => b.label === 'Morning');
  const afternoons = blocks.filter((b) => b.label === 'Afternoon');
  for (const b of blocks) {
    if (b.label === 'Evening') picks[b.id] = ['arrive', 'opening', 'meal'];
  }
  mornings.forEach((b, i) => {
    picks[b.id] =
      i === mornings.length - 1 && mornings.length > 1 ? ['pairs', 'roadmap', 'coffee'] : ['talk', 'round', 'workshop', 'coffee'];
  });
  afternoons.forEach((b, i) => {
    picks[b.id] = i === afternoons.length - 1 ? ['north', 'free', 'closing'] : ['north', 'free', 'workshop'];
  });
  return picks;
}

/**
 * @param {BuilderSlot[]} blocks
 * @param {Record<string, string[]>} picks
 * @param {number} people
 * @returns {Block[]}
 */
export function buildAgenda(blocks, picks, people) {
  return blocks.map((b) => ({
    ...b,
    sessions: (picks[b.id] ?? []).map((exId, i) => {
      const ex = EXERCISES.find((e) => e.id === exId) ?? EXERCISES[0];
      return ex.perPerson
        ? { id: `${b.id}-${i}`, title: ex.title, minutes: ex.minutes, needs: people, note: `1 min each, ${people} people` }
        : { id: `${b.id}-${i}`, title: ex.title, minutes: ex.minutes };
    })
  }));
}
