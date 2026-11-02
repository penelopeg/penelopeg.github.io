/**
 * Selected works, grouped into experience buckets.
 *
 * Images are paths relative to /static (prefix with `base` when rendering).
 * `note` is the raw, handwritten-style margin note revealed on hover.
 * `sketch` (optional) is a scanned sketch / raw-process image revealed on hover
 * instead of the plain paper note — drop files in /static/images/sketches/.
 *
 * @typedef {{
 *   title: string,
 *   role: string,
 *   description: string,
 *   image: string,
 *   url?: string,
 *   note: string,
 *   sketch?: string,
 *   tags: string[]
 * }} Work
 *
 * @typedef {{ id: string, index: string, title: string, blurb: string, color: string, works: Work[] }} Bucket
 */

/** @type {Bucket[]} */
export const buckets = [
  {
    id: "gathering",
    index: "01",
    title: "Experiences & Gathering",
    blurb:
      "Hackathons, retreats, meetups and the community systems that keep them alive after the lights go off.",
    color: "var(--terracotta)",
    works: [
      {
        title: "Geek Sessions",
        role: "Community lead · 2021 → now",
        description:
          "Tech meetups across the Algarve for 15+ years, which I've helped lead since 2021: talks, workshops, a conference and very good conversations.",
        image: "/images/portfolio/geeksessionsbanner.jpg",
        url: "https://zez.am/GeekSessionsFaro",
        note: "the room where it all started",
        tags: ["community", "events", "tech"],
      },
      {
        title: "Impact Hackers",
        role: "Founder · hackathons",
        description:
          "A community for hackers who want to build positive impact with technology, solving local challenges together.",
        image: "/images/portfolio/impact-hackers.jpg",
        url: "https://impacthackerscommunity.com",
        note: "next up: an RPG framework for it",
        tags: ["community", "tech", "events"],
      },
      {
        title: "Event facilitation",
        role: "Organiser & facilitator",
        description:
          "Techstars Startup Weekends, buildathons, leader retreats. When a problem needs solving, I design the format around it.",
        image: "/images/portfolio/facilitator.jpg",
        url: "/events",
        note: "Faro · Coimbra · Évora · Lagos…",
        tags: ["events", "community"],
      },
      {
        title: "Speaker & host",
        role: "Stages & firesides",
        description:
          "Sharing what I learn with the next wave of impact builders, mostly by yapping a considerable amount.",
        image: "/images/portfolio/speaker.jpg",
        url: "/speaker",
        note: "mic check, one two",
        tags: ["events", "community"],
      },
    ],
  },
  {
    id: "creative-tech",
    index: "02",
    title: "Creative Tech & Visuals",
    blurb:
      "Interactive tools, installations and digital painting. Systems thinking you can touch.",
    color: "var(--cobalt)",
    works: [
      {
        title: "Community Map",
        role: "Installation · IPDJ",
        description:
          "A physical exhibition mapping the connections between people and community initiatives, now living on as an interactive piece.",
        image: "/images/portfolio/community-map.jpg",
        url: "https://local.foundation/communitymap",
        note: "string, pins & a lot of post-its",
        tags: ["community", "art"],
      },
      {
        title: "local.foundation",
        role: "Founder & Head of Signals",
        description:
          "Research and tooling to map and grow communities and regional ecosystems from the ground up.",
        image: "/images/portfolio/local-foundation-website.png",
        url: "https://local.foundation",
        note: "personal fav ♥",
        tags: ["tech", "community"],
      },
      {
        title: "Digital art",
        role: "Painting & visual play",
        description:
          "Dabbling through the arts, mostly digitally. Messy, joyful and very much a practice.",
        image: "/images/portfolio/art.png",
        url: "https://instagram.com/lepsies_art",
        note: "messy but fun",
        tags: ["art"],
      },
      {
        title: "Centric Software",
        role: "Tech team lead · day job",
        description:
          "Leading an engineering team building next-gen PIM/DAM software.",
        image: "/images/portfolio/contentserv.jpg",
        url: "https://centricsoftware.com",
        note: "12 years of shipping software",
        tags: ["tech"],
      },
    ],
  },
  {
    id: "words",
    index: "03",
    title: "Words & Narrative",
    blurb:
      "Fiction, essays and diary entries. Storytelling as a way of making sense of the chaos.",
    color: "var(--olive)",
    works: [
      {
        title: "Chaos Theory",
        role: "Personal essays · blog",
        description:
          "Thoughts on life, community, culture and creative chaos. Published here and on Substack.",
        image: "/images/portfolio/blog.jpg",
        url: "/blog",
        note: "beware, contains thoughts",
        tags: ["writing"],
      },
      {
        title: "Space opera (in progress)",
        role: "Fiction · first novel",
        description:
          "My first fiction book. In the works for ten years now, currently finishing the first draft.",
        image: "/images/portfolio/writing-art.png",
        note: "ongoing… shhh",
        tags: ["writing"],
      },
    ],
  },
];

/** Resolve a work url against the site base path (external urls untouched). */
export function resolveUrl(url, base) {
  if (!url) return undefined;
  return url.startsWith("/") ? base + url : url;
}

export function isExternal(url) {
  return !!url && /^https?:\/\//.test(url);
}
