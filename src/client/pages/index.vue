<template>
  <main class="page p-index">
    <!-- button to upload combinedData.json (run findExcelMovieInTMDB.js first) -->
    <!-- <button @click="postCombinedData()">postCombinedData</button> -->
    <div class="p-index__search">
      <Searchbar @search="searchMovieTitle" />
      <NuxtLink
        :to="{ name: 'search', params: { extended: true } }"
        class="g-btn-reset p-index__search__extended"
      >
        Erweiterte Suche<TablerIcon name="chevron-right" />
      </NuxtLink>
    </div>
    <div class="p-index__movie-display">
      <div class="p-index__movie-display__heading">
        <h2>
          <TablerIcon name="rotate-clockwise-2" size="30" />Zuletzt gesehen
        </h2>
        <NuxtLink
          :to="{
            name: 'search',
            params: { s: { sort: '-dateSeen', page: 0, limit: 30 } },
          }"
        >
          Mehr anzeigen<TablerIcon name="chevron-right" size="14" />
        </NuxtLink>
      </div>
      <MovieCardContainer
        :movie-data="latestMovies"
        :layout="$nuxt.layoutName"
      />
    </div>
    <div class="p-index__movie-display">
      <div class="p-index__movie-display__heading">
        <h2><TablerIcon name="flame" size="30" />Beste neue Filme</h2>
        <NuxtLink
          :to="{
            name: 'search',
            params: { s: { sort: '-rating.total', page: 0, limit: 30 } },
          }"
        >
          Alle besten Filme<TablerIcon name="chevron-right" size="14" />
        </NuxtLink>
      </div>
      <MovieCardContainer
        :movie-data="bestRecentMovies"
        :layout="$nuxt.layoutName"
      />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue"
// import postCombinedData from "../../utils/postCombinedData"
import deviceLayout from "~/client/mixins/deviceLayout"
import type { MovieResponse } from "~/entities/movie.entity"

export default Vue.extend({
  mixins: [deviceLayout],
  data (): {
    latestMovies: MovieResponse[]
    bestRecentMovies: MovieResponse[]
  } {
    return {
      latestMovies: [],
      bestRecentMovies: [],
    }
  },
  async fetch () {
    // @todo error handling
    const latestMoviesResponse = await this.$axios.$get<MovieResponse[]>(
      "/movie",
      {
        params: {
          sort: "-dateSeen -rating.total",
          limit: 10,
        },
      }
    )
    const now = new Date()
    const bestRecentMoviesResponse = await this.$axios.$get<MovieResponse[]>(
      "/movie",
      {
        params: {
          sort: "-rating.total -releaseDate",
          date_released_min: new Date(now.getFullYear() - 1, now.getMonth()),
          rating_total_min: 500,
          limit: 10,
        },
      }
    )
    this.latestMovies = latestMoviesResponse
    this.bestRecentMovies = bestRecentMoviesResponse
  },
  fetchOnServer: false,
  methods: {
    searchMovieTitle (movieTitle: string) {
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
