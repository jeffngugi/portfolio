import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

const env = loadEnv(process.env.NODE_ENV ?? "", process.cwd(), "");

// `yarn cms` runs the site on Node so Keystatic's local mode can write
// content files to disk. The Cloudflare runtime has no filesystem, so there
// the admin is only enabled once GitHub mode is configured.
const cmsMode = process.env.CMS === "1";
const githubMode = Boolean(env.PUBLIC_KEYSTATIC_GITHUB_REPO);

const adapter = cmsMode
  ? (await import("@astrojs/node")).default({ mode: "standalone" })
  : cloudflare();

export default defineConfig({
  integrations: [react(), ...(cmsMode || githubMode ? [keystatic()] : [])],
  output: "server",
  adapter,
  vite: {
    plugins: [tailwindcss()],
  },
});
