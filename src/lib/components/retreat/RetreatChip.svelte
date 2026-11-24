<script>
  /** A pill that toggles on and off; the parent decides what "on" means. */
  export let on = false;
</script>

<button type="button" class="chip" aria-pressed={on} on:click><slot /></button>

<style>
  .chip {
    padding: var(--spacing-2) var(--spacing-5, 1.25rem);
    font-family: var(--font-sans);
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    color: var(--ink);
    background: var(--paper-card);
    border: 2px solid var(--ink);
    border-radius: var(--border-radius-sticker);
    transition:
      transform 0.2s var(--ease-out),
      box-shadow 0.2s var(--ease-out),
      background-color 0.2s var(--ease-out);
  }

  .chip:hover {
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 0 var(--ink);
  }

  .chip[aria-pressed='true'] {
    background: var(--ink);
    color: var(--paper);
    box-shadow: 2px 2px 0 var(--terracotta);
  }

  @media (prefers-reduced-motion: reduce) {
    .chip {
      transition: none;
    }
    .chip:hover {
      transform: none;
    }
  }
</style>
