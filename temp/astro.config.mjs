import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "astrojs/cloudflare"

// https://astro.build/config
export default defineConfig({
  site: "https://www.yagiz.co",
  output: "hybrid",
  adapter: cloudflare(),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    sitemap({
      lastmod: new Date(),
    }),
  ],
  // TODO: remove
  image: {
    service: passthroughImageService(),
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
