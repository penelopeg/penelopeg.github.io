<script>
  import { tick } from 'svelte';
  import LabOffer from './LabOffer.svelte';
  import RetreatForMe from './RetreatForMe.svelte';
  // import RetreatYourself from './RetreatYourself.svelte';
  import { doors } from '$lib/data/communitylab.js';

  const WHO = [
    { id: 'leader', title: 'I lead a community', text: 'A meetup, a Discord, a guild, a nonprofit, an event series.' },
    { id: 'org', title: 'I run a programme or a team', text: 'An incubator, an accelerator, a developer community team, an association.' }
  ];

  const TRACKS = [
    { id: 'forMe', title: 'Run it for me', text: 'I plan and facilitate. You bring the group.' },
    // "I'll run it myself" is coming soon. Re-enable the flow below when it's ready.
    { id: 'yourself', title: "I'll run it myself", text: 'Get the agenda, the timing and the materials.', soon: true }
  ];

  /** @type {string | null} */ let doorId = null;
  /** @type {string | null} */ let need = null;
  /** @type {'forMe' | 'yourself' | null} */ let track = null;
  let planning = false;

  $: door = doors.find((d) => d.id === doorId);
  $: shown = door ? (need === 'all' ? door.offers : door.offers.filter((o) => o.id === need)) : [];

  /** @param {string} id */
  function pickDoor(id) {
    doorId = id;
    need = null;
    track = null;
    planning = false;
  }

  async function startPlanning() {
    planning = true;
    await tick();
    document.getElementById('retreat-planner')?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  /** @param {string} id */
  function pickNeed(id) {
    need = id;
    track = null;
    planning = false;
  }

  /** @param {'forMe' | 'yourself'} id */
  function pickTrack(id) {
    track = id;
  }
</script>

<div class="finder">
  <h3 class="q">1. Who are you?</h3>
  <div class="choices" role="group" aria-label="Who are you?">
    {#each WHO as w, i (w.id)}
      <button
        type="button"
        class="choice"
        style="--tilt: {i === 0 ? -1.2 : 1.2}deg"
        aria-pressed={doorId === w.id}
        on:click={() => pickDoor(w.id)}
      >
        <span class="choice-title">{w.title}</span>
        <span>{w.text}</span>
      </button>
    {/each}
  </div>

  {#if door}
    <h3 class="q">2. What do you need?</h3>
    <div class="choices needs" role="group" aria-label="What do you need?">
      {#each door.offers as o, i (o.id)}
        <button
          type="button"
          class="choice small"
          style="--tilt: {i % 2 === 0 ? -0.8 : 0.8}deg"
          aria-pressed={need === o.id}
          on:click={() => pickNeed(o.id)}
        >
          <span class="choice-title">{o.need}</span>
        </button>
      {/each}
      <button
        type="button"
        class="choice small"
        style="--tilt: 0deg"
        aria-pressed={need === 'all'}
        on:click={() => pickNeed('all')}
      >
        <span class="choice-title">Not sure, show me everything</span>
      </button>
    </div>
  {/if}

  {#if door && need}
    <div class="results" aria-live="polite">
      <h3 class="q">{shown.length > 1 ? 'Your formats' : 'Your format'}</h3>
      <div class="offer-list">
        {#each shown as offer (offer.id)}
          <LabOffer {offer} on:anchor={startPlanning} />
        {/each}
      </div>
      <p class="pay">Booking a 30min exploratory call is free.</p>
    </div>
  {/if}

  {#if planning}
    <div id="retreat-planner" class="retreat">
      <h3 class="q">Planning a retreat? <span class="serif-italic">Start here.</span></h3>
      <p class="intro">Answer five questions and get a draft, or build the agenda yourself and watch the timing move when a session runs over.</p>
      <div class="choices" role="group" aria-label="Choose a track">
        {#each TRACKS as t, i (t.id)}
          <button
            type="button"
            class="choice"
            style="--tilt: {i === 0 ? -1.2 : 1.2}deg"
            aria-pressed={track === t.id}
            disabled={t.soon}
            on:click={() => pickTrack(/** @type {'forMe' | 'yourself'} */ (t.id))}
          >
            <span class="choice-title">{t.title}{t.soon ? '' : ' →'}</span>
            <span>{t.text}</span>
            {#if t.soon}<span class="soon">Coming soon</span>{/if}
          </button>
        {/each}
      </div>
      <div class="flow" aria-live="polite">
        {#if track === 'forMe'}
          <RetreatForMe />
        <!-- {:else if track === 'yourself'}
          <RetreatYourself /> -->
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .q {
    font-size: 1.5rem;
    margin: var(--spacing-12) 0 var(--spacing-4);
  }

  .finder > .q:first-child {
    margin-top: 0;
  }

  .intro {
    max-width: 42rem;
    margin: 0 0 var(--spacing-8);
    color: var(--ink-soft);
  }

  .choices {
    display: grid;
    gap: var(--spacing-6);
  }

  @media (min-width: 640px) {
    .choices {
      grid-template-columns: 1fr 1fr;
    }
  }

  .choice {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    padding: var(--spacing-6);
    text-align: left;
    font: inherit;
    cursor: pointer;
    color: var(--ink);
    background: var(--paper-card);
    border: 2px solid var(--ink);
    border-radius: 12px;
    box-shadow: var(--shadow-sticker);
    transform: rotate(var(--tilt));
    transition:
      transform 0.25s var(--ease-out),
      box-shadow 0.25s var(--ease-out),
      background-color 0.25s var(--ease-out);
  }

  .choice.small {
    padding: var(--spacing-4) var(--spacing-6);
    justify-content: center;
  }

  .choice.small .choice-title {
    font-size: 1.2rem;
  }

  .choice:hover {
    transform: rotate(0deg) translate(-2px, -2px);
    box-shadow: var(--shadow-sticker-hover);
  }

  .choice[aria-pressed='true'] {
    transform: rotate(0deg);
    background: var(--ink);
    color: var(--paper);
    box-shadow: 4px 4px 0 var(--terracotta);
  }

  .choice:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
    box-shadow: none;
  }

  .soon {
    align-self: flex-start;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.1rem 0.6rem;
    border: 1.5px solid var(--ink);
    border-radius: var(--border-radius-sticker);
    background: var(--ochre);
  }

  .choice-title {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.1;
  }

  .results,
  .flow {
    scroll-margin-top: 5.5rem;
  }

  .results {
    margin-top: var(--spacing-12);
  }

  .results .q {
    margin-top: 0;
  }

  .offer-list {
    display: grid;
    gap: var(--spacing-6);
  }

  @media (min-width: 900px) {
    .offer-list {
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    }
  }

  .pay {
    margin: var(--spacing-8) 0 0;
    color: var(--ink-soft);
  }

  .retreat {
    margin-top: var(--spacing-16);
    scroll-margin-top: 5.5rem;
  }

  .flow {
    margin-top: var(--spacing-12);
  }

  @media (prefers-reduced-motion: reduce) {
    .choice {
      transform: none;
      transition: none;
    }
    .choice:hover {
      transform: none;
    }
  }
</style>
