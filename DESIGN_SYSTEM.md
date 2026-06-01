# Chaos Theory Design System — Implementation Notes

## Overview

The site uses the **Chaos Theory** design system: a "Tumblr 2012 sticker" aesthetic with playful rotations, polaroid cards, handwritten margin notes, and punk-zine tags.

## Hero Treatment (Updated)

The old cyan→purple gradient hero has been **retired**. All heroes now use one of two treatments:

### Light Hero (cream paper) — default
- Background: `#fdf8ef` (warm cream)
- Text: `var(--color-text)` (dark slate)
- Decorations: cyan candy-stripe along the bottom edge, orange "masking tape" sticker top-left
- Transform: `rotate(-0.5deg)` for slight tilt
- CSS class: `.ct-hero`

### Dark Hero (slate) — blog posts, CV in mix mode, all pages in dark mode
- Background: `var(--color-text)` (`#0f172a` dark slate)
- Text: white
- Decorations: 10px cyan rail down the left edge, green dot top-right with glow halo
- CSS class: `.ct-hero--dark` (or `.ct-hero--dark-context` for pages that are dark only in mix mode)

### Theming (Light / Mix / Dark)
The nav has a three-segment toggle (☀️ / 🔀 / 🌙) stored in `localStorage` under `ct_theme`.  
The root `.app` div gets `data-theme={theme}`.

- **Light**: all heroes are cream
- **Dark**: all heroes are slate
- **Mix** (default): most pages cream, CV + blog posts stay slate for darker reading context

## Updated Design Tokens

```css
--border-radius-sticker: 6px;   /* was 16px — tighter sticker corners */
--border-radius-card: 8px;      /* was 20px — flatter polaroid cards */

/* Hero */
--hero-bg-light:   #fdf8ef;
--hero-bg-dark:    #0f172a;
--hero-stripe:     #0891b2;     /* cyan candy-stripe */
--hero-tape:       #f59e0b;     /* orange tape sticker */
--hero-rail:       #0891b2;     /* cyan left rail (dark) */
--hero-dot:        #10b981;     /* green dot (dark) */

/* Shadows */
--shadow-tag-hard: 2px 2px 0 rgba(0,0,0,0.20);  /* punk-zine hard offset */

/* Motion */
--lift-hover:      translateY(-2px);
--lift-card-hover: translateY(-4px);
```

## Tags — Punk-Zine Square Style

Tags use **square corners** (`border-radius: 0`), a hard drop shadow (`2px 2px 0 rgba(0,0,0,0.2)`), uppercase text, and a 2px dark border. They alternate micro-tilts (±0.5deg) via `.ct-tag-row` context.

Classes: `.ct-tag`, `.ct-tag--sm`, `.ct-tag--lg`, `.ct-tag--{category}`.

Category tints use CSS vars: `--color-tag-conference`, `--color-tag-hackathon`, etc.

## Navigation

- Events and CV links are now visible (were commented out)
- Theme switch widget sits at the end of desktop nav
- Mobile nav includes a theme switch row

## Blog Post Layout

Each blog post now starts with a dark slate hero (`BlogLayout.svelte`) showing the post title. The existing retro **lepsies fm** iPod click-wheel player at the bottom navigates prev/next posts.

## Retro MP3 Player

The `BlogLayout.svelte` renders a silver iPod-style navigation widget at the bottom of every blog post:
- Silvery gradient body with click wheel
- Green LCD screen showing post title + animated progress bar
- ← prev / → next navigation (disabled at ends)
- Center button returns to blog listing
- "lepsies fm" handwritten sticker label

## Component CSS Classes Reference

| Class | Purpose |
|---|---|
| `.ct-hero` | Cream paper hero section |
| `.ct-hero--dark` | Slate hero (always dark) |
| `.ct-hero--dark-context` | Slate in mix/dark mode, cream in light |
| `.ct-section` | Section with subtle 0.3deg rotation |
| `.ct-tag` | Square punk-zine tag |
| `.ct-tag-row` | Flex container with alternating tag tilts |
| `.ct-filter-chip` | Rounded sticker filter button |
| `.ct-filter-chip--active` | Dark active state for filter chip |
| `.ct-tagline-band` | Colored accent band below CV hero |
| `.ct-theme-switch` | Three-segment theme toggle |
| `.ct-strikethrough` | Hover-reveals role text (home hero) |
| `.chaos-rotate-{1-4}` | Tilt assignments for chaos grid items |
| `.wonky-border` | White-rimmed polaroid card |
| `.handwritten` | Kalam font annotation (purple) |
| `.scribble-underline` | SVG wavy underline |
