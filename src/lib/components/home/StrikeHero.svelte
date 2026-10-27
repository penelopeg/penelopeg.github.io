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
  /** @type {HTMLElement} */ let headline;
  /** @type {HTMLElement[]} */ const words = [];
  /** @type {HTMLElement[]} */ const slots = [];
  /** @type {HTMLElement[]} */ const cards = [];

  // Hand-placed tilts: wonky marker strokes, gently tilted landed cards
  const BAR_TILT = [-3, 2, -2.5, 3, -2, 2.5];
  const CARD_TILT = [-1.5, 1, -0.5, 1.5, -1, 0.5];
  // Scroll timeline (0..1): the headline shrinks from START_SCALE to 1 over the first SHRINK,
  // the first strike lets go a little before that ends, then each role follows with STAGGER.
  const START_SCALE = 1.6;
  const SHRINK = 0.3;
  const FIRST_ROLE = 0.18;
  const STAGGER = 0.09;
  const DURATION = 0.37;

  /** @type {DOMRectLike[]} */
  let geo = [];
  /** How far down the headline sits at the start, so the enlarged copy is centred in the pinned frame */
  let startShift = 0;
  let frame = 0;

  /** @typedef {{ x: number, y: number, w: number, h: number }} DOMRectLike */

  const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  function stickyTop() {
    return parseFloat(getComputedStyle(sticky).top) || 0;
  }

  /**
   * Where each card lands, relative to .inner (the cards' containing block). The slots
   * don't move while scrolling, so measure on mount, resize and font load only.
   * The strikes' starting points are read live in update(): the headline is scaling.
   */
  function measure() {
    if (!animated) return;
    const s = inner.getBoundingClientRect();
    geo = slots.map((slot) => {
      const sl = slot.getBoundingClientRect();
      return { x: sl.left - s.left, y: sl.top - s.top, w: sl.width, h: sl.height };
    });
    const top = headline.offsetTop;
    startShift = Math.max(0, (inner.clientHeight - headline.offsetHeight * START_SCALE) / 2 - top);
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

    const shrink = easeInOut(clamp(p / SHRINK));
    headline.style.setProperty('--s', String(lerp(START_SCALE, 1, shrink)));
    headline.style.setProperty('--y', `${lerp(startShift, 0, shrink)}px`);

    const origin = inner.getBoundingClientRect();
    roles.forEach((_, i) => {
      const t = easeInOut(clamp((p - FIRST_ROLE - i * STAGGER) / DURATION));
      // the strike follows its word while the headline is still scaling
      const w = words[i].getBoundingClientRect();
      const h = Math.max(8, w.height * 0.26);
      const bar = {
        x: w.left - origin.left - 6,
        y: w.top - origin.top + w.height * 0.56 - h / 2,
        w: w.width + 12,
        h
      };
      const card = geo[i];
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
      // the card is the strike from the first frame, so the word's own bar stays hidden
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
    headline?.style.removeProperty('--s');
    headline?.style.removeProperty('--y');
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
      <div class="headline" bind:this={headline}>
        <div class="headline-copy">
          <h1 id="strike-title">
            Building <span class="serif-italic">interactive spaces</span> and
            <span class="mark">impact communities</span> that <span class="nowrap">co-create</span> the future.
          </h1>
          <p class="roles-line">
            {#each roles as role, i (role.word)}
              <span class="role"
                ><span class="role-word" style="--bg: {role.bg}; --tilt: {BAR_TILT[i]}deg" bind:this={words[i]}
                  >{role.word}</span
                ><span class="slash" aria-hidden="true">&nbsp;/</span><span class="visually-hidden">,</span></span
              >{' '}
            {/each}
            <span class="truth">agent of <span class="serif-italic">(good)</span> chaos</span>
          </p>
          <p class="handwritten hint" aria-hidden="true" bind:this={hint}>scroll to un-strike them ↓</p>
        </div>

        <figure class="portrait">
          <span class="tape tape-a" aria-hidden="true"></span>
          <span class="tape tape-b" aria-hidden="true"></span>
          <img
            src="{base}/images/profile/me_alternative.jpg"
            alt="Penélope Gonçalves, smiling"
            width="480"
            height="600"
          />
          <figcaption class="handwritten">(this is me, hi!)</figcaption>
        </figure>
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
    display: grid;
    gap: var(--spacing-8);
    align-items: center;
  }

  @media (min-width: 768px) {
    .headline {
      grid-template-columns: 1fr auto;
      gap: var(--spacing-12);
    }
  }

  h1 {
    margin: 0 0 var(--spacing-4);
    font-size: clamp(2.4rem, 5.4vw, 4.6rem);
    line-height: 1.02;
    letter-spacing: -0.035em;
    color: var(--on-hero);
    max-width: 24ch;
  }

  h1 .serif-italic {
    color: var(--on-hero-accent);
  }

  .nowrap {
    white-space: nowrap;
  }

  .mark {
    background: linear-gradient(transparent 62%, color-mix(in srgb, var(--ink) 38%, transparent) 62%);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  .roles-line {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(1.3rem, 2.6vw, 2.1rem);
    line-height: 1.4;
    letter-spacing: -0.02em;
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
    font-weight: 700;
    letter-spacing: -0.03em;
    white-space: nowrap;
  }

  .truth .serif-italic {
    color: var(--on-hero-accent);
  }

  .hint {
    margin-top: var(--spacing-6);
    font-size: 1.6rem;
    color: var(--on-hero);
    display: none;
  }

  .portrait {
    position: relative;
    justify-self: center;
    width: min(70%, 16rem);
    padding: 0.6rem 0.6rem 2.6rem;
    background: var(--paper-card);
    box-shadow: var(--shadow-card-hover);
    transform: rotate(2.5deg);
  }

  .portrait img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    filter: sepia(0.12) saturate(0.95);
  }

  .portrait figcaption {
    position: absolute;
    bottom: 0.5rem;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1.2rem;
  }

  .tape-a {
    top: -0.7rem;
    left: -1.2rem;
    transform: rotate(-28deg);
  }

  .tape-b {
    top: -0.7rem;
    right: -1.2rem;
    transform: rotate(24deg);
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
    height: 420vh;
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
    font-size: min(3.8vw, 6vh);
    max-width: 26ch;
  }

  .animated .roles-line {
    font-size: min(2.2vw, 3.6vh);
  }

  /* Start big, settle to size as the scroll begins. The copy's box is narrowed by the
     start scale so the enlarged text still fits its column. */
  .animated .headline {
    translate: 0 var(--y, 0);
  }

  .animated .headline-copy {
    width: calc(100% / 1.6);
    transform: scale(var(--s, 1));
    transform-origin: top left;
  }

  .animated .portrait {
    transform: rotate(2.5deg) scale(var(--s, 1));
    transform-origin: top right;
    width: min(13vw, 22vh);
    padding: 0.4rem 0.4rem 1.8rem;
  }

  .animated .portrait figcaption {
    font-size: 0.95rem;
    bottom: 0.3rem;
  }

  .animated .role-word::after {
    display: none;
  }

  .animated .hint {
    display: block;
    margin: var(--spacing-3) 0 0;
    font-size: 1.3rem;
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
