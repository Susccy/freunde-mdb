<template>
  <main class="page p-movie">
    <Movie :movie="movie" />
  </main>
</template>

<script lang="ts">
import Vue from "vue"
import type { MovieResponse } from "~/entities/movie.entity"
import deviceLayout from "~/client/mixins/deviceLayout"

export default Vue.extend({
  mixins: [deviceLayout],

  async asyncData ({ params, $axios }) {
    const movie = await $axios.$get<MovieResponse>(`/movie/${params.id}`)
    return { movie }
  },

  // workaround for asyncData not properly returning a type
  data () {
    return {} as { movie: MovieResponse }
  },
})
</script>
