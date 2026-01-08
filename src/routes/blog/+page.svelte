<script>
  import { base } from '$app/paths';

  const posts = [
    {
      slug: 'recognition-paradox',
      title: 'The Recognition Paradox',
      description: 'Thoughts on identity, networking, and the struggle between wanting recognition and being terrified of being seen.',
      date: '2025-09-24',
      tags: ['community', 'networking', 'personal']
    },
    {
      slug: 'drive-30',
      title: 'Learning how to drive at 30',
      description: 'On learning to drive at 30, facing fears, and how avoiding things doesn't make them go away.',
      date: '2025-05-25',
      tags: ['personal', 'growth', 'community']
    },
    {
      slug: 'things-doomscrolling',
      title: 'Things to do instead of doomscrolling',
      description: 'A chaotic list of productive procrastination and thoughts on escaping the digital doomscroll.',
      date: '2025-05-03',
      tags: ['personal', 'writing', 'productivity']
    },
    {
      slug: 'hello-world',
      title: 'Hello World: First Post',
      description: 'Welcome to my blog! This is where I share thoughts on technology, community building, and creative chaos.',
      date: '2025-01-15',
      tags: ['meta', 'introduction']
    }
  ];

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<div class="blog-hero">
  <div class="container">
    <h1 class="chaos-rotate-1">Blog</h1>
    <div class="handwritten" style="position: absolute; top: 20px; right: 20px; color: white; z-index: 100;">
      my thoughts!
    </div>
    <p class="lead chaos-spacing">Thoughts on tech, community, and creative chaos</p>
  </div>
</div>

<div class="blog-content">
  <div class="container">
    {#if posts.length === 0}
      <div class="empty-state wonky-border chaos-rotate-2">
        <h2 class="scribble-underline">Coming Soon!</h2>
        <p>I'm working on some exciting content. Check back soon for articles on community building, tech leadership, and creative adventures.</p>
        <div class="handwritten" style="position: absolute; bottom: -25px; right: -30px; z-index: 100;">
          stay tuned!
        </div>
      </div>
    {:else}
      <div class="posts-grid">
        {#each posts as post, i}
          <a
            href="{base}/blog/{post.slug}"
            class="post-card wonky-border chaos-rotate-{(i % 4) + 1}"
          >
            <div class="post-info">
              <time class="post-date">{formatDate(post.date)}</time>
              <h2 class="scribble-underline">{post.title}</h2>
              <p>{post.description}</p>
              {#if post.tags.length > 0}
                <div class="post-tags">
                  {#each post.tags as tag}
                    <span class="tag">{tag}</span>
                  {/each}
                </div>
              {/if}
            </div>
            <div class="read-more">
              Read more →
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .blog-hero {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: var(--spacing-16) 0;
    text-align: center;
    transform: rotate(-0.5deg);
    transform-origin: center center;
    position: relative;
  }

  .blog-hero h1 {
    margin-bottom: var(--spacing-4);
  }

  .lead {
    font-size: 1.25rem;
    opacity: 0.9;
  }

  .blog-content {
    padding: var(--spacing-16) 0;
    transform: rotate(0.3deg);
    transform-origin: center center;
    position: relative;
  }

  .empty-state {
    text-align: center;
    padding: var(--spacing-12);
    max-width: 40rem;
    margin: 0 auto;
    position: relative;
  }

  .empty-state h2 {
    margin-bottom: var(--spacing-4);
    color: var(--color-primary);
  }

  .empty-state p {
    color: var(--color-text-light);
    font-size: 1.125rem;
    line-height: 1.6;
  }

  .posts-grid {
    display: grid;
    gap: var(--spacing-8);
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 768px) {
    .posts-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .posts-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .post-card {
    display: flex;
    flex-direction: column;
    padding: var(--spacing-6);
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease;
    position: relative;
  }

  .post-card:hover {
    transform: translateY(-4px) rotate(0deg) !important;
  }

  .post-info {
    flex: 1;
  }

  .post-date {
    display: block;
    color: var(--color-text-light);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: var(--spacing-3);
  }

  .post-card h2 {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-3);
    color: var(--color-text);
  }

  .post-card p {
    color: var(--color-text-light);
    font-size: 0.875rem;
    line-height: 1.6;
    margin-bottom: var(--spacing-4);
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-4);
  }

  .tag {
    padding: var(--spacing-1) var(--spacing-3);
    background: var(--color-primary);
    color: white;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    border: 2px solid rgba(0, 0, 0, 0.4);
    border-radius: 0;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
  }

  .tag:nth-child(odd) {
    transform: rotate(-0.5deg);
  }

  .tag:nth-child(even) {
    transform: rotate(0.5deg);
  }

  .read-more {
    color: var(--color-primary);
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-top: auto;
    padding-top: var(--spacing-4);
    border-top: 2px solid rgba(0, 0, 0, 0.1);
  }

  .post-card:hover .read-more {
    text-decoration: underline;
    text-decoration-thickness: 2px;
  }
</style>
