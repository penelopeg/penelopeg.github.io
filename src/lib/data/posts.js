/**
 * Single source of truth for blog posts — used by the blog listing, the
 * homepage and the RSS feed. Newest first.
 *
 * @typedef {{ slug: string, title: string, description: string, date: string, tags: string[] }} Post
 * @type {Post[]}
 */
export const posts = [
  {
    slug: "inspired-by-1-community",
    title: "InspiredBy #1: Community",
    description:
      "A curated roundup of community builders, social impact projects, documentary picks, and inspiring founders from the Algarve ecosystem.",
    date: "2026-06-09",
    tags: ["community", "algarve", "startups", "newsletter"],
  },
  {
    slug: "face-of-suffering",
    title: "In the face of suffering you'll probably do jack shit",
    description:
      "On cowardice, solidarity, small acts of rebellion, and why building community before the emergency is the point.",
    date: "2026-03-02",
    tags: ["community", "personal", "society"],
  },
  {
    slug: "resolutions-fail-copycat",
    title: "Your resolutions fail because you're being a copycat",
    description:
      "Why blindly copying others' routines leads to failed resolutions, and how to adapt advice to your own circumstances.",
    date: "2026-01-09",
    tags: ["personal", "productivity", "growth"],
  },
  {
    slug: "in-defense-of-goblin-mode",
    title: "In defense of Goblin Mode",
    description:
      "Embracing productive chaos and rejecting social perfectionism through intentionally unscripted living.",
    date: "2025-12-21",
    tags: ["personal", "productivity", "mental-health"],
  },
  {
    slug: "recognition-paradox",
    title: "The Recognition Paradox",
    description:
      "Thoughts on identity, networking, and the struggle between wanting recognition and being terrified of being seen.",
    date: "2025-09-24",
    tags: ["community", "networking", "personal"],
  },
  {
    slug: "drive-30",
    title: "Learning how to drive at 30",
    description:
      "On learning to drive at 30, facing fears, and how avoiding things don't make them go away.",
    date: "2025-05-25",
    tags: ["personal", "growth", "community"],
  },
  {
    slug: "things-doomscrolling",
    title: "Things to do instead of doomscrolling",
    description:
      "A chaotic list of productive procrastination and thoughts on escaping the digital doomscroll.",
    date: "2025-05-03",
    tags: ["personal", "writing", "productivity"],
  },
  {
    slug: "reason-365-consistency",
    title: "Reason #365 why you shouldn't care about consistency",
    description:
      "Thoughts on how platform changes, rigid routines, and the pursuit of consistency can kill creativity and authenticity.",
    date: "2025-04-13",
    tags: ["personal", "writing", "productivity"],
  },
  {
    slug: "thoughts-on-decaf",
    title: "Thoughts on decaf",
    description:
      "Personal reflections on caffeine, energy management, and whether society's obsession with coffee delivers on its promises.",
    date: "2025-03-29",
    tags: ["personal", "productivity"],
  },
  {
    slug: "untitled",
    title: "Untitled",
    description:
      "Reflections on the fear of titles, labels, and the struggle to share creative work without needing to be exceptional.",
    date: "2025-03-09",
    tags: ["personal", "writing", "creativity"],
  },
];

/** @param {string} dateString */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
