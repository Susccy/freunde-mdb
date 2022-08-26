import { resolve } from "path"
import type { NuxtConfig } from "@nuxt/types"

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "FREundE MDB",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "FREundE Movie Database - Nur die seriösesten Kritiken der Film-Reviewer Erich und Eckert",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/styles/main"],

  styleResources: {
    scss: "~/assets/styles/abstracts/*.scss",
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vue-slider-component.client.ts",
    "~/plugins/vue-fragment.ts",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/style-resources",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/content", "@nuxtjs/sitemap"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  srcDir: "./src/client",

  alias: {
    "~": resolve(__dirname, "./src"),
    "~~": resolve(__dirname, "./"),
  },

  content: {
    fullTextSearchFields: () => ["title.original", "title.german"],
    nestedProperties: [
      "title.original",
      "title.german",
      "rating.total",
      "rating.ch",
      "rating.rt",
    ],
  },

  loading: {
    color: "#70e0dd",
  },

  target: "static",

  generate: {
    fallback: true,
    crawler: false,

    async routes () {
      const { $content } = await import("@nuxt/content")
      return [
        ...(await $content("movies")
          .only(["tmdbID", "slug"])
          .fetch()
          .then((r) =>
            r.map(
              ({ tmdbID, slug }: { tmdbID: number; slug: string }) =>
                `/movie/${slug || tmdbID}`
            )
          )),
        "/",
        "/search",
      ]
    },
  },

  sitemap: {
    hostname: "https://freundemdb.net",
  },
} as NuxtConfig
