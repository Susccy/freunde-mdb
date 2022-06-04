<template>
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
    <InfiniteLoading
      @infinite="infiniteHandler"
      :identifier="infiniteID"
      spinner="spiral"
    >
      <div slot="spinner">Lädt...</div>
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </InfiniteLoading>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator"
import type { Route, NavigationGuardNext } from "vue-router"
import type { MetaInfo } from "vue-meta"
import type { FetchReturn } from "@nuxt/content/types/query-builder"
import type { MovieResponse } from "~/entities/movie.entity"

@Component
export default class Search extends Vue {
  beforeRouteLeave (to: Route, _from: Route, next: NavigationGuardNext) {
    if (to.name !== "movie-slug") return next()
    this.displayMovieModal(to)
  }

  movies: MovieResponse[] = []
  movie: MovieResponse | null = null
  options: {
    limit: number
    page: number
    sort: { field: string; direction: "asc" | "desc" }
  } = {
    limit: 20,
    page: 0,
    sort: { field: "title.german", direction: "asc" },
  }

  whereQuery = {}
  titleQuery = ""
  infiniteID = +new Date()

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
      link: [
        {
          rel: "canonical",
          href: "https://freundemdb.net/search",
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
    this.search()
    window.addEventListener("popstate", () => {
      // @todo fix any cast
      ;(this.$refs.movieModal as any)?.closeModal()
    })
  }

  async search () {
    if (this.queryIsEmpty) return

    this.infiniteID++

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

    console.log({validatedQuery})

    limit && !isNaN(parseInt(limit)) && (this.options.limit = parseInt(limit))
    this.options.page = (page && !isNaN(parseInt(page)) && parseInt(page)) || 0
    if (sort) {
      this.options.sort.field = sort.indexOf("-") === 0 ? sort.slice(1) : sort
      this.options.sort.direction =
        this.options.sort.field.length < sort.length ? "desc" : "asc"
    }

    this.whereQuery = Object.entries(validatedQuery).reduce<{
      [k: string]: string | any[] | { [k: string]: string } | undefined
    }>((validQuery, [queryParamName, queryParamValue]) => {
      const validQueryParam = validQueryParams.find(
        (v) => v[0] === queryParamName
      )

      // @todo test if this really is redundant (see line 137)
      // if (!validQueryParam) return validQuery

      const [validParamName, dbParamPath] = validQueryParam!

      const paramIsMin = /_min$/.test(validParamName)
      const paramIsMax = !paramIsMin && /_max$/.test(validParamName)

      return {
        ...validQuery,
        [dbParamPath]: paramIsMin
          ? { ...(validQuery[dbParamPath] as {}), $gte: queryParamValue }
          : paramIsMax
          ? { ...(validQuery[dbParamPath] as {}), $lte: queryParamValue }
          : queryParamValue,
      }
    }, {})

    const titleQuery = this.$route.query.title

    if (!Array.isArray(titleQuery)) this.titleQuery = titleQuery

    this.movies = await this.contentRequest()
  }

  async contentRequest () {
    if (this.queryIsEmpty) return []

    let contentQuery = this.$content("movies")
      .where(this.whereQuery)
      .search(this.titleQuery)
      .skip(this.options.page * this.options.limit)
      .limit(this.options.limit)
      .sortBy(this.options.sort.field, this.options.sort.direction)

    // secondary sort in order to make sort by nullable fields work properly
    if (!/(title\.original)|(rating\.total)/.test(this.options.sort.field))
      contentQuery = contentQuery.sortBy("title.original")

    const result = (await contentQuery.fetch()) as (MovieResponse & FetchReturn)[]
    console.log({result})
    return result
  }

  displayMovieModal (route: Route) {
    this.movie =
      this.movies.find(
        ({ slug, tmdbID }) =>
          slug === route.params.slug || tmdbID === parseInt(route.params.slug)
      ) || null
    window.history.pushState({}, "", route.path)
  }

  hideMovieModal () {
    this.movie = null
    window.history.pushState({}, "", this.$route.fullPath)
  }

  async infiniteHandler ($state: any) {
    this.options.page++
    const result = await this.contentRequest()
    if (result.length) {
      this.movies.push(...result)
      $state.loaded()
      return
    }
    $state.complete()
  }
}
</script>
