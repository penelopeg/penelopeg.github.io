# MP3 Player — Add Playable Audio

## Steps

1. **Add audio file** to `static/audio/lepsies-fm.mp3` — keep small (~30s lo-fi clip or royalty-free track)
2. **Add `<audio>` element** in BlogLayout with `preload="none"` (no auto-load)
3. **Add Svelte state** — `let playing = false` + `bind:this={audioEl}` reference
4. **Wire center button** — toggle `audioEl.play()` / `audioEl.pause()` instead of linking to `/blog`
5. **Animate progress bar** — bind `timeupdate` event, update fill width from `currentTime / duration`
6. **Update timestamps** — replace hardcoded `1:23` / `3:45` with reactive formatted times
7. **Visual playing state** — pulse screen or music note icon when playing
8. **Move "back to blog"** — reassign to MENU label at top of wheel (center button becomes play/pause)

## Audio source options

- Short royalty-free lo-fi loop (Pixabay Audio, freesound.org)
- Custom recorded jingle
- Different song per post (add `audio` field to posts array in BlogLayout)
