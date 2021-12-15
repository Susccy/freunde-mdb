<template>
  <!-- @todo! index a single search query with all movies (e.g. ?sort=-rating.total) and mark all other searches as canonical, including the search page w/o a query itself-->
  <!-- https://www.oncrawl.com/technical-seo/seo-internal-search-results/ -->
  <!-- https://developers.google.com/search/docs/beginner/seo-starter-guide#for-non-sensitive-information,-block-unwanted-crawling-by-using-robots.txt (section "Avoid") -->
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
import type { Route } from "vue-router"
import deviceLayout from "~/client/mixins/deviceLayout"
import type { MovieResponse } from "~/entities/movie.entity"

export default Vue.extend({
  mixins: [deviceLayout],

  beforeRouteLeave (to, _from, next) {
    if (to.name !== "movie-id") next()
    this.displayMovieModal(to)
  },

  data (): { movies: MovieResponse[]; movie: MovieResponse | null } {
    return {
      movies: [],
      movie: null,
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

    window.addEventListener("popstate", () => {
      // @todo fix any cast
      ;(this.$refs.movieModal as any)?.closeModal()
    })
  },

  methods: {
    async search () {
      if (this.queryIsEmpty) return
      this.movies = await this.$axios.$get<MovieResponse[]>("/movie", {
        params: this.$route.query,
      })
    },
    displayMovieModal (route: Route) {
      this.movie = this.movies.find(({ id }) => id === route.params.id) || null
      window.history.pushState({}, "", route.path)
    },
    hideMovieModal () {
      this.movie = null
      window.history.pushState({}, "", this.$route.fullPath)
    },
  },
})
</script>
