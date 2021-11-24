<template>
  <main class="page" style="display: flex; gap: 1rem; flex-wrap: wrap">
    <MovieTable :movie-data="movies" />
  </main>
</template>

<script lang="ts">
import Vue from "vue"
import deviceLayout from "~/client/mixins/deviceLayout"
import type { MovieResponseJSON } from "~/entities/movie.entity"

export default Vue.extend({
  mixins: [deviceLayout],
  data (): { movies: MovieResponseJSON[] } {
    return {
      movies: [],
    }
  },
  async mounted () {
    const searchQuery = this.$route.params
    searchQuery &&
      (this.movies = await this.$axios.$get<MovieResponseJSON[]>("/movie", {
        params: searchQuery,
      }))
  },
})
</script>
