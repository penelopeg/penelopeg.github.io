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

## Design System: "Digital Warmth"

High-tech meets craft. Grounded earth tones with electric pops, an editorial
serif against a functional sans/mono, paper grain and handwritten margin notes.
It should feel raw, elevated and human, never like a sterile corporate portfolio.
Full reference: `DESIGN_SYSTEM.md`. Tokens live in `src/app.css`.

### Color Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#f3ebdd` | page background |
| `--paper-deep` | `#e9dcc5` | page heroes, lab section |
| `--paper-card` | `#fbf6ec` | cards, frames |
| `--ink` | `#26211c` | body text, borders, footer |
| `--ink-soft` | `#5d5348` | secondary text |
| `--terracotta` | `#b4492b` | primary: links, CTAs, accents |
| `--olive` | `#4d5a2b` | "Limited Run" section, workshop tags |
| `--slate` | `#2f3236` | dark sections (presence, blog post hero) |
| `--cobalt` | `#2a44e0` | electric pop, focus ring |
| `--coral` | `#ff6a4d` | electric pop: highlights, ticker label |
| `--ochre` | `#d4962a` | tape, underlines, status pills |

Legacy aliases (`--color-primary`, `--color-secondary`, `--color-text`, …) map
onto these, so prefer the named tokens in new code. Coral and ochre are
backgrounds/decoration only; don't use them for text on paper (contrast).

### Typography

- **Display**: Fraunces (`--font-display`), with italics + `"SOFT" 100, "WONK" 1` for emphasis words (`.serif-italic`)
- **Body**: Instrument Sans (`--font-sans`)
- **Labels / meta / nav**: JetBrains Mono (`--font-mono`, `.eyebrow`)
- **Margin notes**: Caveat (`--font-handwritten`, `.handwritten`)

### Patterns

- **Buttons**: pill shape, 2px ink border, printed offset shadow (`3px 3px 0 var(--ink)`); hover nudges up-left
- **Cards / frames**: paper card, 1px `--line` border, soft warm shadow, `.tape` strips for a pinned-up feel
- **Raw-layer reveal**: work thumbnails peel back on hover/focus to show a sketch or handwritten note (`WorkCard`)
- **Section headings**: mono eyebrow + optional index chip + Fraunces title (`SectionHeading`)
- **Motion**: subtle lifts and small rotations (≤3deg) only; everything respects `prefers-reduced-motion`
- Keep 4.5:1 contrast, visible `:focus-visible` states, and semantic landmarks

### Homepage structure ("The Lab & The Story")

Hero statement → lab ticker → Selected Works (three buckets) → Current
Experiments (lab log + latest posts) → Limited Runs (offline) → Presence
(audio/video). All content is data-driven from `src/lib/data/`:

- `works.js`: buckets and works (also powers `/portfolio`); add `sketch` for a scanned sketch reveal
- `lab.js`: work-in-progress experiments, newest first
- `offline.js`: limited-run gatherings
- `media.js`: audio/video clips (files in `static/media/`); clips without `src` show "recording soon"

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
3. Add the post to the top of `/src/lib/data/posts.js`

### RSS Feed

- **Location**: `/src/routes/feed/+server.js`
- **Format**: RSS 2.0 with proper XML escaping
- **Auto-discovery**: Meta tag in `Seo.svelte` component

`src/lib/data/posts.js` is the single source of truth for the blog listing,
the homepage and the RSS feed. Don't duplicate the posts array elsewhere.

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
