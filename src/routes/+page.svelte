<script>
  import { base } from '$app/paths';
  import HomeSections from '$lib/components/home/HomeSections.svelte';

  const roles = ['community builder', 'founder', 'tech lead', 'host', 'writer', 'painter', 'dancer'];
</script>

<!-- ── HERO ────────────────────────────────────────────────────────────── -->
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow"><span class="pulse" aria-hidden="true"></span> Penélope Gonçalves · Algarve, PT</p>
      <h1 id="hero-title">
        Building <span class="serif-italic">interactive spaces</span> and
        <span class="mark">impact communities</span> that <span class="nowrap">co-create</span> the future.
      </h1>
      <ul class="roles" aria-label="Roles">
        {#each roles as role (role)}
          <li>{role}</li>
        {/each}
      </ul>
      <div class="hero-actions">
        <a href="#works" class="button button-primary">See selected works ↓</a>
        <a href="#lab" class="button">Peek into the lab</a>
      </div>
    </div>

    <figure class="portrait">
      <span class="tape tape-a" aria-hidden="true"></span>
      <span class="tape tape-b" aria-hidden="true"></span>
      <img
        src="{base}/images/profile/me_alternative.jpg"
        alt="Penélope Gonçalves, smiling"
        width="480"
        height="600"
      />
      <figcaption class="handwritten">(this is me, hi!)</figcaption>
    </figure>
  </div>
</section>

<HomeSections />

<style>
  /* ── Hero ── */
  .hero {
    position: relative;
    padding: var(--spacing-12) 0 var(--spacing-16);
    overflow: hidden;
    background-color: var(--terracotta);
    background-image: var(--grain);
    color: var(--on-hero);
  }

  .hero .eyebrow {
    color: var(--on-hero);
  }

  /* Dark CTA so it doesn't melt into the terracotta */
  .hero :global(.button-primary) {
    background-color: var(--ink);
    color: var(--paper);
  }

  @media (min-width: 1024px) {
    .hero {
      padding: var(--spacing-16) 0 var(--spacing-24);
    }
  }

  /* Halftone sun rising behind the portrait */
  .hero::before {
    content: '';
    position: absolute;
    width: 22rem;
    height: 22rem;
    right: -6rem;
    bottom: -6rem;
    border-radius: 50%;
    background: var(--halftone-sun);
    pointer-events: none;
  }

  @media (min-width: 1024px) {
    .hero::before {
      width: 34rem;
      height: 34rem;
      top: 4rem;
      bottom: auto;
    }
  }

  .hero-grid {
    position: relative;
    display: grid;
    gap: var(--spacing-12);
    align-items: center;
  }

  @media (min-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1.6fr 1fr;
    }
  }

  .hero h1 {
    font-size: clamp(2.6rem, 6.4vw, 5.6rem);
    line-height: 1.02;
    letter-spacing: -0.035em;
    margin: var(--spacing-6) 0;
    max-width: 16ch;
  }

  .hero h1 .serif-italic {
    color: var(--on-hero-accent);
  }

  .nowrap {
    white-space: nowrap;
  }

  .mark {
    background: linear-gradient(transparent 62%, color-mix(in srgb, var(--ink) 38%, transparent) 62%);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  .pulse {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--ochre-light);
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--ochre-light) 60%, transparent);
    animation: pulse 2s infinite;
  }

  .roles {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    list-style: none;
    margin-bottom: var(--spacing-8);
  }

  .roles li {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 0.2rem 0.7rem;
    border: 1.5px solid rgba(243, 235, 221, 0.55);
    border-radius: var(--border-radius-sticker);
    color: var(--on-hero);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
  }

  .portrait {
    position: relative;
    justify-self: center;
    width: min(78%, 22rem);
    padding: 0.75rem 0.75rem 3.25rem;
    background: var(--paper-card);
    box-shadow: var(--shadow-card-hover);
    transform: rotate(2.5deg);
    transition: transform 0.4s var(--ease-out);
  }

  .portrait:hover {
    transform: rotate(0deg) scale(1.01);
  }

  .portrait img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    filter: sepia(0.12) saturate(0.95);
  }

  .portrait figcaption {
    position: absolute;
    bottom: 0.8rem;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1.5rem;
  }

  .tape-a {
    top: -0.7rem;
    left: -1.2rem;
    transform: rotate(-28deg);
  }

  .tape-b {
    top: -0.7rem;
    right: -1.2rem;
    transform: rotate(24deg);
  }

  @keyframes pulse {
    70% {
      box-shadow: 0 0 0 0.6rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
</style>
