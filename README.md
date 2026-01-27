# Penélope Gonçalves - Portfolio Website

Personal portfolio and blog for Penélope Gonçalves, showcasing work as a Tech Lead, Community Builder, and Founder.

## 🌟 Features

- **Portfolio Showcase**: Projects, talks, and community work
- **Blog with Markdown**: Write blog posts in Markdown with mdsvex
- **RSS Feed**: Subscribe to blog updates at `/blog/rss.xml`
- **Tumblr 2012 Aesthetic**: Rounded corners, sticker-style elements, soft shadows
- **Responsive Design**: Mobile-first, works across all devices
- **SEO Optimized**: Meta tags, structured data, RSS auto-discovery
- **Static Site**: Fast, secure, deployed to GitHub Pages

## 🛠️ Tech Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS + Custom CSS
- **Markdown**: mdsvex for blog posts
- **Deployment**: GitHub Actions → GitHub Pages
- **Fonts**: Roboto, Space Grotesk, Kalam (handwritten)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/penelopeg/penelopeg.github.io.git
cd penelopeg.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
npm run dev -- --open
```

### Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for issues
npm run check
```

## 📝 Adding Blog Posts

1. Create a new directory: `src/routes/blog/your-slug/`
2. Create `+page.md` with frontmatter:

```markdown
---
layout: blog
title: "Your Title"
subtitle: "Optional subtitle"
date: "2025-01-15"
description: "Brief description for listing page"
tags: ["tag1", "tag2"]
---

Your markdown content here...
```

3. Update `src/routes/blog/+page.svelte` to add post to listing
4. Update `src/routes/blog/rss.xml/+server.js` to add post to RSS feed

See `src/routes/blog/README.md` for detailed instructions.

## 🎨 Design System

### Aesthetic: Tumblr 2012 Sticker Style

- **Rounded Corners**: 12-20px border radius
- **Soft Shadows**: Blur shadows instead of hard offsets
- **Sticker Elements**: White borders, lift animations
- **Playful Rotations**: 1-3° asymmetric tilts
- **Hover Effects**: Lift up on hover with increased shadows

### Color Palette

- **Primary**: `#0891b2` (cyan/teal)
- **Secondary**: `#9333ea` (purple)
- **Accent**: `#10b981` (green)
- **Text**: `#0f172a` (dark slate)

## 📂 Project Structure

```
src/
├── lib/
│   └── components/      # Reusable components
│       ├── Seo.svelte
│       ├── BlogLayout.svelte
│       └── FilterTags.svelte
├── routes/
│   ├── +layout.svelte   # Main layout with nav/footer
│   ├── +page.svelte     # Home page
│   ├── about/
│   ├── portfolio/
│   ├── speaker/
│   └── blog/
│       ├── +page.svelte        # Blog listing
│       ├── rss.xml/
│       │   └── +server.js      # RSS feed generator
│       └── [post-slug]/
│           └── +page.md        # Individual posts
└── app.css              # Global styles
```

## 🔧 Configuration

### GitHub Pages Base Path

The site uses a base path for GitHub Pages deployment. All internal links use the `{base}` variable:

```svelte
<script>
  import { base } from '$app/paths';
</script>

<a href="{base}/blog">Blog</a>
```

### RSS Feed

RSS feed is automatically generated from blog posts in `src/routes/blog/rss.xml/+server.js`. Auto-discovery meta tag is included in `Seo.svelte`.

**Subscribe**: `https://penelopeg.github.io/penelopeg.github.io/blog/rss.xml`

## 🚢 Deployment

Deployed automatically via GitHub Actions on push to `master` branch. Built with `@sveltejs/adapter-static` for static site generation.

## 📄 License

Personal portfolio - All rights reserved.

## 🤝 Contact

- Website: [penelopeg.github.io](https://penelopeg.github.io/penelopeg.github.io)
- LinkedIn: [linkedin.com/in/penelopeg](https://linkedin.com/in/penelopeg)
- Substack: [lepsies.substack.com](https://lepsies.substack.com)
