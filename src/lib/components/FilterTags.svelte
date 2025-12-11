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
    border-radius: 0;
    color: white;
    cursor: pointer;
    transition: transform 0.15s ease;
    text-transform: uppercase;
    border: 3px solid rgba(0, 0, 0, 0.6);
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.3px;
    box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
    position: relative;
  }

  .tag::before {
    content: '';
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }

  .tag:nth-child(odd) {
    transform: rotate(-0.8deg);
  }

  .tag:nth-child(even) {
    transform: rotate(0.8deg);
  }

  .tag:nth-child(3n) {
    transform: rotate(0deg);
  }

  .tag:hover {
    transform: translate(1px, 1px) rotate(0deg);
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
  }

  .tag.active {
    background: rgba(0, 0, 0, 0.9) !important;
    border-color: currentColor;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
    transform: rotate(0deg) translate(2px, 2px);
  }

  .tag.active::before {
    border-color: rgba(255, 255, 255, 0.6);
  }
</style>
