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

### Design Patterns

- Use Primary to Secondary gradient for hero sections
- White backgrounds for cards with Primary for interactions
- Maintain 4.5:1 contrast ratio minimum
- Provide hover/focus states for all interactive elements

## File Structure Guidelines

- Components in `/src/lib/components/`
- Pages in `/src/routes/`
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
