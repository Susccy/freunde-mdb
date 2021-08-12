<template>
  <main class="p-index">
    <div class="header">
      <h2>Zuletzt gesehen</h2>
      <NuxtLink to="/sample">
        Alle anzeigen <TablerIcon name="chevron-right" size="18" />
      </NuxtLink>
    </div>
    <MovieCardContainer v-if="latestMovies" :movie-data="latestMovies" />
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
  async asyncData (ctx) {
    const latestMovies = await ctx.$axios
      .$get("/movie")
      .catch(
        (e) =>
          process.browser && alert("Something went wrong: " + JSON.stringify(e))
      )

    return { latestMovies }
  },
})
</script>

<style lang="scss" scoped>
.container-master {
  padding: 0.25rem 1rem;

  .header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0.25rem 0;

    h2 {
      // padding: 0.2em 0;
    }
  }
}
</style>
