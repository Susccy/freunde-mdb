<template>
  <!-- v-if="movieData.length" -->
  <div
    v-if="movieData.length"
    class="c-movie-card-container"
    :class="[layout === 'desktop' && 'c-movie-card-container--desktop']"
  >
    <MovieCard
      v-for="movie in movieData"
      :key="movie.tmdbID"
      :movie="movie"
      :layout="layout"
    />
  </div>
  <div
    v-else
    class="c-movie-card-container"
    :class="[
      layout === 'desktop'
        ? 'c-movie-card-container--desktop'
        : 'c-movie-card-container--mobile',
    ]"
  >
    <MovieCardPlaceholder
      v-for="placeholder in 10"
      :key="placeholder"
      :layout="layout"
    />
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
    layout: {
      type: String,
      default: "mobile",
    },
  },
})
</script>
