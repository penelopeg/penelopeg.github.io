/**
 * The roles struck through in the hero. On scroll, each strike peels off its
 * word and becomes a card for that role (see StrikeHero.svelte).
 *
 * `bg` / `fg` are the strike + card colours; they must read on terracotta.
 * `href` is a site path (prefixed with base when rendered) or an external URL.
 *
 * @typedef {{
 *   word: string,
 *   title: string,
 *   description: string,
 *   href: string,
 *   cta: string,
 *   bg: string,
 *   fg: string
 * }} Role
 */

/** @type {Role[]} */
export const roles = [
  {
    word: 'ecosystem builder',
    title: 'Ecosystem Builder',
    description:
      'Creating communities that want to create a positive impact @ Geek Sessions, Impact Hackers, 351 Startups, and more.',
    href: '/events',
    cta: 'Gatherings',
    bg: 'var(--ochre-light)',
    fg: 'var(--ink)'
  },
  {
    word: 'founder',
    title: 'Founder & Head of Signals',
    description:
      'Community development research & tool building to understand regional and global impact @ local.foundation.',
    href: 'https://local.foundation',
    cta: 'local.foundation',
    bg: 'var(--cobalt)',
    fg: 'var(--paper)'
  },
  {
    word: 'tech lead',
    title: 'Tech Team Lead',
    description: 'Leading an engineering team to deliver high-quality PIM/DAM software @ Centric Software. (Day job!)',
    href: '/cv',
    cta: 'CV',
    bg: 'var(--ink)',
    fg: 'var(--paper)'
  },
  {
    word: 'speaker',
    title: 'Speaker',
    description: 'Sharing insights and experiences, with a focus on elevating new, emerging impact builders.',
    href: '/speaker',
    cta: 'Talks',
    bg: 'var(--paper-card)',
    fg: 'var(--ink)'
  },
  {
    word: 'writer',
    title: 'Writer',
    description:
      'Legendary Google Keep notes writer, a thousand fiction projects to publish, the occasional diary entry @ Substack.',
    href: '/blog',
    cta: 'Writing',
    bg: 'var(--olive)',
    fg: 'var(--paper)'
  },
  {
    word: 'artist',
    title: 'Artist',
    description:
      'Exploring creativity (and a lack of natural talent) through digital art, visual storytelling and the occasional design.',
    href: 'https://instagram.com/lepsies_art',
    cta: 'Art',
    bg: 'var(--coral)',
    fg: 'var(--ink)'
  }
];
