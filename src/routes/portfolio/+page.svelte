<script>
  import { base } from '$app/paths';
  import FilterTags from '$lib/components/FilterTags.svelte';
  import { getTagStyle } from '$lib/utils/tagStyles';
  
  const tags = ['tech', 'art', 'writing', 'events', 'business', 'community'];
  let selectedTag = '';

  const portfolioItems = [
    {
      title: 'Local Foundation',
      description: 'Platform helping community builders connect and grow together',
      tags: ['tech', 'business', 'events'],
      image: base + '/images/portfolio/local-foundation-website.png',
      url: 'https://local.foundation'
    },
    {
      title: 'Geek Sessions',
      description: '15 y/o tech community in the Algarve',
      tags: ['community', 'events', 'tech'],
      image: base + '/images/portfolio/geeksessionsbanner.jpg',
      url: 'https://zez.am/GeekSessionsFaro'
    },
    {
      title: 'Chaos Theory Blog',
      description: 'Personal blog exploring life and creativity',
      tags: ['writing'],
      image: base + '/images/portfolio/blog.jpg',
      url: 'https://lepsies.substack.com/'
    },
    {
      title: 'Contentserv',
      description: 'Leading a development team for a next-gen PIM software',
      tags: ['tech', 'business'],
      image: base + '/images/portfolio/contentserv.jpg',
      url: 'https://contentserv.com'
    },
    {
      title: 'Event Organizer',
      description: 'Whenever there\'s a problem that needs solving, I help find the solution in an event format',
      tags: ['tech', 'events', 'community'],
      image: base + '/images/portfolio/facilitator.jpg',
      url: base + '/events'
    },
    {
      title: 'Speaker/host',
      description: 'Sharing insights and experiences by yapping a considerate amount',
      tags: ['tech', 'events', 'community'],
      image: base + '/images/portfolio/speaker.jpg',
      url: base + '/speaker'
    },
    {
      title: 'Fiction Writing',
      description: 'I\'m working on my first fiction book! (For 10 years now, shhh...)',
      tags: ['writing'],
      image: base + '/images/portfolio/writing-art.png'
    },
    {
      title: 'Impact Hackers',
      description: 'Building a community for hackers who want to create positive impact through technology',
      tags: ['community', 'tech', 'events'],
      image: base + '/images/portfolio/impact-hackers.jpg',
      url: 'https://impacthackerscommunity.com'
    },
    {
      title: 'Digital Art',
      description: 'Me dabbling through the arts, mostly digitally',
      tags: ['art'],
      image: base + '/images/portfolio/art.png',
      url: 'https://instagram.com/lepsies_art'
    }
  ];

  const tagColors = {
    'tech': { bg: '#ff66b3', text: 'white' },
    'art': { bg: '#7c3aed', text: 'white' },
    'writing': { bg: '#06b6d4', text: 'white' },
    'events': { bg: '#f59e0b', text: 'white' },
    'business': { bg: '#10b981', text: 'white' },
    'community': { bg: '#3b82f6', text: 'white' }
  };

  $: filteredItems = selectedTag 
    ? portfolioItems.filter(item => item.tags.includes(selectedTag))
    : portfolioItems;

  function getPortfolioTagStyle(tag) {
    return getTagStyle(tag, tagColors);
  }
</script>

<div class="portfolio-hero">
  <div class="container">
    <h1>Portfolio</h1>
    <p class="lead"><span class="scribble-underline">Exploring the intersection of technology, art, and community</span></p>
    <div class="hero-actions">
        <a href="{base}/about" class="button button-primary">Who?</a>
    </div>
  </div>
</div>

