<script>
  import { base } from '$app/paths';
  const events = [
    {
      title: 'Impact Hackers - Social Hackathon',
      description: 'A problem-solving event where volunteers collaborate to devise and implement TECH solutions for local not-for-profit organizations. First edition partnership with AIPAR for foster care families.',
      date: 'Sep 2024',
      type: 'hackathon',
      image: '{base}/images/events/impact-hackers.jpg',
      url: 'https://impacthackerscommunity.com'
    },
    {
      title: 'Geek Sessions Conf',
      description: 'A full day of tech talks and workshops bringing together the Algarve tech community',
      date: 'Oct 2023',
      type: 'conference',
      image: '{base}/images/events/gsconf.jpg',
      url: 'https://geeksessionsconf.pt'
    },
    {
      title: 'Techstars Startup Weekend',
      description: '54 hours to learn how to build a startup, from ideation to pitch',
      date: '2023',
      type: 'workshop',
      image: '{base}/images/events/startup-weekend.jpg',
      url: 'https://techstars.com'
    }
  ];

  const typeColors = {
    'hackathon': { bg: '#ff66b3', text: 'white' },
    'conference': { bg: '#7c3aed', text: 'white' },
    'workshop': { bg: '#06b6d4', text: 'white' }
  };

  function getTypeStyle(type) {
    const color = typeColors[type];
    return `background-color: ${color.bg}; color: ${color.text};`;
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
    <div class="events-grid">
      {#each events as event}
        <a href={event.url} class="event-card card" target="_blank" rel="noopener noreferrer">
          <div class="event-image">
            <img src={event.image} alt={event.title} />
          </div>
          <div class="event-info">
            <div class="title-row">
              <h3>{event.title}</h3>
              {#if event.url}
                <svg class="external-link" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              {/if}
            </div>
            <div class="event-meta">
              <span class="event-date">{event.date}</span>
              <span class="event-type" style={getTypeStyle(event.type)}>{event.type}</span>
            </div>
            <p>{event.description}</p>
          </div>
        </a>
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

  .event-card {
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
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }

  .event-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .event-info {
    padding: var(--spacing-4);
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

  .event-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-4);
  }

  .event-date {
    color: var(--color-text-light);
    font-size: 0.875rem;
  }

  .event-type {
    padding: var(--spacing-1) var(--spacing-3);
    border-radius: 999px;
    font-size: 0.75rem;
    text-transform: capitalize;
  }
</style>
