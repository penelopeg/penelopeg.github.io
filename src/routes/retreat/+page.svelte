<script>
  import { base } from '$app/paths';
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import { sessions, exercises } from '$lib/retreat/data.js';

  const days = ['Friday', 'Saturday', 'Sunday'];
</script>

<svelte:head>
  <title>Community leaders retreat · sandbox</title>
</svelte:head>

<SectionHeading
  index="00"
  eyebrow="Sandbox"
  title="Run a retreat your leaders come back from feeling held."
  blurb="A playbook and toolkit for a three-day retreat for 8–15 community leaders. One structured agenda drives every page here."
/>

<p class="lede">
  Name and identity are still open. This sketch uses the site’s Digital Warmth tokens and a placeholder title.
  Supported by local.foundation.
</p>

<ul class="days">
  {#each days as day (day)}
    <li class="card">
      <p class="eyebrow">{day}</p>
      <ul>
        {#each sessions.filter((s) => s.day === day) as s (s.id)}
          <li><span class="chip {s.mode}">{s.mode}</span> {s.title}</li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>

<p class="actions">
  <a class="button button-primary" href="{base}/retreat/blueprint">Open the blueprint</a>
  <a class="button" href="{base}/retreat/exercises">{exercises.length} exercises</a>
  <a class="button" href="{base}/retreat/plan">Budget calculator</a>
</p>

<style>
  .days {
    list-style: none;
    display: grid;
    gap: var(--spacing-6);
    margin: var(--spacing-12) 0;
  }
  @media (min-width: 768px) {
    .days {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .days ul {
    list-style: none;
    display: grid;
    gap: var(--spacing-3);
  }
  .actions {
    display: flex;
    gap: var(--spacing-4);
    flex-wrap: wrap;
  }
</style>
