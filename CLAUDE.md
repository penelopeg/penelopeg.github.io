# Claude Guidelines for Penélope's Portfolio Website

## Technical Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Actions to GitHub Pages (static)
- **Base Path**: Use `base` variable to prefix all asset paths for GitHub Pages deployment

## Development Guidelines

### Code Quality

- Follow Svelte best practices and conventions
- Avoid code duplication - create reusable components
- Use TypeScript where applicable
- Maintain responsive design principles
- Implement accessibility best practices (WCAG guidelines)

### SEO Optimization

- Optimize for keywords: "Penélope Gonçalves" and "lepsies"
- Use proper meta tags and structured data
- Implement semantic HTML structure
- Ensure fast loading times

### Component Architecture

- Create reusable components when patterns emerge
- Use Svelte stores for state management when needed
- Follow existing component patterns in the codebase
- Keep components focused and single-purpose

## Design System

### Color Palette

**Primary Colors:**

- Primary: `#0891b2` (main brand, CTAs, links)
- Primary Light: `#22d3ee` (hover states)
- Secondary: `#9333ea` (gradients, secondary actions)
- Secondary Light: `#c084fc` (hover states)
- Accent: `#10b981` (highlights, success states)
- Accent Light: `#34d399` (hover states)

**Text Colors:**

- Text: `#0f172a` (main body text)
- Text Light: `#64748b` (secondary text, metadata)

**Event/Tag Colors:**

- Conference: `#7c3aed`, Hackathon: `#ff66b3`, Workshop: `#06b6d4`
- Community: `#10b981`, Talk: `#f59e0b`, Fireside Chat: `#ef4444`
- Contest: `#8b5cf6`, Lan Party: `#6366f1`

### Design Aesthetic: Tumblr 2012 Sticker Style

**Key Principles:**
- **Rounded Corners**: Use `--border-radius-sticker` (16px) for buttons/tags, `--border-radius-card` (20px) for cards
- **Soft Shadows**: Multi-layer shadows with blur: `0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)`
- **White Borders**: 3-4px white borders on interactive elements for sticker effect
- **Lift Animations**: `translateY(-2px)` to `translateY(-4px)` on hover with increased shadow
- **Playful Rotations**: Use `rotate(1-3deg)` with nth-child selectors for asymmetry
- **Sticker Overlaps**: Elements can overlap slightly with different z-indexes

**Design Patterns:**
- Use Primary to Secondary gradient for hero sections
- White backgrounds for cards with Primary color for interactions
- Sticker-style buttons with white borders and soft shadows
- Maintain 4.5:1 contrast ratio minimum
- Provide hover/focus states with lift animations for all interactive elements

**CSS Variables:**
```css
--border-radius-sticker: 16px;
--border-radius-card: 20px;
```

**Button Pattern:**
```css
.button {
  border-radius: var(--border-radius-sticker);
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.15);
}
```

## Blog System

### Adding Blog Posts

1. Create directory: `/src/routes/blog/post-slug/`
2. Create `+page.md` with frontmatter:
   ```markdown
   ---
   layout: blog
   title: "Post Title"
   subtitle: "Optional subtitle"
   date: "YYYY-MM-DD"
   description: "Brief description"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Update `/src/routes/blog/+page.svelte` posts array
4. Update `/src/routes/blog/rss.xml/+server.js` posts array

### RSS Feed

- **Location**: `/src/routes/blog/rss.xml/+server.js`
- **Format**: RSS 2.0 with proper XML escaping
- **Auto-discovery**: Meta tag in `Seo.svelte` component
- **Updates**: Manually sync posts array with blog listing

**Important**: Always keep the posts arrays in sync between:
- `blog/+page.svelte` (listing)
- `blog/rss.xml/+server.js` (RSS feed)

## File Structure Guidelines

- Components in `/src/lib/components/`
- Pages in `/src/routes/`
- Blog posts in `/src/routes/blog/[post-slug]/+page.md`
- Styles use Tailwind classes
- Assets referenced with `{base}/` prefix

## Testing & Quality

- Test responsive design across breakpoints
- Verify accessibility with screen readers
- Check SEO meta tags and structured data
- Validate HTML and ensure semantic markup

## Deployment Considerations

- All asset paths must use `{base}` variable
- Static site generation compatible code only
- No server-side dependencies
- Optimize for fast loading and good Core Web Vitals
