<script>
  import { base } from '$app/paths';
  import { resolveUrl, isExternal } from '$lib/data/works.js';

  /** @type {import('$lib/data/works.js').Work} */
  export let work;
  export let accent = 'var(--terracotta)';
  /** Position in grid, used for the subtle alternating tilt */
  export let i = 0;

  $: href = resolveUrl(work.url, base);
  $: external = isExternal(work.url);
</script>

<svelte:element
  this={href ? 'a' : 'article'}
  {href}
  target={external ? '_blank' : undefined}
  rel={external ? 'noopener noreferrer' : undefined}
  class="work"
  class:tilt-left={i % 2 === 0}
  style="--accent: {accent}"
>
  <div class="frame">
    <img src="{base}{work.image}" alt="" loading="lazy" class="finished" />
    <!-- The raw layer: scanned sketch if provided, otherwise a paper note -->
    <div class="raw" aria-hidden="true">
      {#if work.sketch}
        <img src="{base}{work.sketch}" alt="" loading="lazy" />
      {:else}
        <span class="raw-label">raw notes</span>
        <span class="raw-note">{work.note}</span>
      {/if}
    </div>
    <span class="tape" aria-hidden="true"></span>
  </div>
  <div class="body">
    <p class="role">{work.role}</p>
    <h3>
      {work.title}
      {#if href}<span class="arrow" aria-hidden="true">{external ? '↗' : '→'}</span>{/if}
    </h3>
    <p class="desc">{work.description}</p>
    {#if external}<span class="visually-hidden">(opens in a new tab)</span>{/if}
  </div>
</svelte:element>

<style>
  .work {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
    color: inherit;
    text-decoration: none;
  }

  .frame {
    position: relative;
    aspect-ratio: 4 / 3;
    background: var(--paper-card);
    padding: 0.6rem;
    border: 1px solid var(--line);
    box-shadow: var(--shadow-card);
    transition: var(--transition-base);
  }

  .finished,
  .raw {
    position: absolute;
    inset: 0.6rem;
    width: calc(100% - 1.2rem);
    height: calc(100% - 1.2rem);
  }

  .finished {
    object-fit: cover;
    filter: saturate(0.9) contrast(1.02);
    transition: clip-path 0.5s var(--ease-out), filter 0.3s ease;
    clip-path: inset(0 0 0 0);
    z-index: 1;
  }

  .raw {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: var(--spacing-2);
    /* keep the note inside the part the peel uncovers (left 62%) */
    padding: var(--spacing-4) calc(38% + var(--spacing-2)) var(--spacing-4) var(--spacing-4);
    background-color: var(--paper-card);
    background-image:
      linear-gradient(var(--line) 1px, transparent 1px),
      linear-gradient(90deg, var(--line) 1px, transparent 1px);
    background-size: 18px 18px;
  }

  .raw:has(img) {
    padding: 0;
  }

  .raw img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    mix-blend-mode: multiply;
  }

  .raw-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--ink-soft);
  }

  .raw-note {
    font-family: var(--font-handwritten);
    font-size: clamp(1.3rem, 2vw, 1.75rem);
    line-height: 1.05;
    color: var(--accent);
    transform: rotate(-2deg);
  }

  .tape {
    top: -0.6rem;
    left: 50%;
    transform: translateX(-50%) rotate(-3deg);
  }

  .tilt-left .tape {
    transform: translateX(-50%) rotate(4deg);
  }

  /* Peel back the finished image to reveal the raw layer */
  .work:hover .finished,
  .work:focus-visible .finished {
    clip-path: inset(0 0 0 62%);
    filter: saturate(1.05);
  }

  .work:hover .frame,
  .work:focus-visible .frame {
    transform: translateY(-4px) rotate(-0.6deg);
    box-shadow: var(--shadow-card-hover);
  }

  .tilt-left:hover .frame,
  .tilt-left:focus-visible .frame {
    transform: translateY(-4px) rotate(0.6deg);
  }

  .role {
    margin: 0 0 var(--spacing-1);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    letter-spacing: 0.02em;
  }

  h3 {
    margin: 0 0 var(--spacing-2);
    font-size: 1.5rem;
  }

  .arrow {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 1rem;
    color: var(--accent);
    transition: transform 0.2s var(--ease-out);
  }

  .work:hover .arrow {
    transform: translate(3px, -2px);
  }

  .desc {
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.95rem;
  }
</style>
