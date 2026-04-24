import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});
