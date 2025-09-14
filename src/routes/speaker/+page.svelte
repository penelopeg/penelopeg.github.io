<script>
  import { base } from '$app/paths';
  import FilterTags from '$lib/components/FilterTags.svelte';
  import { getTagStyle } from '$lib/utils/tagStyles';
  
  const tagColors = {
    'tedx': { bg: '#e62b1e', text: 'white' },
    'conference': { bg: '#ff66b3', text: 'white' },
    'meetup': { bg: '#06b6d4', text: 'white' },
    'workshop': { bg: '#f59e0b', text: 'white' },
    'community': { bg: '#10b981', text: 'white' },
    'fireside chat': { bg: '#3b82f6', text: 'white' },
    'keynote': { bg: '#7c3aed', text: 'white' }
  };

  const talks = [
    {
      title: 'How to Build Communities that Actually Matter',
      description: 'A TEDx talk exploring the principles behind building meaningful communities that create genuine impact and connection.',
      location: 'TEDxUAlg',
      date: 'June 2024',
      type: 'tedx',
      url: 'https://www.youtube.com/watch?v=ntKrac2ySy8',
      duration: '15 min',
      language: 'English'
    }
  ];

  const types = [...new Set(talks.flatMap(talk => 
    Array.isArray(talk.type) ? talk.type : [talk.type]
  ))].sort();
  
  let selectedType = '';

  $: filteredTalks = selectedType 
    ? talks.filter(talk => {
        const types = Array.isArray(talk.type) ? talk.type : [talk.type];
        return types.includes(selectedType);
      })
    : talks;

  function normalizeTalkTypes(talk) {
    return Array.isArray(talk.type) ? talk.type : [talk.type];
  }

  function getTalkTagStyle(tag) {
    return getTagStyle(tag, tagColors);
  }
</script>

<div class="speaker-hero">
  <div class="container">
    <h1 class="chaos-rotate-1">Speaker</h1>
    <div class="handwritten" style="position: absolute; top: 20px; right: 20px; color: white; z-index: 100;">
      yapping!
    </div>
    <p class="lead chaos-spacing">Sharing insights and experiences by yapping a considerate amount</p>
    <div class="hero-actions" style="position: relative;">
      <a href="{base}/portfolio" class="button button-secondary chaos-rotate-2">What else?</a>
      <div class="handwritten" style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); color: white; z-index: 100;">
        more stuff!
      </div>
    </div>
  </div>
</div>

<div class="speaker-content">
  <div class="container">
    <FilterTags 
      items={types}
      colors={tagColors}
      bind:selected={selectedType}
    />

    <div class="talks-grid">
      {#each filteredTalks as talk}
        <div class="talk-card wonky-border chaos-rotate-1">
          <div class="talk-placeholder" style={getTalkTagStyle(talk.type)}>
            <span>{talk.type}</span>
          </div>
          <div class="talk-info">
            <div class="title-row">
              <h3 class="scribble-underline">{talk.title}</h3>
              {#if talk.url}
                <a href={talk.url} class="external-link" target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              {/if}
            </div>
            <div class="talk-meta">
              <span class="talk-date">{talk.date}</span>
              <div class="talk-types">
                {#each normalizeTalkTypes(talk) as type}
                  <span class="talk-type" style={getTalkTagStyle(type)}>{type}</span>
                {/each}
              </div>
            </div>
            <p>{talk.description}</p>
            <div class="talk-details">
              {#if talk.location}
                <span class="detail-tag">{talk.location}</span>
              {/if}
              {#if talk.duration}
                <span class="detail-tag">{talk.duration}</span>
              {/if}
              {#if talk.language}
                <span class="detail-tag">{talk.language}</span>
              {/if}
            </div>
          </div>
          <div class="handwritten" style="position: absolute; top: -15px; right: -25px; z-index: 100;">
            first one!
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .speaker-hero {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: var(--spacing-16) 0;
    text-align: center;
    transform: rotate(0.5deg);
    transform-origin: center center;
    position: relative;
  }

  .lead {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 48rem;
    margin: 0 auto;
  }

  .speaker-content {
    padding: var(--spacing-8) 0;
    transform: rotate(-0.3deg);
    transform-origin: center center;
  }

  .talks-grid {
    display: grid;
    gap: var(--spacing-4);
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 768px) {
    .talks-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .talks-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .talk-card {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease;
    position: relative;
  }

  .talk-card:hover {
    transform: translateY(-4px) rotate(1deg);
  }

  .talk-card:hover .external-link {
    opacity: 1;
  }

  .talk-placeholder {
    aspect-ratio: 16/9;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    font-weight: 500;
    font-size: 1.2rem;
  }

  .talk-info {
    padding: var(--spacing-3);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-2);
  }

  .talk-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-4);
    flex-wrap: wrap;
  }

  .talk-types {
    display: flex;
    gap: var(--spacing-2);
    flex-wrap: wrap;
  }

  .talk-type {
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: 999px;
    font-size: 0.75rem;
    text-transform: capitalize;
  }

  .talk-date {
    color: var(--color-text-light);
    font-size: 0.875rem;
  }

  .external-link {
    color: var(--color-text-light);
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  .talk-details {
    margin-top: auto;
    padding-top: var(--spacing-4);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }

  .detail-tag {
    font-size: 0.75rem;
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--color-background);
    border: 1px solid var(--color-text-light);
    border-radius: 999px;
    color: var(--color-text-light);
  }

  .hero-actions {
    display: flex;
    gap: var(--spacing-4);
    justify-content: center;
    margin-top: var(--spacing-6);
    position: relative;
  }
</style>