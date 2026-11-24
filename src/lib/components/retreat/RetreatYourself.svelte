<script>
  import { BOOKING_URL } from '$lib/data/communitylab.js';
  import RetreatChip from './RetreatChip.svelte';
  import RetreatAgenda from './RetreatAgenda.svelte';
  import { EXERCISES, buildAgenda, builderBlocks, clock, computeAgenda, defaultPicks } from '$lib/data/retreat.js';

  const TIERS = [
    { name: 'Free playbook', text: 'Your agenda, timings and session notes.' },
    { name: 'Full toolkit', text: 'Playbook plus facilitation scripts, worksheets and the roadmap template.' },
    { name: 'Toolkit + support session', text: 'Everything, plus one call with me to fit it to your group.' }
  ];
  const STARTS = [8 * 60 + 30, 9 * 60, 9 * 60 + 30, 10 * 60];
  const DAY_LABELS = ['1 day', '2 days', '3 days, from Friday evening'];

  let step = 0;
  let days = 3;
  let start = 9 * 60;
  let people = 12;
  /** @type {Record<string, string[]>} */
  let picks = {};
  /** @type {number | null} */
  let tier = null;
  let copied = false;

  $: slots = builderBlocks(days, start);

  function goBuild() {
    // Fresh defaults whenever the shape changes
    picks = defaultPicks(slots);
    step = 1;
  }

  /** Plain-text version of the agenda the visitor built, for pasting into notes or an email */
  function agendaText() {
    return computeAgenda(buildAgenda(slots, picks, people), {})
      .map((b) => `${b.day} ${b.label}\n` + b.sessions.map((s) => `  ${clock(s.start)}  ${s.title} (${s.length} min)`).join('\n'))
      .join('\n\n');
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(agendaText());
      copied = true;
    } catch {
      copied = false;
    }
  }
</script>

<div class="flow">
  {#if step === 0}
    <h2>First, the shape of your weekend.</h2>

    <div class="question" role="group" aria-labelledby="q-days">
      <p id="q-days">How many days?</p>
      <div class="chips">
        {#each [1, 2, 3] as d (d)}
          <RetreatChip on={days === d} on:click={() => (days = d)}>{DAY_LABELS[d - 1]}</RetreatChip>
        {/each}
      </div>
    </div>

    <div class="question" role="group" aria-labelledby="q-start">
      <p id="q-start">When do mornings start?</p>
      <div class="chips">
        {#each STARTS as s (s)}
          <RetreatChip on={start === s} on:click={() => (start = s)}>{clock(s)}</RetreatChip>
        {/each}
      </div>
    </div>

    <div class="question" role="group" aria-labelledby="q-people">
      <p id="q-people">How many people?</p>
      <div class="counter">
        <RetreatChip on:click={() => (people = Math.max(2, people - 1))}><span class="visually-hidden">One fewer</span><span aria-hidden="true">−</span></RetreatChip>
        <output aria-live="polite">{people}</output>
        <RetreatChip on:click={() => (people = Math.min(60, people + 1))}><span class="visually-hidden">One more</span><span aria-hidden="true">+</span></RetreatChip>
      </div>
    </div>

    <div class="actions">
      <button type="button" class="button button-primary" on:click={goBuild}>Next: fill the slots →</button>
    </div>
  {:else if step === 1}
    <h2>Pick an exercise for each slot.</h2>
    <p class="hint">Swap, add or remove. Then try "What if it runs over?" and watch what moves.</p>
    <RetreatAgenda {slots} bind:picks {people} />
    <p class="moral">A 5-minute change early on moves everything after it.</p>
    <div class="actions">
      <button type="button" class="button button-primary" on:click={() => (step = 2)}>Next: pick a tier →</button>
      <button type="button" class="back" on:click={() => (step = 0)}>← Back</button>
    </div>
  {:else if step === 2}
    <h2>How much help do you want?</h2>
    <div class="tiers" role="group" aria-label="Tier">
      {#each TIERS as t, i (t.name)}
        <button type="button" class="tier" aria-pressed={tier === i} on:click={() => (tier = i)}>
          <span class="tier-name">{t.name}</span>
          <span>{t.text}</span>
          <span class="price">Price to be announced</span>
        </button>
      {/each}
    </div>
    <div class="actions">
      <button type="button" class="button button-primary" disabled={tier === null} on:click={() => (step = 3)}>
        {tier === null ? 'Pick one to continue' : 'Continue →'}
      </button>
      <button type="button" class="back" on:click={() => (step = 1)}>← Back</button>
    </div>
  {:else}
    <h2>It's yours. <span class="serif-italic">Go run it.</span></h2>
    <p class="hint">
      The {TIERS[tier ?? 0].name.toLowerCase()} isn't ready to download yet. Book a call to get it first.
      Meanwhile, your agenda is yours to keep.
    </p>
    <div class="actions">
      <a class="button button-primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
        >Book a call ↗<span class="visually-hidden"> (opens in a new tab)</span></a
      >
      <button type="button" class="button" on:click={copy}>{copied ? 'Copied' : 'Copy my agenda'}</button>
      <button type="button" class="back" on:click={() => (step = 1)}>← Edit the agenda</button>
    </div>
  {/if}
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
    max-width: 36rem;
  }

  .moral {
    margin: 0;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.2rem;
  }

  .question p {
    margin: 0 0 var(--spacing-3);
    font-weight: 700;
  }

  .chips,
  .counter {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-3);
  }

  output {
    min-width: 3.5rem;
    text-align: center;
    font-family: var(--font-display);
    font-size: 2rem;
    font-variant-numeric: tabular-nums;
  }

  .tiers {
    display: grid;
    gap: var(--spacing-4);
  }

  @media (min-width: 768px) {
    .tiers {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .tier {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: var(--spacing-5, 1.25rem);
    text-align: left;
    font: inherit;
    cursor: pointer;
    color: var(--ink);
    background: var(--paper-card);
    border: 2px solid var(--ink);
    border-radius: 12px;
    box-shadow: var(--shadow-sticker);
    transition:
      transform 0.2s var(--ease-out),
      box-shadow 0.2s var(--ease-out);
  }

  .tier:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--shadow-sticker-hover);
  }

  .tier[aria-pressed='true'] {
    background: color-mix(in srgb, var(--ochre-light) 55%, var(--paper-card));
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 var(--ink);
  }

  .tier-name {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.25rem;
  }

  .price {
    margin-top: auto;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--ink-soft);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-4);
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
    .tier {
      transition: none;
    }
    .tier:hover {
      transform: none;
    }
  }
</style>
