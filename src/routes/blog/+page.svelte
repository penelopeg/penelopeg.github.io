<script>
  import { base } from '$app/paths';

  const posts = [
    {
      slug: 'resolutions-fail-copycat',
      title: 'Your resolutions fail because you\'re being a copycat',
      description: 'Why blindly copying others\' routines leads to failed resolutions, and how to adapt advice to your own circumstances.',
      date: '2026-01-09',
      tags: ['personal', 'productivity', 'growth']
    },
    {
      slug: 'in-defense-of-goblin-mode',
      title: 'In defense of Goblin Mode',
      description: 'Embracing productive chaos and rejecting social perfectionism through intentionally unscripted living.',
      date: '2025-12-21',
      tags: ['personal', 'productivity', 'mental-health']
    },
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
      description: 'On learning to drive at 30, facing fears, and how avoiding things don\'t make them go away.',
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
      slug: 'reason-365-consistency',
      title: 'Reason #365 why you shouldn\'t care about consistency',
      description: 'Thoughts on how platform changes, rigid routines, and the pursuit of consistency can kill creativity and authenticity.',
      date: '2025-04-13',
      tags: ['personal', 'writing', 'productivity']
    },
    {
      slug: 'thoughts-on-decaf',
      title: 'Thoughts on decaf',
      description: 'Personal reflections on caffeine, energy management, and whether society\'s obsession with coffee delivers on its promises.',
      date: '2025-03-29',
      tags: ['personal', 'productivity']
    },
    {
      slug: 'untitled',
      title: 'Untitled',
      description: 'Reflections on the fear of titles, labels, and the struggle to share creative work without needing to be exceptional.',
      date: '2025-03-09',
      tags: ['personal', 'writing', 'creativity']
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
    <h1 class="chaos-rotate-1">The Chaos Theory Blog</h1>
    <div class="handwritten" style="position: absolute; top: 20px; right: 20px; color: white; z-index: 100;">
      these are original. beware!
    </div>
    <p class="lead chaos-spacing">Thoughts on life, community, culture and creative chaos</p>
    <div class="rss-link-container">
      <a href="{base}/blog/rss.xml" class="rss-link chaos-rotate-2" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 11a9 9 0 0 1 9 9"></path>
          <path d="M4 4a16 16 0 0 1 16 16"></path>
          <circle cx="5" cy="19" r="1"></circle>
        </svg>
        RSS Feed
      </a>
    </div>
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

  .rss-link-container {
    margin-top: var(--spacing-6);
  }

  .rss-link {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-2) var(--spacing-4);
    background: rgba(255, 255, 255, 0.2);
    color: white;
    text-decoration: none;
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .rss-link:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .rss-link svg {
    flex-shrink: 0;
  }
</style>
