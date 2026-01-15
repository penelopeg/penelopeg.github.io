<script>
  import { base } from '$app/paths';

  export let title = '';
  export let subtitle = '';
  export let date = '';
  export let description = '';
  export let tags = [];
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
</style>
