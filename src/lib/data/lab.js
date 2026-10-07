/**
 * The Lab: unpolished, work-in-progress experiments.
 * Add new entries at the TOP. Keep them short and honest; this is a window
 * into the workbench, not a press release.
 *
 * status: 'brewing' (idea) | 'building' (in progress) | 'testing' | 'shipped' | 'paused'
 * kind:   'code' | 'event' | 'writing' | 'art' | 'movement' | 'research'
 *
 * Optional `media` lets an entry carry a snippet:
 *   { type: 'image' | 'video' | 'audio', src: '/media/…', alt?: string }
 *
 * @typedef {{ type: 'image' | 'video' | 'audio', src: string, alt?: string }} LabMedia
 * @typedef {{
 *   date: string,
 *   title: string,
 *   note: string,
 *   status: 'brewing' | 'building' | 'testing' | 'shipped' | 'paused',
 *   kind: 'code' | 'event' | 'writing' | 'art' | 'movement' | 'research',
 *   url?: string,
 *   media?: LabMedia
 * }} Experiment
 */

/** @type {Experiment[]} */
export const experiments = [
  {
    date: "2026-10",
    title: "Task wheel & personal pokedex",
    note: "A spin-the-wheel task picker and a people-pokedex for neurodivergent brains. Prototype stage.",
    status: "building",
    kind: "code",
  },
  {
    date: "2026-10",
    title: "Space opera, draft one",
    note: "Finishing the first draft. The characters keep wandering off-outline. Letting them.",
    status: "building",
    kind: "writing",
  },
  {
    date: "2026-10",
    title: "An RPG framework for Impact Hackers",
    note: "What if a hackathon had character sheets, quests and XP for collaboration?",
    status: "brewing",
    kind: "event",
  },
  {
    date: "2026-10",
    title: "Critical-thinking team games",
    note: "Designing team-building exercises that make people argue (kindly) and think harder.",
    status: "testing",
    kind: "event",
  },
  {
    date: "2026-10",
    title: "Impact & youth reports",
    note: "Reports on social impact, youth and women in tech for local.foundation collaborations.",
    status: "building",
    kind: "research",
  },
  {
    date: "2026-10",
    title: "A format for future-led people",
    note: "Prepping a brand-new gathering format. Not ready to say more. Soon.",
    status: "brewing",
    kind: "event",
  },
];

export const statusLabel = {
  brewing: "brewing",
  building: "on the bench",
  testing: "testing",
  shipped: "shipped",
  paused: "paused",
};
