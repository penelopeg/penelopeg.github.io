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
    gap: var(--spacing-2);
    margin-bottom: var(--spacing-8);
    justify-content: center;
  }

  .tag {
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: 999px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: capitalize;
    border: none;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .tag:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  .tag.active {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateY(1px);
    filter: brightness(85%);
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
</style>
