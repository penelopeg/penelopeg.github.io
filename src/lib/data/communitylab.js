/**
 * Community Lab: offers, testimonials and proof points.
 * Edit prices and copy here; the page reads everything from this file.
 *
 * Payment: nothing is taken on the site. Every button goes to the booking
 * link and the invoice follows the call.
 */

export const BOOKING_URL = "https://calendly.com/penelope-builds/";

/**
 * @typedef {{
 *   id: string,
 *   need: string,
 *   title: string,
 *   text: string,
 *   meta: string,
 *   price?: string,
 *   cta: string,
 *   anchor?: string
 * }} Offer
 */

/** @type {{ id: string, title: string, lead: string, offers: Offer[], note?: string }[]} */
export const doors = [
  {
    id: "leader",
    title: "I lead a community",
    lead: "A meetup, a Discord, a guild, a nonprofit, an event series. You're the one people message, and you want to keep going without burning out.",
    offers: [
      {
        id: "clinic",
        need: "Work through one specific problem",
        title: "Community lead clinic",
        text: "One specific problem, one hour: your first event, losing volunteers, handing over. You leave with a written follow-up.",
        meta: "60 min + written follow-up · online",
        cta: "Book a clinic",
      },
      {
        id: "burnout",
        need: "Ongoing mentoring so I don't burn out",
        title: "Lead without burning out",
        text: "For tech leads and new engineering managers who also run a community. Two calls a month plus chat, so you build the craft before the role wears you down.",
        meta: "3 months minimum · online",
        cta: "Ask about mentoring",
      },
    ],
  },
  {
    id: "org",
    title: "I run a programme or a team",
    lead: "An incubator, an accelerator, a developer community team, an association with chapters. You depend on people who lead without being paid to.",
    offers: [
      {
        id: "format-lab",
        need: "Try a new event format with my leaders",
        title: "Format Lab",
        text: "We run a new event format live, then take it apart: what built community, and what was only execution. Your leaders take the format home.",
        meta: "Half day · on-site or online",
        cta: "Book a call",
      },
      {
        id: "retreat",
        need: "Bring my leaders together for a retreat",
        title: "Leaders' Retreat",
        text: "Two or three days with a co-created agenda. Leaders bring real problems and solve them together. Anywhere in the world.",
        meta: "2–3 days · in person",
        cta: "Design your retreat",
        anchor: "#retreat-planner",
      },
      // Leader Pairs is parked for now:
      // {
      //   id: "pairs",
      //   need: "Pair experienced and newer leaders",
      //   title: "Leader Pairs",
      //   text: "An experienced leader paired with a newer one, with check-ins and a shared project. A structured version of what most networks only suggest.",
      //   meta: "2–3 months · online",
      //   price: "Request a quote",
      //   cta: "Book a call",
      // },
      {
        id: "ecosystem",
        need: "Mentoring for new ecosystem staff",
        title: "Ecosystem builder mentoring",
        text: "For new staff at incubators and support organisations. Six sessions over three months, booked and paid by the organisation.",
        meta: "6 sessions · online",
        cta: "Book a call",
      },
    ],
  },
];

/**
 * Two testimonials, to be added. The section stays hidden until this has
 * entries, so nothing is shown that someone didn't actually say.
 *
 * @type {{ quote: string, name: string, role: string }[]}
 */
export const testimonials = [];

/**
 * "Why me" as a road trip: one stop per chapter, oldest first. Years come from
 * the events page, so adjust them here if any are off.
 *
 * @type {{ when: string, title: string, text: string }[]}
 */
export const roadStops = [
  {
    when: "Early days",
    title: "Where it started",
    text: "Waitressing gigs at big dinners as a kid, a graphic design job making branded material for events, and meetups, hackathons and LAN parties organised at uni.",
  },
  {
    when: "2018–2021",
    title: "Shift Faro, Geek Girls Portugal & Agile Connect",
    text: "A hackathon, workshops and talks across the Algarve with Shift Faro. Events and mentorship for girls in STEM and women in tech with Geek Girls Portugal, which got me named a Top 3 Developer at the Portuguese Women in Tech Awards. And online events connecting agile practitioners with Agile Connect.",
  },
  {
    when: "2021 → now",
    title: "Geek Sessions Faro",
    text: "Community lead behind weekly meetups and an annual tech conference, from concept to hosting.",
  },
  {
    when: "2023 → now",
    title: "Techstars Startup Weekend",
    text: "Facilitator of 8+ weekends, helping entrepreneurs build their first startup.",
  },
  {
    when: "2024",
    title: "Impact Hackers",
    text: "Founder of a community running hackathons for social impact. Our first collaborative hackathon raised €5k+ for a local association, we've collaborated to showcase solarpunk at [Fertil Fest](https://fertil.pt), and communities like [Junk Drawer Community](https://www.instagram.com/junkdrawer.community/) have been born out of this initiative.",
  },
  {
    when: "2025",
    title: "On stage and getting visibility",
    text: "TEDx speaker, Top 5 Best Community Leads, Top 10 finalist at the Rising Female Awards.",
  },
  {
    when: "2026",
    title: "Community Leaders Retreat, Portugal Tech Week",
    text: "Building bigger event formats, like the SheSapiens Community Leaders Retreat: I hosted and facilitated a retreat for the [SheSapiens](https://shesapiens.com) community leaders to work on the future of their communities and on themselves, with [local.foundation](https://local.foundation) and [flourish mode](https://flourishmode.co/). And [Portugal Tech Week](https://portugaltechweek.com), a decentralized tech and innovation festival gathering more than 500 events throughout 15 Portuguese cities, with 8k registrations on the local palace venue alone.",
  },
  {
    when: "Today",
    title: "Systems and people",
    text: "Founder at Local Foundation, mapping how communities form around the world. Senior Engineering Manager at Centric Software. Secretary of the General Assembly board at [351 Startups](https://351startups.com).",
  },
];

export const problems = [
  {
    title: "Leaders are rare and running out of fuel",
    text: "Being a community leader can take a big personal sacrifice for little visible reward, and not only money. When a leader burns out, often the community goes with them.",
  },
  {
    title: "There's no succession",
    text: "Most leaders lead on instinct. Few have the tools to do it well, and fewer know how to hand it on.",
  },
  {
    title: "Events get mistaken for the goal",
    text: "Communities fail when the energy all goes into running events instead of what they're meant to be, a gateway to connection.",
  },
];
