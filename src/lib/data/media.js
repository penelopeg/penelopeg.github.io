/**
 * Direct audio / visual presence: voice-read excerpts, event atmosphere,
 * dance snippets. Put files in /static/media/ and reference them as
 * '/media/your-file.mp3' (the base path is added when rendering).
 *
 * Entries without a `src` render as an honest "recording soon" tape, so the
 * section never pretends to have content it doesn't.
 *
 * @typedef {{
 *   title: string,
 *   caption: string,
 *   type: 'audio' | 'video',
 *   src?: string,
 *   poster?: string,
 *   duration?: string,
 *   transcript?: string
 * }} MediaClip
 */

/** @type {MediaClip[]} */
export const clips = [
  {
    title: "Voice note: an excerpt from Chaos Theory",
    caption: "Me reading a paragraph out loud, imperfections included.",
    type: "audio",
  },
  {
    title: "Room tone: a hackathon at 2am",
    caption:
      "What it actually sounds like when forty strangers start building together.",
    type: "audio",
  },
  {
    title: "Movement sketch",
    caption: "A short dance snippet: the body as another prototyping tool.",
    type: "video",
  },
];
