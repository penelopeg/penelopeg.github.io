<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';

  export let title = '';
  export let subtitle = '';
  export let date = '';
  export let description = '';
  export let tags = [];

  // Posts array (keep in sync with blog listing)
  const posts = [
    { slug: 'resolutions-fail-copycat', title: 'Your resolutions fail because you\'re being a copycat', date: '2026-01-09' },
    { slug: 'in-defense-of-goblin-mode', title: 'In defense of Goblin Mode', date: '2025-12-21' },
    { slug: 'recognition-paradox', title: 'The Recognition Paradox', date: '2025-09-24' },
    { slug: 'drive-30', title: 'Learning how to drive at 30', date: '2025-05-25' },
    { slug: 'things-doomscrolling', title: 'Things to do instead of doomscrolling', date: '2025-05-03' },
    { slug: 'reason-365-consistency', title: 'Reason #365 why you shouldn\'t care about consistency', date: '2025-04-13' },
    { slug: 'thoughts-on-decaf', title: 'Thoughts on decaf', date: '2025-03-29' },
    { slug: 'untitled', title: 'Untitled', date: '2025-03-09' },
  ];

  $: currentSlug = $page.url.pathname.split('/').filter(Boolean).pop();
  $: currentIndex = posts.findIndex(p => p.slug === currentSlug);
  $: previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  $: nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
</script>