<div class="portfolio-content">
  <div class="container">
    <div style="position: relative;">
      <FilterTags 
        items={tags}
        colors={tagColors}
        bind:selected={selectedTag}
      />
      <div class="handwritten" style="position: absolute; top: -10px; right: 20px; z-index: 100;">
        pick one!
      </div>
    </div>

    <div class="portfolio-grid">
      {#each filteredItems as item, i}
        <a href={item.url} class="portfolio-card wonky-border chaos-rotate-{(i % 4) + 1}" target="_blank" rel="noopener noreferrer">
          <div class="portfolio-image">
            <img src={item.image} alt={item.title} />
          </div>
          <div class="portfolio-info">
            <div class="title-row">
              <h3>{item.title}</h3>
              <svg class="external-link" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1-2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </div>
            <p>{item.description}</p>
            <div class="item-tags">
              {#each item.tags as tag}
                <span class="tag small" style={getPortfolioTagStyle(tag)}>{tag}</span>
              {/each}
            </div>
          </div>
          {#if item.title === 'Local Foundation'}
            <div class="handwritten" style="position: absolute; top: -15px; right: -30px; z-index: 100;">
              personal fav
            </div>
          {/if}
          {#if item.title === 'Digital Art'}
            <div class="handwritten" style="position: absolute; bottom: -20px; left: -25px; z-index: 100;">
              messy but fun
            </div>
          {/if}
          {#if item.title === 'Contentserv'}
            <div class="handwritten" style="position: absolute; top: -15px; left: -20px; z-index: 100;">
              day job
            </div>
          {/if}
          {#if item.title === 'Fiction Writing'}
            <div class="handwritten" style="position: absolute; bottom: -20px; right: -25px; z-index: 100;">
              ongoing...
            </div>
          {/if}
        </a>
      {/each}
    </div>
  </div>
</div>

<style>
  .portfolio-hero {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: var(--spacing-16) 0;
    text-align: center;
    transform: rotate(-0.6deg);
    transform-origin: center center;
  }

  .portfolio-hero h1 {
    margin-bottom: var(--spacing-4);
  }

  .lead {
    font-size: 1.25rem;
    opacity: 0.9;
  }

  .portfolio-content {
    padding: var(--spacing-16) 0;
    transform: rotate(0.4deg);
    transform-origin: center center;
    position: relative;
  }

  .portfolio-grid {
    display: grid;
    gap: var(--spacing-6);
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 640px) {
    .portfolio-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .portfolio-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .portfolio-card {
    overflow: hidden;
    transition: transform 0.3s ease;
    text-decoration: none;
    color: inherit;
  }

  .portfolio-card:hover {
    transform: translateY(-4px);
  }

  .portfolio-card:hover .external-link {
    opacity: 1;
  }

  .portfolio-image {
    aspect-ratio: 16/9;
    overflow: hidden;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }

  .portfolio-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .portfolio-info {
    padding: var(--spacing-4);
  }

  .portfolio-info h3 {
    margin-bottom: var(--spacing-2);
    font-size: 1.25rem;
  }

  .portfolio-info p {
    color: var(--color-text-light);
    font-size: 0.875rem;
    margin-bottom: var(--spacing-4);
  }

  .item-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-2);
  }

  .external-link {
    color: var(--color-text-light);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .tag {
    padding: var(--spacing-1) var(--spacing-3);
    border-radius: 0;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    border: 2px solid rgba(0, 0, 0, 0.4);
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
    position: relative;
  }

  .tag:nth-child(odd) {
    transform: rotate(-0.5deg);
  }

  .tag:nth-child(even) {
    transform: rotate(0.5deg);
  }

  .tag:nth-child(3n) {
    transform: rotate(0deg) translateY(-1px);
  }

  .tag.small {
    font-size: 0.7rem;
    padding: var(--spacing-1) var(--spacing-2);
  }

  /* Sticker-style Button Overrides */
  .hero-actions .button {
    font-size: 1rem;
    transform: rotate(-1.5deg);
    --hover-rotate: -1.5deg;
  }

  .hero-actions .button:hover {
    transform: translateY(-4px) rotate(calc(var(--hover-rotate) * 1.5));
  }
</style>
