<script>
  import { onMount, tick } from 'svelte';
  import { EXERCISES, buildAgenda, clock, computeAgenda } from '$lib/data/retreat.js';

  /** @type {import('$lib/data/retreat.js').BuilderSlot[]} */
  export let slots;
  /** @type {Record<string, string[]>} */
  export let picks;
  export let people = 12;

  /** Extra minutes per session id: the "what if it runs over?" control */
  /** @type {Record<string, number>} */
  let over = {};

  $: blocks = computeAgenda(buildAgenda(slots, picks, people), over);
  $: flat = blocks.flatMap((b) => b.sessions);
  $: lastBlock = blocks[blocks.length - 1]?.id;

  /** @type {HTMLElement} */ let wrap;
  /** @type {Record<string, HTMLElement | null>} */ let rows = {};
  /** @type {number[]} */ let ys = [];
  let height = 0;

  async function measure() {
    await tick();
    if (!wrap) return;
    const top = wrap.getBoundingClientRect().top;
    ys = flat.map((s) => {
      const el = rows[s.id];
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.top - top + r.height / 2;
    });
    height = wrap.offsetHeight;
  }

  $: blocks, measure();

  onMount(() => {
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  });

  /** The side line sits at x=4 and bends outward by half a pixel per minute of carried delay. */
  const x = (/** @type {number} */ carried) => 4 + Math.min(carried, 40) * 0.5;

  /** @param {typeof flat} sessions @param {number[]} points @param {number} total */
  function linePath(sessions, points, total) {
    let d = 'M 4 0';
    sessions.forEach((s, i) => {
      const y = points[i] ?? 0;
      const prevY = i === 0 ? 0 : (points[i - 1] ?? 0);
      const mid = (prevY + y) / 2;
      const px = i === 0 ? 4 : x(sessions[i - 1].carried);
      d += ` C ${px} ${mid}, ${x(s.carried)} ${mid}, ${x(s.carried)} ${y}`;
    });
    const lastY = points[points.length - 1] ?? 0;
    const lx = x(sessions[sessions.length - 1]?.carried ?? 0);
    return `${d} C ${lx} ${(lastY + total) / 2}, 4 ${(lastY + total) / 2}, 4 ${total}`;
  }

  $: d = linePath(flat, ys, height);

  /** @param {string} id @param {number} v */
  const setOverrun = (id, v) => (over = { ...over, [id]: v });

  /** @param {string} blockId @param {number} i @param {string} exId */
  const swap = (blockId, i, exId) =>
    (picks = { ...picks, [blockId]: (picks[blockId] ?? []).map((e, j) => (j === i ? exId : e)) });

  /** @param {string} blockId @param {number} i */
  function remove(blockId, i) {
    picks = { ...picks, [blockId]: (picks[blockId] ?? []).filter((_, j) => j !== i) };
    over = {};
  }

  /** @param {string} blockId */
  const add = (blockId) => (picks = { ...picks, [blockId]: [...(picks[blockId] ?? []), 'coffee'] });
</script>

