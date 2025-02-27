import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import { siteUrl } from "./src/utils/config";

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  experimental: {
    responsiveImages: true,
    svg: {
      mode: "sprite",
    },
  },
  image: {
    experimentalLayout: "full-width",
  },
  integrations: [
    sitemap(),
    compress({
      HTML: {
        "html-minifier-terser": {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          ignoreCustomComments: [],
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
