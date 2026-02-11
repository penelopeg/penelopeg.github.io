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

      <!-- Blog Navigation - Retro MP3 Player -->
      <nav class="mp3-player" aria-label="Blog post navigation">
        <!-- Player body -->
        <div class="mp3-body">
          <!-- Screen -->
          <div class="mp3-screen">
            <div class="screen-header">
              <span class="screen-icon">&#9835;</span>
              <span class="screen-label">Now Playing</span>
              <div class="screen-battery">
                <div class="battery-fill"></div>
              </div>
            </div>
            <div class="screen-title">{title}</div>
            <div class="screen-progress">
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
              <div class="progress-times">
                <span>1:23</span>
                <span>3:45</span>
              </div>
            </div>
          </div>

          <!-- Click wheel -->
          <div class="mp3-wheel">
            <!-- Menu label -->
            <span class="wheel-label wheel-menu">MENU</span>

            <!-- Prev button (left) -->
            <a
              href={previousPost ? `${base}/blog/${previousPost.slug}` : '#'}
              class="wheel-btn wheel-prev"
              class:disabled={!previousPost}
              aria-label={previousPost ? `Previous: ${previousPost.title}` : 'No previous post'}
            >
              <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
                <rect x="0" y="1" width="2" height="10"/>
                <polygon points="14,1 4,6 14,11"/>
              </svg>
            </a>

            <!-- Next button (right) -->
            <a
              href={nextPost ? `${base}/blog/${nextPost.slug}` : '#'}
              class="wheel-btn wheel-next"
              class:disabled={!nextPost}
              aria-label={nextPost ? `Next: ${nextPost.title}` : 'No next post'}
            >
              <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
                <polygon points="0,1 10,6 0,11"/>
                <rect x="12" y="1" width="2" height="10"/>
              </svg>
            </a>

            <!-- Play/Pause center button -->
            <a
              href="{base}/blog"
              class="wheel-center"
              aria-label="Back to all posts"
            >
              <svg width="16" height="14" viewBox="0 0 16 14" fill="currentColor">
                <polygon points="0,0 6,7 0,14"/>
                <rect x="9" y="0" width="3" height="14"/>
                <rect x="13" y="0" width="3" height="14"/>
              </svg>
            </a>

            <!-- Bottom label -->
            <span class="wheel-label wheel-playpause">&#9654;&#10074;&#10074;</span>
          </div>
        </div>

        <!-- Sticker label -->
        <div class="mp3-sticker handwritten">lepsies fm</div>
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

  /* Blog Navigation - Retro MP3 Player */
  .mp3-player {
    margin-top: var(--spacing-16);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .mp3-body {
    width: 260px;
    background: linear-gradient(145deg, #e8e8e8 0%, #d4d4d4 50%, #c8c8c8 100%);
    border-radius: 28px;
    padding: 20px 20px 28px;
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.25),
      0 4px 8px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -1px 0 rgba(0, 0, 0, 0.1);
    border: 3px solid white;
    transform: rotate(-1.5deg);
    position: relative;
  }

  /* Screen */
  .mp3-screen {
    background: linear-gradient(180deg, #8cb4a0 0%, #a3c9b7 30%, #b5d6c8 100%);
    border-radius: 8px;
    padding: 10px 12px;
    margin-bottom: 18px;
    box-shadow:
      inset 0 2px 6px rgba(0, 0, 0, 0.2),
      0 1px 0 rgba(255, 255, 255, 0.5);
    border: 2px solid #7a9e8d;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .screen-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .screen-icon {
    font-size: 0.7rem;
    color: #2d5a45;
    line-height: 1;
  }

  .screen-label {
    font-family: var(--font-mono);
    font-size: 0.6rem;
    color: #2d5a45;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .screen-battery {
    width: 18px;
    height: 9px;
    border: 1.5px solid #2d5a45;
    border-radius: 2px;
    padding: 1px;
    position: relative;
  }

  .screen-battery::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 5px;
    background: #2d5a45;
    border-radius: 0 1px 1px 0;
  }

  .battery-fill {
    width: 70%;
    height: 100%;
    background: #2d5a45;
    border-radius: 1px;
  }

  .screen-title {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: #1a3d2c;
    font-weight: 700;
    line-height: 1.3;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    margin: 4px 0;
  }

  .screen-progress {
    margin-top: 4px;
  }

  .progress-bar {
    width: 100%;
    height: 3px;
    background: rgba(45, 90, 69, 0.3);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    width: 37%;
    height: 100%;
    background: #2d5a45;
    border-radius: 2px;
    animation: progress-pulse 3s ease-in-out infinite;
  }

  @keyframes progress-pulse {
    0%, 100% { width: 30%; }
    50% { width: 45%; }
  }

  .progress-times {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 0.5rem;
    color: #2d5a45;
    margin-top: 2px;
  }

  /* Click Wheel */
  .mp3-wheel {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: linear-gradient(145deg, #f0f0f0 0%, #d8d8d8 100%);
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.15),
      0 1px 0 rgba(255, 255, 255, 0.8);
    position: relative;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Wheel labels */
  .wheel-label {
    position: absolute;
    font-family: var(--font-mono);
    font-size: 0.55rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
    pointer-events: none;
    user-select: none;
  }

  .wheel-menu {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .wheel-playpause {
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.65rem;
    letter-spacing: 0;
  }

  /* Wheel buttons */
  .wheel-btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    color: #555;
    text-decoration: none;
    border-radius: 50%;
    transition: all 0.15s ease;
    cursor: pointer;
    z-index: 2;
  }

  .wheel-btn:hover:not(.disabled) {
    color: var(--color-primary);
    background: rgba(8, 145, 178, 0.08);
  }

  .wheel-btn:active:not(.disabled) {
    background: rgba(8, 145, 178, 0.15);
  }

  .wheel-btn.disabled {
    color: #bbb;
    cursor: not-allowed;
    pointer-events: none;
    opacity: 0.5;
  }

  .wheel-prev {
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
  }

  .wheel-next {
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
  }

  /* Center button */
  .wheel-center {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: linear-gradient(145deg, #fafafa 0%, #e8e8e8 100%);
    box-shadow:
      0 2px 6px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    text-decoration: none;
    transition: all 0.15s ease;
    z-index: 3;
  }

  .wheel-center:hover {
    background: linear-gradient(145deg, #ffffff 0%, #f0f0f0 100%);
    color: var(--color-primary);
    box-shadow:
      0 3px 8px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }

  .wheel-center:active {
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.15),
      inset 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  /* Sticker label */
  .mp3-sticker {
    margin-top: -8px;
    font-family: var(--font-handwritten);
    font-size: 1rem;
    color: var(--color-secondary);
    transform: rotate(3deg);
    position: relative;
    z-index: 10;
  }

  /* Mobile adjustments */
  @media (max-width: 640px) {
    .mp3-body {
      width: 230px;
      padding: 16px 16px 24px;
      border-radius: 24px;
    }

    .mp3-screen {
      padding: 8px 10px;
      min-height: 70px;
      margin-bottom: 14px;
    }

    .screen-title {
      font-size: 0.6rem;
    }

    .mp3-wheel {
      width: 130px;
      height: 130px;
    }

    .wheel-center {
      width: 50px;
      height: 50px;
    }

    .wheel-btn {
      width: 34px;
      height: 34px;
    }

    .wheel-btn svg {
      width: 12px;
      height: 10px;
    }

    .wheel-center svg {
      width: 14px;
      height: 12px;
    }

    .wheel-menu {
      top: 8px;
      font-size: 0.5rem;
    }

    .wheel-playpause {
      bottom: 8px;
      font-size: 0.55rem;
    }
  }
</style>
