import Vue from "vue"
import type { Context } from "@nuxt/types"

export default Vue.extend({
  layout ({ userAgent }: Context) {
    const layoutName = /mobile/i.test(userAgent || "") ? "mobile" : "desktop"
    console.log(`Set layout to ${layoutName}`)
    return layoutName
  },
})
