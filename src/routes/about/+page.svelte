<script>
  import { base } from '$lib/paths';
  import RoadTrip from '$lib/components/retreat/RoadTrip.svelte';

  const BOOKING_URL = 'https://calendly.com/penelope-builds/';

  const stops = [
    { when: '', title: 'Who is she?' },
    { when: '', title: 'What I keep coming back to' },
    { when: '', title: "What I'm focusing on" },
    { when: '', title: 'The short version' }
  ];

  const principles = [
    {
      title: 'Always moving and connecting',
      text: 'The world is a good place. Create spaces where different kinds of people can solve problems together and find their humanity in each other.'
    },
    {
      title: 'Chaos Theory',
      text: 'Proving that you can be organized in the chaos of a multi-passion life. Planning is essential, but magic happens in the spontaneous moments.'
    },
    {
      title: 'The joy of trying',
      text: "Life's not that serious. I'd rather be remembered as someone who enjoyed trying than someone who played it safe."
    },
    {
      title: 'Do it scared',
      text: 'Being fearless is misunderstood. You need fear in order to be brave. You just need to do it while scared.'
    }
  ];

  const focus = [
    'Creating reports for social impact, youth and women in tech for local.foundation collaborations',
    'Designing team building exercises that promote critical thinking',
    'Developing a task wheel & personal pokedex app for neurodivergent folk',
    'Brainstorming an RPG framework for Impact Hackers',
    'Prepping a new format for future-led people',
    'Finishing my first draft for a space opera book'
  ];

  const facts = [
    ['Location', 'Algarve, Portugal'],
    ['Tech experience', '12 years'],
    ['Community experience', '8+ years'],
    ['Languages', "English, Portuguese, Spanish if you're very patient"],
    ['Education', 'Software Engineer, UALG, EPBJC']
  ];
</script>

<div class="about-hero ct-hero">
  <div class="container">
    <h1 class="chaos-rotate-1">About Me</h1>
    <p class="lead chaos-spacing">Creative explorer on a mission to make the most with whatever we have.</p>
    <div class="hero-actions">
      <a href="{base}/portfolio" class="button button-secondary chaos-rotate-2">What?</a>
    </div>
  </div>
</div>

