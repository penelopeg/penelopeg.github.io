import { resolve } from "$app/paths";

// SvelteKit 3 removed `base` from `$app/paths`. This keeps the familiar
// `{base}/path` pattern working: "" in dev, "/penelopeg.github.io" in production.
export const base = resolve("/").replace(/\/$/, "");
