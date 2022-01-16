<template>
  <main class="page p-movie">
    <Movie ref="movieComponent" :movie="movie" />
  </main>
</template>

<script lang="ts">
import { Vue, Component, mixins } from "nuxt-property-decorator"
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
export default class MoviePage extends mixins(deviceLayout) {
  movie!: MovieResponse

  async head (): Promise<MetaInfo> {
    await Vue.nextTick()

    const movieInstance = this.$refs.movieComponent as MovieInstance
    const { overview } = this.movie

    const description = `${movieInstance.rating.total} • ${
      movieInstance.yearReleased
    }${
      overview &&
      ` • ${overview.length > 156 ? `${overview.slice(0, 153)}...` : overview}`
    }`

    console.log({ description, title: `${movieInstance.title} | FREundE MDB` })

    return {
      title: `${movieInstance.title} | FREundE MDB`,
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
