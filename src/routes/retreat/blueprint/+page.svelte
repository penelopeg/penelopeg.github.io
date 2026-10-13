<script>
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import { sessions, checkSession, exercises, VOCAB } from '$lib/retreat/data.js';

  let headcount = 12;
  let audience = /** @type {'community'|'team'|'leads'} */ ('community');

  $: checks = sessions.map((s) => ({ s, c: checkSession(s, headcount) }));
  $: problems = checks.filter(({ c }) => c.overBy > 0 || (c.optional > 0 && !c.optionalFits));
  $: v = VOCAB[audience];
  $: byId = Object.fromEntries(exercises.map((e) => [e.id, e]));
</script>

<svelte:head>
  <title>Blueprint · retreat sandbox</title>
</svelte:head>

<SectionHeading
  index="01"
  eyebrow="Blueprint"
  title="Three days, session by session"
  blurb="Alternate head, heart and body. Never two heavy sessions back to back. Protect the unstructured breaks."
/>

<div class="controls card">
  <label>
    Headcount
    <input type="number" min="2" max="40" bind:value={headcount} />
  </label>
  <label>
    Audience
    <select bind:value={audience}>
      <option value="community">Community leaders</option>
      <option value="team">Team</option>
      <option value="leads">Team leads / managers</option>
    </select>
  </label>
  <p class="status" aria-live="polite">
    {#if problems.length}
      <span class="flag">{problems.length} session{problems.length > 1 ? 's' : ''} over time:</span>
      {problems.map(({ s }) => s.title).join(', ')}
    {:else}
      <span class="ok">Every session fits its block.</span>
    {/if}
  </p>
  <p class="vocab">
    Vocabulary: “community” → <strong>{v.community}</strong>, “chapter” → <strong>{v.chapter}</strong>,
    “members” → <strong>{v.members}</strong>
  </p>
</div>

{#each checks as { s, c } (s.id)}
  <article class="session card" class:over={c.overBy > 0}>
    <header>
      <p class="eyebrow">{s.day} · <span class="chip {s.mode}">{s.mode}</span></p>
      <h3>{s.title}</h3>
      <p>{s.purpose}</p>
      <dl>
        <div><dt>Block</dt><dd>{s.block} min</dd></div>
        <div><dt>Space</dt><dd>{s.space}</dd></div>
        <div><dt>Speaks</dt><dd>{s.speaker}</dd></div>
      </dl>
    </header>

    <table>
      <caption class="visually-hidden">Timeboxes for {s.title}</caption>
      <thead><tr><th>Item</th><th class="num">Min</th></tr></thead>
      <tbody>
        {#each c.rows as r}
          <tr class:optional={r.optional}>
            <td>
              {r.name}
              {#if r.optional}<span class="chip">optional</span>{/if}
              {#if r.exercise && byId[r.exercise].communitySpecific && audience !== 'community'}
                <br /><small>{byId[r.exercise].communitySpecific}</small>
              {/if}
            </td>
            <td class="num">{r.minutes}</td>
          </tr>
        {/each}
      </tbody>
      <tfoot>
        <tr>
          <th>Content / block</th>
          <td class="num">{c.required} / {s.block}</td>
        </tr>
        <tr>
          <th>Buffer</th>
          <td class="num">
            {#if c.overBy > 0}<span class="flag">over by {c.overBy}</span>{:else}<span class="ok">{c.buffer}</span>{/if}
          </td>
        </tr>
        {#if c.optional}
          <tr>
            <th>Optional extra</th>
            <td class="num">
              {#if c.optionalFits}<span class="ok">{c.optional} fits</span>{:else}<span class="flag"
                  >{c.optional} needs its own slot</span
                >{/if}
            </td>
          </tr>
        {/if}
      </tfoot>
    </table>

    <ul class="pitfalls">
      {#each s.pitfalls as p}<li>{p}</li>{/each}
    </ul>
  </article>
{/each}

<style>
  .controls {
    display: grid;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-8);
  }
  @media (min-width: 768px) {
    .controls {
      grid-template-columns: 10rem 16rem 1fr;
      align-items: end;
    }
    .status,
    .vocab {
      grid-column: 1 / -1;
    }
  }
  .status,
  .vocab {
    margin: 0;
  }
  .session {
    margin-bottom: var(--spacing-6);
  }
  .session.over {
    border-color: #8f1d1d;
  }
  dl {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-6);
    margin-bottom: var(--spacing-4);
  }
  dt {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    color: var(--ink-soft);
  }
  dd {
    margin: 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  th,
  td {
    text-align: left;
    padding: 0.4rem 0;
    border-bottom: 1px solid var(--line);
    vertical-align: top;
  }
  .num {
    text-align: right;
    font-family: var(--font-mono);
    white-space: nowrap;
  }
  tr.optional td {
    color: var(--ink-soft);
  }
  .pitfalls {
    margin-top: var(--spacing-4);
    padding-left: 1.2rem;
    color: var(--ink-soft);
  }
</style>
