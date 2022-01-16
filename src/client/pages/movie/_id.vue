<template>
  <main class="page p-movie">
    <Movie ref="movieComponent" :movie="movie" />
  </main>
</template>

<script lang="ts">
import { Component, mixins } from "nuxt-property-decorator"
import type { MetaInfo } from "vue-meta"
import type { MovieResponse } from "~/entities/movie.entity"
import type { MovieInstance } from "~/client/components/Movie.vue"
import deviceLayout from "~/client/mixins/deviceLayout"

@Component({
  async asyncData ({ params, $axios }) {
    const movie = await $axios.$get<MovieResponse>(`/movie/${params.id}`)
    return { movie }
  },
})
export default class Movie extends mixins(deviceLayout) {
  movie!: MovieResponse

  head (): MetaInfo {
    const movie = this.$refs.movieComponent as MovieInstance
    const { overview } = this.movie

    const description = `${movie.rating.total} • ${movie.yearReleased}${
      overview &&
      ` • ${overview.length > 156 ? `${overview.slice(0, 153)}...` : overview}`
    }`

    return {
      title: `${movie.title} | FREundE MDB`,

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
