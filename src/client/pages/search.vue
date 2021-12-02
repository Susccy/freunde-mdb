<template>
  <main class="page p-search">
    <h1>Film-Datenbank</h1>
    <div class="p-search__search-extended">
      <h2>Suche</h2>
      <SearchExtended />
    </div>
    <div class="p-search__results">
      <h2>Ergebnisse</h2>
      <p v-if="queryIsEmpty">Warte auf Suchanfrage...</p>
      <p v-else-if="!movies.length">Keine Ergebnisse</p>
      <MovieTable v-else :movie-data="movies" />
    </div>
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
  computed: {
    queryIsEmpty (): boolean {
      return !Object.keys(this.$route.query).length
    },
  },
  watch: {
    "$route.query": "search",
  },
  mounted () {
    this.search()
  },
  methods: {
    async search () {
      if (this.queryIsEmpty) return
      this.movies = await this.$axios.$get<MovieResponseJSON[]>("/movie", {
        params: this.$route.query,
      })
    },
    // refreshSearch (movieTitle: string) {
    //   this.$router.push({
    //     name: "search",
    //     query: {
    //       title: movieTitle,
    //     },
    //   })
    // },
  },
})
</script>
