<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import Seo from '$lib/components/Seo.svelte';

  // ← UPDATE these to make the page yours
  const BIRTHDAY = { year: 1995, month: 1, day: 1 };
  const LIFE_EXPECTANCY_YEARS = 90;
  const QUOTE = "The most important thing is to enjoy your life — to be happy. It's all that matters.";

  // Milestones appear as ringed cells on the grid and in the list below it
  const milestones: Array<{ age: number; week: number; label: string; emoji: string }> = [
    // { age: 18, week: 2, label: 'Started university', emoji: '🎓' },
    // { age: 23, week: 30, label: 'First job', emoji: '💼' },
  ];

  const WEEKS_PER_YEAR = 52;
  const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
  const totalWeeks = LIFE_EXPECTANCY_YEARS * WEEKS_PER_YEAR;
  const birthDate = new Date(BIRTHDAY.year, BIRTHDAY.month - 1, BIRTHDAY.day);
  const milestoneMap = new Map(milestones.map((m) => [`${m.age}-${m.week}`, m]));

  // Each grid row runs birthday to birthday, so the current-week marker can
  // never drift into the wrong age row the way a flat 52-weeks-per-year
  // index would (a real year is ~52.18 weeks).
  function anniversary(age: number): Date {
    return new Date(BIRTHDAY.year + age, BIRTHDAY.month - 1, BIRTHDAY.day);
  }

  function currentAge(on: Date): number {
    const years = on.getFullYear() - BIRTHDAY.year;
    return on < anniversary(years) ? years - 1 : years;
  }

  function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  // The prerendered HTML carries the build date; onMount corrects it on the client
  let today = new Date();
  onMount(() => {
    today = new Date();
  });

  $: age = Math.max(0, currentAge(today));
  $: weekOfYear = clamp(
    Math.floor((today.getTime() - anniversary(age).getTime()) / MS_PER_WEEK),
    0,
    WEEKS_PER_YEAR - 1
  );
  $: weeksLived = Math.max(0, Math.floor((today.getTime() - birthDate.getTime()) / MS_PER_WEEK));
  $: weeksAhead = Math.max(
    0,
    Math.round((anniversary(LIFE_EXPECTANCY_YEARS).getTime() - today.getTime()) / MS_PER_WEEK)
  );
  // Life phase per year of age; every color is at least 3:1 against white (WCAG 1.4.11)
  const phases = [
    { from: 0,  to: 5,  color: '#f43f5e',                 label: 'Early Childhood' },
    { from: 6,  to: 12, color: '#d97706',                 label: 'Childhood' },
    { from: 13, to: 17, color: '#ea580c',                 label: 'Teenage Years' },
    { from: 18, to: 25, color: '#059669',                 label: 'Young Adult' },
    { from: 26, to: 35, color: '#3b82f6',                 label: 'Building Years' },
    { from: 36, to: 50, color: 'var(--color-secondary)',  label: 'Mid-Life' },
    { from: 51, to: 65, color: 'var(--color-primary)',    label: 'Prime Years' },
    { from: 66, to: 90, color: 'var(--color-text-light)', label: 'Golden Years' },
  ];

  function phaseColor(year: number): string {
    return phases.find((p) => year >= p.from && year <= p.to)?.color ?? 'var(--color-primary)';
  }
</script>

<Seo
  title="My Life in Weeks — Penélope Gonçalves"
  description="Every week of my life as one small box: the filled ones are gone, the empty ones are still mine."
/>