<section class="about-content">
  <div class="container narrow">
    <RoadTrip {stops} stopWidth="44rem" nextWhen="" nextTitle="Let's talk." nextText="Say hi, ask about a project, or just tell me what you're building.">
      <svelte:fragment let:i>
        {#if i === 0}
          <figure class="portrait">
            <img src="{base}/images/profile/me_alternative.jpg" alt="Penélope, smiling" />
            <figcaption class="handwritten">that's me!</figcaption>
          </figure>
          <div class="story">
            <p>I'm Penélope: a community builder, co-founder and engineering leader based in Faro, Portugal, working where tech, community and regional development meet. I'm genuinely curious about what makes communities tick.</p>
            <p>Since 2021 I've been part of the team behind Geek Sessions Faro, a grassroots community that brings the Algarve's tech scene together through talks, workshops and meetups (beer optional), often hosted in cultural spaces to break the "nerds in the basement" stereotype.</p>
            <p>In 2024 I co-founded local.foundation, where I'm Head of Signals. It's a research and tooling organisation studying how communities shape resilient regions.</p>
            <p>By day, I lead a development team at Centric Software, building PIM software that actually brings something new to the field. I'm also Secretary of the General Assembly of 351 Portuguese Startup Association.</p>
            <p>Over the years I've organised, facilitated and spoken at events like Techstars Startup Weekend, Geek Girls Portugal and Portugal Tech Week, and I was a TEDx Praça Gil Eanes speaker in 2025.</p>
            <p>I've got the brain of a software engineer but the restless heart of an artist and I can't stick to just one thing. And why should anyone? So I write, draw, paint, and have accumulated an absolutely unreasonable number of music playlists (90+ and counting... it's a problem). I'm still working on that whole "sleep is important" concept, but hey: life's too interesting to waste time being tired. And being "the impostor" is just proof you're brave enough to try something new.</p>
          </div>
        {:else if i === 1}
          <div class="values-grid">
            {#each principles as p (p.title)}
              <div class="value-card">
                <h4 class="scribble-underline">{p.title}</h4>
                <p>{p.text}</p>
              </div>
            {/each}
          </div>
        {:else if i === 2}
          <ul class="focus-list">
            {#each focus as item (item)}<li>{item}</li>{/each}
          </ul>
        {:else if i === 3}
          <dl class="facts">
            {#each facts as [label, value] (label)}
              <div>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            {/each}
          </dl>
        {/if}
      </svelte:fragment>
      <div slot="next" class="contact-links">
        <a href="https://zez.am/lepsies" class="button button-secondary">Check socials</a>
        <a href={BOOKING_URL} class="button button-primary" target="_blank" rel="noopener noreferrer"
          >Schedule a call ↗<span class="visually-hidden"> (opens in a new tab)</span></a
        >
      </div>
    </RoadTrip>
  </div>
</section>

  <style>
  .about-hero {
    /* sunset hero via ct-hero class */
  }
  
  .about-hero h1 {
    margin-bottom: var(--spacing-4);
  }
  
  .lead {
    font-size: 1.25rem;
    max-width: 48rem;
    margin: 0;
  }
  
  .about-content {
    padding: var(--spacing-16) 0;
  }

  .narrow {
    max-width: 60rem;
  }

  .portrait {
    position: relative;
    width: 9rem;
    margin: var(--spacing-4) 0;
  }

  .portrait img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border: 2px solid var(--ink);
    border-radius: 8px;
    box-shadow: var(--shadow-sticker);
  }

  .portrait figcaption {
    position: absolute;
    right: -3.5rem;
    top: -0.75rem;
    font-size: 1.3rem;
    transform: rotate(6deg);
  }

  .story p {
    margin: 0 0 var(--spacing-4);
    color: var(--ink-soft);
  }

  .values-grid {
    display: grid;
    gap: var(--spacing-4);
    margin-top: var(--spacing-4);
  }

  @media (min-width: 640px) {
    .values-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  .value-card {
    position: relative;
    padding: var(--spacing-4);
    background: var(--paper-card);
    border: 1px solid var(--line);
    border-radius: 12px;
    box-shadow: var(--shadow-soft, 0 6px 18px rgba(38, 33, 28, 0.08));
  }

  .value-card h4 {
    margin: 0 0 var(--spacing-2);
    font-family: var(--font-display);
    font-size: 1.15rem;
  }

  .value-card p {
    margin: 0;
    color: var(--ink-soft);
    font-size: 0.9rem;
  }

  .focus-list {
    list-style: none;
    padding: 0;
    margin: var(--spacing-2) 0 0;
  }

  .focus-list li {
    position: relative;
    padding: var(--spacing-2) 0 var(--spacing-2) var(--spacing-8);
    color: var(--ink-soft);
  }

  .focus-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 1.05rem;
    width: var(--spacing-4);
    height: 3px;
    background: var(--terracotta);
    border-radius: 2px;
  }

  .facts {
    margin: var(--spacing-2) 0 0;
    padding: var(--spacing-4) var(--spacing-6);
    background: var(--paper-card);
    border: 1px solid var(--line);
    border-radius: 12px;
    box-shadow: var(--shadow-soft, 0 6px 18px rgba(38, 33, 28, 0.08));
  }

  .facts div {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-4);
    padding: var(--spacing-2) 0;
    border-bottom: 1px solid var(--line);
  }

  .facts div:last-child {
    border-bottom: none;
  }

  .facts dt {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--ink-soft);
  }

  .facts dd {
    margin: 0;
    text-align: right;
    font-weight: 600;
  }

  .contact-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
  }
</style>
