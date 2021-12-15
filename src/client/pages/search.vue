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
import type { FetchReturn } from "@nuxt/content/types/query-builder"
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

    const validQueryParams = [
      ["limit", "limit"],
      ["page", "page"],
      ["sort", "sort"],
      ["rating_total_min", "rating.total"],
      ["rating_total_max", "rating.total"],
      ["rating_ch_min", "rating.ch"],
      ["rating_ch_max", "rating.ch"],
      ["rating_rt_min", "rating.rt"],
      ["rating_rt_max", "rating.rt"],
      ["date_seen_min", "dateSeen"],
      ["date_seen_max", "dateSeen"],
      ["fsk", "fsk"],
      ["mm", "mm"],
      ["title", "$or"],
      ["genre", "genres"],
      ["date_released_min", "releaseDate"],
      ["date_released_max", "releaseDate"],
      ["runtime_min", "runtime"],
      ["runtime_max", "runtime"],
    ]

    const { limit, page, sort, ...validatedQuery } = Object.fromEntries(
      Object.entries(this.$route.query).filter(
        ([queryParamName, queryParamValue]) =>
          validQueryParams.some((v) => v[0] === queryParamName) &&
          queryParamValue &&
          !Array.isArray(queryParamValue)
      )
    ) as { [k: string]: string } & {
      limit: string | undefined
      page: string | undefined
      sort: string | undefined
    }

    const validQuery = Object.entries(validatedQuery).reduce<{
      [k: string]: string | any[] | { [k: string]: string } | undefined
    }>((validQuery, [queryParamName, queryParamValue]) => {
      const validQueryParam = validQueryParams.find(
        (v) => v[0] === queryParamName
      )

      if (!validQueryParam) return validQuery

      const [validParamName, dbParamPath] = validQueryParam

      const paramIsTitle = validParamName === "title"
      const paramIsMin = /_min$/.test(validParamName)
      const paramIsMax = !paramIsMin && /_max$/.test(validParamName)

      return {
        ...validQuery,
        [dbParamPath]: paramIsTitle
          ? [
              {
                "title.original": {
                  $regex: new RegExp(queryParamValue, "i"),
                },
              },
              {
                "title.german": {
                  $regex: new RegExp(queryParamValue, "i"),
                },
              },
            ]
          : paramIsMin
          ? { ...(validQuery[dbParamPath] as {}), $gte: queryParamValue }
          : paramIsMax
          ? { ...(validQuery[dbParamPath] as {}), $lte: queryParamValue }
          : queryParamValue,
      }
    }, {})

    let builtQuery = this.$content().where(validQuery)

    if (limit && !isNaN(parseInt(limit))) {
      const limitParsed = parseInt(limit)
      if (page && !isNaN(parseInt(page))) {
        const pageParsed = parseInt(page)
        builtQuery = builtQuery.skip(pageParsed * limitParsed)
      }
      builtQuery = builtQuery.limit(limitParsed)
    }
    // @todo sort doesn't work properly with nullable fields
    if (sort) {
      const sortParsed = sort.indexOf("-") === 0 ? sort.slice(1) : sort
      const direction = sortParsed.length < sort.length ? "desc" : "asc"
      console.log({ sortParsed, direction })
      builtQuery = builtQuery.sortBy(sortParsed, direction)
    }

    this.movies = (await builtQuery.fetch()) as (MovieResponseJSON &
      FetchReturn)[]
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
