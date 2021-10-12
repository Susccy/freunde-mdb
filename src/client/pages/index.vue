<template>
  <main class="p-index">
    <!-- button to upload combinedData.json (run findExcelMovieInTMDB.js first) -->
    <!-- <button @click="postCombinedData()">postCombinedData</button> -->
    <div class="p-index__search">
      <Searchbar />
      <p>Erweiterte Suche <TablerIcon name="chevron-right" /></p>
    </div>
    <div class="p-index__heading">
      <h2>Zuletzt gesehen</h2>
      <NuxtLink to="/sample" class="p-index__heading__link">
        Alle anzeigen<TablerIcon name="chevron-right" size="14" />
      </NuxtLink>
    </div>
    <MovieCardContainer :movie-data="latestMovies" :layout="$nuxt.layoutName" />
    <div class="p-index__heading">
      <h2>Beste neue Filme</h2>
      <NuxtLink to="/sample" class="p-index__heading__link">
        Alle anzeigen<TablerIcon name="chevron-right" size="14" />
      </NuxtLink>
    </div>
    <MovieCardContainer
      :movie-data="bestRecentMovies"
      :layout="$nuxt.layoutName"
    />
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
  methods: {
    // postCombinedData,
  },
})
</script>
