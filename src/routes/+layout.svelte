<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import '../app.css';
  import Seo from '$lib/components/Seo.svelte';

  const links = [
    { href: '/', label: 'Index', n: '00' },
    { href: '/portfolio', label: 'Works', n: '01' },
    { href: '/events', label: 'Gatherings', n: '02' },
    { href: '/blog', label: 'Writing', n: '03' },
    { href: '/about', label: 'About', n: '04' }
  ];

  let isMenuOpen = false;

  /**
   * @param {string} href
   * @param {string} pathname
   */
  function isCurrent(href, pathname) {
    const path = pathname.replace(/\/$/, '');
    if (href === '/') return path === base;
    return path.startsWith(base + href);
  }

  // Close the mobile menu after navigating
  $: $page.url.pathname, (isMenuOpen = false);
</script>

<Seo />

<a href="#main" class="skip-link">Skip to content</a>

<div class="app">
  <nav class="nav" aria-label="Main">
    <div class="container nav-container">
      <a href="{base}/" class="wordmark" aria-label="Penélope Builds, home">
        <img src="{base}/images/logo.png" alt="" width="32" height="32" />
        <span>penélope<em>builds</em></span>
      </a>

      <ul class="nav-links">
        {#each links as link (link.href)}
          <li>
            <a
              href="{base}{link.href}"
              class="nav-link"
              aria-current={isCurrent(link.href, $page.url.pathname) ? 'page' : undefined}
              ><span class="n">{link.n}</span> {link.label}</a
            >
          </li>
        {/each}
      </ul>

      <button
        class="menu-button"
        on:click={() => (isMenuOpen = !isMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          {#if isMenuOpen}
            <path d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path d="M4 7h16M4 12h10M4 17h16" />
          {/if}
        </svg>
      </button>
    </div>

    {#if isMenuOpen}
      <ul id="mobile-nav" class="mobile-nav animate-fade-in">
        {#each links as link (link.href)}
          <li>
            <a
              href="{base}{link.href}"
              class="mobile-nav-link"
              aria-current={isCurrent(link.href, $page.url.pathname) ? 'page' : undefined}
              ><span class="n">{link.n}</span>{link.label}</a
            >
          </li>
        {/each}
      </ul>
    {/if}
  </nav>

  <main id="main">
    <slot />
  </main>

  <footer class="footer">
    <div class="container">
      <p class="footer-statement">
        Let’s build something <span class="serif-italic">together</span>, online or in a room full of people.
      </p>
      <div class="footer-grid">
        <div>
          <p class="eyebrow footer-label">Penélope Gonçalves · lepsies</p>
          <p class="footer-subtitle">
            Community builder · founder · tech lead · writer · agent of (good) chaos. Based in the Algarve, Portugal.
          </p>
        </div>
        <div>
          <p class="eyebrow footer-label">Elsewhere</p>
          <ul class="social-links">
            <li>
              <a href="https://linkedin.com/in/penelopeg" class="social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://lepsies.substack.com" class="social-link" aria-label="Substack">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://zez.am/lepsies" class="social-link" aria-label="All links">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </a>
            </li>
            <li>
              <a href="{base}/feed" class="social-link" aria-label="RSS feed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p class="footer-copyright">
        © {new Date().getFullYear()} Penélope Gonçalves. Handmade with SvelteKit, decaf and good chaos.
      </p>
    </div>
  </footer>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  .wordmark {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    text-decoration: none;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.3rem;
    letter-spacing: -0.02em;
    color: var(--ink);
  }

  .wordmark img {
    height: 32px;
    width: auto;
  }

  .wordmark em {
    font-style: italic;
    font-weight: 400;
    color: var(--terracotta);
    font-variation-settings: 'SOFT' 100, 'WONK' 1;
  }

  .nav-links {
    list-style: none;
  }

  .n {
    color: var(--ink-soft);
    margin-right: 0.15rem;
  }

  .menu-button {
    display: block;
    padding: 0.5rem;
    background: none;
    border: none;
    color: var(--ink);
    cursor: pointer;
  }

  @media (min-width: 768px) {
    .menu-button {
      display: none;
    }
  }

  .mobile-nav {
    list-style: none;
    padding: var(--spacing-2) var(--spacing-4) var(--spacing-4);
    border-top: 1px solid var(--line);
  }

  @media (min-width: 768px) {
    .mobile-nav {
      display: none;
    }
  }

  .mobile-nav-link {
    display: flex;
    gap: var(--spacing-3);
    align-items: baseline;
    padding: var(--spacing-3) 0;
    color: var(--ink);
    text-decoration: none;
    font-family: var(--font-display);
    font-size: 1.5rem;
    border-bottom: 1px solid var(--line);
  }

  .mobile-nav-link .n {
    font-family: var(--font-mono);
    font-size: 0.75rem;
  }

  .mobile-nav-link[aria-current='page'] {
    color: var(--terracotta);
  }

  .footer {
    background-color: var(--ink);
    background-image: var(--grain);
    color: var(--paper);
    padding: var(--spacing-16) 0 var(--spacing-8);
  }

  .footer-statement {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4vw, 3rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    max-width: 22ch;
    margin-bottom: var(--spacing-12);
  }

  .footer-statement .serif-italic {
    color: var(--coral);
  }

  .footer-grid {
    display: grid;
    gap: var(--spacing-8);
    grid-template-columns: 1fr;
    padding-top: var(--spacing-8);
    border-top: 1px solid rgba(243, 235, 221, 0.2);
  }

  @media (min-width: 768px) {
    .footer-grid {
      grid-template-columns: 2fr 1fr;
    }
  }

  .footer-label {
    color: var(--ochre);
    margin-bottom: var(--spacing-3);
  }

  .footer-subtitle {
    color: rgba(243, 235, 221, 0.8);
    max-width: 36rem;
  }

  .footer-copyright {
    margin: var(--spacing-12) 0 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: rgba(243, 235, 221, 0.6);
  }

  .social-links {
    display: flex;
    gap: var(--spacing-4);
    list-style: none;
  }

  .social-link {
    display: inline-flex;
    padding: var(--spacing-2);
    border: 1.5px solid rgba(243, 235, 221, 0.35);
    border-radius: 50%;
    color: var(--paper);
    transition: var(--transition-fast);
  }

  .social-link:hover {
    color: var(--ink);
    background: var(--coral);
    border-color: var(--coral);
    transform: var(--lift-hover);
  }

  .social-link svg {
    width: 20px;
    height: 20px;
  }
</style>
