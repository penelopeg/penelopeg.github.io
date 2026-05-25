<script>
  import { fly, fade } from 'svelte/transition';

  let activeCategory = null;

  const categories = [
    {
      id: 'people',
      name: 'People',
      emoji: '✨',
      subtitle: 'humans who inspire me',
      color: '#ff66b3',
      bgLight: '#fff0f8',
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      position: { left: '3%', top: '5%' },
      size: { width: '16%', height: '24%' },
      rotate: -2,
      floatClass: 'float-1',
      items: [
        { title: 'Charity Majors', url: 'https://charity.wtf', note: 'engineering leadership that actually works', tag: 'tech' },
        { title: 'Julia Evans', url: 'https://jvns.ca', note: 'makes the hard stuff genuinely fun to learn', tag: 'tech' },
        { title: 'Mandy Brown', url: 'https://aworkinglibrary.com', note: 'reading & leadership wisdom in one place', tag: 'reading' },
        { title: 'Bret Victor', url: 'https://worrydream.com', note: 'reimagining how we think with computers', tag: 'ideas' },
      ]
    },
    {
      id: 'websites',
      name: 'Websites',
      emoji: '🌐',
      subtitle: 'corners of the internet i love',
      color: '#0891b2',
      bgLight: '#e0f9ff',
      borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
      position: { left: '33%', top: '3%' },
      size: { width: '14%', height: '22%' },
      rotate: 1.5,
      floatClass: 'float-3',
      items: [
        { title: 'The Pudding', url: 'https://pudding.cool', note: 'data journalism as visual art', tag: 'journalism' },
        { title: 'Are.na', url: 'https://are.na', note: 'the anti-algorithm internet', tag: 'curation' },
        { title: 'Marginalia', url: 'https://search.marginalia.nu', note: 'search for the indie web', tag: 'discovery' },
        { title: 'Poolside.fm', url: 'https://poolside.fm', note: 'forever summer vibes', tag: 'vibes' },
        { title: 'Neocities', url: 'https://neocities.org', note: 'home of the indie web revival', tag: 'community' },
        { title: 'Brutalist Websites', url: 'https://brutalistwebsites.com', note: 'design that breaks rules beautifully', tag: 'design' },
      ]
    },
    {
      id: 'tech',
      name: 'Tech',
      emoji: '💻',
      subtitle: 'tools i actually love using',
      color: '#0d9488',
      bgLight: '#ccfbf1',
      borderRadius: '50% 50% 40% 60% / 30% 60% 40% 70%',
      position: { left: '67%', top: '7%' },
      size: { width: '14%', height: '22%' },
      rotate: 2,
      floatClass: 'float-5',
      items: [
        { title: 'Svelte', url: 'https://svelte.dev', note: 'the framework that just makes sense', tag: 'framework' },
        { title: 'Observable', url: 'https://observablehq.com', note: 'notebooks for data viz', tag: 'data' },
        { title: 'Obsidian', url: 'https://obsidian.md', note: 'my second brain', tag: 'productivity' },
        { title: 'Val.town', url: 'https://val.town', note: 'tiny serverless scripts that just work', tag: 'serverless' },
        { title: 'Penpot', url: 'https://penpot.app', note: 'open source design for everyone', tag: 'design' },
      ]
    },
    {
      id: 'art',
      name: 'Art',
      emoji: '🎨',
      subtitle: 'visual things that move me',
      color: '#ec4899',
      bgLight: '#fce7f3',
      borderRadius: '70% 30% 50% 50% / 50% 70% 30% 50%',
      position: { left: '2%', top: '44%' },
      size: { width: '13%', height: '20%' },
      rotate: -3,
      floatClass: 'float-2',
      items: [
        { title: 'Yayoi Kusama', url: 'https://yayoikusama.jp', note: 'infinity rooms live in my head forever', tag: 'contemporary' },
        { title: 'Studio Ghibli Art', url: 'https://www.ghibli.jp/works/', note: 'background art as emotional architecture', tag: 'animation' },
        { title: 'Loish', url: 'https://loish.net', note: 'digital painting that feels alive', tag: 'digital' },
        { title: 'Aaron Draplin', url: 'https://draplin.com', note: 'thick lines & good vibes', tag: 'design' },
      ]
    },
    {
      id: 'books',
      name: 'Books',
      emoji: '📚',
      subtitle: 'words that rewired my brain',
      color: '#059669',
      bgLight: '#d1fae5',
      borderRadius: '30% 70% 60% 40% / 50% 30% 70% 50%',
      position: { left: '73%', top: '42%' },
      size: { width: '15%', height: '24%' },
      rotate: 1,
      floatClass: 'float-4',
      items: [
        { title: "Hitchhiker's Guide", url: 'https://www.goodreads.com/book/show/11.The_Hitchhiker_s_Guide_to_the_Galaxy', note: 'the universe is absurd and that\'s ok', tag: 'sci-fi' },
        { title: 'Good Omens', url: 'https://www.goodreads.com/book/show/12067.Good_Omens', note: 'chaos + friendship = everything', tag: 'fantasy' },
        { title: 'Piranesi', url: 'https://www.goodreads.com/book/show/50202953-piranesi', note: 'the most haunting house in fiction', tag: 'literary' },
        { title: 'The Dispossessed', url: 'https://www.goodreads.com/book/show/13651.The_Dispossessed', note: 'Le Guin on utopia and compromise', tag: 'sci-fi' },
        { title: 'Normal People', url: 'https://www.goodreads.com/book/show/41057294-normal-people', note: 'Sally Rooney lives rent-free in my head', tag: 'literary' },
      ]
    },
    {
      id: 'movies',
      name: 'Movies',
      emoji: '🎬',
      subtitle: 'films that live in my heart',
      color: '#d97706',
      bgLight: '#fef3c7',
      borderRadius: '50% 50% 50% 50% / 60% 40% 60% 40%',
      position: { left: '37%', top: '35%' },
      size: { width: '17%', height: '26%' },
      rotate: -1,
      floatClass: 'float-6',
      items: [
        { title: 'Amélie', url: 'https://letterboxd.com/film/amelie/', note: '(2001) peak comfort cinema, no notes', tag: 'french' },
        { title: 'EEAAO', url: 'https://letterboxd.com/film/everything-everywhere-all-at-once/', note: '(2022) cried 4 times minimum', tag: 'multiverse' },
        { title: 'Princess Mononoke', url: 'https://letterboxd.com/film/princess-mononoke/', note: '(1997) nature vs industry forever', tag: 'ghibli' },
        { title: 'Knives Out', url: 'https://letterboxd.com/film/knives-out/', note: '(2019) the whodunit reinvented', tag: 'mystery' },
        { title: 'Grand Budapest Hotel', url: 'https://letterboxd.com/film/the-grand-budapest-hotel/', note: '(2014) Wes Anderson at his Wes Andersonest', tag: 'wes' },
      ]
    },
    {
      id: 'music',
      name: 'Music',
      emoji: '🎵',
      subtitle: 'artists on permanent rotation',
      color: '#9333ea',
      bgLight: '#f3e8ff',
      borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%',
      position: { left: '7%', top: '68%' },
      size: { width: '13%', height: '20%' },
      rotate: 2.5,
      floatClass: 'float-3',
      items: [
        { title: 'Mitski', url: 'https://open.spotify.com/artist/2uYWxilOVlUdk4oV9DvwqK', note: 'emotional devastation on command', tag: 'indie' },
        { title: 'Fiona Apple', url: 'https://open.spotify.com/artist/3g2kUQ6tHLLbmkV7T4GPtL', note: 'criminal that she isn\'t more famous', tag: 'alternative' },
        { title: 'Sufjan Stevens', url: 'https://open.spotify.com/artist/4MXUO7sVCaFgFjoTI5ox5c', note: 'banjo dad crying hours', tag: 'folk' },
        { title: 'girl in red', url: 'https://open.spotify.com/artist/4ObDam8oDyaTVDKbIKFvQd', note: 'do you listen to girl in red?', tag: 'indie' },
        { title: 'Lorde', url: 'https://open.spotify.com/artist/163tK9Wjr9P9DmM0AVK7lm', note: 'melodrama is a perfect album', tag: 'pop' },
      ]
    },
    {
      id: 'tv',
      name: 'TV Shows',
      emoji: '📺',
      subtitle: 'shows i recommend to everyone',
      color: '#3b82f6',
      bgLight: '#dbeafe',
      borderRadius: '60% 40% 50% 50% / 30% 60% 40% 70%',
      position: { left: '28%', top: '67%' },
      size: { width: '14%', height: '22%' },
      rotate: -2,
      floatClass: 'float-1',
      items: [
        { title: 'Fleabag', url: 'https://www.imdb.com/title/tt5687612/', note: 'phoebe waller-bridge is simply a genius', tag: 'comedy' },
        { title: 'Severance', url: 'https://www.imdb.com/title/tt11280740/', note: 'work-life balance as horror', tag: 'sci-fi' },
        { title: 'WWDITS', url: 'https://www.imdb.com/title/tt7908628/', note: 'what we do in the shadows (series)', tag: 'comedy' },
        { title: 'The Good Place', url: 'https://www.imdb.com/title/tt4955642/', note: 'philosophy but make it fun', tag: 'comedy' },
        { title: 'Succession', url: 'https://www.imdb.com/title/tt7660850/', note: 'everyone is terrible and fascinating', tag: 'drama' },
      ]
    },
    {
      id: 'youtube',
      name: 'YouTube',
      emoji: '📹',
      subtitle: 'channels i actually finish watching',
      color: '#dc2626',
      bgLight: '#fee2e2',
      borderRadius: '30% 70% 40% 60% / 50% 30% 70% 50%',
      position: { left: '53%', top: '65%' },
      size: { width: '13%', height: '20%' },
      rotate: 1.5,
      floatClass: 'float-5',
      items: [
        { title: 'Tom Scott', url: 'https://youtube.com/@TomScottGo', note: 'things you might not know about the world', tag: 'education' },
        { title: 'Jan Misali', url: 'https://youtube.com/@jan-Misali', note: 'linguistics & games deep dives', tag: 'linguistics' },
        { title: 'CGP Grey', url: 'https://youtube.com/@CGPGrey', note: 'elegant explanations of complex things', tag: 'explainer' },
        { title: 'Kurzgesagt', url: 'https://youtube.com/@kurzgesagt', note: 'existential dread but beautiful', tag: 'science' },
        { title: 'Technology Connections', url: 'https://youtube.com/@TechnologyConnections', note: 'appliances deserve appreciation', tag: 'tech' },
      ]
    },
    {
      id: 'photos',
      name: 'Photos',
      emoji: '📸',
      subtitle: 'moments & visual inspiration',
      color: '#e11d48',
      bgLight: '#ffe4e6',
      borderRadius: '70% 30% 60% 40% / 40% 70% 30% 60%',
      position: { left: '75%', top: '70%' },
      size: { width: '13%', height: '20%' },
      rotate: -1.5,
      floatClass: 'float-2',
      items: [
        { title: 'Unsplash', url: 'https://unsplash.com', note: 'free photos that don\'t look stock', tag: 'resource' },
        { title: 'Lens Culture', url: 'https://www.lensculture.com', note: 'photography as fine art', tag: 'art' },
        { title: 'Humans of NY', url: 'https://www.humansofnewyork.com', note: 'portraits & stories', tag: 'documentary' },
        { title: 'National Geographic', url: 'https://www.nationalgeographic.com/photography', note: 'the classics for a reason', tag: 'editorial' },
      ]
    },
  ];

  function selectCategory(cat) {
    activeCategory = activeCategory?.id === cat.id ? null : cat;
  }

  function handleKeydown(e, cat) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectCategory(cat);
    }
  }
