<template>
  <main class="page p-movie">
    <Movie ref="movieComponent" :movie="movie" />
  </main>
</template>

<script lang="ts">
import { Vue, Component, mixins } from "nuxt-property-decorator"
import type { MetaInfo } from "vue-meta"
import type { FetchReturn } from "@nuxt/content/types/query-builder"
import type { MovieResponse } from "~/entities/movie.entity"
import deviceLayout from "~/client/mixins/deviceLayout"

@Component({
  async asyncData ({ params, $content, error }) {
    let movieResponse = (await $content("movies")
      .where({ slug: params.slug })
      .fetch()) as (MovieResponse & FetchReturn)[]

    if (!movieResponse.length)
      movieResponse = (await $content("movies")
        .where({ tmdbID: parseInt(params.slug) })
        .fetch()) as (MovieResponse & FetchReturn)[]

    movieResponse.length > 1 &&
      console.error(
        `more than 1 movie response for slug "${params.slug}" shouldn't happen`
      )

    const movie = movieResponse[0]

    return movie ? { movie } : error({ statusCode: 404 })
  },
})
export default class MoviePage extends mixins(deviceLayout) {
  movie!: MovieResponse

  head (): MetaInfo {
    const { overview, rating, releaseDate, title } = this.movie

    const formatRating = (rating: number) => (rating / 100).toFixed(2)
    const sliceWithEllipsis = (input: string, maxLength: number) =>
      input.length > maxLength ? `${input.slice(0, maxLength - 3)}...` : input

    const description = sliceWithEllipsis(
      `${formatRating(rating.total)} • ${new Date(
        releaseDate
      ).getFullYear()} • ${
        overview || "Keine Zusammenfassung für diesen Film vorhanden."
      }`,
      156
    ) // maximum recommended meta description length = 155

    return {
      title: `${sliceWithEllipsis(
        title.german || title.original,
        42
      )} | FREundE MDB`, // maximum recommended meta title length = 55
      meta: [
        {
          name: "description",
          hid: "description",
          content: description,
        },
      ],
    }
  }
}
</script>
