<template>
  <main class="p-index">
    <button @click="postCombinedData()">postCombinedData</button>
    <div class="p-index__heading">
      <h2>Zuletzt gesehen</h2>
      <NuxtLink to="/sample" class="p-index__heading__link">
        Alle anzeigen<TablerIcon name="chevron-right" size="14" />
      </NuxtLink>
    </div>
    <!-- @todo add default element "Show more ->" to the end of the grid -->
    <MovieCardContainer :movie-data="latestMovies" :layout="$nuxt.layoutName" />
    <!-- <MobileMovieCardContainer v-else :movie-data="latestMovies" /> -->
  </main>
</template>

<script lang="ts">
import Vue from "vue"
import postCombinedData from "../../utils/postCombinedData"
import type { MovieResponse } from "~/entities/movie.entity"

export default Vue.extend({
  // @todo why layout gets called twice?
  layout (ctx) {
    const layoutName = /mobile/i.test(ctx.userAgent || "")
      ? "mobile"
      : "desktop"
    console.log(`Set layout to ${layoutName}`)
    return layoutName
  },
  data (): { latestMovies: MovieResponse[] } {
    return {
      latestMovies: [],
    }
  },
  async fetch () {
    const movieResponse = await this.$axios.$get<MovieResponse[]>("/movie", {
      params: {
        sort: "-dateSeen",
        // dateSeen: {
        //   $lte: new Date(new Date().getFullYear() - 1, new Date().getMonth()),
        //   $gt: new Date(
        //     new Date().getFullYear() - 1,
        //     new Date().getMonth() - 3
        //   ),
        // },
        limit: 20,
      },
    })
    // .catch((e) => {
    //   console.error(e)
    //   process.browser && alert("Something went wrong: " + JSON.stringify(e))
    //   return undefined
    // })
    this.latestMovies = movieResponse || []
  },
  methods: {
    postCombinedData,
  },
})
</script>