</script>

<svelte:head>
  <title>Trinketbox — Penélope Gonçalves</title>
  <meta name="description" content="Penélope's interactive map of favourite people, websites, movies, books, music and more." />
</svelte:head>

<div class="trinketbox-page">
  <div class="page-header">
    <div class="header-inner">
      <h1 class="page-title chaos-rotate-2">The Trinketbox</h1>
      <p class="page-subtitle">a map of things i love on the internet & beyond</p>
      <div class="handwritten hint-text">click a region to explore ↓</div>
    </div>
  </div>

  <!-- Desktop map -->
  <div class="map-outer">
    <div class="map-container" role="region" aria-label="Interactive favourites map">

      <!-- SVG decoration layer -->
      <svg class="map-svg" viewBox="0 0 100 56.25" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <!-- Background water texture: gentle wavy lines -->
        <path d="M10,28 Q20,26 30,28 Q40,30 50,28 Q60,26 70,28 Q80,30 90,28" stroke="#bae6fd" stroke-width="0.4" fill="none" opacity="0.5"/>
        <path d="M5,32 Q18,30 32,32 Q46,34 60,32 Q74,30 88,32" stroke="#bae6fd" stroke-width="0.35" fill="none" opacity="0.4"/>
        <path d="M15,36 Q28,34 42,36 Q56,38 70,36 Q82,34 95,36" stroke="#bae6fd" stroke-width="0.3" fill="none" opacity="0.35"/>

        <!-- Dotted connection paths between nearby regions -->
        <path d="M 11,9.6 C 22,8 28,8 40,7.9" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>
        <path d="M 40,7.9 C 54,8 62,9 74,10.1" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>
        <path d="M 11,9.6 C 10,18 9,23 8.5,30.4" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>
        <path d="M 74,10.1 C 76,18 78,24 80.5,30.4" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>
        <path d="M 40,7.9 C 42,15 44,21 45.5,27" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>
        <path d="M 8.5,30.4 C 10,36 11,40 13.5,43.9" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>
        <path d="M 13.5,43.9 C 22,44 28,44 35,43.9" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>
        <path d="M 35,43.9 C 38,37 41,33 45.5,27" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>
        <path d="M 80.5,30.4 C 81,36 81,40 81.5,45" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>
        <path d="M 59.5,42.2 C 52,43 44,43.5 35,43.9" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>
        <path d="M 81.5,45 C 73,43.5 67,42.8 59.5,42.2" stroke="#cbd5e1" stroke-width="0.6" fill="none" stroke-dasharray="1.5,1.2" opacity="0.7"/>

        <!-- Sparkle stars scattered in empty areas -->
        <text x="25" y="9" font-size="2.5" fill="#fbbf24" opacity="0.7">✦</text>
        <text x="58" y="8" font-size="2" fill="#c084fc" opacity="0.6">✦</text>
        <text x="3" y="37" font-size="1.8" fill="#67e8f9" opacity="0.7">✦</text>
        <text x="87" y="36" font-size="2.2" fill="#86efac" opacity="0.6">✦</text>
        <text x="20" y="54" font-size="1.5" fill="#fca5a5" opacity="0.6">✦</text>
        <text x="48" y="14" font-size="1.8" fill="#f9a8d4" opacity="0.5">✦</text>
        <text x="22" y="30" font-size="1.6" fill="#6ee7b7" opacity="0.5">⟡</text>
        <text x="64" y="32" font-size="1.8" fill="#fde68a" opacity="0.6">⟡</text>
        <text x="46" y="52" font-size="1.5" fill="#c4b5fd" opacity="0.5">⟡</text>

        <!-- Small decorative dots -->
        <circle cx="28" cy="20" r="0.5" fill="#94a3b8" opacity="0.5"/>
        <circle cx="62" cy="20" r="0.5" fill="#94a3b8" opacity="0.5"/>
        <circle cx="22" cy="38" r="0.4" fill="#94a3b8" opacity="0.4"/>
        <circle cx="70" cy="38" r="0.4" fill="#94a3b8" opacity="0.4"/>
        <circle cx="45" cy="48" r="0.5" fill="#94a3b8" opacity="0.4"/>
        <circle cx="28" cy="52" r="0.4" fill="#94a3b8" opacity="0.4"/>
        <circle cx="63" cy="52" r="0.4" fill="#94a3b8" opacity="0.4"/>

        <!-- Compass rose top-right corner -->
        <g transform="translate(95,4)" opacity="0.45">
          <circle cx="0" cy="0" r="2.8" fill="none" stroke="#94a3b8" stroke-width="0.4"/>
          <circle cx="0" cy="0" r="0.6" fill="#94a3b8"/>
          <polygon points="0,-2.5 0.5,-1 -0.5,-1" fill="#64748b"/>
          <polygon points="0,2.5 0.5,1 -0.5,1" fill="#94a3b8"/>
          <polygon points="2.5,0 1,0.5 1,-0.5" fill="#94a3b8"/>
          <polygon points="-2.5,0 -1,-0.5 -1,0.5" fill="#94a3b8"/>
          <text x="0" y="-3.3" text-anchor="middle" font-size="1.6" fill="#64748b" font-family="Space Grotesk, sans-serif">N</text>
        </g>

        <!-- "Here be wonders" label in center sea area -->
        <text x="50" y="23" text-anchor="middle" font-size="2.2" fill="#94a3b8" opacity="0.35" font-style="italic" font-family="Kalam, cursive">~ here be wonders ~</text>

        <!-- Small islands/dots in empty sea areas -->
        <ellipse cx="24" cy="20" rx="1.2" ry="0.8" fill="#e2e8f0" opacity="0.6"/>
        <ellipse cx="62" cy="18" rx="1" ry="0.7" fill="#e2e8f0" opacity="0.5"/>
        <ellipse cx="47" cy="50" rx="1.5" ry="0.9" fill="#e2e8f0" opacity="0.5"/>
      </svg>

      <!-- Handwritten map annotations -->
      <div class="map-annotation" style="left: 22%; top: 2%">start here!</div>
      <div class="map-annotation" style="left: 50%; top: 88%; transform: translateX(-50%)">scroll down for treasures →</div>

      <!-- Category blobs -->
      {#each categories as cat, i}
        <button
          class="map-blob {cat.floatClass}"
          class:active={activeCategory?.id === cat.id}
          style="
            left: {cat.position.left};
            top: {cat.position.top};
            width: {cat.size.width};
            height: {cat.size.height};
            background-color: {cat.color};
            border-radius: {cat.borderRadius};
            --rotate: {cat.rotate}deg;
            --color: {cat.color};
            animation-delay: {i * 0.4}s;
          "
          on:click={() => selectCategory(cat)}
          on:keydown={(e) => handleKeydown(e, cat)}
          aria-pressed={activeCategory?.id === cat.id}
          aria-label="Explore {cat.name}: {cat.subtitle}"
        >
          <span class="blob-emoji">{cat.emoji}</span>
          <span class="blob-name">{cat.name}</span>
          <span class="blob-count">{cat.items.length}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Mobile category grid (hidden on desktop) -->
  <div class="mobile-grid">
    {#each categories as cat}
      <button
        class="mobile-cat-card"
        class:active={activeCategory?.id === cat.id}
        style="--color: {cat.color}; --bg: {cat.bgLight};"
        on:click={() => selectCategory(cat)}
        aria-pressed={activeCategory?.id === cat.id}
      >
        <span class="mobile-emoji">{cat.emoji}</span>
        <span class="mobile-name">{cat.name}</span>
        <span class="mobile-subtitle">{cat.subtitle}</span>
      </button>
    {/each}
  </div>

  <!-- Items panel -->
  {#if activeCategory}
    <div
      class="items-panel"
      transition:fly={{ y: 40, duration: 350, opacity: 0 }}
      role="region"
      aria-label="{activeCategory.name} favourites"
    >
      <div class="panel-header" style="--color: {activeCategory.color}; background: {activeCategory.bgLight}; border-color: {activeCategory.color};">
        <div class="panel-header-left">
          <span class="panel-emoji">{activeCategory.emoji}</span>
          <div>
            <h2 class="panel-title" style="color: {activeCategory.color}">{activeCategory.name}</h2>
            <p class="panel-subtitle">{activeCategory.subtitle}</p>
          </div>
        </div>
        <button class="panel-close" on:click={() => activeCategory = null} aria-label="Close panel">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="panel-items" style="border-color: {activeCategory.color}">
        {#each activeCategory.items as item, i}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            class="item-card"
            style="--color: {activeCategory.color}; animation-delay: {i * 60}ms"
          >
            <span class="item-tag" style="background: {activeCategory.color}">{item.tag}</span>
            <h3 class="item-title">{item.title}</h3>
            <p class="item-note">{item.note}</p>
            <span class="item-arrow" aria-hidden="true">→</span>
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Legend -->
  <div class="legend">
    <div class="handwritten legend-label">the regions:</div>
    <div class="legend-chips">
      {#each categories as cat}
        <button
          class="legend-chip"
          class:active={activeCategory?.id === cat.id}
          style="--color: {cat.color}; --bg: {cat.bgLight};"
          on:click={() => selectCategory(cat)}
          aria-pressed={activeCategory?.id === cat.id}
        >
          {cat.emoji} {cat.name}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .trinketbox-page {
    min-height: 100vh;
    padding-bottom: 4rem;
  }

  /* ── Header ── */
  .page-header {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: 3rem 1rem 2rem;
    text-align: center;
    transform: rotate(0.3deg);
  }

  .header-inner {
    max-width: 700px;
    margin: 0 auto;
    position: relative;
  }

  .page-title {
    font-size: clamp(2rem, 6vw, 4rem);
    color: white;
    margin-bottom: 0.5rem;
  }

  .page-subtitle {
    color: rgba(255,255,255,0.85);
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  .hint-text {
    color: rgba(255,255,255,0.75);
    font-size: 1rem;
  }

  /* ── Map ── */
  .map-outer {
    width: 100%;
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1.5rem;
    display: none; /* hidden on mobile */
  }

  @media (min-width: 768px) {
    .map-outer {
      display: block;
    }
  }

  .map-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background:
      radial-gradient(ellipse at 50% 50%, rgba(254, 243, 199, 0.4) 0%, transparent 70%),
      repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(186,230,253,0.12) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(186,230,253,0.08) 40px),
      #fdf8f0;
    border-radius: 24px;
    border: 4px solid white;
    box-shadow:
      0 12px 40px rgba(0,0,0,0.12),
      0 4px 12px rgba(0,0,0,0.08),
      inset 0 0 0 1px rgba(0,0,0,0.06);
    overflow: hidden;
  }

  .map-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  /* ── Map annotations ── */
  .map-annotation {
    position: absolute;
    font-family: var(--font-handwritten);
    font-size: clamp(0.6rem, 1.2vw, 0.85rem);
    color: #94a3b8;
    transform: rotate(-1.5deg);
    pointer-events: none;
    z-index: 1;
  }

  /* ── Blob buttons ── */
  .map-blob {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    border: 3px solid white;
    cursor: pointer;
    transform: rotate(var(--rotate, 0deg));
    translate: 0 0;
    transition:
      translate 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.3s ease,
      filter 0.3s ease;
    box-shadow: 0 4px 16px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.14);
    filter: saturate(0.88) brightness(0.97);
    outline: none;
    z-index: 2;
    padding: 6px;
  }

  .map-blob:focus-visible {
    outline: 3px solid white;
    outline-offset: 3px;
    box-shadow: 0 0 0 5px var(--color), 0 4px 16px rgba(0,0,0,0.22);
  }

  .map-blob:hover {
    translate: 0 -6px;
    transform: rotate(var(--rotate, 0deg)) scale(1.1);
    box-shadow: 0 14px 28px rgba(0,0,0,0.26), 0 4px 10px rgba(0,0,0,0.18);
    filter: saturate(1.15) brightness(1.06);
    z-index: 10;
  }

  .map-blob.active {
    translate: 0 -8px;
    transform: rotate(var(--rotate, 0deg)) scale(1.12);
    box-shadow:
      0 16px 32px rgba(0,0,0,0.28),
      0 0 0 3px white,
      0 0 0 5px var(--color),
      0 0 20px rgba(0,0,0,0.12);
    filter: saturate(1.2) brightness(1.08);
    z-index: 20;
  }

  .blob-emoji {
    font-size: clamp(1.1rem, 2.5vw, 1.8rem);
    line-height: 1;
    display: block;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.25));
  }

  .blob-name {
    color: white;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(0.5rem, 1.2vw, 0.85rem);
    text-shadow: 0 1px 4px rgba(0,0,0,0.45);
    text-align: center;
    line-height: 1.1;
  }

  .blob-count {
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(14px, 2vw, 20px);
    height: clamp(14px, 2vw, 20px);
    background: rgba(255,255,255,0.3);
    border-radius: 50%;
    font-size: clamp(0.45rem, 0.9vw, 0.65rem);
    color: white;
    font-weight: 700;
    border: 1px solid rgba(255,255,255,0.5);
  }

  /* ── Floating animations ── */
  @keyframes float-anim {
    0%, 100% { translate: 0 0px; }
    50% { translate: 0 -5px; }
  }

  .map-blob {
    animation: float-anim 3.5s ease-in-out infinite;
  }

  .float-1 { animation-duration: 3.2s; }
  .float-2 { animation-duration: 3.8s; }
  .float-3 { animation-duration: 4.1s; }
  .float-4 { animation-duration: 3.5s; }
  .float-5 { animation-duration: 4.4s; }
  .float-6 { animation-duration: 3.0s; }

  .map-blob:hover,
  .map-blob.active {
    animation-play-state: paused;
  }

  /* ── Mobile grid ── */
  .mobile-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    max-width: 600px;
    margin: 1.5rem auto;
    padding: 0 1rem;
  }

  @media (min-width: 480px) {
    .mobile-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 768px) {
    .mobile-grid {
      display: none;
    }
  }

  .mobile-cat-card {
    background: var(--bg);
    border: 3px solid var(--color);
    border-radius: var(--border-radius-sticker);
    padding: 0.85rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
  }

  .mobile-cat-card:hover,
  .mobile-cat-card.active {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  }

  .mobile-cat-card.active {
    border-width: 4px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.2), 0 0 0 3px white;
  }

  .mobile-emoji { font-size: 2rem; }

  .mobile-name {
    font-weight: 700;
    color: var(--color);
    font-family: var(--font-display);
    font-size: 0.85rem;
  }

  .mobile-subtitle {
    color: var(--color-text-light);
    font-size: 0.7rem;
    line-height: 1.3;
  }

  /* ── Items panel ── */
  .items-panel {
    max-width: 1200px;
    margin: 0 auto 1.5rem;
    padding: 0 1.5rem;
    background: none;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    border-radius: var(--border-radius-card) var(--border-radius-card) 0 0;
    border: 3px solid;
    border-bottom: none;
  }

  .panel-header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .panel-emoji {
    font-size: 2.5rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .panel-title {
    font-size: 1.5rem;
    margin: 0;
    line-height: 1;
  }

  .panel-subtitle {
    color: var(--color-text-light);
    margin: 0.25rem 0 0;
    font-style: italic;
    font-size: 0.9rem;
  }

  .panel-close {
    background: rgba(0,0,0,0.08);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--color-text-light);
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .panel-close:hover {
    background: rgba(0,0,0,0.15);
    color: var(--color-text);
    transform: rotate(90deg);
  }

  .panel-items {
    display: flex;
    gap: 1rem;
    padding: 1.25rem;
    background: white;
    border: 3px solid var(--color, #0891b2);
    border-radius: 0 0 var(--border-radius-card) var(--border-radius-card);
    overflow-x: auto;
    flex-wrap: wrap;
    border-color: inherit;
  }

  /* inherit panel border color from parent */
  .items-panel .panel-items {
    border-color: var(--panel-color, #0891b2);
  }

  .item-card {
    flex: 0 0 auto;
    width: 190px;
    background: white;
    border: 2.5px solid var(--color);
    border-radius: var(--border-radius-sticker);
    padding: 1rem;
    text-decoration: none;
    color: var(--color-text);
    transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    animation: card-in 0.3s ease both;
  }

  @keyframes card-in {
    from { opacity: 0; transform: translateY(10px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .item-card:hover {
    transform: translateY(-5px) rotate(1deg);
    box-shadow: 0 10px 24px rgba(0,0,0,0.14), 0 0 0 2px var(--color);
  }

  .item-tag {
    display: inline-block;
    color: white;
    font-size: 0.62rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border-radius: 8px;
    padding: 2px 8px;
    align-self: flex-start;
  }

  .item-title {
    font-size: 0.95rem;
    font-weight: 700;
    margin: 0;
    color: var(--color);
    line-height: 1.2;
  }

  .item-note {
    font-size: 0.78rem;
    color: var(--color-text-light);
    margin: 0;
    line-height: 1.4;
    flex: 1;
  }

  .item-arrow {
    position: absolute;
    bottom: 0.85rem;
    right: 0.85rem;
    color: var(--color);
    font-size: 1rem;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
  }

  .item-card:hover .item-arrow {
    opacity: 1;
    transform: translateX(3px);
  }

  /* ── Legend ── */
  .legend {
    max-width: 1200px;
    margin: 0.5rem auto 0;
    padding: 0 1.5rem;
  }

  .legend-label {
    margin-bottom: 0.6rem;
    color: var(--color-text-light);
    font-size: 0.85rem;
  }

  .legend-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .legend-chip {
    background: var(--bg);
    border: 2px solid var(--color);
    border-radius: 100px;
    padding: 0.25rem 0.85rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color);
    cursor: pointer;
    transition: all 0.18s ease;
    white-space: nowrap;
  }

  .legend-chip:hover {
    background: var(--color);
    color: white;
    transform: translateY(-1px);
  }

  .legend-chip.active {
    background: var(--color);
    color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

</style>
