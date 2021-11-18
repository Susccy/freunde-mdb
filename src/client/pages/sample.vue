<template>
  <div>
    i am sample page

    <NuxtLink to="/">back</NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  layout (ctx) {
    const layoutName = /mobile/i.test(ctx.userAgent || "")
      ? "mobile"
      : "desktop"
    console.log(`Set layout to ${layoutName}`)
    return layoutName
  },
})
</script>
