<script>
  import { base } from '$app/paths';
  import FilterTags from '$lib/components/FilterTags.svelte';
  import { getTagStyle } from '$lib/utils/tagStyles';

  const categories = ['fiction', 'non-fiction', 'tv', 'movies', 'music', 'documentaries', 'muses'];
  let selectedCategory = '';

  const categoryColors = {
    'fiction': { bg: '#7c3aed', text: 'white' },
    'non-fiction': { bg: '#9333ea', text: 'white' },
    'tv': { bg: '#06b6d4', text: 'white' },
    'movies': { bg: '#ef4444', text: 'white' },
    'music': { bg: '#f59e0b', text: 'white' },
    'documentaries': { bg: '#10b981', text: 'white' },
    'muses': { bg: '#ff66b3', text: 'white' }
  };

  const items = [
    // Fiction
    {
      category: 'fiction',
      title: 'His Dark Materials',
      creator: 'Philip Pullman',
      note: 'The trilogy that made me believe books could rewire how you see the world. Lyra lives rent-free in my head.'
    },
    {
      category: 'fiction',
      title: 'The Left Hand of Darkness',
      creator: 'Ursula K. Le Guin',
      note: 'Quietly devastating. Le Guin wrote about gender and belonging in a way nobody else dared to.'
    },
    {
      category: 'fiction',
      title: 'Piranesi',
      creator: 'Susanna Clarke',
      note: 'A strange, beautiful little book about memory and losing yourself in someone else\'s world.'
    },

    // Non-Fiction
    {
      category: 'non-fiction',
      title: 'The Body Keeps the Score',
      creator: 'Bessel van der Kolk',
      note: 'Changed how I think about anxiety and why the body holds onto things the mind tries to forget.'
    },
    {
      category: 'non-fiction',
      title: 'Educated',
      creator: 'Tara Westover',
      note: 'A gut punch of a memoir. Proof that it\'s never too late to decide who you want to become.'
    },
    {
      category: 'non-fiction',
      title: 'The Art of War',
      creator: 'Sun Tzu',
      note: 'Not really about war. More about strategy, patience, and knowing when to shut up.'
    },

    // TV Shows
    {
      category: 'tv',
      title: 'The Sopranos',
      creator: 'David Chase',
      note: 'The show that proved television could be literature. Tony Soprano is a masterclass in messy humans.'
    },
    {
      category: 'tv',
      title: 'Severance',
      creator: 'Dan Erickson',
      note: 'Work-life balance taken to its horrifying logical extreme. Beautifully unsettling.'
    },
    {
      category: 'tv',
      title: 'What We Do in the Shadows',
      creator: 'Jemaine Clement',
      note: 'Genuinely the funniest thing I\'ve watched in years. Guillermo deserves everything.'
    },

    // Movies
    {
      category: 'movies',
      title: 'Eternal Sunshine of the Spotless Mind',
      creator: 'Michel Gondry',
      note: 'A movie about memory and grief that made me cry on the couch at 2am. Worth it.'
    },
    {
      category: 'movies',
      title: 'Parasite',
      creator: 'Bong Joon-ho',
      note: 'Every single frame is intentional. Rewatching it reveals layers you missed the first time.'
    },
    {
      category: 'movies',
      title: 'The Fast and the Furious',
      creator: 'Vin Diesel & friends',
      note: 'Yes, all of them. Don\'t judge me. Tokyo Drift is the peak and I will die on that hill.'
    },

    // Music
    {
      category: 'music',
      title: 'Djo',
      creator: 'Joe Keery',
      note: 'End of Beginning lives in my playlist permanently. Dreamy and a little sad in the best way.'
    },
    {
      category: 'music',
      title: 'Mitski',
      creator: 'Mitski Miyae',
      note: 'The kind of artist that makes you feel less alone at 3am. Every album hits differently.'
    },
    {
      category: 'music',
      title: 'SOPHIE',
      creator: 'SOPHIE',
      note: 'A genius who played with sound like it was clay. Rest in peace. The world lost something irreplaceable.'
    },

    // Documentaries
    {
      category: 'documentaries',
      title: 'The Social Dilemma',
      creator: 'Jeff Orlowski',
      note: 'Terrifying in how obvious it makes everything we already suspected about social media.'
    },
    {
      category: 'documentaries',
      title: 'Our Planet',
      creator: 'Netflix / David Attenborough',
      note: 'Watch this and try not to feel guilty about everything. Gorgeous and haunting.'
    },
    {
      category: 'documentaries',
      title: 'The Last Dance',
      creator: 'Jason Hehir',
      note: 'Even if you don\'t care about basketball, this is a masterclass in obsession and excellence.'
    },

    // Muses
    {
      category: 'muses',
      title: 'Amanda Palmer',
      creator: 'Artist / Musician / Author',
      note: 'Taught me that asking for help isn\'t weakness. Her TED talk about the art of asking changed everything.'
    },
    {
      category: 'muses',
      title: 'Cassandra Clare',
      creator: 'Author',
      note: 'Wrote worlds so vivid I lived in them for months. Proof that fantasy can be deeply human.'
    },
    {
      category: 'muses',
      title: 'Ada Lovelace',
      creator: 'Mathematician / Visionary',
      note: 'She saw what computers could become before anyone else even understood what they were. Legend.'
    }
  ];

  $: filteredItems = selectedCategory
    ? items.filter(item => item.category === selectedCategory)
    : items;

  function getCategoryTagStyle(tag) {
    return getTagStyle(tag, categoryColors);
  }