<div class="blog-post">
  <div class="container">
    <a href="{base}/blog" class="back-link">← Back to blog</a>

    <article class="post-content">
      <header class="post-header">
        <h1>{title}</h1>
        {#if subtitle}
          <p class="post-subtitle">{subtitle}</p>
        {/if}
        {#if date}
          <time class="post-date">{date}</time>
        {/if}
        {#if description}
          <p class="post-description">{description}</p>
        {/if}
        {#if tags.length > 0}
          <div class="post-tags">
            {#each tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        {/if}
      </header>

      <div class="prose">
        <slot />
      </div>

      <!-- Blog Navigation - Music Player Style -->
      <nav class="blog-navigation">
        <a
          href={previousPost ? `${base}/blog/${previousPost.slug}` : '#'}
          class="nav-button nav-prev"
          class:disabled={!previousPost}
          aria-label={previousPost ? `Previous: ${previousPost.title}` : 'No previous post'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 19 2 12 11 5 11 19"></polygon>
            <polygon points="22 19 13 12 22 5 22 19"></polygon>
          </svg>
        </a>

        <div class="nav-current">
          <div class="current-indicator"></div>
          <span class="current-title">{title}</span>
        </div>

        <a
          href={nextPost ? `${base}/blog/${nextPost.slug}` : '#'}
          class="nav-button nav-next"
          class:disabled={!nextPost}
          aria-label={nextPost ? `Next: ${nextPost.title}` : 'No next post'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 19 22 12 13 5 13 19"></polygon>
            <polygon points="2 19 11 12 2 5 2 19"></polygon>
          </svg>
        </a>
      </nav>
    </article>
  </div>
</div>

<style>
  .blog-post {
    padding: var(--spacing-16) 0;
    min-height: 60vh;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 600;
    margin-bottom: var(--spacing-8);
    padding: var(--spacing-2) var(--spacing-4);
    border: 2px solid var(--color-primary);
    border-radius: 12px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    font-size: 0.9rem;
  }

  .back-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }

  .post-content {
    max-width: 48rem;
    margin: 0 auto;
  }

  .post-header {
    margin-bottom: var(--spacing-12);
    padding-bottom: var(--spacing-8);
    border-bottom: 2px solid var(--color-primary);
    opacity: 0.8;
  }

  .post-header h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: var(--spacing-2);
    color: var(--color-text);
  }

  .post-subtitle {
    font-size: 1.25rem;
    color: var(--color-primary);
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: var(--spacing-4);
    font-style: italic;
  }

  .post-date {
    display: block;
    color: var(--color-text-light);
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: var(--spacing-4);
  }

  .post-description {
    font-size: 1.125rem;
    color: var(--color-text-light);
    line-height: 1.6;
    margin-bottom: var(--spacing-6);
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }

  .tag {
    padding: var(--spacing-2) var(--spacing-3);
    background: var(--color-primary);
    color: white;
    font-size: 0.8rem;
    font-weight: 600;
    border: 2px solid white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  .tag:nth-child(odd) {
    transform: rotate(-1.5deg);
  }

  .tag:nth-child(even) {
    transform: rotate(1.5deg);
  }

  .tag:nth-child(3n) {
    transform: rotate(0.5deg);
  }

  /* Prose Styles */
  .prose {
    color: var(--color-text);
    line-height: 1.8;
  }

  .prose :global(h2) {
    font-size: 2rem;
    margin-top: var(--spacing-12);
    margin-bottom: var(--spacing-4);
    color: var(--color-text);
    position: relative;
    padding-bottom: var(--spacing-2);
  }

  .prose :global(h2::after) {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 3rem;
    height: 4px;
    background: var(--color-primary);
    border-radius: 4px;
  }

  .prose :global(h3) {
    font-size: 1.5rem;
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-4);
    color: var(--color-text);
  }

  .prose :global(h4) {
    font-size: 1.25rem;
    margin-top: var(--spacing-6);
    margin-bottom: var(--spacing-3);
    color: var(--color-text);
  }

  .prose :global(p) {
    margin-bottom: var(--spacing-6);
  }

  .prose :global(a) {
    color: var(--color-primary);
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 2px;
    transition: color 0.2s ease;
  }

  .prose :global(a:hover) {
    color: var(--color-secondary);
  }

  .prose :global(ul),
  .prose :global(ol) {
    margin-bottom: var(--spacing-6);
    padding-left: var(--spacing-8);
  }

  .prose :global(li) {
    margin-bottom: var(--spacing-2);
  }

  .prose :global(blockquote) {
    border-left: 4px solid var(--color-primary);
    padding-left: var(--spacing-6);
    margin: var(--spacing-8) 0;
    font-style: italic;
    color: var(--color-text-light);
    background: rgba(8, 145, 178, 0.08);
    padding: var(--spacing-4) var(--spacing-6);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .prose :global(code) {
    background: rgba(0, 0, 0, 0.05);
    padding: 0.125rem 0.375rem;
    border-radius: 6px;
    font-family: 'Courier New', monospace;
    font-size: 0.875em;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .prose :global(pre) {
    background: rgba(0, 0, 0, 0.9);
    color: #f8f8f2;
    padding: var(--spacing-6);
    margin: var(--spacing-6) 0;
    overflow-x: auto;
    border-radius: 16px;
    border: 3px solid rgba(0, 0, 0, 0.8);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .prose :global(pre code) {
    background: none;
    padding: 0;
    border: none;
    color: inherit;
  }

  .prose :global(img) {
    max-width: 100%;
    height: auto;
    margin: var(--spacing-8) 0;
    border: 5px solid white;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
  }

  /* Image size classes */
  .prose :global(.img-small) {
    max-width: 300px;
  }

  .prose :global(.img-medium) {
    max-width: 500px;
  }

  .prose :global(.img-large) {
    max-width: 700px;
  }

  .prose :global(.img-full) {
    max-width: 100%;
  }

  .prose :global(hr) {
    border: none;
    border-top: 2px solid var(--color-primary);
    margin: var(--spacing-12) 0;
    border-radius: 2px;
    opacity: 0.5;
  }

  @media (max-width: 640px) {
    .post-header h1 {
      font-size: 2rem;
    }

    .prose :global(h2) {
      font-size: 1.5rem;
    }

    .prose :global(h3) {
      font-size: 1.25rem;
    }
  }

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    margin: var(--spacing-8) 0;
    border-radius: 16px;
    border: 5px solid white;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
  }

  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }

  /* Large video that breaks out of content width */
  .prose :global(.video-wrapper-large) {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    margin: var(--spacing-12) calc(-1 * var(--spacing-8));
    border-radius: 16px;
    border: 5px solid white;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
  }

  .prose :global(.video-wrapper-large iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }

  /* Centering utilities */
  .prose :global(.center-text) {
    text-align: center;
  }

  .prose :global(.center-image) {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .prose :global(.center) {
    text-align: center;
  }

  @media (max-width: 768px) {
    .prose :global(.video-wrapper-large) {
      margin-left: 0;
      margin-right: 0;
    }
  }

  /* Blog Navigation - Music Player Style */
  .blog-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-4);
    margin-top: var(--spacing-16);
    padding: var(--spacing-6);
    background: white;
    border-radius: 20px;
    border: 4px solid var(--color-primary);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
    transform: rotate(-0.5deg);
  }

  .nav-button {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-3) var(--spacing-4);
    background: var(--color-primary);
    color: white;
    text-decoration: none;
    border-radius: 12px;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;
    font-weight: 600;
    font-size: 0.9rem;
    min-width: 48px;
    justify-content: center;
  }

  .nav-button:hover:not(.disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    background: var(--color-primary-light);
  }

  .nav-button.disabled {
    background: #cbd5e1;
    color: #94a3b8;
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  .nav-current {
    flex: 1;
    text-align: center;
    padding: 0 var(--spacing-4);
  }

  .current-indicator {
    width: 8px;
    height: 8px;
    background: var(--color-primary);
    border-radius: 50%;
    margin: 0 auto var(--spacing-2);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.2);
    }
  }

  .current-title {
    display: block;
    font-weight: 700;
    color: var(--color-text);
    font-size: 0.85rem;
    line-height: 1.3;
  }

  @media (max-width: 640px) {
    .nav-current {
      padding: var(--spacing-2) 0;
    }

    .current-title {
      font-size: 0.75rem;
    }
  }
</style>
