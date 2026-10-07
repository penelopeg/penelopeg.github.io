<script>
  /** @type {import('$lib/data/offline.js').OfflineConcept} */
  export let concept;
  export let i = 0;
</script>

<article class="ticket" style="--tilt: {i % 2 ? 0.8 : -0.8}deg">
  <div class="stub">
    <span class="limited">Limited Run</span>
    <span class="edition">{concept.edition}</span>
  </div>
  <div class="main">
    <p class="when">{concept.when} · {concept.place}</p>
    <h3>
      {#if concept.url}
        <a href={concept.url} target="_blank" rel="noopener noreferrer"
          >{concept.title}<span class="visually-hidden"> (opens in a new tab)</span> ↗</a
        >
      {:else}
        {concept.title}
      {/if}
    </h3>
    <p class="desc">{concept.description}</p>
  </div>
</article>

<style>
  .ticket {
    display: grid;
    grid-template-columns: 4.5rem 1fr;
    background: var(--paper-card);
    color: var(--ink);
    border: 2px solid var(--ink);
    border-radius: var(--border-radius-card);
    box-shadow: 4px 4px 0 var(--ink);
    transform: rotate(var(--tilt));
    transition: var(--transition-base);
    position: relative;
  }

  .ticket:hover,
  .ticket:focus-within {
    transform: rotate(0deg) translateY(-3px);
    box-shadow: 6px 7px 0 var(--ink);
  }

  .stub {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-4) var(--spacing-2);
    border-right: 2px dashed var(--ink);
    background: var(--ochre);
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.7rem;
    border-radius: 0 var(--border-radius-card) var(--border-radius-card) 0;
  }

  .limited {
    font-weight: 700;
  }

  .main {
    padding: var(--spacing-6);
  }

  .when {
    margin: 0 0 var(--spacing-2);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--terracotta);
  }

  h3 {
    margin: 0 0 var(--spacing-2);
    font-size: 1.35rem;
  }

  h3 a {
    text-decoration: none;
  }

  h3 a:hover {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
  }

  .desc {
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.95rem;
  }
</style>
