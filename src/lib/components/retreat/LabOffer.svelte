<script>
  import { createEventDispatcher } from 'svelte';
  import { BOOKING_URL } from '$lib/data/communitylab.js';

  /** @type {import('$lib/data/communitylab.js').Offer} */
  export let offer;

  const dispatch = createEventDispatcher();
</script>

<article class="offer">
  <h4>{offer.title}</h4>
  <p class="meta">{offer.meta}</p>
  <p class="text">{offer.text}</p>
  <div class="foot">
    <span class="price">{offer.price ?? ''}</span>
    {#if offer.anchor}
      <a
        class="button"
        href={offer.anchor}
        on:click|preventDefault={() => dispatch('anchor', offer)}
      >{offer.cta} →</a>
    {:else}
      <a class="button" href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
        >{offer.cta} ↗<span class="visually-hidden"> (opens in a new tab)</span></a
      >
    {/if}
  </div>
</article>

<style>
  .offer {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: var(--spacing-6);
    background: var(--paper-card);
    border: 1px solid var(--line);
    border-radius: 12px;
    box-shadow: var(--shadow-soft, 0 6px 18px rgba(38, 33, 28, 0.08));
  }

  h4 {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.35rem;
    line-height: 1.15;
  }

  .meta {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--ink-soft);
  }

  .text {
    margin: var(--spacing-2) 0 0;
    flex: 1;
  }

  .foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-3);
    margin-top: var(--spacing-4);
  }

  .price {
    font-weight: 600;
  }
</style>
