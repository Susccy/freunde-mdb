import { resolve } from "path"
import axios from "axios"
import type { NuxtConfig } from "@nuxt/types"
import type { MovieResponse } from "./src/entities/movie.entity"

const apiBaseURL = process.env.API_URL || "http://localhost:3030/"

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
        content: "FREundE Movie Database - die Filmdatenbank Ihres Vertrauens.",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/styles/main"],

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
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/content", "@nuxtjs/sitemap"],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  // axios: { prefix: "/api" },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  srcDir: "./src/client",

  alias: {
    "~": resolve(__dirname, "./src"),
    "~~": resolve(__dirname, "./"),
  },

  // serverMiddleware: [
  //   { path: "/api", handler: "./src/server/index" },
  //   { path: "/api", handler: "./src/server/api/middleware/errorHandler" },
  // ],

  // router: {
  //   middleware: ["userAgent"],
  // },

  content: {
    fullTextSearchFields: () => [
      /* "title.original", "title.german" */
    ],
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
    async routes () {
      return [
        ...(await axios
          .get<MovieResponse[]>(`${apiBaseURL}movie`)
          .then((r) => r.data.map(({ id }) => `/movie/${id}`))),
        "/",
        "/search",
      ]
    },
    crawler: false,
  },

  sitemap: {
    hostname: "https://susccy.dev",
    gzip: true,
    trailingSlash: true,
    // routes: [{ url: "/", changefreq: "weekly" }],
  },
} as NuxtConfig
