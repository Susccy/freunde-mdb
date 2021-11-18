<template>
  <main class="page" style="display: flex; gap: 1rem; flex-wrap: wrap">
    <MovieTable :movie-data="movies" />
  </main>
</template>

<script lang="ts">
import Vue from "vue"
import { MovieResponseJSON } from "~/entities/movie.entity"

export default Vue.extend({
  layout (ctx) {
    const layoutName = /mobile/i.test(ctx.userAgent || "")
      ? "mobile"
      : "desktop"
    console.log(`Set layout to ${layoutName}`)
    return layoutName
  },
  data (): { movies: MovieResponseJSON[] } {
    return {
      movies: [],
    }
  },
  async mounted () {
    const searchQuery = this.$route.params.s
    searchQuery &&
      (this.movies = await this.$axios.$get<MovieResponseJSON[]>("/movie", {
        params: searchQuery,
      }))
  },
})
</script>
