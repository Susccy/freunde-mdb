<template>
  <main class="page p-search">
    <div class="p-search__search">
      <SearchExtended />
    </div>
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
  watch: {
    "$route.query": "search",
  },
  mounted () {
    this.search()
  },
  methods: {
    async search () {
      const searchQuery = this.$route.query
      searchQuery &&
        (this.movies = await this.$axios.$get<MovieResponseJSON[]>("/movie", {
          params: searchQuery,
        }))
    },
    refreshSearch (movieTitle: string) {
      this.$router.push({
        name: "search",
        query: {
          title: movieTitle,
        },
      })
    },
  },
})
</script>
