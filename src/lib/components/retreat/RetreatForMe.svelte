<script>
  import { BOOKING_URL } from '$lib/data/communitylab.js';
  import RetreatChip from './RetreatChip.svelte';

  const WHO = ['Community leaders', 'A working team', 'Team leads'];
  const WANTS = ['Get to know each other', 'Agree on a direction', 'Solve a real problem', 'Recharge', 'Plan the next year', 'Celebrate'];
  const SIZES = ['Under 8', '8–15', '16–30', '30+'];
  const PACE = ['All work', 'Mostly work', 'Half and half', 'Mostly relax', 'All relax'];
  const STYLES = ['Grassroots / volunteers', 'Tech / startup', 'Corporate', 'Creative / arts', 'Impact / social', 'A real mix'];
  const LAST = 5;

  let step = 0;
  /** @type {string | null} */ let who = null;
  /** @type {string[]} */ let wants = [];
  /** @type {string | null} */ let size = null;
  let pace = 2;
  /** @type {string | null} */ let style = null;
  let copied = false;

  $: summary = /** @type {string[]} */ (
    [who, wants.length ? wants.join(', ').toLowerCase() : null, size ? `${size} people` : null, step > 3 ? PACE[pace].toLowerCase() : null, style].filter(Boolean)
  );

  $: canNext = [!!who, wants.length > 0, !!size, true, !!style][step] ?? true;

  /** @param {string} w */
  const toggleWant = (w) => (wants = wants.includes(w) ? wants.filter((x) => x !== w) : [...wants, w]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`Retreat request: ${summary.join(' · ')}`);
      copied = true;
    } catch {
      copied = false;
    }
  }
</script>

<div class="flow">
  {#if step < LAST}
    <div class="progress" role="progressbar" aria-valuemin="1" aria-valuemax={LAST} aria-valuenow={step + 1} aria-label="Question {step + 1} of {LAST}">
      <span style="width: {((step + 1) / LAST) * 100}%"></span>
    </div>
  {/if}

  {#if summary.length > 0 && step < LAST}
    <ul class="summary" aria-label="Your answers so far">
      {#each summary as s (s)}<li>{s}</li>{/each}
    </ul>
  {/if}

  {#if step === 0}
    <h2>Who's coming?</h2>
    <div class="chips">
      {#each WHO as w (w)}<RetreatChip on={who === w} on:click={() => (who = w)}>{w}</RetreatChip>{/each}
    </div>
  {:else if step === 1}
    <h2>What do you want from the weekend?</h2>
    <p class="hint">Pick as many as you like.</p>
    <div class="chips">
      {#each WANTS as w (w)}<RetreatChip on={wants.includes(w)} on:click={() => toggleWant(w)}>{w}</RetreatChip>{/each}
    </div>
  {:else if step === 2}
    <h2>How big is the group?</h2>
    <div class="chips">
      {#each SIZES as s (s)}<RetreatChip on={size === s} on:click={() => (size = s)}>{s}</RetreatChip>{/each}
    </div>
  {:else if step === 3}
    <h2>More work or more relax?</h2>
    <div class="pace">
      <input type="range" min="0" max="4" bind:value={pace} aria-label="Work or relax" aria-valuetext={PACE[pace]} />
      <div class="pace-labels">
        <span>Work</span>
        <strong>{PACE[pace]}</strong>
        <span>Relax</span>
      </div>
    </div>
  {:else if step === 4}
    <h2>What's the style of your community?</h2>
    <div class="chips">
      {#each STYLES as s (s)}<RetreatChip on={style === s} on:click={() => (style = s)}>{s}</RetreatChip>{/each}
    </div>
  {:else}
    <h2>Got it. <span class="serif-italic">Next move is mine.</span></h2>
    <ul class="summary" aria-label="Your answers">
      {#each summary as s (s)}<li>{s}</li>{/each}
    </ul>
    <p class="hint">
      Copy your answers, then book a call and paste them into the booking notes with your possible dates. I'll come back with a draft retreat.
    </p>
    <div class="actions">
      <a class="button button-primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
        >Book a call ↗<span class="visually-hidden"> (opens in a new tab)</span></a
      >
      <button type="button" class="button" on:click={copy}>{copied ? 'Copied' : 'Copy my answers'}</button>
    </div>
  {/if}

  <div class="actions step-nav">
    {#if step > 0}
      <button type="button" class="back" on:click={() => (step -= 1)}>← Back</button>
    {/if}
    {#if step < LAST}
      <button type="button" class="button button-primary" disabled={!canNext} on:click={() => (step += 1)}>
        {step === LAST - 1 ? 'Finish →' : 'Next →'}
      </button>
    {/if}
  </div>
</div>

<style>
  .flow {
    display: grid;
    gap: var(--spacing-6);
  }

  h2 {
    margin: 0;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
  }

  .hint {
    margin: 0;
    color: var(--ink-soft);
  }

  .progress {
    height: 4px;
    background: var(--line);
    border-radius: 2px;
  }

  .progress span {
    display: block;
    height: 100%;
    background: var(--terracotta);
    border-radius: 2px;
    transition: width 0.4s var(--ease-out);
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-3);
  }

  .summary {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .summary li {
    padding: 0.15rem 0.7rem;
    font-size: 0.9rem;
    background: color-mix(in srgb, var(--ochre-light) 55%, var(--paper-card));
    border-radius: var(--border-radius-sticker);
  }

  .pace input {
    width: 100%;
    accent-color: var(--terracotta);
  }

  .pace-labels {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color: var(--ink-soft);
  }

  .pace-labels strong {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--ink);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-4);
  }

  .step-nav {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }

  .back {
    cursor: pointer;
    color: var(--ink-soft);
    background: none;
    border: none;
    font: inherit;
  }

  .back:hover {
    color: var(--ink);
  }

  .button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .progress span {
      transition: none;
    }
  }
</style>
