<script>
  import { base } from '$app/paths';
  
  const events = [
    {
      title: 'Geek Sessions Conf',
      description: 'Tech conference in the Algarve region, bringing together developers, designers, and tech enthusiasts.',
      locations: ['Faro'],
      date: 'February 2025',
      type: 'conference',
      // image: '{base}/images/events/gsconf.jpg',
      url: 'https://geeksessionsconf.pt'
    },
    {
      title: 'Impact Hackers - Social Hackathon',
      description: 'A social impact hackathon focused on solving local community challenges through technology.',
      locations: ['Faro'],
      date: 'November 2024',
      type: 'hackathon',
      // image: '{base}/images/events/impact-hackers.jpg',
      url: 'https://impacthackerscommunity.com'
    },
    {
      title: 'Techstars Startup Weekend',
      description: 'Facilitated multiple Startup Weekend events across Portugal, helping entrepreneurs build their first MVP.',
      locations: ['Faro', 'Coimbra', 'Albufeira', 'Évora'],
      date: '2023 - Present',
      type: 'hackathon',
      // image: '{base}/images/events/startup-weekend.jpg',
      url: 'https://techstars.com'
    },
    {
      title: 'Geek Sessions',
      description: '15 years of monthly tech meetups in Algarve, featuring talks, workshops and networking.',
      locations: ['Faro', 'Portimão', 'Albufeira', 'Loulé', 'Online'],
      date: '2009 - Present',
      type: ['talk', 'fireside chat', 'workshop'],
      // image: '{base}/images/events/geeksessions.jpg',
      url: 'https://geeksessions.io'
    },
    {
      title: 'Geek Girls Portugal',
      description: 'Building a supportive community for women in tech through events and mentorship.',
      date: '2018 - 2021',
      type: 'community',
      // image: '{base}/images/events/geekgirls.jpg',
      url: 'https://geekgirlsportugal.pt'
    },
    {
      title: 'Agile Connect',
      description: 'Online events connecting agile practitioners and enthusiasts.',
      date: '2020 - 2021',
      type: 'talk'
    },
    {
      title: 'Shift Faro',
      description: 'Shift Faro is an event consisting of a Hackathon, Workshops and Talks for beginners and experts alike created and sponsored by multiple entities of the Algarve region.',
      date: '2019',
      type: 'conference'
    },
    {
      title: 'TOPAS sul',
      description: 'TOPAS Sul is a programming Challenge to high school students',
      date: '2016',
      type: 'hackathon'
    },
    {
      title: 'NEI Lan Party',
      description: 'Gaming and technology event at University of Algarve.',
      date: '2016',
      type: 'lan party'
    }
  ];

  // Get unique event types
  const types = [...new Set(events.flatMap(event => 
    Array.isArray(event.type) ? event.type : [event.type]
  ))].sort();
  
  let selectedType = '';

  const typeColors = {
    'conference': { bg: '#7c3aed', text: 'white' },
    'hackathon': { bg: '#ff66b3', text: 'white' },
    'workshop': { bg: '#06b6d4', text: 'white' },
    'community': { bg: '#10b981', text: 'white' },
    'talk': { bg: '#f59e0b', text: 'white' },
    'fireside chat': { bg: '#ef4444', text: 'white' },
    'contest': { bg: '#8b5cf6', text: 'white' },
    'lan party': { bg: '#6366f1', text: 'white' }
  };

  function getTypeStyle(type) {
    const color = typeColors[type] || { bg: '#9ca3af', text: 'white' }; // Fallback color
    return `background-color: ${color.bg}; color: ${color.text};`;
  }

  function getTypeClass(type) {
    const baseClass = 'tag';
    return selectedType === type ? `${baseClass} active` : baseClass;
  }

  function filterByType(type) {
    selectedType = selectedType === type ? '' : type;
  }

  $: filteredEvents = selectedType 
    ? events.filter(event => {
        const types = Array.isArray(event.type) ? event.type : [event.type];
        return types.includes(selectedType);
      })
    : events;

  function normalizeEventTypes(event) {
    return Array.isArray(event.type) ? event.type : [event.type];
  }
</script>

<div class="events-hero">
  <div class="container">
    <h1>Events</h1>
    <p class="lead">Creating spaces for learning, connecting and building together</p>
  </div>
</div>

<div class="events-content">
  <div class="container">
    <div class="filter-tags">
      {#each types as type}
        <button 
          class={getTypeClass(type)}
          style={getTypeStyle(type)}
          on:click={() => filterByType(type)}
        >
          {type}
        </button>
      {/each}
    </div>

    <div class="events-grid">
      {#each filteredEvents as event}
        <div class="event-card card">
          {#if event.image}
            <div class="event-image">
              <img src={event.image} alt={event.title} />
            </div>
          {:else}
            <div class="event-placeholder" style={getTypeStyle(event.type)}>
              <span>{event.type}</span>
            </div>
          {/if}
          <div class="event-info">
            <div class="title-row">
              <h3>{event.title}</h3>
              {#if event.url}
                <a href={event.url} class="external-link" target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              {/if}
            </div>
            <div class="event-meta">
              <span class="event-date">{event.date}</span>
              <div class="event-types">
                {#each normalizeEventTypes(event) as type}
                  <span class="event-type" style={getTypeStyle(type)}>{type}</span>
                {/each}
              </div>
            </div>
            <p>{event.description}</p>
            {#if event.locations}
              <div class="event-locations">
                {#each event.locations as location}
                  <span class="location-tag">{location}</span>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .events-hero {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: var(--spacing-16) 0;
    text-align: center;
  }

  .lead {
    font-size: 1.25rem;
    opacity: 0.9;
  }

  .events-content {
    padding: var(--spacing-16) 0;
  }

  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-8);
    justify-content: center;
  }

  .tag {
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: 999px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: capitalize;
    border: none;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .tag:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  .tag.active {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateY(1px);
    filter: brightness(85%);
  }

  .events-grid {
    display: grid;
    gap: var(--spacing-6);
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 768px) {
    .events-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .events-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .event-card {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease;
  }

  .event-card:hover {
    transform: translateY(-4px);
  }

  .event-card:hover .external-link {
    opacity: 1;
  }

  .event-image {
    aspect-ratio: 16/9;
    overflow: hidden;
  }

  .event-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .event-placeholder {
    aspect-ratio: 16/9;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    font-weight: 500;
  }

  .event-info {
    padding: var(--spacing-4);
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

  .event-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-4);
  }

  .event-types {
    display: flex;
    gap: var(--spacing-2);
    flex-wrap: wrap;
  }

  .event-type {
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: 999px;
    font-size: 0.75rem;
    text-transform: capitalize;
  }

  .event-date {
    color: var(--color-text-light);
    font-size: 0.875rem;
  }

  .external-link {
    color: var(--color-text-light);
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  .event-locations {
    margin-top: auto;
    padding-top: var(--spacing-4);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
  }

  .location-tag {
    font-size: 0.75rem;
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--color-background);
    border: 1px solid var(--color-text-light);
    border-radius: 999px;
    color: var(--color-text-light);
  }
</style>
