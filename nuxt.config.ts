import { resolve } from "path"
import type { NuxtConfig } from "@nuxt/types"

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "freunde-mdb",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
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
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "~/modules/api",
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

  // serverMiddleware: [
  //   { path: "/api", handler: "~/../server/index" },
  //   { path: "/api", handler: "~/../server/api/middleware/errorHandler" },
  // ],

  router: {
    middleware: ["userAgent"],
  },

  loading: {
    color: "#70e0dd",
  },

  target: "server",

  ssr: false,
} as NuxtConfig