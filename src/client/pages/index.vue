<template>
  <main class="p-index">
    <!-- button to upload combinedData.json (run findExcelMovieInTMDB.js first) -->
    <!-- <button @click="postCombinedData()">postCombinedData</button> -->
    <div class="p-index__search">
      <Searchbar />
      <button class="g-btn-reset p-index__search__extended">
        Erweiterte Suche<TablerIcon name="chevron-right" />
      </button>
    </div>
    <div class="p-index__movie-display">
      <div class="p-index__movie-display__heading">
        <h2>
          <TablerIcon name="rotate-clockwise-2" size="38" />Zuletzt gesehen
        </h2>
        <NuxtLink to="/sample">
          Alle anzeigen<TablerIcon name="chevron-right" size="14" />
        </NuxtLink>
      </div>
      <MovieCardContainer
        :movie-data="latestMovies"
        :layout="$nuxt.layoutName"
      />
    </div>
    <div class="p-index__movie-display">
      <div class="p-index__movie-display__heading">
        <h2><TablerIcon name="flame" size="38" />Beste neue Filme</h2>
        <NuxtLink to="/sample">
          Alle anzeigen<TablerIcon name="chevron-right" size="14" />
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
import type { MovieResponse } from "~/entities/movie.entity"

export default Vue.extend({
  layout (ctx) {
    const layoutName = /mobile/i.test(ctx.userAgent || "")
      ? "mobile"
      : "desktop"
    console.log(`Set layout to ${layoutName}`)
    return layoutName
  },
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
          // @todo1 best practice for objects in query params? (have to parse on server side)
          releaseDate: {
            $lte: now,
            $gt: new Date(now.getFullYear() - 1, now.getMonth()),
          },
          "rating.total": { $gte: 500 },
          limit: 10,
        },
      }
    )
    this.latestMovies = latestMoviesResponse
    this.bestRecentMovies = bestRecentMoviesResponse
  },
  fetchOnServer: false,
  methods: {
    // postCombinedData,
  },
})
</script>
