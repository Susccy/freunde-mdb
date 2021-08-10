<template>
  <main class="container-master">
    <div class="header">
      <h2>Zuletzt gesehen</h2>
      <SharedTextButton icon="chevron-right"> Alle anzeigen </SharedTextButton>
    </div>
    <Sample />
    <NuxtLink :to="{ name: 'sample' }">LINK</NuxtLink>
  </main>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  // @todo why layout gets called twice?
  layout (ctx) {
    const layoutName = /mobile/i.test(ctx.userAgent || "")
      ? "mobile"
      : "desktop"
    console.log(`Set layout to ${layoutName}`)
    return layoutName
  },
  mounted () {
    console.log("index page mounted")
  },
})
</script>

<style lang="scss" scoped>
.container-master {
  // @todo 100vh is too much, somehow calculate so that footer is on the bottom if page is not full enough
  min-height: 100vh;
  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>
