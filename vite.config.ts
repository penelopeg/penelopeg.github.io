import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import tidewave from "tidewave/vite-plugin";

export default defineConfig({
  plugins: [
    tidewave(),
    sveltekit(),
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
