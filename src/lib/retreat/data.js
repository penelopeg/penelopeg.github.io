// Single source of truth for the retreat sandbox.
// Blueprint, exercise library and timebox checks all read from here.
// Exercise descriptions are our own wording. Tools adapted from published
// books are credited, never reproduced.

/** @typedef {{ fixed: number, perPerson?: number }} Timing minutes = fixed + perPerson * headcount */

export const MODES = /** @type {const} */ (['head', 'heart', 'body']);
export const AUDIENCES = /** @type {const} */ (['community', 'team', 'leads']);

/** Vocabulary swap for the adaptation layer. */
export const VOCAB = {
  community: { community: 'community', chapter: 'chapter', members: 'members' },
  team: { community: 'team', chapter: 'department', members: 'colleagues' },
  leads: { community: 'organisation', chapter: 'team', members: 'reports' }
};

/**
 * @type {Array<{
 *  id: string, name: string, purpose: string, mode: 'head'|'heart'|'body',
 *  group: string, timing: Timing, materials: string[], steps: string[],
 *  say: string[], variations: string[], ranAs: string, audiences: string[],
 *  communitySpecific?: string, source?: string
 * }>}
 */
export const exercises = [
  {
    id: 'big-word',
    name: 'Opening circle with the big word',
    purpose: 'Get everyone’s voice in the room early and set the bookend for the closing.',
    mode: 'heart',
    group: '8–15',
    timing: { fixed: 10, perPerson: 3 },
    materials: ['Blank cards, one per person', 'Markers'],
    steps: [
      'Each person says their name and the community or team they lead.',
      'They name one thing they want from the weekend.',
      'They write it as one word on the front of a card. The back stays blank.',
      'Cards go on the wall. They stay there until Sunday.'
    ],
    say: ['One word. Not a sentence.', 'This is what you hope to receive, not what you plan to give.'],
    variations: ['Hold the cards in a basket instead of the wall if the room is small.'],
    ranAs: 'Friday opening. On Sunday each person flipped the card and wrote the word they were taking home.',
    audiences: ['community', 'team', 'leads']
  },
  {
    id: 'object-story',
    name: 'Object story at dinner',
    purpose: 'Learn who is in the room through something they chose to bring.',
    mode: 'heart',
    group: '8–15',
    timing: { fixed: 10, perPerson: 3 },
    materials: ['The object each person brought (pre-work)'],
    steps: [
      'Dinner is served. Nobody presents yet.',
      'Between courses, one person at a time puts their object on the table.',
      'Two minutes on why it stands for their community journey. No questions until everyone has gone.'
    ],
    say: ['Tell us what it is and why you brought it. Two minutes.'],
    variations: ['Pair up first and introduce each other’s object.'],
    ranAs: 'Friday dinner.',
    audiences: ['community', 'team', 'leads']
  },
  {
    id: 'purpose-sentence',
    name: 'Purpose in a sentence',
    purpose: 'Reduce what you do to how, why and for whom. Run once personal, once for the group.',
    mode: 'head',
    group: 'Solo, then pairs',
    timing: { fixed: 20, perPerson: 0 },
    materials: ['Paper', 'Pens'],
    steps: [
      'Write three lines: how we do it, why we do it, who it is for.',
      'Read it to a partner. The partner says what they heard in one sentence.',
      'Rewrite once. Keep the version the partner recognised.'
    ],
    say: ['If your partner can’t repeat it, it is too long.'],
    variations: ['Saturday morning: personal. Saturday afternoon: the whole community.'],
    ranAs: 'Personal in the Saturday morning block, community-level in the afternoon.',
    audiences: ['community', 'team', 'leads']
  },
  {
    id: 'power-question',
    name: 'Power question',
    purpose: 'Surface the real problem a leader is working on, and what they get from solving it.',
    mode: 'head',
    group: 'Pairs',
    timing: { fixed: 25, perPerson: 0 },
    materials: ['Paper', 'Pens'],
    steps: [
      'Partner A answers: what problem am I really solving, and what do I hope to get from solving it?',
      'Partner B only listens, then reflects back what stood out.',
      'Swap.'
    ],
    say: ['Answer the question under the question.'],
    variations: ['Run it as a walk.'],
    ranAs: 'Saturday morning.',
    audiences: ['community', 'team', 'leads'],
    source: 'Adapted from Transforming While Performing (Braekeleire & Van Duüren). Our wording; check the book for the original.'
  },
  {
    id: 'peer-assessment',
    name: 'Peer self-assessment, strength to growth',
    purpose: 'Name one strength and one edge, then pair people who can help each other.',
    mode: 'head',
    group: '8–15',
    timing: { fixed: 30, perPerson: 0 },
    materials: ['A short set of leadership principles on cards', 'Dots'],
    steps: [
      'Each person marks themselves against the principles.',
      'They pick one strength and one area to grow.',
      'The room pairs strengths with growth areas.'
    ],
    say: ['Choose the principle you want to grow, not the one you fear.'],
    variations: ['Anonymous first pass, then reveal.'],
    ranAs: 'Saturday morning.',
    audiences: ['community', 'team', 'leads'],
    source: 'Adapted from the twelve principles in Transforming While Performing. Write our own set before publishing.'
  },
  {
    id: 'personas',
    name: 'Community personas by region',
    purpose: 'Describe who the community is for, and who it is not for.',
    mode: 'head',
    group: 'Groups of 3–4',
    timing: { fixed: 45, perPerson: 0 },
    materials: ['Large paper', 'Stickies', 'Existing member research'],
    steps: [
      'Split by region or chapter.',
      'Each group builds two or three personas.',
      'Cross-check against existing research.',
      'Debate: who is this NOT for?'
    ],
    say: ['Be specific. A persona with a name and a bad Tuesday.'],
    variations: ['Team version: personas of internal stakeholders.'],
    ranAs: 'Saturday afternoon. The "not for" debate was the most useful output of the day.',
    audiences: ['community'],
    communitySpecific: 'Team replacement: stakeholder map of who relies on the team and what they need.'
  },
  {
    id: 'leaving-reasons',
    name: 'What could make people leave?',
    purpose: 'List the reasons before designing around them.',
    mode: 'head',
    group: 'Whole group',
    timing: { fixed: 15, perPerson: 0 },
    materials: ['Stickies', 'Wall'],
    steps: ['Open brainstorm, one reason per sticky.', 'Cluster. Do not solve yet.'],
    say: ['Be blunt. This is the list we will design against.'],
    variations: [],
    ranAs: 'Saturday afternoon, feeding Start / Stop / Continue.',
    audiences: ['community', 'team', 'leads']
  },
  {
    id: 'start-stop-continue',
    name: 'Start / Stop / Continue',
    purpose: 'Test current habits against the purpose and the leaving-reasons, then name the culture they reveal.',
    mode: 'head',
    group: 'Groups of 3–4',
    timing: { fixed: 30, perPerson: 0 },
    materials: ['Three wall columns', 'Stickies'],
    steps: [
      'Read the purpose and the leaving-reasons aloud.',
      'Sort what you do into start, stop, continue.',
      'Read the Continue column back. Name the culture in three words.'
    ],
    say: ['What does this list say about how we actually behave?'],
    variations: [],
    ranAs: 'Saturday afternoon.',
    audiences: ['community', 'team', 'leads'],
    source: 'Adapted from Transforming While Performing. Start / Stop / Continue is a common retrospective format.'
  },
  {
    id: 'moonshot',
    name: 'Moonshot',
    purpose: 'Each person describes the future community in their own words. Versions stay separate.',
    mode: 'heart',
    group: '8–15',
    timing: { fixed: 3, perPerson: 1 },
    materials: ['Paper', 'Pens'],
    steps: [
      'Say the year. "You walk into a gathering. What do you see?"',
      'Three minutes of silent writing.',
      'One minute each, read aloud. No comments.'
    ],
    say: ['Describe what you see, hear and who is there.'],
    variations: ['Split into two rooms above 12 people.'],
    ranAs: 'Saturday afternoon. Planned as 1 min × 12 people inside a 10-minute slot. It did not fit.',
    audiences: ['community', 'team', 'leads']
  },
  {
    id: 'crazy-8',
    name: 'Crazy 8 with How Might We',
    purpose: 'Many ideas fast, then a vote.',
    mode: 'head',
    group: 'Groups of 3–5',
    timing: { fixed: 40, perPerson: 0 },
    materials: ['Paper folded into 8', 'Timer', 'Dots'],
    steps: [
      'Pick a How Might We prompt per group.',
      'Eight ideas in eight minutes.',
      'Share, then dot-vote.'
    ],
    say: ['Quantity first. Judge later.'],
    variations: [],
    ranAs: 'Saturday morning, three teams.',
    audiences: ['community', 'team', 'leads']
  },
  {
    id: 'walk-talk',
    name: 'Walk-and-talk in pairs',
    purpose: 'Reflect on the weekend while moving.',
    mode: 'body',
    group: 'Pairs',
    timing: { fixed: 40, perPerson: 0 },
    materials: ['Pair assignments', 'Indoor fallback'],
    steps: [
      'Assign pairs ahead of time, not on the spot.',
      'Walk 20 minutes with two prompts: what surprised you, what do you want to keep.',
      'Return and write one line on the wall.'
    ],
    say: ['Listen more than you talk.'],
    variations: ['Do it after walking the wall of outputs. Weather-dependent: agree the cut order up front.'],
    ranAs: 'Sunday. The stupa walk was cut for time and heat.',
    audiences: ['community', 'team', 'leads']
  },
  {
    id: 'nnl',
    name: 'Now / Next / Later with owners',
    purpose: 'Turn the wall into a roadmap where every item has a person.',
    mode: 'head',
    group: '8–15',
    timing: { fixed: 75, perPerson: 0 },
    materials: ['Wall columns', 'Voted themes', 'Name stickers'],
    steps: [
      'Write the definition of Now, Next and Later in months on the wall. Do not change it mid-session.',
      'Place voted themes into columns.',
      'Ask who wants each Now item. An owner does not do it alone.',
      'Anything touching the founder gets a named approver.',
      'Unchosen themes go on a visible side list.'
    ],
    say: ['Who wants to own this? Only say yes if you mean it.'],
    variations: [],
    ranAs: 'Sunday. Horizons drifted from 1–2 months to 0–3 because they were not written down first.',
    audiences: ['community', 'team', 'leads']
  },
  {
    id: 'commitment',
    name: 'Written commitment',
    purpose: 'Close with something personal and something shared.',
    mode: 'heart',
    group: 'Solo',
    timing: { fixed: 15, perPerson: 0 },
    materials: ['Commitment sheet', 'Pens'],
    steps: [
      'Write: my commitment as a leader, what I will develop, how I contribute to the North Star.',
      'Fold it. Keep it.'
    ],
    say: ['Make it small enough to start on Monday.'],
    variations: [],
    ranAs: 'Sunday, before the closing ritual.',
    audiences: ['community', 'team', 'leads']
  }
];

