<script>
  import { base } from '$app/paths';
  const roles = [
    {
      title: 'Community Builder',
      description: 'Creating communities that want to create a positive impact @ Geek Sessions, Impact Hackers, and more',
      color: '#3b82f6',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
      title: 'Founder',
      description: 'Solving the problem of loneliness in community building @ local.foundation',
      color: '#10b981',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
    },
    {
      title: 'Tech Lead',
      description: 'Leading an engineering team to deliver high-quality software solutions @ Contentserv',
      color: '#7c3aed',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v3m6.366 2.634a9 9 0 0 1 0 12.728M7.634 5.634a9 9 0 0 0 0 12.728"/><path d="M3 12h3m12 0h3M12 18v3M12 9v6"/></svg>`
    },
    {
      title: 'Speaker',
      description: 'Sharing insights and experiences by yapping a considerate amount',
      color: '#ff66b3',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`
    },
    {
      title: 'Writer',
      description: 'Legendary google keep notes writer, a thousand fiction projects to publish, posting the occasional diary entry @ substack',
      color: '#06b6d4',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`
    },
    {
      title: 'Artist',
      description: 'Exploring creativity (and a lack of natural talent) through digital art, visual storytelling and the occasional design',
      color: '#f59e0b',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`
    }
  ];
</script>
  
<div class="hero">
  <div class="container">
    <div class="hero-content">
      <h1>Olá, I'm Penélope, and I'm a</h1>
      <p class="hero-subtitle chaos-spacing">
        {#each roles as role}
          <span class="strikethrough" style="--role-color: {role.color}">{role.title.toLowerCase()}</span>
          {#if role !== roles[roles.length - 1]} / {/if}
        {/each}
      </p>
      <p class="hero-subtitle escape-container">agent of (good) chaos</p>
      <div class="handwritten" style="position: absolute; top: 20px; right: 20px; z-index: 100;">
        (this is me!)
      </div>
      <div class="hero-actions chaos-spacing">
        <a href="{base}/about" class="button button-primary chaos-rotate-1">Who?</a>
        <a href="{base}/portfolio" class="button button-secondary chaos-rotate-3">What?</a>
        <div class="handwritten" style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); color: white; z-index: 100;">
          click these!
        </div>
      </div>
    </div>
  </div>
</div>
  
<section class="roles-section">
  <div class="container">
    <h2 class="text-center chaos-rotate-2">What do you do again? <span class="handwritten" style="font-size: 0.8em; margin-left: 10px;"><svg style="display: inline; width: 25px; height: 15px; margin-right: 5px;" viewBox="0 0 40 15" fill="none"><path d="M2,7 Q8,3 16,9 Q24,13 32,5 Q36,3 35,7" stroke="currentColor" stroke-width="2.5" fill="none"/><path d="M35,7 L39,5 L39,9 Z" fill="currentColor"/></svg> good question tbh</span></h2>
    <div class="chaos-grid">
      {#each roles as role, i}
        <div class="wonky-border role-card chaos-rotate-{(i % 4) + 1}">
          <div class="role-icon" style="--role-color: {role.color}">
            {@html role.icon}
          </div>
          <h3 class="scribble-underline">{role.title}</h3>
          <p>{role.description}</p>
          {#if i === 0}
            <div class="handwritten" style="position: absolute; top: -30px; right: -15px; z-index: 100;">
              start here!
            </div>
          {/if}
          {#if i === 2}
            <div class="handwritten" style="position: absolute; top: -15px; right: -25px; z-index: 100;">
              (day job)
            </div>
          {/if}
          {#if role.title === 'Writer'}
            <div class="handwritten mobile-note-writer" style="position: absolute; bottom: -20px; left: -25px; z-index: 100;">
              wannabe
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
  
<style>
  .hero {
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    color: white;
    padding: var(--spacing-8) 0;
    text-align: center;
    transform: rotate(0.4deg);
    transform-origin: center center;
  }
  
  .hero-content {
    max-width: 100rem;
    margin: 0 auto;
    padding: 0 var(--spacing-4);
    position: relative;
  }
  
  .hero h1 {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-4);
  }
  
  .hero-subtitle {
    font-size: 1.75rem;
    opacity: 0.9;
    margin-bottom: var(--spacing-4);
    line-height: 1.3;
  }
  
  @media (min-width: 640px) {
    .hero {
      padding: var(--spacing-12) 0;
    }

    .hero h1 {
      font-size: 4rem;
    }
    
    .hero-subtitle {
      font-size: 2.75rem;
      margin-bottom: var(--spacing-6);
    }
  }

  @media (min-width: 1024px) {
    .hero {
      padding: var(--spacing-16) 0;
    }

    .hero h1 {
      font-size: 8.5rem;
    }
    
    .hero-subtitle {
      font-size: 5.25rem;
      margin-bottom: var(--spacing-8);
    }
  }
  
  .roles-section {
    padding: var(--spacing-8) 0;
    background-color: var(--color-background);
    position: relative;
    transform: rotate(-0.4deg);
    transform-origin: center center;
  }
  
  .roles-section h2 {
    margin-bottom: var(--spacing-6);
  }
  
  .roles-grid {
    display: grid;
    gap: var(--spacing-6);
    grid-template-columns: repeat(1, 1fr);
  }
  
  @media (min-width: 640px) {
    .roles-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .roles-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  .role-card {
    text-align: center;
  }
  
  .role-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
    background-color: var(--role-color);
    color: white;
    margin-bottom: var(--spacing-4);
  }
  
  .role-card h3 {
    color: var(--color-text);
    font-size: 1.25rem;
    margin-bottom: var(--spacing-2);
  }
  
  .role-card p {
    color: var(--color-text-light);
    font-size: 0.875rem;
    margin-bottom: 0;
  }

  .strikethrough {
    position: relative;
    display: inline-block;
  }

  .strikethrough::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 20px;
    background: var(--role-color);
    transform: rotate(-4deg);
    opacity: 1;
    transition: all 0.3s ease;
  }

  .strikethrough:hover::after {
    opacity: 0;
    transform: rotate(-5deg) scale(1.2);
  }

  /* Sticker-style buttons */
  .hero-actions .button {
    font-size: 1rem;
    --hover-rotate: 1deg;
  }

  .hero-actions .button:nth-child(odd) {
    transform: rotate(-2deg);
  }

  .hero-actions .button:nth-child(even) {
    transform: rotate(2deg);
  }

  .hero-actions .button:hover {
    transform: translateY(-4px) rotate(calc(var(--hover-rotate) * 2));
  }
</style>