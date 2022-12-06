<template>
  <main class="page p-search">
    <div class="p-search__heading">
      <h1>Filmdatenbank</h1>
    </div>
    <div class="p-search__search-extended">
      <div>
        <h2><TablerIcon name="search" size="28" />Suche</h2>
        <SearchExtended />
      </div>
    </div>
    <div class="p-search__results">
      <h2><TablerIcon name="viewfinder" size="28" />Ergebnisse</h2>
      <p v-if="loadingState === 'waiting'">Warte auf Suchanfrage...</p>
      <p v-else-if="loadingState === 'finished' && !movies.length">
        Keine Ergebnisse
      </p>
      <MovieTable v-else :movie-data="movies" />
      <button
        v-if="loadingState !== 'finished' && movies.length"
        @click="loadMoreResults"
        class="p-search__show-more-btn g-btn-main"
      >
        Mehr Ergebnisse laden
      </button>
      <p v-if="loadingState === 'finished' && movies.length">
        Alle {{ movies.length }} Ergebnisse geladen
      </p>
    </div>
    <MoviePageContent
      v-if="movie"
      ref="movieModal"
      @close="hideMovieModal"
      :movie="movie"
      is-modal
      class="modal"
    />
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
  loadingState: "waiting" | "loading" | "done" | "finished" = "waiting"
  options: {
    limit: number
    page: number
    sort: { field: string; direction: "asc" | "desc" }
  } = {
    limit: 20,
    page: 0,
    sort: { field: "title.german", direction: "desc" },
  }

  whereQuery = {}
  titleQuery = ""

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

    console.log({ validatedQuery })

    limit && !isNaN(parseInt(limit)) && (this.options.limit = parseInt(limit))
    this.options.page = (page && !isNaN(parseInt(page)) && parseInt(page)) || 0
    if (sort) {
      this.options.sort.field = sort.indexOf("-") === 0 ? sort.slice(1) : sort
      this.options.sort.direction =
        this.options.sort.field.length < sort.length ? "desc" : "asc"
    }

    this.whereQuery = Object.entries(validatedQuery).reduce<{
      [k: string]: string | number | any[] | { [k: string]: string } | undefined
      // @ts-ignore
    }>((validQuery, [queryParamName, queryParamValue]) => {
      const validQueryParam = validQueryParams.find(
        (v) => v[0] === queryParamName
      )

      // @todo test if this really is redundant (see line 137)
      // if (!validQueryParam) return validQuery

      const [validParamName, dbParamPath] = validQueryParam!

      const paramIsMin = /_min$/.test(validParamName)
      const paramIsMax = !paramIsMin && /_max$/.test(validParamName)
      const paramIsGenre = validParamName === "genre"
      const paramIsFSK = validParamName === "fsk"

      // @todo use $between: [min, max] instead of $gte + $lte
      return {
        ...validQuery,
        [dbParamPath]: paramIsMin
          ? {
              ...(validQuery[dbParamPath] as {}),
              $gte:
                dbParamPath === "releaseDate"
                  ? new Date(+queryParamValue, 0)
                  : dbParamPath === "dateSeen"
                  ? queryParamValue
                  : +queryParamValue,
            }
          : paramIsMax
          ? {
              ...(validQuery[dbParamPath] as {}),
              $lte:
                dbParamPath === "releaseDate"
                  ? new Date(+queryParamValue, 11)
                  : dbParamPath === "dateSeen"
                  ? queryParamValue
                  : +queryParamValue,
            }
          : paramIsGenre
          ? { $contains: queryParamValue }
          : paramIsFSK
          ? +queryParamValue
          : queryParamValue,
      }
    }, {})

    const titleQuery = this.$route.query.title

    if (!Array.isArray(titleQuery)) this.titleQuery = titleQuery

    this.movies = await this.contentRequest()
  }

  async contentRequest () {
    if (this.queryIsEmpty) return []

    console.log("WHERE", this.whereQuery)

    this.loadingState = "loading"

    let contentQuery = this.$content("movies")
      .where(this.whereQuery)
      .search(this.titleQuery)
      .skip(this.options.page * this.options.limit)
      .limit(this.options.limit)
      .sortBy(this.options.sort.field, this.options.sort.direction)

    // secondary sort in order to make sort by nullable fields work properly
    if (!/(title\.original)|(rating\.total)/.test(this.options.sort.field))
      contentQuery = contentQuery.sortBy("title.original")

    const result = (await contentQuery.fetch()) as (MovieResponse &
      FetchReturn)[]
    this.loadingState = result.length < this.options.limit ? "finished" : "done"
    console.log({ result })
    return result
  }

  async loadMoreResults () {
    this.options.page++
    const results = await this.contentRequest()
    this.movies.push(...results)
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
}
</script>

<style lang="scss" scoped>
.p-search {
  $self: &;

  > *:not(.modal) {
    margin-block: 3rem;
  }

  &__heading {
    text-align: center;
  }

  &__search-extended {
    max-width: 60rem;
    width: 80%;
    margin-inline: auto;

    div > * {
      margin-block: 1rem;
    }
  }

  h2 .c-icon {
    margin: 0 0.5rem -0.3rem 0;
  }

  &__results {
    > * {
      margin-block: 1rem;
    }

    p {
      text-align: center;
    }

    #{$self}__show-more-btn {
      display: block;
      margin-inline: auto;
    }
  }
}
</style>
