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
import { Component, mixins, Watch } from "nuxt-property-decorator"
import type { Route, NavigationGuard } from "vue-router"
import type { MetaInfo } from "vue-meta"
import deviceLayout from "~/client/mixins/deviceLayout"
import type { MovieResponseJSON } from "~/entities/movie.entity"

@Component({
  async fetch (this: Search) {
    await this.search()
  },
})
export default class Search extends mixins(deviceLayout) {
  beforeRouteLeave (to: Route, _from: Route, next: () => void) {
    if (to.name !== "movie-id") next()
    this.displayMovieModal(to)
  }

  movies: MovieResponseJSON[] = []
  movie: MovieResponseJSON | null = null

  head (): MetaInfo {
    const { query } = this.$route

    const isAllMoviesQuery =
      Object.keys(query).length === 1 && query.sort === "title.german"

    return {
      title: isAllMoviesQuery
        ? "Alle Filme | FREundE MDB"
        : "Suche | FREundE MDB",

      meta: [
        {
          name: "description",
          hid: "description",
          content: isAllMoviesQuery
            ? "Durchstöbere alle Einträge der FREundE MDB Datenbank auf einer Seite."
            : "Starte eine detaillierte Suche durch die gesamten FREundE MDB Datenbank.",
        },
      ],
    }
  }

  get queryIsEmpty (): boolean {
    return !Object.keys(this.$route.query).length
  }

  @Watch("$route.query")
  onPropertyChange () {
    this.search()
  }

  mounted () {
    window.addEventListener("popstate", () => {
      // @todo fix any cast
      ;(this.$refs.movieModal as any)?.closeModal()
    })
  }

  async search () {
    if (this.queryIsEmpty) return
    this.movies = await this.$axios.$get<MovieResponseJSON[]>("/movie", {
      params: this.$route.query,
    })
  }

  displayMovieModal (route: Route) {
    this.movie = this.movies.find(({ id }) => id === route.params.id) || null
    window.history.pushState({}, "", route.path)
  }

  hideMovieModal () {
    this.movie = null
    window.history.pushState({}, "", this.$route.fullPath)
  }
}
</script>
