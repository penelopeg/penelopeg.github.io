<script>
  export let items = [];
  export let colors = {};
  export let selected = '';

  /** @param {string} item */
  function accent(item) {
    return colors[item]?.bg ?? 'var(--ink)';
  }

  /** @param {string} item */
  function handleFilter(item) {
    selected = selected === item ? '' : item;
  }
</script>

<div class="filter-tags" role="group" aria-label="Filter">
  {#each items as item (item)}
    <button
      class="tag"
      style="--accent: {accent(item)}"
      aria-pressed={selected === item}
      on:click={() => handleFilter(item)}
    >
      {item}
    </button>
  {/each}
</div>

<style>
  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-8);
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-2) var(--spacing-4);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    text-transform: lowercase;
    color: var(--ink);
    background: var(--paper-card);
    border: 2px solid var(--ink);
    border-radius: var(--border-radius-sticker);
    cursor: pointer;
    transition: var(--transition-fast);
  }

  .tag::before {
    content: '';
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--accent);
  }

  .tag:hover {
    transform: var(--lift-hover);
    box-shadow: var(--shadow-sticker);
  }

  .tag[aria-pressed='true'] {
    background: var(--ink);
    color: var(--paper);
    box-shadow: var(--shadow-sticker);
  }
</style>
