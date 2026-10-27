<script>
  import { base } from '$app/paths';
  import WorkCard from '$lib/components/WorkCard.svelte';
  import { buckets } from '$lib/data/works.js';

  let selected = '';

  $: visible = selected ? buckets.filter((b) => b.id === selected) : buckets;
</script>

<section class="ct-hero">
  <div class="container">
    <h1>Portfolio</h1>
    <p class="lead">
      Gatherings, creative tech and words. Hover a piece to peek at the raw notes behind it.
    </p>
    <div class="hero-actions">
      <a href="{base}/about" class="button">Who's behind this?</a>
      <a href="{base}/cv" class="button button-primary">Read the CV</a>
    </div>
  </div>
</section>

<section class="works">
  <div class="container">
    <div class="filters" role="group" aria-label="Filter by thread">
      <button class="chip" aria-pressed={selected === ''} on:click={() => (selected = '')}>All</button>
      {#each buckets as bucket (bucket.id)}
        <button
          class="chip"
          style="--accent: {bucket.color}"
          aria-pressed={selected === bucket.id}
          on:click={() => (selected = selected === bucket.id ? '' : bucket.id)}
        >
          {bucket.title}
        </button>
      {/each}
    </div>

    {#each visible as bucket (bucket.id)}
      <section class="bucket" aria-labelledby="bucket-{bucket.id}">
        <header class="bucket-head" style="--accent: {bucket.color}">
          <div>
            <h2 id="bucket-{bucket.id}">{bucket.title}</h2>
            <p>{bucket.blurb}</p>
          </div>
        </header>
        <div class="grid">
          {#each bucket.works as work, i (work.title)}
            <WorkCard {work} {i} accent={bucket.color} />
          {/each}
        </div>
      </section>
    {/each}
  </div>
</section>

<style>
  .works {
    padding: var(--spacing-16) 0;
  }

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-12);
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-2) var(--spacing-4);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--ink);
    background: var(--paper-card);
    border: 2px solid var(--ink);
    border-radius: var(--border-radius-sticker);
    cursor: pointer;
    transition: var(--transition-fast);
  }

  .chip:hover {
    transform: var(--lift-hover);
    box-shadow: var(--shadow-sticker);
  }

  .chip[aria-pressed='true'] {
    background: var(--accent, var(--ink));
    color: var(--paper);
    box-shadow: var(--shadow-sticker);
  }

  .bucket {
    border-top: 2px solid var(--ink);
    padding-top: var(--spacing-8);
    margin-bottom: var(--spacing-16);
  }

  .bucket-head {
    display: grid;
    gap: var(--spacing-6);
    margin-bottom: var(--spacing-8);
  }

  .bucket-head h2 {
    margin-bottom: var(--spacing-2);
  }

  .bucket-head p {
    margin: 0;
    color: var(--ink-soft);
    max-width: 40rem;
  }

  .grid {
    display: grid;
    gap: var(--spacing-12) var(--spacing-8);
  }

  @media (min-width: 640px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
