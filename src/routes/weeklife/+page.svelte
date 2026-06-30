<script lang="ts">
  import { base } from '$app/paths';

  // ← UPDATE this to your actual birthday
  const BIRTHDAY = new Date('1995-01-01');
  const LIFE_EXPECTANCY_YEARS = 90;

  const today = new Date();
  const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

  const totalWeeksLived = Math.floor((today.getTime() - BIRTHDAY.getTime()) / MS_PER_WEEK);
  const totalWeeks = LIFE_EXPECTANCY_YEARS * 52;
  const percentLived = ((totalWeeksLived / totalWeeks) * 100).toFixed(1);
  const yearsOld = Math.floor(totalWeeksLived / 52);
  const weeksRemaining = totalWeeks - totalWeeksLived;

  // Life phases — each year range gets its own color
  const phases = [
    { from: 0,  to: 5,  color: '#fda4af', label: 'Early Childhood' },
    { from: 6,  to: 12, color: '#fde68a', label: 'Childhood'        },
    { from: 13, to: 17, color: '#fdba74', label: 'Teenage Years'    },
    { from: 18, to: 25, color: '#6ee7b7', label: 'Young Adult'      },
    { from: 26, to: 35, color: '#60a5fa', label: 'Building Years'   },
    { from: 36, to: 50, color: '#c084fc', label: 'Mid-Life'         },
    { from: 51, to: 65, color: '#0891b2', label: 'Prime Years'      },
    { from: 66, to: 90, color: '#34d399', label: 'Golden Years'     },
  ];

  function getPhaseColor(year: number): string {
    return phases.find(p => year >= p.from && year <= p.to)?.color ?? '#0891b2';
  }

  // Add life milestones here — weekNumber = year * 52 + week (0-indexed from birth)
  const milestones: Array<{ weekNumber: number; label: string; emoji: string }> = [
    // { weekNumber: 0,    label: 'Born',           emoji: '👶' },
    // { weekNumber: 936,  label: 'University',     emoji: '🎓' }, // ~18 yrs
    // { weekNumber: 1196, label: 'First job',      emoji: '💼' }, // ~23 yrs
  ];

  const milestoneMap = new Map(milestones.map(m => [m.weekNumber, m]));

  const grid = Array.from({ length: LIFE_EXPECTANCY_YEARS }, (_, year) =>
    Array.from({ length: 52 }, (_, week) => {
      const weekNumber = year * 52 + week;
      return {
        year,
        week,
        weekNumber,
        isPast: weekNumber < totalWeeksLived,
        isCurrent: weekNumber === totalWeeksLived,
        milestone: milestoneMap.get(weekNumber),
        phaseColor: getPhaseColor(year),
      };
    })
  );

  // Decade labels shown on left
  const decadeLabels = [0, 10, 20, 30, 40, 50, 60, 70, 80];
</script>

<svelte:head>
  <title>My Life in Weeks — Penélope</title>
  <meta name="description" content="A visual of my entire life, mapped week by week." />
</svelte:head>

