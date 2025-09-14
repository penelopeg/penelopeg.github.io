<script>
  import { base } from '$app/paths';
  import '../app.css';
  import Seo from '$lib/components/Seo.svelte';
  
  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<Seo />

<div class="app">
  <nav class="nav">
    <div class="container nav-container">
    <a href="{base}/" class="nav-brand">
      <img src="{base}/images/logo.png" alt="PG Logo" />
    </a>
    
    <!-- Desktop Navigation -->
    <div class="nav-links">
      <a href="{base}/" class="nav-link chaos-rotate-1">Home</a>
      <a href="{base}/about" class="nav-link chaos-rotate-2">About</a>
      <a href="{base}/portfolio" class="nav-link chaos-rotate-3">Portfolio</a>
      <div class="handwritten" style="position: absolute; top: -10px; right: -20px; font-size: 0.8rem; z-index: 100;">
        navigate me!
      </div>
      <!-- <a href="{base}/events" class="nav-link">Events</a> -->
      <!-- <a href="{base}/cv" class="nav-link">CV</a> -->
    </div>
    
    <!-- Mobile Menu Button -->
    <button 
      class="menu-button"
      on:click={toggleMenu}
      aria-label="Toggle menu"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      {#if isMenuOpen}
        <path d="M6 18L18 6M6 6l12 12" />
      {:else}
        <path d="M4 6h16M4 12h16M4 18h16" />
      {/if}
      </svg>
    </button>
    </div>
    
    <!-- Mobile Navigation -->
    {#if isMenuOpen}
    <div class="mobile-nav animate-fade-in">
      <a href="{base}/" class="mobile-nav-link">Home</a>
      <a href="{base}/about" class="mobile-nav-link">About</a>
      <a href="{base}/portfolio" class="mobile-nav-link">Portfolio</a>
    </div>
    {/if}
  </nav>
  
  <main>
    <slot />
  </main>
  
  <footer class="footer">
    <div class="container">
    <div class="footer-content">
      <div class="footer-info">
      <h3 class="footer-title">Penélope</h3>
      <p class="footer-subtitle">Community builder / founder / tech lead / agent of (good) chaos</p>
      <p class="footer-copyright">© {new Date().getFullYear()} Penélope. All rights reserved.</p>
      </div>
      <div class="footer-social">
      <h3 class="footer-title">Connect</h3>
      <div class="social-links">
        <a href="https://linkedin.com/in/penelopeg" class="social-link" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        </a>
        <a href="https://lepsies.substack.com" class="social-link" aria-label="Substack">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
        </svg>
        </a>
        <a href="https://zez.am/lepsies" class="social-link" aria-label="All Links">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
        </svg>
        </a>
      </div>
      </div>
    </div>
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
  
  .nav-brand {
    display: flex;
    align-items: center;
    color: var(--color-primary);
    text-decoration: none;
  }
  
  .nav-brand img {
    height: 32px;
    width: auto;
  }
  
  .menu-button {
    display: block;
    padding: 0.5rem;
    background: none;
    border: none;
    color: var(--color-text);
    cursor: pointer;
  }
  
  @media (min-width: 768px) {
    .menu-button {
    display: none;
    }
  }
  
  .mobile-nav {
    padding: 1rem;
    background: var(--color-background);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .mobile-nav-link {
    display: block;
    padding: 0.75rem 0;
    color: var(--color-text);
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  
  .mobile-nav-link:last-child {
    border-bottom: none;
  }
  
  .footer {
    background: var(--color-text);
    color: white;
    padding: 4rem 0;
  }
  
  .footer-content {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;
  }
  
  @media (min-width: 768px) {
    .footer-content {
    grid-template-columns: 2fr 1fr;
    }
  }
  
  .footer-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .footer-subtitle {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.5rem;
  }
  
  .footer-copyright {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
  }
  
  .social-link {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s ease;
  }
  
  .social-link:hover {
    color: white;
  }
</style>