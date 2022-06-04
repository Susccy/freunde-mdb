<template>
  <!-- v-if="movieData.length" -->
  <div
    v-if="movieData.length"
    class="c-movie-card-container c-movie-card-container--desktop"
    tabindex="-1"
  >
    <MovieCard v-for="movie in movieData" :key="movie.tmdbID" :movie="movie" />
  </div>
  <div v-else class="c-movie-card-container c-movie-card-container--desktop">
    <MovieCardPlaceholder v-for="placeholder in 10" :key="placeholder" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import type { PropType } from "vue"
import type { MovieResponse } from "~/entities/movie.entity"

export default Vue.extend({
  props: {
    movieData: {
      type: Array as PropType<MovieResponse[]>,
      default: () => [],
    },
  },
})
</script>
