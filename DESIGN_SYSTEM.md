# Digital Warmth: Design System

> High-tech meets craft. A portfolio that feels like a well-loved studio
> notebook: grounded, tactile, a little electric.

## Principles

1. **Warm, not clinical.** Earth tones and paper grain instead of neon-on-black.
2. **Editorial with a pulse.** A characterful serif for story; mono for systems.
3. **Show the process.** Raw notes, sketches and works-in-progress sit next to finished pieces.
4. **Offline has weight.** Real-world gatherings are presented as scarce, "limited run" artefacts.
5. **Presence over polish.** Voice, sound and movement where possible.

## Tokens (`src/app.css`)

### Colour

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#f3ebdd` | background |
| `--paper-deep` | `#e9dcc5` | lab |
| `--paper-card` | `#fbf6ec` | cards |
| `--ink` | `#26211c` | text, borders |
| `--ink-soft` | `#5d5348` | secondary text |
| `--terracotta` | `#b4492b` | primary |
| `--olive` | `#4d5a2b` | grounded secondary |
| `--slate` | `#2f3236` | dark surfaces |
| `--cobalt` | `#2a44e0` | electric accent, focus |
| `--coral` | `#ff6a4d` | electric accent (decorative) |
| `--ochre` | `#d4962a` | tape, underlines (decorative) |
| `--ochre-light` | `#f7cf7a` | italic accents on the header (large text) |
| `--sun-dot` | `#e2683f` | halftone sun dots |
| `--line` | ink @ 16% | hairlines |

`--grain` is an inline SVG noise texture layered on paper surfaces.

### Header ("Riso sun")

- Flat `--terracotta` + `--grain` on the nav and all page heroes; no smooth gradients
- `--halftone-sun`: `radial-gradient(var(--sun-dot) 30%, transparent 32%) 0 0 / 14px 14px` clipped to a circle
  - homepage: 34rem circle behind the portrait (22rem, bottom-right on mobile)
  - inner pages (`.ct-hero::after`): rising from the bottom-right
- `--on-hero`: paper text (4.5:1 on terracotta; never reduce its opacity)
- `--on-hero-accent`: ochre-light, for large italic emphasis only
- The logo mark is recoloured to paper with a CSS filter in the nav

## Components

| Component | Purpose |
| --- | --- |
| `SectionHeading` | index chip + eyebrow + title + blurb |
| `WorkCard` | taped frame; hover/focus peels the image to reveal `sketch` or `note` |
| `LabTicker` | decorative live marquee (aria-hidden; content is listed accessibly elsewhere) |
| `OfflineTicket` | ticket stub with "Limited Run" tag and edition |
| `MediaClip` | cassette-styled audio/video player with optional transcript |
| `FilterTags` | mono pill filters with colour dot, `aria-pressed` |

## Global classes

`.button` (+ `-primary`, `-secondary`, `-accent`, `-ghost`), `.card`, `.ct-hero`,
`.ct-hero--dark`, `.ct-tag`, `.eyebrow`, `.serif-italic`, `.handwritten`,
`.scribble-underline`, `.tape`, `.visually-hidden`.

Legacy `chaos-*` / `wonky-border` hooks still exist so older pages keep
working, but are toned down (no rotation). Don't use them in new code.

## Accessibility

- Skip link, landmark labels, `aria-current` in nav
- `:focus-visible` cobalt ring; hover effects also trigger on focus
- `prefers-reduced-motion` disables animation globally
- Absolutely-positioned margin notes are hidden below 768px
