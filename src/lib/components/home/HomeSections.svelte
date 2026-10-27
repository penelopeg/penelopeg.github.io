<script>
  import { base } from '$app/paths';
  import SectionHeading from '$lib/components/SectionHeading.svelte';
  import LabTicker from '$lib/components/LabTicker.svelte';
  import OfflineTicket from '$lib/components/OfflineTicket.svelte';
  import { experiments, statusLabel } from '$lib/data/lab.js';
  import { offlineConcepts } from '$lib/data/offline.js';
  import { posts, formatDate } from '$lib/data/posts.js';

  const latestPosts = posts.slice(0, 3);

  const tickerItems = [
    ...experiments.map((e) => `${statusLabel[e.status]}: ${e.title}`),
    `new on the blog: ${posts[0].title}`
  ];
</script>

<!-- Everything on the homepage below the hero: works link → ticker → lab → offline -->
<p class="more">
  <a href="{base}/portfolio" class="button button-ghost">Browse all works →</a>
</p>

<!-- ── CURRENT EXPERIMENTS ─────────────────────────────────────────────── -->
<LabTicker items={tickerItems} />

<section id="lab" class="lab" aria-labelledby="lab-title">
  <div class="container lab-grid">
    <div>
      <SectionHeading
        id="lab-title"
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
      <h3 class="notebook-title">Fresh from the notebook</h3>
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


<style>
  /* ── Works link ── */
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
      grid-template-columns: 1fr 2fr;
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
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: var(--spacing-4);
    align-items: start;
  }

  .entry {
    padding: var(--spacing-6);
    background: var(--paper-card);
    border: 1px solid var(--line);
    border-radius: var(--border-radius-card);
    transition: var(--transition-base);
  }

  .entry:hover {
    transform: translateY(-3px);
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

  .notebook-title {
    margin: 0;
    font-size: 1.5rem;
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

  .offline :global(.section-heading .blurb) {
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
</style>
