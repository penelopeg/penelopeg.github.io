# Blog

This directory contains blog posts written in Markdown.

## Adding a New Blog Post

1. Create a new directory: `src/routes/blog/your-post-slug/`
2. Create a `+page.md` file in that directory
3. Add frontmatter at the top of the file:

```markdown
---
layout: blog
title: "Your Post Title"
subtitle: "An optional catchy subtitle"
date: "YYYY-MM-DD"
description: "A brief description of your post"
tags: ["tag1", "tag2"]
---

# Your Content Here

Write your blog post content using Markdown...
```

**Frontmatter Fields:**
- `layout` (required): Must be "blog"
- `title` (required): Main post title
- `subtitle` (optional): A catchy subtitle displayed below the title
- `date` (required): Publication date in YYYY-MM-DD format
- `description` (optional): Brief description shown on listing page
- `tags` (optional): Array of tags for categorization

4. Update `/src/routes/blog/+page.svelte` to add your post to the listing:

```javascript
const posts = [
  {
    slug: 'your-post-slug',
    title: 'Your Post Title',
    description: 'A brief description',
    date: 'YYYY-MM-DD',
    tags: ['tag1', 'tag2']
  },
  // ... existing posts
];
```

## Markdown Features

The blog supports:

- **Headings**: `# H1`, `## H2`, `### H3`, etc.
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Links**: `[text](url)`
- **Images**: `![alt text](image-url)`
- **Code blocks**: Triple backticks for code
- **Inline code**: Single backticks
- **Blockquotes**: `> quote text`
- **Lists**: Ordered and unordered lists

5. Update `/src/routes/blog/rss.xml/+server.js` to add your post to the RSS feed:

```javascript
const posts = [
  {
    slug: 'your-post-slug',
    title: 'Your Post Title',
    description: 'A brief description',
    date: 'YYYY-MM-DD',
    tags: ['tag1', 'tag2']
  },
  // ... existing posts
];
```

## RSS Feed

The blog has an RSS feed that automatically includes all posts:

- **Feed URL**: `/blog/rss.xml`
- **Auto-discovery**: Meta tag in `<head>` for RSS readers
- **Format**: RSS 2.0 with proper XML structure
- **Updates**: Regenerated on each deployment

To test the feed locally: `http://localhost:5173/penelopeg.github.io/blog/rss.xml`

## Styling

The blog uses the tumblr 2012 sticker aesthetic matching the rest of the site:
- **Rounded corners**: 12-20px border radius
- **Soft shadows**: Blur shadows with depth
- **Sticker elements**: White borders, lift animations
- **Playful rotations**: 1-3° asymmetric tilts
- **Primary color accents**: Cyan/teal for links and highlights
