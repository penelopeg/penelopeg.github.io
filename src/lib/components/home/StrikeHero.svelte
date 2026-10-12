<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import { base } from '$app/paths';
  import { roles } from '$lib/data/roles.js';
  import { resolveUrl, isExternal } from '$lib/data/works.js';

  /*
   * "Un-striking" hero.
   * Static (SSR, mobile, reduced motion): roles are struck through with marker
   * bars and the role cards sit in a grid below.
   * Animated (large screens): the section pins while you scroll and each strike
   * bar peels off its word, flies down and morphs into that role's card.
   */

  let animated = false;
  /** @type {HTMLElement} */ let stage;
  /** @type {HTMLElement} */ let sticky;
  /** @type {HTMLElement} */ let inner;
  /** @type {HTMLElement} */ let hint;
  /** @type {HTMLElement[]} */ const words = [];
  /** @type {HTMLElement[]} */ const slots = [];
  /** @type {HTMLElement[]} */ const cards = [];

  // Hand-placed tilts: wonky marker strokes, gently tilted landed cards
  const BAR_TILT = [-3, 2, -2.5, 3, -2, 2.5];
  const CARD_TILT = [-1.5, 1, -0.5, 1.5, -1, 0.5];
  // Each role starts a little after the previous one and takes this share of the scroll
  const STAGGER = 0.11;
  const DURATION = 0.42;

  /** @type {{ bar: DOMRectLike, card: DOMRectLike }[]} */
  let geo = [];
  let frame = 0;

  /** @typedef {{ x: number, y: number, w: number, h: number }} DOMRectLike */

  const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function stickyTop() {
    return parseFloat(getComputedStyle(sticky).top) || 0;
  }

  /**
   * Geometry relative to .inner (the cards' containing block). It doesn't change
   * while scrolling, so measure on mount, resize and font load only.
   */
  function measure() {
    if (!animated) return;
    const s = inner.getBoundingClientRect();
    geo = roles.map((_, i) => {
      const w = words[i].getBoundingClientRect();
      const sl = slots[i].getBoundingClientRect();
      const fontSize = parseFloat(getComputedStyle(words[i]).fontSize);
      const h = Math.max(8, fontSize * 0.32);
      return {
        bar: { x: w.left - s.left - 6, y: w.top - s.top + w.height * 0.56 - h / 2, w: w.width + 12, h },
        card: { x: sl.left - s.left, y: sl.top - s.top, w: sl.width, h: sl.height }
      };
    });
    update();
  }

  function overallProgress() {
    const total = stage.offsetHeight - sticky.offsetHeight;
    const top = stage.getBoundingClientRect().top - stickyTop();
    return total > 0 ? clamp(-top / total) : 1;
  }

  function update() {
    frame = 0;
    if (!animated || !geo.length) return;
    const p = overallProgress();

    roles.forEach((_, i) => {
      const t = easeInOut(clamp((p - i * STAGGER) / DURATION));
      const { bar, card } = geo[i];
      const el = cards[i];
      el.style.left = `${lerp(bar.x, card.x, t)}px`;
      el.style.top = `${lerp(bar.y, card.y, t)}px`;
      el.style.width = `${lerp(bar.w, card.w, t)}px`;
      el.style.height = `${lerp(bar.h, card.h, t)}px`;
      el.style.transform = `rotate(${lerp(BAR_TILT[i], CARD_TILT[i], t)}deg)`;
      el.style.borderRadius = `${lerp(2, 12, t)}px`;
      // content and printed shadow arrive as the card lands; a soft lift mid-flight
      el.style.setProperty('--reveal', String(clamp((t - 0.7) / 0.25)));
      el.style.setProperty('--lift', String(Math.sin(Math.PI * t)));
      words[i].classList.toggle('freed', t > 0.02);
    });

    hint.style.opacity = String(clamp(1 - p * 5));
  }

  /** Keyboard focus on a card mid-flight: jump to where every card has landed. */
  function onCardFocus() {
    if (!animated || overallProgress() >= 1) return;
    const total = stage.offsetHeight - sticky.offsetHeight;
    const top = stage.getBoundingClientRect().top - stickyTop();
    window.scrollBy({ top: top + total, behavior: 'instant' });
  }

  function onScroll() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  const ANIMATED_STYLE_PROPS = ['left', 'top', 'width', 'height', 'transform', 'border-radius', '--reveal', '--lift'];

  function reset() {
    cards.forEach((el) => {
      ANIMATED_STYLE_PROPS.forEach((prop) => el.style.removeProperty(prop));
    });
    words.forEach((w) => w.classList.remove('freed'));
    if (hint) hint.style.removeProperty('opacity');
  }

  /** @type {MediaQueryList | undefined} */
  let mq;

  async function applyMode() {
    animated = !!mq?.matches;
    await tick();
    if (animated) measure();
    else reset();
  }

  onMount(() => {
    mq = matchMedia('(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)');
    mq.addEventListener('change', applyMode);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    applyMode();
    document.fonts?.ready.then(measure);
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    mq?.removeEventListener('change', applyMode);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', measure);
    cancelAnimationFrame(frame);
  });