<div class="weeks-hero ct-hero">
  <div class="container">
    <a href="{base}/about" class="back-link">← back to about</a>
    <h1 class="chaos-rotate-1">my life in weeks</h1>
    <p class="lead chaos-spacing">Every box is one week. The filled ones are gone. The empty ones are still yours.</p>

    <div class="stats-row">
      <div class="stat-chip wonky-border chaos-rotate-2">
        <span class="stat-number">{yearsOld}</span>
        <span class="stat-label">years old</span>
      </div>
      <div class="stat-chip wonky-border chaos-rotate-3">
        <span class="stat-number">{totalWeeksLived.toLocaleString()}</span>
        <span class="stat-label">weeks lived</span>
      </div>
      <div class="stat-chip wonky-border chaos-rotate-1">
        <span class="stat-number">{percentLived}%</span>
        <span class="stat-label">of {LIFE_EXPECTANCY_YEARS}-year life</span>
      </div>
      <div class="stat-chip wonky-border chaos-rotate-4">
        <span class="stat-number">{weeksRemaining.toLocaleString()}</span>
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

    <div class="grid-wrapper">
      <!-- Column headers: week numbers every 13 -->
      <div class="grid-header">
        <div class="year-label-spacer"></div>
        <div class="week-header-ticks">
          {#each [1, 13, 26, 39, 52] as tick}
            <span class="week-tick" style="left: calc({(tick - 1) / 52 * 100}%)">{tick}</span>
          {/each}
        </div>
      </div>

      <!-- The grid -->
      <div class="life-grid">
        {#each grid as yearRow, yearIdx}
          <div class="year-row">
            <div class="year-label">
              {#if decadeLabels.includes(yearIdx)}
                <span>{yearIdx}</span>
              {/if}
            </div>
            <div class="weeks-row">
              {#each yearRow as cell}
                <div
                  class="week-cell"
                  class:past={cell.isPast}
                  class:current={cell.isCurrent}
                  class:future={!cell.isPast && !cell.isCurrent}
                  class:has-milestone={!!cell.milestone}
                  style:--phase-color={cell.phaseColor}
                  title={cell.milestone
                    ? `${cell.milestone.emoji} ${cell.milestone.label} (age ${cell.year}, week ${cell.week + 1})`
                    : `Age ${cell.year}, week ${cell.week + 1}`}
                ></div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Legend -->
    <div class="legend-section">
      <div class="legend-title chaos-rotate-2">
        <h3>life phases</h3>
        <div class="handwritten" style="position: absolute; top: -18px; right: -30px; z-index: 10;">color key!</div>
      </div>
      <div class="legend-grid">
        {#each phases as phase}
          <div class="legend-item chaos-rotate-{(phases.indexOf(phase) % 4) + 1}">
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

    <!-- Reflection -->
    <div class="reflection wonky-border chaos-rotate-2">
      <p class="handwritten reflection-quote">"The most important thing is to enjoy your life — to be happy. It's all that matters."</p>
      <div class="handwritten reflection-note">— add your own quote here!</div>
    </div>

  </div>
</section>

<style>
  .weeks-hero {
    position: relative;
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

  .weeks-hero h1 {
    margin-bottom: 1rem;
  }

  .lead {
    font-size: 1.125rem;
    opacity: 0.85;
    max-width: 40rem;
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

  /* ── Grid ─────────────────────────────────── */

  .weeks-section {
    padding: 3rem 0 5rem;
  }

  .grid-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.5rem;
  }

  .grid-header {
    display: flex;
    align-items: flex-end;
    margin-bottom: 0.25rem;
    min-width: 600px;
  }

  .year-label-spacer {
    width: 2.5rem;
    flex-shrink: 0;
  }

  .week-header-ticks {
    position: relative;
    flex: 1;
    height: 1.25rem;
  }

  .week-tick {
    position: absolute;
    font-size: 0.6rem;
    color: var(--color-text-light);
    transform: translateX(-50%);
    font-family: var(--font-mono);
  }

  .life-grid {
    min-width: 600px;
  }

  .year-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 1px;
  }

  .year-label {
    width: 2.5rem;
    flex-shrink: 0;
    text-align: right;
    font-size: 0.65rem;
    font-family: var(--font-mono);
    color: var(--color-text-light);
    padding-right: 0.4rem;
    height: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .weeks-row {
    display: flex;
    gap: 1.5px;
    flex: 1;
  }

  .week-cell {
    width: 10px;
    height: 10px;
    flex-shrink: 0;
    border-radius: 2px;
    cursor: default;
    transition: transform 0.1s ease, opacity 0.1s ease;
  }

  .week-cell:hover {
    transform: scale(1.4);
    z-index: 10;
    position: relative;
  }

  .week-cell.past {
    background-color: var(--phase-color);
    opacity: 0.85;
  }

  .week-cell.current {
    background-color: #f59e0b;
    box-shadow: 0 0 0 2px white, 0 0 0 3.5px #f59e0b;
    animation: pulse-current 1.8s ease-in-out infinite;
  }

  .week-cell.future {
    background-color: transparent;
    border: 1.5px solid #d1d5db;
  }

  .week-cell.has-milestone {
    box-shadow: 0 0 0 2px white, 0 0 0 3.5px var(--phase-color);
  }

  @keyframes pulse-current {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 2px white, 0 0 0 3.5px #f59e0b; }
    50%       { opacity: 0.7; box-shadow: 0 0 0 2px white, 0 0 6px 3px rgba(245,158,11,0.5); }
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
    background: #f59e0b;
    box-shadow: 0 0 0 2px white, 0 0 0 3px #f59e0b;
  }

  .future-swatch {
    background: transparent;
    border: 1.5px solid #d1d5db;
  }

  /* ── Reflection ───────────────────────────── */

  .reflection {
    margin-top: 3rem;
    padding: 1.5rem 2rem;
    max-width: 40rem;
    position: relative;
  }

  .reflection-quote {
    font-size: 1.1rem;
    color: var(--color-secondary);
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  .reflection-note {
    font-size: 0.85rem;
    color: var(--color-text-light);
    opacity: 0.7;
  }

  /* ── Responsive ───────────────────────────── */

  @media (max-width: 640px) {
    .week-cell {
      width: 6px;
      height: 6px;
    }

    .stat-number {
      font-size: 1.35rem;
    }

    .stats-row {
      gap: 0.75rem;
    }
  }
</style>
