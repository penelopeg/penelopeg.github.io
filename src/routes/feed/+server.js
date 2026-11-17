import { posts } from "$lib/data/posts.js";

export const prerender = true;

// Hardcode canonical URLs — don't use SvelteKit's base path here
// since the site is a user page (penelopeg.github.io) with custom domain
const siteURL = "https://penelopebuilds.me";
const siteTitle = "Penélope Gonçalves";
const siteDescription =
  "Thoughts on life, community, culture and creative chaos";

function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRFC822Date(dateString) {
  const date = new Date(dateString);
  return date.toUTCString();
}

export async function GET() {
  const body = generateRSS();

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
}

function generateRSS() {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <description>${escapeXml(siteDescription)}</description>
    <link>${siteURL}/blog</link>
    <atom:link href="${siteURL}/feed" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${toRFC822Date(posts[0].date)}</lastBuildDate>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${siteURL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteURL}/blog/${post.slug}</guid>
      <pubDate>${toRFC822Date(post.date)}</pubDate>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`,
      )
      .join("")}
  </channel>
</rss>`;
}