<div class="agenda" bind:this={wrap}>
  <svg class="line" width="28" {height} aria-hidden="true">
    <path {d} fill="none" stroke="var(--terracotta)" stroke-width="2" />
  </svg>

  {#each blocks as b (b.id)}
    <section class="block" aria-label="{b.day} {b.label}">
      <div class="block-head">
        <h3>{b.day} <span>· {b.label}</span></h3>
        <p class="numbers">
          Content {b.content + b.carriedIn} min · Available {b.available} min ·
          <span class:warn={!b.fits}>Buffer {b.buffer} min</span>
        </p>
      </div>
      {#if b.carriedIn > 0}<p class="late">Starts {b.carriedIn} min late.</p>{/if}
      {#if !b.fits}
        <p class="warning" role="status">
          This block doesn't fit. It runs {-b.buffer} min over{b.carriedOut > 0 && b.id !== lastBlock
            ? ' and pushes the next block.'
            : '.'}
        </p>
      {/if}

      <ul class="sessions">
        {#each b.sessions as s, i (s.id)}
          <li bind:this={rows[s.id]}>
            <div class="row">
              <span class="time">{clock(s.start)}</span>
              <select
                aria-label="Exercise for {b.day} {b.label}, slot {i + 1}"
                value={(picks[b.id] ?? [])[i]}
                on:change={(e) => swap(b.id, i, e.currentTarget.value)}
              >
                {#each EXERCISES as ex (ex.id)}
                  <option value={ex.id}>{ex.title}</option>
                {/each}
              </select>
              <span class="length">{s.length} min</span>
              <button type="button" class="remove" on:click={() => remove(b.id, i)} aria-label="Remove {s.title}"
                >×</button
              >
            </div>
            {#if s.tooShort}
              <p class="too-short">{s.note}: the {s.minutes}-minute slot really takes {s.needs} min.</p>
            {/if}
            <div class="over" role="group" aria-label="What if {s.title} runs over?">
              <span>What if it runs over?</span>
              {#each [0, 5, 10] as v (v)}
                <button type="button" aria-pressed={s.overrun === v} on:click={() => setOverrun(s.id, v)}>
                  {v === 0 ? 'On time' : `+${v}`}
                </button>
              {/each}
            </div>
          </li>
        {/each}
      </ul>
      <button type="button" class="add" on:click={() => add(b.id)}>+ Add a slot</button>
    </section>
  {/each}
</div>

<style>
  .agenda {
    position: relative;
    padding-left: 2rem;
    margin-top: var(--spacing-8);
    display: grid;
    gap: var(--spacing-10, 2.5rem);
  }

  .line {
    position: absolute;
    left: 0;
    top: 0;
    overflow: visible;
    pointer-events: none;
  }

  .line path {
    transition: d 0.4s ease;
  }

  .block-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--spacing-2);
  }

  h3 {
    margin: 0;
    font-size: 1.3rem;
  }

  h3 span {
    font-family: var(--font-sans);
    font-weight: 400;
    color: var(--ink-soft);
  }

  .numbers {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--ink-soft);
  }

  .warn {
    font-weight: 700;
    color: var(--terracotta-deep);
  }

  .late {
    margin: var(--spacing-1) 0 0;
    font-size: 0.8rem;
    color: var(--ink-soft);
  }

  .warning {
    margin: var(--spacing-3) 0 0;
    padding: var(--spacing-2) var(--spacing-3);
    font-size: 0.9rem;
    color: var(--terracotta-deep);
    background: color-mix(in srgb, var(--terracotta) 14%, var(--paper-card));
    border-radius: var(--border-radius-card);
  }

  .sessions {
    list-style: none;
    margin: var(--spacing-3) 0 0;
    padding: 0;
    border-block: 1px solid var(--line);
  }

  .sessions li {
    padding: var(--spacing-3) 0;
  }

  .sessions li + li {
    border-top: 1px solid var(--line);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-2) var(--spacing-3);
  }

  .time {
    width: 3.25rem;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--ink-soft);
  }

  select {
    flex: 1;
    min-width: 0;
    padding: 0.35rem 0.5rem;
    font: inherit;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--ink);
    background: var(--paper-card);
    border: 1.5px solid var(--line);
    border-radius: var(--border-radius-card);
  }

  select:hover {
    border-color: var(--ink);
  }

  .length {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--ink-soft);
  }

  .remove {
    padding: 0 var(--spacing-2);
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    color: var(--ink-soft);
    background: none;
    border: none;
  }

  .remove:hover {
    color: var(--terracotta-deep);
  }

  .too-short {
    margin: var(--spacing-2) 0 0 3.75rem;
    font-size: 0.8rem;
    color: var(--terracotta-deep);
  }

  .over {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-2);
    margin: var(--spacing-2) 0 0 3.75rem;
    font-size: 0.8rem;
    color: var(--ink-soft);
  }

  .over button {
    padding: 0.15rem 0.7rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    white-space: nowrap;
    cursor: pointer;
    color: var(--ink);
    background: none;
    border: 1.5px solid var(--line);
    border-radius: var(--border-radius-sticker);
  }

  .over button:hover {
    border-color: var(--ink);
  }

  .over button[aria-pressed='true'] {
    background: var(--ink);
    border-color: var(--ink);
    color: var(--paper);
  }

  .add {
    margin-top: var(--spacing-3);
    padding: 0.3rem var(--spacing-4);
    font-size: 0.9rem;
    cursor: pointer;
    color: var(--ink-soft);
    background: none;
    border: 1.5px dashed var(--ink-soft);
    border-radius: var(--border-radius-sticker);
  }

  .add:hover {
    color: var(--ink);
    border-color: var(--ink);
  }

  @media (prefers-reduced-motion: reduce) {
    .line path {
      transition: none;
    }
  }
</style>
