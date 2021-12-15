<template>
  <!-- @todo! paginate via infinite scrolling and https://developers.google.com/search/blog/2014/02/infinite-scroll-search-friendly -->
  <table class="c-movie-table">
    <thead>
      <tr>
        <th></th>
        <th>Titel (deutsch)</th>
        <th>Titel (original)</th>
        <th>MM</th>
        <th>FSK</th>
        <th>Genres</th>
        <th>min</th>
        <th>Ersch.</th>
        <th>Gesehen</th>
        <th>CH</th>
        <th>RT</th>
        <th>Gesamt</th>
      </tr>
    </thead>
    <tbody>
      <MovieTableRow
        v-for="movie in movieData"
        :key="movie.tmdbID"
        :movie="movie"
      />
    </tbody>
  </table>
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
