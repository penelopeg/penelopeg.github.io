<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';

  const tabs = [
    { href: '/retreat', label: 'Overview' },
    { href: '/retreat/blueprint', label: 'Blueprint' },
    { href: '/retreat/exercises', label: 'Exercises' },
    { href: '/retreat/plan', label: 'Budget' }
  ];

  /** @param {string} href */
  const current = (href) => $page.url.pathname.replace(/\/$/, '') === base + href;
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="sandbox-bar">
  <div class="container bar">
    <p class="eyebrow">Sandbox · working title · not public</p>
    <nav aria-label="Retreat sandbox">
      <ul>
        {#each tabs as tab (tab.href)}
          <li>
            <a href="{base}{tab.href}" aria-current={current(tab.href) ? 'page' : undefined}>{tab.label}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</div>

<div class="container retreat">
  <slot />
</div>

<style>
  .sandbox-bar {
    background: var(--paper-deep);
    border-bottom: 1px solid var(--line);
  }
  .bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-3);
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
  }
  .bar p {
    margin: 0;
  }
  ul {
    list-style: none;
    display: flex;
    gap: var(--spacing-4);
    flex-wrap: wrap;
  }
  a {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    text-decoration: none;
    padding: var(--spacing-1) 0;
    border-bottom: 2px solid transparent;
  }
  a:hover,
  a[aria-current='page'] {
    border-bottom-color: var(--terracotta);
  }
  .retreat {
    padding-top: var(--spacing-12);
    padding-bottom: var(--spacing-24);
  }
  .retreat :global(.lede) {
    font-size: 1.2rem;
    max-width: 44rem;
    color: var(--ink-soft);
  }
  .retreat :global(.chip) {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    padding: 0.1rem 0.55rem;
    border: 1.5px solid var(--ink);
    border-radius: 999px;
    background: var(--paper-card);
  }
  .retreat :global(.chip.head) {
    background: var(--ochre-light);
  }
  .retreat :global(.chip.heart) {
    background: #f6c3b3;
  }
  .retreat :global(.chip.body) {
    background: #cfd8a8;
  }
  .retreat :global(.flag) {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: #8f1d1d;
    font-weight: 700;
  }
  .retreat :global(.ok) {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--olive);
  }
  .retreat :global(label) {
    display: grid;
    gap: var(--spacing-1);
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }
  .retreat :global(input[type='number']),
  .retreat :global(select) {
    font: inherit;
    font-family: var(--font-sans);
    font-size: 1rem;
    padding: 0.5rem 0.6rem;
    border: 2px solid var(--ink);
    border-radius: var(--border-radius-card);
    background: var(--paper-card);
    width: 100%;
  }
</style>
