<script>
  import { onMount } from 'svelte';

  /** @type {{ when: string, title: string, text: string }[]} */
  export let stops;

  /**
   * Split text containing [label](url) into plain and link parts.
   * @param {string} text
   * @returns {{ text: string, href?: string }[]}
   */
  function parts(text) {
    const out = [];
    const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
    let last = 0;
    for (const m of text.matchAll(re)) {
      if (m.index > last) out.push({ text: text.slice(last, m.index) });
      out.push({ text: m[1], href: m[2] });
      last = m.index + m[0].length;
    }
    if (last < text.length) out.push({ text: text.slice(last) });
    return out;
  }
  /** The last stop: an invitation to the next one */
  export let nextTitle = 'Your community could be the next stop.';
  export let nextText = '';
  export let nextHref = '';
  export let nextLabel = '';
  export let nextWhen = 'Next stop';
  /** Max width of each stop, any CSS length */
  export let stopWidth = '34rem';

  /** @type {HTMLElement} */ let wrap;
  /** @type {(HTMLElement | null)[]} */ let items = [];
  /** @type {number[]} */ let ys = [];
  let h = 0;
  let progress = 0;
  let ready = false;
  let reduced = false;
  /** @type {Set<number>} */ let seen = new Set();

  $: total = stops.length + 1; // + the "next stop"

  // Winding road: swings between two lanes from stop to stop.
  const X = (/** @type {number} */ i) => (i % 2 === 0 ? 10 : 34);
  $: d = (() => {
    let path = 'M 22 0';
    ys.forEach((y, i) => {
      const prevY = i === 0 ? 0 : ys[i - 1];
      const px = i === 0 ? 22 : X(i - 1);
      const mid = (prevY + y) / 2;
      path += ` C ${px} ${mid}, ${X(i)} ${mid}, ${X(i)} ${y}`;
    });
    return path;
  })();

  function measure() {
    if (!wrap) return;
    const top = wrap.getBoundingClientRect().top;
    ys = items.map((el) => (el ? el.getBoundingClientRect().top - top + 22 : 0));
    h = ys.length ? ys[ys.length - 1] + 22 : wrap.offsetHeight;
  }

  function onScroll() {
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    const p = (window.innerHeight * 0.7 - r.top) / Math.max(1, h || r.height);
    progress = Math.max(0, Math.min(1, p));
  }

  onMount(() => {
    reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    ready = true;
    measure();
    if (reduced) {
      progress = 1;
      seen = new Set(items.map((_, i) => i));
      return;
    }
    onScroll();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(wrap);
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number(/** @type {HTMLElement} */ (e.target).dataset.i);
            seen = new Set(seen).add(i);
          }
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    items.forEach((el) => el && io.observe(el));
    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  });
</script>

<div class="road" bind:this={wrap} class:ready style="--stop-w: {stopWidth}">
  {#if ys.length}
    <svg class="line" width="44" height={h} aria-hidden="true">
      <path {d} class="base" />
      <path {d} class="drive" pathLength="1" stroke-dasharray="1" stroke-dashoffset={1 - progress} />
      {#each ys as y, i (i)}
        <circle class="dot" class:seen={seen.has(i)} cx={X(i)} cy={y} r={seen.has(i) ? 7 : 4} style="r: {seen.has(i) ? 7 : 4}px" />
      {/each}
    </svg>
  {/if}

  <ol>
    {#each stops as stop, i (stop.title)}
      <li
        bind:this={items[i]}
        data-i={i}
        class:odd={i % 2 === 1}
        class:pending={ready && !reduced && !seen.has(i)}
      >
        {#if stop.when}<p class="when">{stop.when}</p>{/if}
        <h3>{stop.title}</h3>
        <slot {stop} {i}>
        <p class="text">
          {#each parts(stop.text) as part, k (k)}{#if part.href}<a href={part.href} target="_blank" rel="noopener noreferrer"
                >{part.text}<span class="visually-hidden"> (opens in a new tab)</span></a
              >{:else}{part.text}{/if}{/each}
        </p>
        </slot>
      </li>
    {/each}
    <li
      bind:this={items[stops.length]}
      data-i={stops.length}
      class="next"
      class:odd={stops.length % 2 === 1}
      class:pending={ready && !reduced && !seen.has(stops.length)}
    >
      {#if nextWhen}<p class="when">{nextWhen}</p>{/if}
      <h3>{nextTitle}</h3>
      {#if nextText}<p class="text">{nextText}</p>{/if}
      <slot name="next" />
      {#if nextHref}<a class="button button-primary" href={nextHref}>{nextLabel} →</a>{/if}
    </li>
  </ol>
</div>

<style>
  .road {
    position: relative;
    padding-left: 4.25rem;
  }

  .line {
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible;
    pointer-events: none;
  }

  .base {
    fill: none;
    stroke: var(--ink-soft);
    stroke-width: 2;
    stroke-dasharray: 2 7;
    stroke-linecap: round;
    opacity: 0.55;
  }

  .drive {
    fill: none;
    stroke: var(--terracotta);
    stroke-width: 3.5;
    stroke-linecap: round;
    transition: stroke-dashoffset 200ms linear;
  }

  .dot {
    fill: var(--paper);
    stroke: var(--ink-soft);
    stroke-width: 2;
    transition:
      r 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
      fill 0.4s var(--ease-out),
      stroke 0.4s var(--ease-out);
  }

  .dot.seen {
    fill: var(--terracotta);
    stroke: var(--ink);
  }

  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--spacing-12);
  }

  li {
    max-width: var(--stop-w, 34rem);
    transition:
      opacity 0.7s var(--ease-out),
      transform 0.7s var(--ease-out);
  }

  @media (min-width: 640px) {
    li.odd {
      margin-left: 3rem;
    }
  }

  li.pending {
    opacity: 0;
    transform: translateX(1.5rem);
  }

  .when {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.02em;
    color: var(--terracotta);
    font-weight: 700;
  }

  h3 {
    margin: var(--spacing-1) 0 var(--spacing-2);
    font-size: 1.6rem;
    line-height: 1.15;
  }

  .text {
    margin: 0;
    color: var(--ink-soft);
  }

  .next {
    padding: var(--spacing-6);
    background: var(--paper-card);
    border: 2px solid var(--ink);
    border-radius: 12px;
    box-shadow: var(--shadow-sticker);
  }

  .next .text {
    margin-bottom: var(--spacing-4);
  }

  .next .button {
    margin-top: var(--spacing-4);
  }

  @media (prefers-reduced-motion: reduce) {
    li,
    .drive,
    .dot {
      transition: none;
    }
  }

  .text a {
    color: var(--terracotta);
    text-underline-offset: 3px;
  }
</style>
