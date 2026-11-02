<script>
  /** Two-digit index printed like a lab notebook page number */
  export let index = '';
  export let eyebrow = '';
  export let title = '';
  export let blurb = '';
  export let id = '';
</script>

<header class="section-heading">
  <div class="meta">
    {#if index}<span class="index">{index}</span>{/if}
    {#if eyebrow}<span class="eyebrow">{eyebrow}</span>{/if}
  </div>
  <h2 {id}>{title}</h2>
  {#if blurb}<p class="blurb">{blurb}</p>{/if}
  <slot />
</header>

<style>
  .section-heading {
    display: grid;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-12);
    max-width: 46rem;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
  }

  .index {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 0.15rem 0.5rem;
    border: 1.5px solid currentColor;
    border-radius: var(--border-radius-sticker);
  }

  h2 {
    margin: 0;
  }

  .blurb {
    margin: 0;
    font-size: 1.125rem;
    color: var(--ink-soft);
  }
</style>