</script>

<section class="strike-hero" class:animated bind:this={stage} aria-labelledby="strike-title">
  <div class="sticky" bind:this={sticky}>
    <div class="container inner" bind:this={inner}>
      <div class="headline">
        <p class="eyebrow">Penélope Gonçalves · Algarve, PT</p>
        <h1 id="strike-title">Olá, I'm Penélope, and I'm a</h1>
        <p class="roles-line">
          {#each roles as role, i (role.word)}
            <span class="role"
              ><span class="role-word" style="--bg: {role.bg}; --tilt: {BAR_TILT[i]}deg" bind:this={words[i]}
                >{role.word}</span
              >{#if i < roles.length - 1}<span class="slash" aria-hidden="true">&nbsp;/</span><span
                  class="visually-hidden">,</span
                >{/if}</span
            >{' '}
          {/each}
        </p>
        <p class="truth">agent of <span class="serif-italic">(good)</span> chaos</p>
        <p class="handwritten note-me" aria-hidden="true">(this is me!)</p>
        <p class="handwritten hint" aria-hidden="true" bind:this={hint}>scroll to un-strike them ↓</p>
      </div>

      <ul class="slots" aria-label="What I do">
        {#each roles as role, i (role.word)}
          {@const href = resolveUrl(role.href, base)}
          {@const external = isExternal(role.href)}
          <li class="slot" bind:this={slots[i]}>
            <a
              class="role-card"
              {href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              style="--bg: {role.bg}; --fg: {role.fg}"
              bind:this={cards[i]}
              on:focus={onCardFocus}
            >
              <span class="card-body">
                <span class="card-index">0{i + 1} · {role.word}</span>
                <span class="card-title">{role.title}</span>
                <span class="card-desc">{role.description}</span>
                <span class="card-cta"
                  >{role.cta} {external ? '↗' : '→'}{#if external}<span class="visually-hidden">
                      (opens in a new tab)</span
                    >{/if}</span
                >
              </span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<style>
  .strike-hero {
    position: relative;
    background-color: var(--terracotta);
    background-image: var(--grain);
    color: var(--on-hero);
  }

  /* Halftone sun, rising behind the cards (inside the pinned frame) */
  .sticky::before {
    content: '';
    position: absolute;
    width: 30rem;
    height: 30rem;
    right: -8rem;
    top: 8rem;
    border-radius: 50%;
    background: var(--halftone-sun);
    pointer-events: none;
  }

  .sticky {
    position: relative;
    overflow: hidden;
  }

  .inner {
    position: relative;
    padding-top: var(--spacing-12);
    padding-bottom: var(--spacing-16);
  }

  /* ── Headline ── */
  .headline {
    position: relative;
    max-width: 72rem;
  }

  .eyebrow {
    color: var(--on-hero);
  }

  h1 {
    margin: var(--spacing-4) 0 var(--spacing-2);
    font-size: clamp(2.2rem, 5vw, 4.25rem);
    color: var(--on-hero);
    max-width: none;
  }

  .roles-line {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.6rem, 3.6vw, 3.1rem);
    line-height: 1.3;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  .role {
    white-space: nowrap;
  }

  .role-word {
    position: relative;
    display: inline-block;
    white-space: nowrap;
  }

  /* The marker strike (static mode; in animated mode the card itself is the strike) */
  .role-word::after {
    content: '';
    position: absolute;
    left: -6px;
    right: -6px;
    top: 56%;
    height: 0.32em;
    transform: translateY(-50%) rotate(var(--tilt));
    background: var(--bg);
    border-radius: 2px;
  }

  .slash {
    opacity: 0.7;
    font-weight: 300;
  }

  .truth {
    margin: var(--spacing-3) 0 0;
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(1.8rem, 4vw, 3.4rem);
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  .truth .serif-italic {
    color: var(--on-hero-accent);
  }

  .note-me {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 1.6rem;
    color: var(--on-hero);
    transform: rotate(4deg);
  }

  @media (min-width: 768px) {
    .note-me {
      display: block;
    }
  }

  .hint {
    margin-top: var(--spacing-6);
    font-size: 1.6rem;
    color: var(--on-hero);
    display: none;
  }

  /* ── Cards (static layout) ── */
  .slots {
    list-style: none;
    display: grid;
    gap: var(--spacing-6);
    margin-top: var(--spacing-12);
  }

  @media (min-width: 640px) {
    .slots {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .slots {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .role-card {
    --reveal: 1;
    --lift: 0;
    display: block;
    height: 100%;
    overflow: hidden;
    background: var(--bg);
    color: var(--fg);
    text-decoration: none;
    border-radius: 12px;
    box-shadow:
      calc(var(--reveal) * 4px) calc(var(--reveal) * 4px) 0 var(--ink),
      0 calc(var(--lift) * 24px) calc(var(--lift) * 40px) rgba(38, 33, 28, calc(var(--lift) * 0.35));
    transition:
      translate 0.25s var(--ease-out),
      box-shadow 0.25s var(--ease-out);
  }

  .slot:nth-child(odd) .role-card {
    transform: rotate(-1deg);
  }
  .slot:nth-child(even) .role-card {
    transform: rotate(1deg);
  }

  .role-card:hover,
  .role-card:focus-visible {
    translate: -2px -4px;
    box-shadow: 7px 8px 0 var(--ink);
  }

  .role-card:focus-visible {
    outline-color: var(--paper);
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    height: 100%;
    padding: var(--spacing-6);
    opacity: var(--reveal);
  }

  .card-index,
  .card-cta {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .card-title {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.45rem;
    line-height: 1.1;
    letter-spacing: -0.015em;
  }

  .card-desc {
    font-size: 0.92rem;
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-cta {
    margin-top: auto;
    font-weight: 700;
  }

  /* ── Animated mode: pin the section and let JS fly the strikes ── */
  .animated {
    height: 360vh;
  }

  .animated .sticky {
    position: sticky;
    top: 4.25rem; /* below the sticky nav */
    height: calc(100vh - 4.25rem);
  }

  .animated .inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: clamp(1.25rem, 3.5vh, 2.5rem);
    padding-bottom: clamp(1.25rem, 3.5vh, 2.5rem);
  }

  .animated h1 {
    font-size: min(4.2vw, 6.4vh);
  }

  .animated .roles-line {
    font-size: min(2.9vw, 4.6vh);
  }

  .animated .truth {
    font-size: min(3.4vw, 5.2vh);
  }

  .animated .role-word::after {
    display: none;
  }

  .animated .hint {
    display: block;
    position: absolute;
    right: 0;
    bottom: -0.2rem;
    margin: 0;
  }

  .animated .slots {
    flex: 1;
    min-height: 0;
    margin-top: clamp(1.25rem, 3vh, 2.25rem);
    grid-template-rows: repeat(2, 1fr);
    gap: clamp(1rem, 2.5vh, 1.5rem) var(--spacing-6);
  }

  .animated .role-card {
    position: absolute;
    height: auto;
    z-index: 3;
  }

  .animated .role-card:not(:hover):not(:focus-visible) {
    transition: none;
  }
</style>
