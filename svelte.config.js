import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { fileURLToPath } from "node:url";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: false,
      strict: true,
    }),
    paths: {
      base: process.env.NODE_ENV === "production" ? "/penelopeg.github.io" : "",
    },
  },
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md"],
      layout: {
        blog: fileURLToPath(
          new URL("./src/lib/components/BlogLayout.svelte", import.meta.url),
        ),
      },
    }),
  ],
};

export default config;
