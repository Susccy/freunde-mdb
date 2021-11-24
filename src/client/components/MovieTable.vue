<template>
  <table class="c-movie-table">
    <thead>
      <tr>
        <th>Poster</th>
        <th>Titel (deutsch)</th>
        <th>Titel (original)</th>
        <th>MM</th>
        <th>FSK</th>
        <th>Genres</th>
        <th>Laufzeit</th>
        <th>Jahr</th>
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
import type { MovieResponseJSON } from "~/entities/movie.entity"

export default Vue.extend({
  props: {
    movieData: {
      type: Array as PropType<MovieResponseJSON[]>,
      default: () => [],
    },
  },
})
</script>
