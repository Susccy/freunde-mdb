// https://github.com/nuxt/nuxt.js/issues/5669#issuecomment-491241150

import type { Module } from "@nuxt/types"

const serverMiddleware: Module = function () {
  // Add middleware only with `nuxt dev` or `nuxt start`
  if (this.options.dev || this.options._start) {
    this.addServerMiddleware("~/../server/")
  }
}

export default serverMiddleware
