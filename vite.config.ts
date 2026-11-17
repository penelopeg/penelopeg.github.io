import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { mdsvex } from "mdsvex";
import { fileURLToPath } from "node:url";
import tidewave from "tidewave/vite-plugin";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tidewave(),
    sveltekit({
      extensions: [".svelte", ".md"],
      alias: { $lib: "src/lib" },
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
    }),
    tailwindcss(),
    Icons({
      compiler: "svelte",
      autoInstall: true,
    }),
  ],
  optimizeDeps: {
    include: ["@iconify/iconify"],
  },
});
