import { base } from '$app/paths';

const siteURL = 'https://penelopebuilds.me';
const siteTitle = 'Penélope Gonçalves';
const siteDescription = 'Thoughts on life, community, culture and creative chaos';

const posts = [
  {
    slug: 'resolutions-fail-copycat',
    title: 'Your resolutions fail because you\'re being a copycat',
    description: 'Why blindly copying others\' routines leads to failed resolutions, and how to adapt advice to your own circumstances.',
    date: '2026-01-09',
    tags: ['personal', 'productivity', 'growth']
  },
  {
    slug: 'in-defense-of-goblin-mode',
    title: 'In defense of Goblin Mode',
    description: 'Embracing productive chaos and rejecting social perfectionism through intentionally unscripted living.',
    date: '2025-12-21',
    tags: ['personal', 'productivity', 'mental-health']
  },
  {
    slug: 'recognition-paradox',
    title: 'The Recognition Paradox',
    description: 'Thoughts on identity, networking, and the struggle between wanting recognition and being terrified of being seen.',
    date: '2025-09-24',
    tags: ['community', 'networking', 'personal']
  },
  {
    slug: 'drive-30',
    title: 'Learning how to drive at 30',
    description: 'On learning to drive at 30, facing fears, and how avoiding things don\'t make them go away.',
    date: '2025-05-25',
    tags: ['personal', 'growth', 'community']
  },
  {
    slug: 'things-doomscrolling',
    title: 'Things to do instead of doomscrolling',
    description: 'A chaotic list of productive procrastination and thoughts on escaping the digital doomscroll.',
    date: '2025-05-03',
    tags: ['personal', 'writing', 'productivity']
  },
  {
    slug: 'reason-365-consistency',
    title: 'Reason #365 why you shouldn\'t care about consistency',
    description: 'Thoughts on how platform changes, rigid routines, and the pursuit of consistency can kill creativity and authenticity.',
    date: '2025-04-13',
    tags: ['personal', 'writing', 'productivity']
  },
  {
    slug: 'thoughts-on-decaf',
    title: 'Thoughts on decaf',
    description: 'Personal reflections on caffeine, energy management, and whether society\'s obsession with coffee delivers on its promises.',
    date: '2025-03-29',
    tags: ['personal', 'productivity']
  },
  {
    slug: 'untitled',
    title: 'Untitled',
    description: 'Reflections on the fear of titles, labels, and the struggle to share creative work without needing to be exceptional.',
    date: '2025-03-09',
    tags: ['personal', 'writing', 'creativity']
  }
];

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toRFC822Date(dateString) {
  const date = new Date(dateString);
  return date.toUTCString();
}

export async function GET() {
  const body = generateRSS();

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}

function generateRSS() {
  const basePath = base || '';

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <description>${escapeXml(siteDescription)}</description>
    <link>${siteURL}${basePath}/blog</link>
    <atom:link href="${siteURL}${basePath}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${toRFC822Date(posts[0].date)}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${siteURL}${basePath}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteURL}${basePath}/blog/${post.slug}</guid>
      <pubDate>${toRFC822Date(post.date)}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;
}
