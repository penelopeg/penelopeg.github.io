# Coding Guidelines

Uses svelte. Follows best practices of svelte for code design.
Avoids duplication of code.
Is adapted to be deployed through github actions for a github.io static page. Uses base as a variable to prefix files
Has good SEO for "Penélope Gonçalves" and "lepsies".

# Design Guidelines

Uses tailwind.
Is responsive.
Is mindful of reusable components.
Has accessibility best practices in mind.

## Color Palette

### Primary Colors

- Primary (#0891b2): Main brand color, used for key actions, links, and primary emphasis
- Primary Light (#22d3ee): Hover states for primary elements
- Secondary (#9333ea): Used for gradient effects and secondary actions
- Secondary Light (#c084fc): Hover states for secondary elements
- Accent (#10b981): Special highlights and success states
- Accent Light (#34d399): Hover states for accent elements

### Text Colors

- Text (#0f172a): Main body text
- Text Light (#64748b): Secondary text, subtitles, metadata

### Event/Tag Type Colors

- Conference (#7c3aed): Purple
- Hackathon (#ff66b3): Pink
- Workshop (#06b6d4): Cyan
- Community (#10b981): Green
- Talk (#f59e0b): Orange
- Fireside Chat (#ef4444): Red
- Contest (#8b5cf6): Purple
- Lan Party (#6366f1): Indigo

### Usage Guidelines

1. Brand & Navigation

   - Use Primary for brand elements and main CTAs
   - Use Text for navigation items
   - Use Primary for navigation hover states

2. Heroes & Headers

   - Use Primary to Secondary gradient for hero backgrounds
   - Use white text on dark backgrounds
   - Use Text for headings on light backgrounds

3. Content

   - Use Text for body copy
   - Use Text Light for supporting text
   - Use Primary for interactive elements
   - Use Accent for success states or special callouts

4. Cards & UI Elements

   - Use white backgrounds for cards
   - Use Primary for card interactions
   - Use type-specific colors for tags and badges

5. Footer
   - Use Text color for footer background
   - Use white and reduced opacity white for footer text

### Accessibility Notes

- Maintain contrast ratio of at least 4.5:1 for text
- Use darker shades of colors for text on light backgrounds
- Use white text on colored backgrounds
- Provide hover/focus states for interactive elements
