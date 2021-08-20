<template>
  <main class="p-index">
    <Searchbar />
    <div class="p-index__heading">
      <h2>Zuletzt gesehen</h2>
      <NuxtLink to="/sample" class="p-index__heading__link">
        Alle anzeigen<TablerIcon name="chevron-right" size="14" />
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
