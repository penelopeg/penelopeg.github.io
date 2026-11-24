<script>
  import { base } from '$lib/paths';
  import FormatFinder from '$lib/components/retreat/FormatFinder.svelte';
  import RoadTrip from '$lib/components/retreat/RoadTrip.svelte';
  import { BOOKING_URL, testimonials, roadStops, problems } from '$lib/data/communitylab.js';
</script>

<svelte:head>
  <title>Community Lab — Penélope Gonçalves</title>
  <meta
    name="description"
    content="Formats where community leaders learn the craft from each other, so communities outlast the people who started them. 1-1 mentoring and programmes for organisations, online or in person, worldwide."
  />
</svelte:head>

<div class="ct-hero">
  <div class="container">
    <h1>Community <span class="serif-italic">Lab</span></h1>
    <p class="lead">
      I facilitate community leaders learning the craft from each other, so communities outlast the people who started them.
      Online or in person, wherever your community is.
    </p>
    <div class="hero-actions">
      <a class="button button-primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
        >Book a call ↗<span class="visually-hidden"> (opens in a new tab)</span></a
      >
      <a class="button" href="#offers">Find your format</a>
    </div>
  </div>
</div>

<section class="why">
  <div class="container narrow">
    <h2>We have enough events. It's time to build leaders who last.</h2>
    <ul class="problems">
      {#each problems as p (p.title)}
        <li>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section id="offers" class="offers">
  <div class="container narrow">
    <h2>Let's find your format.</h2>
    <FormatFinder />
  </div>
</section>

<section class="why-me" aria-labelledby="why-me-title">
  <div class="container narrow">
    <h2 id="why-me-title">Why me? <span class="serif-italic">Come along for the ride.</span></h2>
    <p class="intro">
      I've been the tired leader and the instinctive one, and I've run every type of room. Here's the road so far.
      Local Foundation studies the systems and builds the tools; Community Lab develops the people.
    </p>
    <RoadTrip
      stops={roadStops}
      nextText="Tell me about your community and we'll plan the stop together."
      nextHref="#offers"
      nextLabel="Find your format"
    />
    <p class="more">
      Want to see other formats I've run? <a href="{base}/events/">Events and gatherings →</a>
    </p>
  </div>
</section>


{#if testimonials.length > 0}
  <section class="voices">
    <div class="container narrow">
      <h2>What people say.</h2>
      <div class="quotes">
        {#each testimonials as t (t.name)}
          <figure>
            <blockquote>{t.quote}</blockquote>
            <figcaption><strong>{t.name}</strong>, {t.role}</figcaption>
          </figure>
        {/each}
      </div>
    </div>
  </section>
{/if}


<style>
  .lead {
    font-size: 1.25rem;
    max-width: 42rem;
    margin: 0;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
    margin-top: var(--spacing-8);
  }

  .narrow {
    max-width: 52rem;
  }

  .why,
  .offers,
  .voices,
  .why-me {
    padding: var(--spacing-16) 0;
  }

  .offers {
    background: var(--paper-deep);
  }

  h2 {
    max-width: 30ch;
    margin-bottom: var(--spacing-8);
  }

  .problems {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--spacing-8);
  }

  @media (min-width: 768px) {
    .problems {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .problems h3 {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-2);
  }

  .problems p {
    margin: 0;
    color: var(--ink-soft);
  }

  .intro {
    max-width: 42rem;
    margin: 0 0 var(--spacing-8);
    color: var(--ink-soft);
  }

  .quotes {
    display: grid;
    gap: var(--spacing-8);
  }

  @media (min-width: 768px) {
    .quotes {
      grid-template-columns: 1fr 1fr;
    }
  }

  figure {
    margin: 0;
    padding: var(--spacing-6);
    background: var(--paper-card);
    border: 1px solid var(--line);
    border-radius: 12px;
  }

  blockquote {
    margin: 0 0 var(--spacing-4);
    font-family: var(--font-display);
    font-size: 1.25rem;
    line-height: 1.35;
  }

  figcaption {
    color: var(--ink-soft);
    font-size: 0.9rem;
  }

  .why-me .more {
    margin: var(--spacing-12) 0 0;
    color: var(--ink-soft);
  }
</style>
