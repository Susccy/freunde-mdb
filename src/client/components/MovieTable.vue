<template>
  <table class="c-movie-table">
    <thead>
      <tr>
        <th>Poster</th>
        <th>Titel (deutsch)</th>
        <th>Titel (original)</th>
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
      <tr v-for="movie in movieData" :key="movie.tmdbID">
        <td>
          <img
            :src="`http://image.tmdb.org/t/p/w92${movie.posterURL}`"
            :alt="`${movie.title.original} Poster`"
          />
        </td>
        <td>{{ movie.title.german || "-" }}</td>
        <td>{{ movie.title.original }}</td>
        <td>{{ movie.genres.length ? movie.genres.join(", ") : "-" }}</td>
        <td>{{ movie.runtime || "-" }}</td>
        <td>{{ new Date(movie.releaseDate).getFullYear() }}</td>
        <td>{{ movie.dateSeen ? formatDateDE(movie.dateSeen) : "-" }}</td>
        <td>{{ "ch" in movie.rating ? movie.rating.ch : "nur Gesamt" }}</td>
        <td>{{ "rt" in movie.rating ? movie.rating.rt : "nur Gesamt" }}</td>
        <td>{{ movie.rating.total }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue"
import type { PropType } from "vue"
import formatDateDE from "~/utils/formatDateDE"
import type { MovieResponseJSON } from "~/entities/movie.entity"

export default Vue.extend({
  props: {
    movieData: {
      type: Array as PropType<MovieResponseJSON[]>,
      default: () => [],
    },
  },
  methods: {
    formatDateDE,
  },
})
</script>
