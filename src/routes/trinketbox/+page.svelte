<script>
  import { onMount, tick } from 'svelte';
  import { backOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';
  import { drawers } from '$lib/data/trinketbox.js';

  /** @type {import('$lib/data/trinketbox.js').Drawer | null} */
  let open = null;
  /** @type {HTMLElement | null} */ let opener = null;
  /** @type {HTMLElement} */ let dialog;

  let innerWidth = 1200;
  let innerHeight = 800;
  // Big screens: items burst out around the drawer. Elsewhere: they slide out in a tray below.
  let burst = false;

  onMount(() => {
    const mq = matchMedia('(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)');
    const sync = () => (burst = mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  });

  // The page behind the stage shouldn't scroll
  $: if (typeof document !== 'undefined') document.body.style.overflow = open && burst ? 'hidden' : '';

  $: rx = Math.min(innerWidth * 0.38, 520);
  $: ry = Math.min(innerHeight * 0.34, 300);

  /** Positions on an ellipse around the drawer, starting at twelve o'clock. */
  $: ring = (open?.items ?? []).map((_, i, all) => {
    const angle = -Math.PI / 2 + (i / all.length) * Math.PI * 2;
    return { dx: Math.cos(angle) * rx, dy: Math.sin(angle) * ry };
  });

  // Hand-placed tilts so the drawers look pinned up, not gridded
  const TILT = [-1.5, 1, -0.5, 1.5, -1, 0.5];

  const reduceMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /** The tray slides out of the drawer: grows down from its top edge. */
  function pull(/** @type {Element} */ _node, { duration = 380 } = {}) {
    return {
      duration: reduceMotion() ? 0 : duration,
      css: (/** @type {number} */ t) => `transform-origin: top; transform: scaleY(${0.55 + 0.45 * t}); opacity: ${Math.min(1, t * 2)};`
    };
  }

  /** Out of the drawer, to a spot on the ring. */
  function burstOut(/** @type {Element} */ _node, { delay = 0, dx = 0, dy = 0, tilt = 0, duration = 650 } = {}) {
    return {
      delay,
      duration,
      easing: backOut,
      css: (/** @type {number} */ t, /** @type {number} */ u) =>
        `opacity: ${Math.min(1, t * 4)}; transform: translate(${-dx * u}px, ${-dy * u}px) rotate(${tilt * u}deg) scale(${0.3 + 0.7 * t});`
    };
  }

  /** Each trinket is dealt out of the drawer onto the tray, a little after the last. */
  function deal(/** @type {Element} */ _node, { delay = 0, tilt = 0, duration = 520 } = {}) {
    return {
      delay: reduceMotion() ? 0 : delay,
      duration: reduceMotion() ? 0 : duration,
      easing: backOut,
      css: (/** @type {number} */ t, /** @type {number} */ u) =>
        `opacity: ${Math.min(1, t * 3)}; transform: translateY(${-90 * u}px) rotate(${tilt * u}deg) scale(${0.85 + 0.15 * t});`
    };
  }

  /**
   * @param {import('$lib/data/trinketbox.js').Drawer} drawer
   * @param {MouseEvent} event
   */
  async function toggle(drawer, event) {
    if (open?.id === drawer.id) return close();
    opener = event.currentTarget;
    open = drawer;
    if (burst) {
      await tick();
      dialog?.focus();
    }
  }

  /** Clicking anywhere that isn't the box, a trinket or the close button closes the stage. */
  function onStageClick(/** @type {MouseEvent} */ e) {
    if (!(e.target instanceof Element) || !e.target.closest('a, button, .box-closed')) close();
  }

  function close() {
    open = null;
    opener?.focus();
  }

  /** Esc closes the stage; Tab stays inside it. */
  function onKeydown(/** @type {KeyboardEvent} */ e) {
    if (!open || !burst) return;
    if (e.key === 'Escape') return close();
    if (e.key !== 'Tab') return;
    const focusable = /** @type {HTMLElement[]} */ ([...dialog.querySelectorAll('a, button')]);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
    else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
  }
</script>

<svelte:window bind:innerWidth bind:innerHeight on:keydown={onKeydown} />

<svelte:head>
  <title>Trinketbox — Penélope Gonçalves</title>
  <meta name="description" content="Penélope's box of favourite websites, books, movies, music, shows and channels." />
</svelte:head>

<div class="ct-hero">
  <div class="container">
    <h1>The <span class="serif-italic">Trinketbox</span></h1>
    <p class="lead">A box of things I love on the internet and beyond.</p>
    <p class="handwritten note">open a drawer ↓</p>
  </div>
</div>

<section class="box">
  <div class="container">
    <ul class="drawers">
      {#each drawers as drawer, i (drawer.id)}
        <li>
          <button
            class="drawer"
            style="--bg: {drawer.bg}; --fg: {drawer.fg}; --tilt: {TILT[i % TILT.length]}deg"
            aria-pressed={open?.id === drawer.id}
            aria-controls="trinkets"
            on:click={(e) => toggle(drawer, e)}
          >
            <span class="drawer-name">{drawer.name}</span>
            <span class="drawer-sub">{drawer.subtitle}</span>
            <span class="drawer-count">{drawer.items.length} things</span>
            <span class="knob" aria-hidden="true"></span>
          </button>
        </li>
      {/each}
    </ul>

    <div id="trinkets" aria-live="polite">
      {#if open && !burst}
        {#key open.id}
          <div class="panel" style="--bg: {open.bg}" transition:pull>
            <h2>{open.name}</h2>
            <ul class="trinkets">
              {#each open.items as item, i (item.title)}
                <li in:deal|global={{ delay: 180 + i * 70, tilt: ((i % 5) - 2) * 5 }}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" class="trinket">
                    <span class="trinket-tag">{item.tag}</span>
                    <span class="trinket-title">{item.title}</span>
                    <span class="trinket-note">{item.note}</span>
                    <span class="trinket-arrow" aria-hidden="true">↗</span>
                    <span class="visually-hidden">(opens in a new tab)</span>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/key}
      {/if}
    </div>
  </div>
</section>

{#if open && burst}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div class="stage" transition:fade={{ duration: 200 }} on:click={onStageClick}>
    <div class="stage-dialog" role="dialog" aria-modal="true" aria-label="{open.name} favourites" tabindex="-1" bind:this={dialog}>
      <!-- The box: lid swings open, then the trinkets come out from behind it -->
      <div class="box-closed" style="--bg: {open.bg}; --fg: {open.fg}">
        <div class="box-body">
          <span class="drawer-name">{open.name}</span>
          <span>{open.subtitle}</span>
        </div>
        <div class="box-lid" aria-hidden="true"></div>
      </div>

      <ul class="ring" style="--w: {open.items.length > 7 ? '10.5rem' : '12.5rem'}">
        {#each open.items as item, i (item.title)}
          <li
            style="translate: calc(-50% + {ring[i].dx}px) calc(-50% + {ring[i].dy}px)"
            in:burstOut|global={{ delay: 1700 + i * 70, dx: ring[i].dx, dy: ring[i].dy, tilt: ((i % 5) - 2) * 8 }}
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer" class="trinket">
              <span class="trinket-tag">{item.tag}</span>
              <span class="trinket-title">{item.title}</span>
              <span class="trinket-note">{item.note}</span>
              <span class="trinket-arrow" aria-hidden="true">↗</span>
              <span class="visually-hidden">(opens in a new tab)</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

<style>
  .lead {
    font-size: 1.25rem;
    max-width: 40rem;
    margin: 0;
  }

  .note {
    margin-top: var(--spacing-4);
    font-size: 1.5rem;
    color: var(--on-hero);
  }

  .box {
    padding: var(--spacing-16) 0 var(--spacing-24);
    min-height: 60vh;
  }

  .drawers {
    list-style: none;
    margin: 0 0 var(--spacing-12);
    padding: 0;
    display: grid;
    gap: var(--spacing-6);
  }

  @media (min-width: 640px) {
    .drawers {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .drawers {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .drawer {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-2);
    width: 100%;
    height: 100%;
    padding: var(--spacing-6);
    text-align: left;
    cursor: pointer;
    background: var(--bg);
    color: var(--fg);
    border: 2px solid var(--ink);
    border-radius: 12px;
    box-shadow: var(--shadow-sticker);
    transform: rotate(var(--tilt));
    transition:
      transform 0.25s var(--ease-out),
      box-shadow 0.25s var(--ease-out);
  }

  /* Hover tugs the drawer toward you; open leaves it pulled out */
  .drawer:hover,
  .drawer:focus-visible {
    transform: rotate(0deg) translateY(6px);
    box-shadow: 4px 10px 0 var(--ink);
  }

  .drawer[aria-pressed='true'] {
    transform: rotate(0deg) translateY(10px);
    box-shadow: 4px 14px 0 var(--ink);
  }

  .drawer:focus-visible {
    outline: 3px solid var(--cobalt);
    outline-offset: 3px;
  }

  .knob {
    position: absolute;
    right: var(--spacing-6);
    bottom: var(--spacing-6);
    width: 2.6rem;
    height: 0.7rem;
    background: var(--paper-card);
    border: 2px solid var(--ink);
    border-radius: 999px;
    transition: transform 0.25s var(--ease-out);
  }

  .drawer:hover .knob,
  .drawer[aria-pressed='true'] .knob {
    transform: translateY(3px);
  }

  .drawer-name {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.75rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .drawer-sub {
    flex: 1;
  }

  .drawer-count {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  /* The inside of the drawer: dark tray with the trinkets dealt onto it */
  .panel {
    padding: var(--spacing-8) var(--spacing-6) var(--spacing-8);
    background: var(--ink);
    background-image: var(--grain);
    border-top: 6px solid var(--bg);
    border-radius: 12px;
    box-shadow: inset 0 14px 24px -14px rgba(0, 0, 0, 0.7);
  }

  .panel h2 {
    margin-bottom: var(--spacing-6);
    color: var(--paper);
  }

  .trinkets {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--spacing-4);
  }

  @media (min-width: 640px) {
    .trinkets {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .trinkets {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .trinket {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    height: 100%;
    padding: var(--spacing-6);
    background: var(--paper-card);
    color: var(--ink);
    border: 1px solid var(--line);
    border-radius: var(--border-radius-card);
    box-shadow: var(--shadow-card);
    text-decoration: none;
    transition:
      transform 0.25s var(--ease-out),
      box-shadow 0.25s var(--ease-out);
  }

  .trinket:hover,
  .trinket:focus-visible {
    transform: translateY(-3px);
    box-shadow: var(--shadow-card-hover);
  }

  .trinket-tag {
    align-self: flex-start;
    padding: 0.1rem 0.6rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    border: 1.5px solid var(--ink);
    border-radius: var(--border-radius-sticker);
  }

  .trinket-title {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.3rem;
    line-height: 1.15;
    padding-right: var(--spacing-6);
  }

  .trinket-note {
    color: var(--ink-soft);
  }

  .trinket-arrow {
    position: absolute;
    top: var(--spacing-6);
    right: var(--spacing-6);
    color: var(--terracotta);
    font-size: 1.2rem;
  }

  /* ── Burst stage (large screens) ── */
  .stage {
    position: fixed;
    inset: 0;
    z-index: 60;
    background: color-mix(in srgb, var(--ink) 88%, transparent);
    background-image: var(--grain);
  }

  .stage-dialog {
    position: absolute;
    inset: 0;
    outline: none;
  }

  .box-closed {
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    z-index: 2; /* in front of the ring, so trinkets come out from behind it */
    width: 14rem;
    perspective: 700px;
    animation: box-in 0.75s ease-out both;
  }

  .box-body {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: calc(var(--spacing-6) + 2.5rem) var(--spacing-6) var(--spacing-6);
    background: var(--bg);
    color: var(--fg);
    border: 2px solid var(--paper);
    border-radius: 6px 6px 12px 12px;
    box-shadow: 4px 10px 0 rgba(0, 0, 0, 0.45);
  }

  /* The dark inside of the box, revealed once the lid is gone */
  .box-body::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 2.5rem;
    background: var(--ink);
    border-radius: 4px 4px 0 0;
    box-shadow: inset 0 -8px 12px -8px rgba(0, 0, 0, 0.8);
  }

  /* Wider than the body, hinged on its top edge: opening flips it up and back over the box */
  .box-lid {
    position: absolute;
    inset: 0 -0.5rem auto -0.5rem;
    height: 2.5rem;
    background: color-mix(in srgb, var(--bg) 78%, var(--ink));
    border: 2px solid var(--paper);
    border-radius: 6px;
    transform-origin: top center;
    animation: lid-open 0.55s 0.75s cubic-bezier(0.5, 0, 0.3, 1) both;
  }

  @keyframes box-in {
    0% {
      transform: translateY(40px) scale(0.5);
      opacity: 0;
    }
    55% {
      transform: translateY(-8px) scale(1.04);
      opacity: 1;
    }
    75% {
      transform: translateY(0) scale(1) rotate(-3deg);
    }
    85% {
      transform: rotate(3deg);
    }
    95% {
      transform: rotate(-1.5deg);
    }
    100% {
      transform: rotate(0);
      opacity: 1;
    }
  }

  @keyframes lid-open {
    from {
      transform: rotateX(0);
    }
    to {
      transform: rotateX(-165deg);
    }
  }

  .ring {
    position: absolute;
    inset: 0;
    z-index: 1;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ring li {
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--w);
  }

  .ring .trinket {
    padding: var(--spacing-4);
    gap: var(--spacing-1);
  }

  .ring .trinket-title {
    font-size: 1.1rem;
  }

  .ring .trinket-note {
    font-size: 0.85rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .ring .trinket-arrow {
    top: var(--spacing-4);
    right: var(--spacing-4);
  }

  @media (prefers-reduced-motion: reduce) {
    .drawer,
    .knob,
    .trinket {
      transform: none;
      transition: none;
    }
  }
</style>
