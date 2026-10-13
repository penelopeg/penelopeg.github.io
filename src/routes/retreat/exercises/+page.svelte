<script>
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import { exercises, exerciseMinutes } from '$lib/retreat/data.js';

  let mode = 'all';
  let audience = 'all';
  let headcount = 12;

  $: shown = exercises.filter(
    (e) => (mode === 'all' || e.mode === mode) && (audience === 'all' || e.audiences.includes(audience))
  );
</script>

<svelte:head>
  <title>Exercises · retreat sandbox</title>
</svelte:head>

<SectionHeading
  index="02"
  eyebrow="Exercise library"
  title="Every exercise: time, materials, steps, what to say"
/>

<div class="controls card">
  <label>
    Mode
    <select bind:value={mode}>
      <option value="all">All</option>
      <option value="head">Head</option>
      <option value="heart">Heart</option>
      <option value="body">Body</option>
    </select>
  </label>
  <label>
    Audience
    <select bind:value={audience}>
      <option value="all">All</option>
      <option value="community">Community leaders</option>
      <option value="team">Team</option>
      <option value="leads">Team leads</option>
    </select>
  </label>
  <label>
    Headcount
    <input type="number" min="2" max="40" bind:value={headcount} />
  </label>
</div>

<p aria-live="polite">{shown.length} of {exercises.length} exercises</p>

<div class="grid">
  {#each shown as e (e.id)}
    <article class="card">
      <p class="eyebrow"><span class="chip {e.mode}">{e.mode}</span> {e.group} · {exerciseMinutes(e, headcount)} min</p>
      <h3>{e.name}</h3>
      <p>{e.purpose}</p>
      <details>
        <summary>Steps, prompts, notes</summary>
        <h4>Materials</h4>
        <ul>{#each e.materials as m}<li>{m}</li>{/each}</ul>
        <h4>Steps</h4>
        <ol>{#each e.steps as s}<li>{s}</li>{/each}</ol>
        <h4>What to say</h4>
        <ul>{#each e.say as s}<li>“{s}”</li>{/each}</ul>
        {#if e.variations.length}
          <h4>Variations</h4>
          <ul>{#each e.variations as s}<li>{s}</li>{/each}</ul>
        {/if}
        <h4>In the reference retreat</h4>
        <p>{e.ranAs}</p>
        {#if e.communitySpecific}<p><strong>Community-specific.</strong> {e.communitySpecific}</p>{/if}
        {#if e.source}<p class="source">Source: {e.source}</p>{/if}
      </details>
    </article>
  {/each}
</div>

<style>
  .controls {
    display: grid;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-6);
  }
  @media (min-width: 768px) {
    .controls {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .grid {
    display: grid;
    gap: var(--spacing-6);
  }
  @media (min-width: 900px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      align-items: start;
    }
  }
  h4 {
    font-size: 1rem;
    margin: var(--spacing-4) 0 var(--spacing-1);
  }
  summary {
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.85rem;
  }
  ul,
  ol {
    padding-left: 1.2rem;
  }
  .source {
    font-size: 0.85rem;
    color: var(--ink-soft);
  }
</style>
