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
      { name: "viewport", content: "width=1000, initial-scale=1" },
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
    "~/plugins/axios-host.client.ts",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  srcDir: "./src/client",

  alias: {
    "~": resolve(__dirname, "./src"),
    "~~": resolve(__dirname, "./"),
  },

  serverMiddleware: [
    { path: "/api", handler: "./src/server/index" },
    { path: "/api", handler: "./src/server/api/middleware/errorHandler" },
  ],

  // router: {
  //   middleware: ["userAgent"],
  // },

  loading: {
    color: "#70e0dd",
  },
} as NuxtConfig
