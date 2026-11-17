/**
 * Offline concepts, pop-ups and one-off gatherings: things that only exist
 * for a few days, in one room, with the people who showed up.
 *
 * `edition` is printed on the "Limited Run" ticket (e.g. "1 of 1").
 *
 * @typedef {{
 *   title: string,
 *   place: string,
 *   when: string,
 *   edition: string,
 *   description: string,
 *   url?: string
 * }} OfflineConcept
 */

/** @type {OfflineConcept[]} */
export const offlineConcepts = [
  {
    title: "SheSapiens Community Leaders Retreat",
    place: "Fonte do Palheiro, Algarve",
    when: "Sep 11–13, 2026",
    edition: "1 of 1",
    description:
      "Three days for community leaders to work on the future of their community, and on themselves. Co-hosted by local.foundation and flourish mode.",
  },
  {
    title: "Community Map",
    place: "IPDJ, Faro",
    when: "Exhibition",
    edition: "physical edition",
    description:
      "A wall-sized map of the people and initiatives holding a region together, drawn live with the people on it.",
    url: "https://local.foundation/communitymap",
  },
  {
    title: "Eléctrico Pitch",
    place: "Lisbon trams",
    when: "Nov 2025",
    edition: "moving venue",
    description:
      "A startup pitch competition held on board Lisbon’s iconic trams. Pitch before your stop.",
  },
  {
    title: "Algarve Buildathon",
    place: "Algarve",
    when: "Nov 2025",
    edition: "48h",
    description:
      "Made with Algarve Evolution. Building real solutions for the region with no-code and AI, in one weekend.",
  },
];