/**
 * Sessions. `block` is the minutes available. `items` reference exercises.
 * `optional` items are guest activities that need their own room.
 * @type {Array<{
 *  id: string, day: 'Friday'|'Saturday'|'Sunday', title: string, mode: 'head'|'heart'|'body',
 *  purpose: string, block: number, space: string, speaker: string,
 *  items: Array<{ exercise?: string, label?: string, minutes?: number, optional?: boolean }>,
 *  pitfalls: string[]
 * }>}
 */
export const sessions = [
  {
    id: 'fri-open',
    day: 'Friday',
    title: 'Arrive and open',
    mode: 'heart',
    purpose: 'Everyone has spoken once before dinner.',
    block: 90,
    space: 'Main room',
    speaker: 'Lead facilitator',
    items: [
      { exercise: 'big-word' },
      { label: 'Facilitator intro and origin story', minutes: 20 },
      { label: 'Ground rules', minutes: 10 }
    ],
    pitfalls: ['Arrivals slip. Start the circle with whoever is there and brief late arrivals.']
  },
  {
    id: 'fri-dinner',
    day: 'Friday',
    title: 'Shared dinner',
    mode: 'heart',
    purpose: 'Keep the evening easy.',
    block: 120,
    space: 'Kitchen and table',
    speaker: 'Organiser',
    items: [{ exercise: 'object-story' }],
    pitfalls: ['Hand out dietary needs to whoever cooks before Friday, not at the table.']
  },
  {
    id: 'sat-am',
    day: 'Saturday',
    title: 'Community leadership',
    mode: 'head',
    purpose: 'Name why you lead and what you struggle with.',
    block: 180,
    space: 'Main room',
    speaker: 'Guest facilitator (theirs to finalise)',
    items: [
      { label: 'Talk: what a community leader is', minutes: 20 },
      { exercise: 'purpose-sentence' },
      { exercise: 'power-question' },
      { label: 'Break', minutes: 15 },
      { exercise: 'peer-assessment' },
      { exercise: 'crazy-8' },
      { label: 'Optional: breathwork (guest)', minutes: 75, optional: true }
    ],
    pitfalls: [
      'Optional guest activities need their own slot. 75 minutes does not fit inside 30.',
      'Protect the break.'
    ]
  },
  {
    id: 'sat-pm-1',
    day: 'Saturday',
    title: 'North Star, part 1',
    mode: 'head',
    purpose: 'Purpose, value, culture and ambitions, in pieces.',
    block: 150,
    space: 'Main room',
    speaker: 'Lead facilitator',
    items: [
      { exercise: 'purpose-sentence' },
      { exercise: 'personas' },
      { exercise: 'leaving-reasons' },
      { exercise: 'start-stop-continue' },
      { exercise: 'moonshot' }
    ],
    pitfalls: [
      'Compose the pieces first, then the one sentence. Sentence frames are scaffolding to remove.',
      'Moonshot time scales with headcount. Check it below.'
    ]
  },
  {
    id: 'sat-pm-2',
    day: 'Saturday',
    title: 'North Star, part 2: one deliverable',
    mode: 'head',
    purpose: 'Turn the North Star into one concrete thing (in the reference run: membership).',
    block: 120,
    space: 'Main room',
    speaker: 'Lead facilitator',
    items: [{ label: 'Working session on the chosen topic', minutes: 90 }],
    pitfalls: [
      'This is the block that gets eaten. Reserve flex time and decide in advance what is cut.',
      'The founder-capacity conversation will come up. Give it a safe slot and decide who holds the notes.'
    ]
  },
  {
    id: 'sun-align',
    day: 'Sunday',
    title: 'Align and depart',
    mode: 'body',
    purpose: 'Leave with a roadmap, owners and a word.',
    block: 210,
    space: 'Main room, then outside',
    speaker: 'Lead facilitator',
    items: [
      { exercise: 'walk-talk' },
      { exercise: 'nnl' },
      { exercise: 'commitment' },
      { label: 'Closing: flip the card, write the word', minutes: 20 }
    ],
    pitfalls: [
      'Walk first or roadmap first? Walking the wall first lands better. In the reference run the roadmap went first.',
      'Cut the weather-dependent session first.'
    ]
  }
];

/** @param {{timing: Timing}} ex @param {number} headcount */
export const exerciseMinutes = (ex, headcount) =>
  ex.timing.fixed + (ex.timing.perPerson ?? 0) * headcount;

/**
 * Timebox math for one session.
 * Optional items are reported separately and never counted as buffer.
 * @param {(typeof sessions)[number]} session
 * @param {number} headcount
 */
export function checkSession(session, headcount) {
  const rows = session.items.map((item) => {
    const ex = item.exercise ? exercises.find((e) => e.id === item.exercise) : undefined;
    const minutes = ex ? exerciseMinutes(ex, headcount) : (item.minutes ?? 0);
    return { ...item, name: ex ? ex.name : item.label, minutes };
  });
  const required = rows.filter((r) => !r.optional).reduce((s, r) => s + r.minutes, 0);
  const optional = rows.filter((r) => r.optional).reduce((s, r) => s + r.minutes, 0);
  const buffer = session.block - required;
  return {
    rows,
    required,
    optional,
    buffer,
    overBy: Math.max(0, -buffer),
    optionalFits: optional <= Math.max(0, buffer)
  };
}
