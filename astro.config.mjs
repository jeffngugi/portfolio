import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import sitemap from "@astrojs/sitemap";

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
  site: "https://ngugi.dev",
  integrations: [
    react(),
    sitemap(),
    ...(cmsMode || githubMode ? [keystatic()] : []),
  ],
  // Every page is prebuilt; Keystatic's own routes opt out of prerendering.
  // `yarn cms` stays fully on-demand so edits show up without a rebuild.
  output: cmsMode ? "server" : "static",
  adapter,
  // `/articles` is served as articles.html, avoiding a redirect to `/articles/`.
  trailingSlash: "never",
  build: { format: "file" },
  redirects: {
    "/about": "/#about",
    "/blogs": "/articles",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
