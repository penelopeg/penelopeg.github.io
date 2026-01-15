<script>
  export let items = [];
  export let colors = {};
  export let selected = '';
  
  function getStyle(item) {
    const color = colors[item] || { bg: '#9ca3af', text: 'white' };
    return `background-color: ${color.bg}; color: ${color.text};`;
  }

  function getClass(item) {
    const baseClass = 'tag';
    return selected === item ? `${baseClass} active` : baseClass;
  }

  function handleFilter(item) {
    selected = selected === item ? '' : item;
  }
</script>

<div class="filter-tags">
  {#each items as item}
    <button 
      class={getClass(item)}
      style={getStyle(item)}
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
    justify-content: center;
  }

  .tag {
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--border-radius-sticker);
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 600;
    font-size: 0.9rem;
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .tag:nth-child(odd) {
    transform: rotate(-2deg);
  }

  .tag:nth-child(even) {
    transform: rotate(2deg);
  }

  .tag:nth-child(3n) {
    transform: rotate(1deg);
  }

  .tag:hover {
    transform: translateY(-2px) rotate(0deg);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.15);
  }

  .tag.active {
    background: rgba(0, 0, 0, 0.9) !important;
    transform: translateY(-4px) rotate(0deg) scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.2);
  }
</style>
