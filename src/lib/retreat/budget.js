/**
 * Budget and fairness maths. Pure function so it can be tested with the
 * reference retreat's numbers once they are confirmed.
 *
 * Every benefit is reported as its own line, so a trade changes the net
 * visibly instead of disappearing into a total.
 *
 * @param {{
 *  headcount: number, fee: number, exempt: number,
 *  discounted: number, discountPct: number,
 *  traded: number, tradeDiscountPct: number, tradeValue: number,
 *  days: number, foodPerPersonDay: number, house: number, extras: number
 * }} i
 */
export function computeBudget(i) {
  const exempt = Math.min(i.exempt, i.headcount);
  const discounted = Math.min(i.discounted, i.headcount - exempt);
  const traded = Math.min(i.traded, i.headcount - exempt - discounted);
  const full = i.headcount - exempt - discounted - traded;

  const feeFull = full * i.fee;
  const feeDiscounted = discounted * i.fee * (1 - i.discountPct / 100);
  const feeTraded = traded * i.fee * (1 - i.tradeDiscountPct / 100);
  const collected = feeFull + feeDiscounted + feeTraded;

  const food = i.headcount * i.days * i.foodPerPersonDay;
  const costs = i.house + food + i.extras;

  const net = collected - costs;
  const paying = full + discounted + traded;

  // What the same group would have paid with no discounts or trades.
  const collectedNoBenefits = (i.headcount - exempt) * i.fee;
  const givenAway = collectedNoBenefits - collected;
  const laborReceived = traded * i.tradeValue;

  return {
    counts: { exempt, discounted, traded, full, paying },
    collected,
    food,
    costs,
    net,
    netWithLabor: net + laborReceived,
    givenAway,
    laborReceived,
    breakEvenPerPayer: paying > 0 ? costs / paying : null,
    breakEvenAllPay: i.headcount > 0 ? costs / i.headcount : null
  };
}
