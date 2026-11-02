<script>
  import { base } from '$app/paths';

  /** @type {import('$lib/data/media.js').MediaClip} */
  export let clip;
</script>

<figure class="clip" class:pending={!clip.src}>
  <div class="cassette" aria-hidden="true">
    <span class="reel"></span>
    <span class="window">{clip.type === 'video' ? 'VHS' : 'C-60'}</span>
    <span class="reel"></span>
  </div>

  <figcaption>
    <p class="type">{clip.type}{clip.duration ? ` · ${clip.duration}` : ''}</p>
    <h3>{clip.title}</h3>
    <p class="caption">{clip.caption}</p>
  </figcaption>

  {#if clip.src && clip.type === 'audio'}
    <audio controls preload="none" src="{base}{clip.src}">
      <a href="{base}{clip.src}">Download the audio</a>
    </audio>
  {:else if clip.src && clip.type === 'video'}
    <!-- svelte-ignore a11y_media_has_caption -->
    <video
      controls
      preload="none"
      playsinline
      src="{base}{clip.src}"
      poster={clip.poster ? `${base}${clip.poster}` : undefined}
    ></video>
  {:else}
    <p class="soon">● recording soon</p>
  {/if}

  {#if clip.transcript}
    <details>
      <summary>Transcript</summary>
      <p>{clip.transcript}</p>
    </details>
  {/if}
</figure>

<style>
  .clip {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
    padding: var(--spacing-6);
    background: color-mix(in srgb, var(--paper) 8%, var(--slate));
    border: 1px solid rgba(243, 235, 221, 0.18);
    border-radius: var(--border-radius-card);
    color: var(--paper);
  }

  .cassette {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-3);
    padding: var(--spacing-3) var(--spacing-4);
    background: var(--ochre);
    border-radius: 6px;
    color: var(--ink);
  }

  .reel {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    border: 5px dotted var(--ink);
    background: var(--paper);
  }

  .clip:not(.pending):hover .reel {
    animation: spin 3s linear infinite;
  }

  .window {
    flex: 1;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    padding: 0.3rem;
    background: var(--paper);
    border-radius: 3px;
  }

  .type {
    margin: 0 0 var(--spacing-1);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--ochre);
  }

  h3 {
    margin: 0 0 var(--spacing-2);
    font-size: 1.25rem;
    color: var(--paper);
  }

  .caption {
    margin: 0;
    font-size: 0.95rem;
    color: rgba(243, 235, 221, 0.78);
  }

  audio,
  video {
    width: 100%;
    margin-top: auto;
  }

  video {
    border-radius: 4px;
  }

  .soon {
    margin: auto 0 0;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--coral);
  }

  details {
    font-size: 0.9rem;
    color: rgba(243, 235, 221, 0.85);
  }

  summary {
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.75rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
