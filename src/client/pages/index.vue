<template>
  <main class="page p-index">
    <!-- button to upload combinedData.json (run findExcelMovieInTMDB.js first) -->
    <!-- <button @click="postCombinedData()">postCombinedData</button> -->
    <div class="p-index__search">
      <svg
        fill="white"
        style="width: 100%; font-family: 'Oswald'; font-weight: 400"
        viewBox="0 0 150 50"
      >
        <text y="15" style="font-size: 0.8em">Film-Reviewer</text>
        <text textLength="150" y="30">Erich und Eckert</text>
        <!-- <text style="text-anchor:start" y="30">Erich</text>
        <text style="text-anchor:middle" x="50%" y="30">und</text>
        <text style="text-anchor:end" x="100%" y="30">Eckert</text> -->
        <text style="text-anchor: end; font-size: 0.8em" x="100%" y="45">
          Movie Database
        </text>
      </svg>
      <TheSearchbar @search="searchMovieTitle" />
      <NuxtLink
        :to="{ name: 'search', params: { extended: true } }"
        class="g-btn-reset p-index__search__extended"
      >
        Erweiterte Suche<TablerIcon name="chevron-right" size="14" />
      </NuxtLink>
    </div>
    <div class="p-index__movie-display">
      <div class="p-index__movie-display__heading">
        <h2>
          <TablerIcon name="rotate-clockwise-2" size="28" />Zuletzt gesehen
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
      <MovieCardContainer :movie-data="latestMovies" />
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
      <MovieCardContainer :movie-data="bestRecentMovies" />
    </div>
    <MoviePageContent
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
import type { MovieResponse } from "~/entities/movie.entity"

export default Vue.extend({
  beforeRouteLeave (to, _from, next) {
    if (to.name !== "movie-slug") return next()
    this.displayMovieModal(to)
  },

  data (): {
    latestMovies: (MovieResponse & FetchReturn)[]
    bestRecentMovies: (MovieResponse & FetchReturn)[]
    movie?: (MovieResponse & FetchReturn) | null
  } {
    return {
      latestMovies: [],
      bestRecentMovies: [],
      movie: null,
    }
  },

  fetchOnServer: false,

  async fetch () {
    // @todo error handling
    const latestMoviesResponse = (await this.$content("movies")
      .sortBy("dateSeen", "desc")
      .sortBy("rating.total", "desc")
      .limit(10)
      .fetch<MovieResponse>()) as (MovieResponse & FetchReturn)[]

    const now = new Date()

    const bestRecentMoviesResponse = (await this.$content("movies")
      .where({
        releaseDate: {
          $gte: new Date(now.getFullYear() - 1, now.getMonth()).toJSON(),
        },
        "rating.total": { $gte: 600 },
      })
      .sortBy("rating.total", "desc")
      .sortBy("releaseDate", "desc")
      .limit(10)
      .fetch<MovieResponse>()) as (MovieResponse & FetchReturn)[]

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
          ({ slug, tmdbID }) =>
            slug === route.params.slug || tmdbID === parseInt(route.params.slug)
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

<style lang="scss" scoped>
.p-index {
  &__search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 30rem;
    margin: 1rem auto;
    gap: 0.5rem;

    &__extended {
      display: flex;
      align-items: center;
      align-self: flex-end;

      .c-icon {
        // margin: 0 -3px -2px 0;
      }
    }
  }

  &__movie-display {
    margin: 4rem 0 6rem;

    &__heading {
      margin: 0 0 1rem 28px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      h2 .c-icon {
        margin: 0 0.5rem -0.3rem 0;
      }

      a {
        display: flex;
        align-items: flex-end;
        padding-bottom: 0.1rem;
      }
    }
  }
}
</style>
