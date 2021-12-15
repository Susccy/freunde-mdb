<template>
  <main class="page p-index">
    <!-- button to upload combinedData.json (run findExcelMovieInTMDB.js first) -->
    <!-- <button @click="postCombinedData()">postCombinedData</button> -->
    <h1>FREundE MDB Startseite</h1>
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
            query: { sort: '-dateSeen', page: 0, limit: 30 },
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
            query: { sort: '-rating.total', page: 0, limit: 30 },
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
    <Movie
      v-if="movie"
      ref="movieModal"
      @close="hideMovieModal"
      :movie="movie"
      is-modal
    />
  </main>
</template>

<script lang="ts">
import Vue from "vue"
import type { FetchReturn } from "@nuxt/content/types/query-builder"
import type { Route } from "vue-router"
// import postCombinedData from "../../utils/postCombinedData"
import deviceLayout from "~/client/mixins/deviceLayout"
import type { MovieResponseJSON } from "~/entities/movie.entity"

export default Vue.extend({
  mixins: [deviceLayout],

  beforeRouteLeave (to, _from, next) {
    if (to.name !== "movie-id") next()
    this.displayMovieModal(to)
  },

  data (): {
    latestMovies: (MovieResponseJSON & FetchReturn)[]
    bestRecentMovies: (MovieResponseJSON & FetchReturn)[]
    movie?: (MovieResponseJSON & FetchReturn) | null
  } {
    return {
      latestMovies: [],
      bestRecentMovies: [],
      movie: null,
    }
  },

  async fetch () {
    // @todo error handling
    const latestMoviesResponse = (await this.$content()
      .sortBy("dateSeen", "desc")
      .sortBy("rating.total", "desc")
      .limit(10)
      .fetch<MovieResponseJSON>()) as (MovieResponseJSON & FetchReturn)[]

    const now = new Date()

    const bestRecentMoviesResponse = (await this.$content()
      .where({
        releaseDate: {
          $gte: new Date(now.getFullYear() - 1, now.getMonth()).toJSON(),
        },
        "rating.total": { $gte: 500 },
      })
      .sortBy("rating.total", "desc")
      .sortBy("releaseDate", "desc")
      .limit(10)
      .fetch<MovieResponseJSON>()) as (MovieResponseJSON & FetchReturn)[]

    this.latestMovies = latestMoviesResponse
    this.bestRecentMovies = bestRecentMoviesResponse
  },

  mounted () {
    window.addEventListener("popstate", () => {
      // @todo fix any cast
      ;(this.$refs.movieModal as any)?.closeModal()
    })
  },

  methods: {
    searchMovieTitle (movieTitle: string) {
      this.$router.push({
        name: "search",
        query: {
          title: movieTitle,
        },
      })
    },
    displayMovieModal (route: Route) {
      this.movie =
        [...this.latestMovies, ...this.bestRecentMovies].find(
          // @todo! use slugs instead of ObjectIDs
          ({ id }) => id === route.params.id
        ) || null
      window.history.pushState({}, "", route.path)
    },
    hideMovieModal () {
      this.movie = null
      window.history.pushState({}, "", this.$route.path)
    },
  },
})
</script>
