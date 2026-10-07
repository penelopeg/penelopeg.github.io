<script>
  /** @type {string[]} */
  export let items = [];
  export let label = 'live from the lab';
</script>

<!-- Decorative marquee; the same content is listed accessibly elsewhere on the page -->
<div class="ticker" aria-hidden="true">
  <span class="label"><span class="dot"></span>{label}</span>
  <div class="track">
    {#each [0, 1] as copy (copy)}
      <ul class="run">
        {#each items as item, i (i)}
          <li>{item}<span class="sep">✳</span></li>
        {/each}
      </ul>
    {/each}
  </div>
</div>

<style>
  .ticker {
    display: flex;
    align-items: stretch;
    background: var(--ink);
    color: var(--paper);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    overflow: hidden;
    border-block: 2px solid var(--ink);
  }

  .label {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-3) var(--spacing-4);
    background: var(--coral);
    color: var(--ink);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.7rem;
    z-index: 1;
  }

  .dot {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--ink);
    animation: blink 1.4s steps(2, start) infinite;
  }

  .track {
    display: flex;
    width: max-content;
    animation: scroll 60s linear infinite;
  }

  .ticker:hover .track {
    animation-play-state: paused;
  }

  .run {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: var(--spacing-3) 0 var(--spacing-3) var(--spacing-6);
  }

  .sep {
    margin-left: var(--spacing-6);
    color: var(--ochre);
  }

  @keyframes scroll {
    to {
      transform: translateX(-50%);
    }
  }

  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
</style>