<div class="weeks-hero ct-hero">
  <div class="container">
    <a href="{base}/about" class="back-link">← back to about</a>
    <h1 class="chaos-rotate-1">my life in weeks</h1>
    <p class="lead">Every box is one week. The filled ones are gone. The empty ones are still yours.</p>

    <div class="stats-row">
      <div class="stat-chip wonky-border chaos-rotate-2">
        <span class="stat-number">{age}</span>
        <span class="stat-label">years old</span>
      </div>
      <div class="stat-chip wonky-border chaos-rotate-3">
        <span class="stat-number">{weeksLived.toLocaleString()}</span>
        <span class="stat-label">weeks lived</span>
      </div>
      <div class="stat-chip wonky-border chaos-rotate-4">
        <span class="stat-number">{weeksAhead.toLocaleString()}</span>
        <span class="stat-label">weeks ahead</span>
      </div>
    </div>

    <div class="handwritten" style="position: absolute; top: 24px; right: 28px; z-index: 100;">
      make them count!
    </div>
  </div>
</div>

<section class="weeks-section">
  <div class="container">
    <p class="sr-only">
      A decorative grid of {totalWeeks.toLocaleString()} boxes, one per week of a
      {LIFE_EXPECTANCY_YEARS}-year life. {weeksLived.toLocaleString()} weeks are filled in so far,
      with {weeksAhead.toLocaleString()} still ahead.
    </p>

    <div class="grid-wrapper" aria-hidden="true">
      <div class="grid-header">
        <div class="year-label-spacer"></div>
        <div class="week-header-ticks">
          {#each [1, 13, 26, 39, 52] as tick}
            <span
              class="week-tick"
              style="left: calc({tick - 1} * (var(--cell-size) + var(--cell-gap)) + var(--cell-size) / 2)"
            >
              {tick}
            </span>
          {/each}
        </div>
      </div>

      <div class="life-grid">
        {#each { length: LIFE_EXPECTANCY_YEARS } as _, year}
          <div class="year-row" style:--phase-color={phaseColor(year)}>
            <div class="year-label">
              {#if year % 10 === 0}<span>{year}</span>{/if}
            </div>
            <div class="weeks-row">
              {#each { length: WEEKS_PER_YEAR } as _, week}
                {@const milestone = milestoneMap.get(`${year}-${week}`)}
                <div
                  class="week-cell"
                  class:past={year < age || (year === age && week < weekOfYear)}
                  class:current={year === age && week === weekOfYear}
                  class:milestone={!!milestone}
                  title={milestone ? `${milestone.emoji} ${milestone.label}` : undefined}
                ></div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    {#if milestones.length}
      <ul class="milestone-list">
        {#each milestones as milestone}
          <li class="wonky-border">
            <span aria-hidden="true">{milestone.emoji}</span>
            {milestone.label} — age {milestone.age}
          </li>
        {/each}
      </ul>
    {/if}

    <div class="legend-section">
      <div class="legend-title chaos-rotate-2">
        <h3>life phases</h3>
        <div class="handwritten" style="position: absolute; top: -18px; right: -30px; z-index: 10;">color key!</div>
      </div>
      <div class="legend-grid">
        {#each phases as phase, i}
          <div class="legend-item chaos-rotate-{(i % 4) + 1}">
            <div class="legend-swatch" style:background={phase.color}></div>
            <span>{phase.label}</span>
          </div>
        {/each}
        <div class="legend-item chaos-rotate-2">
          <div class="legend-swatch current-swatch"></div>
          <span>This week</span>
        </div>
        <div class="legend-item chaos-rotate-1">
          <div class="legend-swatch future-swatch"></div>
          <span>Future</span>
        </div>
      </div>
    </div>

    <div class="reflection wonky-border chaos-rotate-2">
      <p class="handwritten reflection-quote">"{QUOTE}"</p>
    </div>
  </div>
</section>

<style>
  .weeks-hero h1 {
    margin-bottom: 1rem;
  }

  .back-link {
    display: inline-block;
    margin-bottom: 1.5rem;
    color: var(--color-primary);
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0.8;
    transition: var(--transition-fast);
  }

  .back-link:hover {
    opacity: 1;
    transform: translateX(-3px);
  }

  .lead {
    font-size: 1.25rem;
    opacity: 0.9;
    max-width: 48rem;
    margin: 0 auto 2rem;
  }

  .stats-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .stat-chip {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem 1.25rem;
    min-width: 100px;
    background: white;
  }

  .stat-number {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-primary);
    line-height: 1;
  }

  .stat-label {
    font-size: 0.75rem;
    color: var(--color-text-light);
    margin-top: 0.25rem;
    white-space: nowrap;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  /* ── Grid ─────────────────────────────────── */

  .weeks-section {
    padding: 3rem 0 5rem;
  }

  .grid-wrapper {
    --cell-size: 14px;
    --cell-gap: 2px;
    --label-width: 2.5rem;
    --row-width: calc(52 * var(--cell-size) + 51 * var(--cell-gap));
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.5rem;
  }

  /* Header and grid share a fixed track width, centered on the page;
     when the viewport is narrower they left-align and scroll instead */
  .grid-header,
  .life-grid {
    width: fit-content;
    margin-inline: auto;
  }

  /* Header mirrors the .year-row layout so the ticks align with the columns */
  .grid-header {
    display: flex;
    gap: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .year-label-spacer {
    width: var(--label-width);
    flex-shrink: 0;
  }

  .week-header-ticks {
    position: relative;
    width: var(--row-width);
    height: 1.25rem;
  }

  .week-tick {
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 0.6rem;
    font-family: var(--font-mono);
    color: var(--color-text-light);
  }

  .year-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 1px;
  }

  .year-label {
    width: var(--label-width);
    height: var(--cell-size);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.4rem;
    font-size: 0.65rem;
    font-family: var(--font-mono);
    color: var(--color-text-light);
  }

  .weeks-row {
    display: flex;
    gap: var(--cell-gap);
  }

  /* An empty (future) week is the default look; past/current override it */
  .week-cell {
    width: var(--cell-size);
    height: var(--cell-size);
    flex-shrink: 0;
    border-radius: 2px;
    border: 1.5px solid var(--color-text-light);
    transition: transform 0.1s ease;
  }

  .week-cell:hover {
    transform: scale(1.4);
    position: relative;
    z-index: 10;
  }

  .week-cell.past {
    border: none;
    background-color: var(--phase-color);
  }

  .week-cell.current {
    border: none;
    background-color: var(--hero-tape);
    box-shadow: 0 0 0 2px white, 0 0 0 3.5px var(--hero-tape);
    animation: pulse-current 1.8s ease-in-out infinite;
  }

  .week-cell.milestone {
    box-shadow: 0 0 0 2px white, 0 0 0 3.5px var(--phase-color);
  }

  @keyframes pulse-current {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  /* ── Milestones ───────────────────────────── */

  .milestone-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 0;
    margin: 1.5rem 0 0;
  }

  .milestone-list li {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }

  /* ── Legend ───────────────────────────────── */

  .legend-section {
    margin-top: 2.5rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  .legend-title {
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
  }

  .legend-title h3 {
    font-size: 1rem;
    color: var(--color-text);
  }

  .legend-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    color: var(--color-text-light);
  }

  .legend-swatch {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .current-swatch {
    background: var(--hero-tape);
    box-shadow: 0 0 0 2px white, 0 0 0 3px var(--hero-tape);
  }

  .future-swatch {
    background: transparent;
    border: 1.5px solid var(--color-text-light);
  }

  /* ── Reflection ───────────────────────────── */

  .reflection {
    margin-top: 3rem;
    padding: 1.5rem 2rem;
    max-width: 40rem;
  }

  .reflection-quote {
    font-size: 1.1rem;
    color: var(--color-secondary);
    line-height: 1.6;
    margin: 0;
  }

  /* ── Responsive ───────────────────────────── */

  @media (max-width: 900px) {
    .grid-wrapper {
      --cell-size: 10px;
      --cell-gap: 1.5px;
    }
  }

  @media (max-width: 640px) {
    .grid-wrapper {
      --cell-size: 6px;
    }

    .week-cell {
      border-width: 1px;
    }

    .stat-number {
      font-size: 1.35rem;
    }

    .stats-row {
      gap: 0.75rem;
    }
  }
</style>
