<script>
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import { computeBudget } from '$lib/retreat/budget.js';

  // Placeholder inputs. Replace with the reference retreat's numbers once confirmed.
  let i = {
    headcount: 12,
    fee: 250,
    exempt: 1,
    discounted: 1,
    discountPct: 30,
    traded: 1,
    tradeDiscountPct: 50,
    tradeValue: 150,
    days: 3,
    foodPerPersonDay: 30,
    house: 1200,
    extras: 300
  };

  /** @type {Array<[keyof typeof i, string]>} */
  const fields = [
    ['headcount', 'People'],
    ['fee', 'Fee per person (€)'],
    ['exempt', 'Pay nothing'],
    ['discounted', 'Discounted'],
    ['discountPct', 'Discount %'],
    ['traded', 'Labour trade'],
    ['tradeDiscountPct', 'Trade discount %'],
    ['tradeValue', 'Labour value each (€)'],
    ['days', 'Days'],
    ['foodPerPersonDay', 'Food per person/day (€)'],
    ['house', 'House (€)'],
    ['extras', 'Extra costs (€)']
  ];

  $: b = computeBudget(i);
  const eur = (/** @type {number | null} */ n) =>
    n === null ? '–' : new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
</script>

<svelte:head>
  <title>Budget · retreat sandbox</title>
</svelte:head>

<SectionHeading
  index="03"
  eyebrow="Budget and fairness"
  title="Show what each benefit costs"
  blurb="Discounts, labour trades and exemptions each get their own line. Stacking them is allowed, hiding them is not."
/>

<div class="layout">
  <form class="card inputs" on:submit|preventDefault>
    {#each fields as [key, label] (key)}
      <label>
        {label}
        <input type="number" min="0" bind:value={i[key]} />
      </label>
    {/each}
  </form>

  <div class="card out" aria-live="polite">
    <table>
      <tbody>
        <tr><th>Paying in full</th><td>{b.counts.full}</td></tr>
        <tr><th>Fees collected</th><td>{eur(b.collected)}</td></tr>
        <tr><th>Costs (house + food + extras)</th><td>{eur(b.costs)}</td></tr>
        <tr class="net"><th>Net</th><td class:neg={b.net < 0}>{eur(b.net)}</td></tr>
        <tr><th>Break-even per paying person</th><td>{eur(b.breakEvenPerPayer)}</td></tr>
        <tr><th>Break-even if everyone paid</th><td>{eur(b.breakEvenAllPay)}</td></tr>
      </tbody>
    </table>

    <h3>What the benefits did</h3>
    <table>
      <tbody>
        <tr><th>Fees given away (exemptions, discounts, trades)</th><td>{eur(b.givenAway)}</td></tr>
        <tr><th>Labour received in exchange</th><td>{eur(b.laborReceived)}</td></tr>
        <tr class="net"><th>Net including labour</th><td>{eur(b.netWithLabor)}</td></tr>
      </tbody>
    </table>
    <p class="note">
      Labour is not cash. Net above counts fees only. If a person gets a discount, free nights and a budget, name the
      combined effect here before agreeing.
    </p>
  </div>
</div>

<style>
  .layout {
    display: grid;
    gap: var(--spacing-6);
  }
  @media (min-width: 900px) {
    .layout {
      grid-template-columns: 1fr 1fr;
      align-items: start;
    }
  }
  .inputs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-4);
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--line);
    text-align: left;
  }
  td {
    text-align: right;
    font-family: var(--font-mono);
  }
  .net th,
  .net td {
    font-weight: 700;
  }
  .neg {
    color: #8f1d1d;
  }
  h3 {
    margin-top: var(--spacing-8);
  }
  .note {
    margin-top: var(--spacing-4);
    font-size: 0.9rem;
    color: var(--ink-soft);
  }
</style>
