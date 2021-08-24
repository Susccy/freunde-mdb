<template>
  <div
    v-if="movieData.length"
    class="c-movie-card-container c-movie-card-container--desktop"
  >
    <DesktopMovieCard
      v-for="movie in movieData"
      :key="movie._id"
      :movie="movie"
    />
  </div>
  <div v-else class="c-movie-card-container c-movie-card-container--desktop">
    <DesktopMovieCardPlaceholder v-for="placeholder in 6" :key="placeholder" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"
import IMovie from "~e/movie.entity"

export default Vue.extend({
  props: {
    movieData: {
      type: Array as PropType<Array<IMovie>>,
      default: () => [],
    },
  },
})
</script>