</script>

<div class="trinketbox-hero">
  <div class="container">
    <h1>My Trinketbox</h1>
    <p class="lead"><span class="scribble-underline">A curated mess of things that live in my head rent-free</span></p>
    <div class="handwritten" style="position: relative; margin-top: var(--spacing-4); font-size: 1rem;">
      don't judge the collection, judge the taste
    </div>
  </div>
</div>

<div class="trinketbox-content">
  <div class="container">
    <div style="position: relative;">
      <FilterTags
        items={categories}
        colors={categoryColors}
        bind:selected={selectedCategory}
      />
      <div class="handwritten" style="position: absolute; top: -10px; right: 20px; z-index: 100;">
        filter it!
      </div>
    </div>

    <div class="trinketbox-grid">
      {#each filteredItems as item, i}
        <div class="trinket-card wonky-border chaos-rotate-{(i % 4) + 1}">
          <span class="category-tag" style={getCategoryTagStyle(item.category)}>{item.category}</span>
          <h3>{item.title}</h3>
          <p class="creator">{item.creator}</p>
          <p class="note">"{item.note}"</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  /* Hero */
  .trinketbox-hero {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: var(--spacing-16) 0;
  }

  .trinketbox-hero h1 {
    font-size: 3rem;
    margin-bottom: var(--spacing-4);
  }

  .trinketbox-hero .lead {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 40rem;
  }

  .trinketbox-hero .scribble-underline {
    color: white;
  }

  .trinketbox-hero .handwritten {
    color: rgba(255, 255, 255, 0.85);
  }

  /* Content */
  .trinketbox-content {
    padding: var(--spacing-12) 0 var(--spacing-16);
    background: var(--color-background);
  }

  /* Grid */
  .trinketbox-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-6);
    margin-top: var(--spacing-8);
  }

  @media (max-width: 900px) {
    .trinketbox-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .trinketbox-grid {
      grid-template-columns: 1fr;
    }

    .trinketbox-hero h1 {
      font-size: 2rem;
    }
  }

  /* Cards */
  .trinket-card {
    position: relative;
    padding: var(--spacing-6);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    transition: all 0.3s ease;
  }

  .trinket-card:hover {
    transform: translateY(-4px) rotate(var(--initial-rotation, 0deg));
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), 0 4px 8px rgba(0, 0, 0, 0.12);
  }

  .category-tag {
    display: inline-block;
    align-self: flex-start;
    padding: var(--spacing-1) var(--spacing-3);
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  .trinket-card h3 {
    font-size: 1.1rem;
    color: var(--color-text);
    line-height: 1.3;
    margin-top: var(--spacing-2);
  }

  .creator {
    font-size: 0.85rem;
    color: var(--color-text-light);
    font-weight: 600;
  }

  .note {
    font-size: 0.85rem;
    color: var(--color-text-light);
    font-style: italic;
    line-height: 1.5;
    margin-top: auto;
    padding-top: var(--spacing-2);
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }
</style>
