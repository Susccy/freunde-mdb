<template>
  <div
    v-if="movieData.length"
    class="c-movie-card-container c-movie-card-container--desktop"
  >
    <DesktopMovieCard
      v-for="movie in movieDataFiltered"
      :key="movie.id"
      :movie="movie"
    />
  </div>
  <div v-else class="c-movie-card-container c-movie-card-container--desktop">
    <DesktopMovieCardPlaceholder v-for="placeholder in 6" :key="placeholder" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"
import { MovieResponse } from "~/entities/movie.entity"

export default Vue.extend({
  props: {
    movieData: {
      type: Array as PropType<Array<MovieResponse>>,
      default: () => [],
    },
  },
  computed: {
    movieDataFiltered (): MovieResponse[] {
      return this.movieData.filter((movie) => typeof movie.tmdb !== "number")
    },
  },
})
</script>
