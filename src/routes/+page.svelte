<script>
  import { base } from '$app/paths';
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import WorkCard from '$lib/components/WorkCard.svelte';
  import LabTicker from '$lib/components/LabTicker.svelte';
  import OfflineTicket from '$lib/components/OfflineTicket.svelte';
  import MediaClip from '$lib/components/MediaClip.svelte';
  import { buckets } from '$lib/data/works.js';
  import { experiments, statusLabel } from '$lib/data/lab.js';
  import { offlineConcepts } from '$lib/data/offline.js';
  import { clips } from '$lib/data/media.js';
  import { posts, formatDate } from '$lib/data/posts.js';

  const roles = ['community builder', 'founder', 'tech lead', 'host', 'writer', 'painter', 'dancer'];
  const latestPosts = posts.slice(0, 3);

  const tickerItems = [
    ...experiments.map((e) => `${statusLabel[e.status]}: ${e.title}`),
    `new on the blog: ${posts[0].title}`
  ];
</script>

<!-- ── HERO ────────────────────────────────────────────────────────────── -->
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow"><span class="pulse" aria-hidden="true"></span> Penélope Gonçalves · Algarve, PT</p>
      <h1 id="hero-title">
        Building <span class="serif-italic">interactive spaces</span> and
        <span class="mark">impact communities</span> that <span class="nowrap">co-create</span> the future.
      </h1>
      <ul class="roles" aria-label="Roles">
        {#each roles as role (role)}
          <li>{role}</li>
        {/each}
      </ul>
      <div class="hero-actions">
        <a href="#works" class="button button-primary">See selected works ↓</a>
        <a href="#lab" class="button">Peek into the lab</a>
      </div>
    </div>

    <figure class="portrait">
      <span class="tape tape-a" aria-hidden="true"></span>
      <span class="tape tape-b" aria-hidden="true"></span>
      <img
        src="{base}/images/profile/me_alternative.jpg"
        alt="Penélope Gonçalves, smiling"
        width="480"
        height="600"
      />
      <figcaption class="handwritten">(this is me, hi!)</figcaption>
    </figure>
  </div>
</section>

<LabTicker items={tickerItems} />

<!-- ── SELECTED WORKS ──────────────────────────────────────────────────── -->
<section id="works" class="works" aria-labelledby="works-title">
  <div class="container">
    <SectionHeading
      id="works-title"
      eyebrow="Selected works"
      title="Three threads, one practice."
      blurb="I don't do one thing, and I don't pretend to. Everything here is about using technology, stories and gatherings to bring people together."
    />

    {#each buckets as bucket (bucket.id)}
      <section class="bucket" aria-labelledby="bucket-{bucket.id}" style="--accent: {bucket.color}">
        <div class="bucket-head">
          <span class="bucket-index">{bucket.index}</span>
          <div>
            <h3 id="bucket-{bucket.id}" class="bucket-title">{bucket.title}</h3>
            <p class="bucket-blurb">{bucket.blurb}</p>
          </div>
        </div>
        <div class="work-grid">
          {#each bucket.works as work, i (work.title)}
            <WorkCard {work} {i} accent={bucket.color} />
          {/each}
        </div>
      </section>
    {/each}

    <p class="more">
      <a href="{base}/portfolio" class="button button-ghost">Browse the full index →</a>
    </p>
  </div>
</section>

<!-- ── CURRENT EXPERIMENTS ─────────────────────────────────────────────── -->
<section id="lab" class="lab" aria-labelledby="lab-title">
  <div class="container lab-grid">
    <div>
      <SectionHeading
        id="lab-title"
        eyebrow="Current experiments"
        title="The lab bench."
        blurb="Unpolished, in-progress, honest. Prototypes, half-drafts and ideas I'm still arguing with."
      />
      <p class="handwritten lab-scribble">updated whenever I break something new</p>
    </div>

    <ol class="lab-log">
      {#each experiments as exp (exp.title)}
        <li class="entry">
          <div class="entry-meta">
            <time datetime={exp.date}>{exp.date}</time>
            <span class="status status--{exp.status}">{statusLabel[exp.status]}</span>
            <span class="kind">#{exp.kind}</span>
          </div>
          <h3>
            {#if exp.url}<a href={exp.url}>{exp.title}</a>{:else}{exp.title}{/if}
          </h3>
          <p>{exp.note}</p>
          {#if exp.media?.type === 'image'}
            <img src="{base}{exp.media.src}" alt={exp.media.alt ?? ''} loading="lazy" class="entry-media" />
          {:else if exp.media?.type === 'video'}
            <!-- svelte-ignore a11y_media_has_caption -->
            <video src="{base}{exp.media.src}" controls preload="none" playsinline class="entry-media"></video>
          {:else if exp.media?.type === 'audio'}
            <audio src="{base}{exp.media.src}" controls preload="none" class="entry-media"></audio>
          {/if}
        </li>
      {/each}
    </ol>
  </div>

  <div class="container notebook">
    <div class="notebook-head">
      <p class="eyebrow">Fresh from the notebook</p>
      <a href="{base}/blog" class="notebook-all">All writing →</a>
    </div>
    <ul class="notebook-list">
      {#each latestPosts as post (post.slug)}
        <li>
          <a href="{base}/blog/{post.slug}" class="note-link">
            <time datetime={post.date}>{formatDate(post.date)}</time>
            <span class="note-title">{post.title}</span>
            <span class="note-desc">{post.description}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<!-- ── LIMITED RUN / OFFLINE ───────────────────────────────────────────── -->
<section id="offline" class="offline" aria-labelledby="offline-title">
  <div class="container">
    <SectionHeading
      id="offline-title"
      index="IRL"
      eyebrow="Offline-first"
      title="Limited runs."
      blurb="Pop-ups, retreats and one-off formats. They only happen once, in one room, with whoever showed up. That's the point."
    />
    <div class="ticket-grid">
      {#each offlineConcepts as concept, i (concept.title)}
        <OfflineTicket {concept} {i} />
      {/each}
    </div>
    <p class="offline-cta">
      Want a gathering designed around your problem?
      <a href="https://zez.am/lepsies">Let's talk ↗</a>
    </p>
  </div>
</section>

<!-- ── PRESENCE (AUDIO / VISUAL) ───────────────────────────────────────── -->
<section id="presence" class="presence" aria-labelledby="presence-title">
  <div class="container">
    <SectionHeading
      id="presence-title"
      eyebrow="Press play"
      title="In my own voice."
      blurb="Voice-read excerpts, the sound of a room mid-hackathon, and the odd movement sketch."
    />
    <div class="clip-grid">
      {#each clips as clip (clip.title)}
        <MediaClip {clip} />
      {/each}
    </div>
  </div>
</section>

<style>
  /* ── Hero ── */
  .hero {
    position: relative;
    padding: var(--spacing-12) 0 var(--spacing-16);
    overflow: hidden;
  }

  @media (min-width: 1024px) {
    .hero {
      padding: var(--spacing-16) 0 var(--spacing-24);
    }
  }

  /* A soft terracotta sun behind the portrait */
  .hero::before {
    content: '';
    position: absolute;
    width: 46rem;
    height: 46rem;
    right: -14rem;
    top: -10rem;
    border-radius: 50%;
    background: radial-gradient(circle, color-mix(in srgb, var(--coral) 32%, transparent), transparent 65%);
    pointer-events: none;
  }

  .hero-grid {
    position: relative;
    display: grid;
    gap: var(--spacing-12);
    align-items: center;
  }

  @media (min-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1.6fr 1fr;
    }
  }

  .hero h1 {
    font-size: clamp(2.6rem, 6.4vw, 5.6rem);
    line-height: 1.02;
    letter-spacing: -0.035em;
    margin: var(--spacing-6) 0;
    max-width: 16ch;
  }

  .hero h1 .serif-italic {
    color: var(--terracotta);
  }

  .nowrap {
    white-space: nowrap;
  }

  .mark {
    background: linear-gradient(transparent 62%, color-mix(in srgb, var(--cobalt) 30%, transparent) 62%);
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }

  .pulse {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background: var(--olive);
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--olive) 60%, transparent);
    animation: pulse 2s infinite;
  }

  .roles {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2);
    list-style: none;
    margin-bottom: var(--spacing-8);
  }

  .roles li {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 0.2rem 0.7rem;
    border: 1.5px solid var(--line);
    border-radius: var(--border-radius-sticker);
    color: var(--ink-soft);
    background: color-mix(in srgb, var(--paper-card) 70%, transparent);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);
  }

  .portrait {
    position: relative;
    justify-self: center;
    width: min(78%, 22rem);
    padding: 0.75rem 0.75rem 3.25rem;
    background: var(--paper-card);
    box-shadow: var(--shadow-card-hover);
    transform: rotate(2.5deg);
    transition: transform 0.4s var(--ease-out);
  }

  .portrait:hover {
    transform: rotate(0deg) scale(1.01);
  }

  .portrait img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    filter: sepia(0.12) saturate(0.95);
  }

  .portrait figcaption {
    position: absolute;
    bottom: 0.8rem;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 1.5rem;
  }

  .tape-a {
    top: -0.7rem;
    left: -1.2rem;
    transform: rotate(-28deg);
  }

  .tape-b {
    top: -0.7rem;
    right: -1.2rem;
    transform: rotate(24deg);
  }

  /* ── Works ── */
  .works {
    padding: var(--spacing-24) 0 var(--spacing-16);
  }

  .bucket {
    padding-top: var(--spacing-8);
    margin-bottom: var(--spacing-16);
    border-top: 2px solid var(--ink);
  }

  .bucket-head {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--spacing-4) var(--spacing-6);
    align-items: start;
    margin-bottom: var(--spacing-8);
  }

  .bucket-index {
    font-family: var(--font-display);
    font-weight: 300;
    font-size: clamp(3rem, 7vw, 5rem);
    line-height: 0.85;
    color: var(--accent);
  }

  .bucket-title {
    font-size: clamp(1.6rem, 3vw, 2.25rem);
    margin-bottom: var(--spacing-2);
  }

  .bucket-blurb {
    margin: 0;
    color: var(--ink-soft);
    max-width: 40rem;
  }

  .work-grid {
    display: grid;
    gap: var(--spacing-12) var(--spacing-8);
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .work-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1100px) {
    .work-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .more {
    text-align: center;
  }

  /* ── Lab ── */
  .lab {
    padding: var(--spacing-24) 0;
    background-color: var(--paper-deep);
    background-image:
      var(--grain),
      linear-gradient(var(--line) 1px, transparent 1px);
    background-size: auto, 100% 2rem;
    border-block: 1px solid var(--line);
  }

  .lab-grid {
    display: grid;
    gap: var(--spacing-8);
  }

  @media (min-width: 1024px) {
    .lab-grid {
      grid-template-columns: 1fr 1.4fr;
      gap: var(--spacing-16);
    }

    .lab-grid > div {
      position: sticky;
      top: 6rem;
      align-self: start;
    }
  }

  .lab-scribble {
    font-size: 1.5rem;
    display: inline-block;
  }

  .lab-log {
    list-style: none;
    display: grid;
    gap: var(--spacing-4);
  }

  .entry {
    padding: var(--spacing-6);
    background: var(--paper-card);
    border: 1px solid var(--line);
    border-left: 4px solid var(--terracotta);
    border-radius: var(--border-radius-card);
    transition: var(--transition-base);
  }

  .entry:hover {
    transform: translateX(4px);
    box-shadow: var(--shadow-card);
  }

  .entry-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-3);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--ink-soft);
  }

  .status {
    padding: 0.1rem 0.55rem;
    border-radius: var(--border-radius-sticker);
    border: 1.5px solid var(--ink);
    color: var(--ink);
    background: var(--paper);
  }

  .status--building {
    background: var(--ochre);
  }
  .status--brewing {
    background: color-mix(in srgb, var(--coral) 55%, var(--paper));
  }
  .status--testing {
    background: color-mix(in srgb, var(--cobalt) 25%, var(--paper));
  }
  .status--shipped {
    background: var(--olive);
    color: var(--paper);
  }

  .entry h3 {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-2);
  }

  .entry p {
    margin: 0;
    color: var(--ink-soft);
  }

  .entry-media {
    margin-top: var(--spacing-4);
    width: 100%;
    border-radius: 4px;
  }

  .notebook {
    margin-top: var(--spacing-16);
  }

  .notebook-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 2px solid var(--ink);
    padding-bottom: var(--spacing-3);
  }

  .notebook-all {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--terracotta);
  }

  .notebook-list {
    list-style: none;
  }

  .note-link {
    display: grid;
    gap: var(--spacing-1) var(--spacing-8);
    padding: var(--spacing-6) 0;
    border-bottom: 1px solid var(--line);
    text-decoration: none;
    transition: var(--transition-fast);
  }

  @media (min-width: 768px) {
    .note-link {
      grid-template-columns: 11rem 1fr;
    }
    .note-desc {
      grid-column: 2;
    }
  }

  .note-link time {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--ink-soft);
    padding-top: 0.4rem;
  }

  .note-title {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .note-desc {
    color: var(--ink-soft);
  }

  .note-link:hover .note-title {
    color: var(--terracotta);
  }

  /* ── Offline ── */
  .offline {
    padding: var(--spacing-24) 0;
    background: var(--olive);
    background-image: var(--grain);
    color: var(--paper);
  }

  .offline :global(.section-heading .blurb),
  .offline :global(.section-heading .eyebrow) {
    color: rgba(243, 235, 221, 0.85);
  }

  .ticket-grid {
    display: grid;
    gap: var(--spacing-8);
  }

  @media (min-width: 900px) {
    .ticket-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .offline-cta {
    margin: var(--spacing-12) 0 0;
    font-family: var(--font-display);
    font-size: 1.4rem;
  }

  .offline-cta a {
    color: var(--ochre);
    text-underline-offset: 4px;
  }

  /* ── Presence ── */
  .presence {
    padding: var(--spacing-24) 0;
    background: var(--slate);
    background-image: var(--grain);
    color: var(--paper);
  }

  .presence :global(.section-heading .blurb),
  .presence :global(.section-heading .eyebrow) {
    color: rgba(243, 235, 221, 0.8);
  }

  .clip-grid {
    display: grid;
    gap: var(--spacing-6);
  }

  @media (min-width: 768px) {
    .clip-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @keyframes pulse {
    70% {
      box-shadow: 0 0 0 0.6rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
</style>
