<template>
  <main class="page p-movie">
    <Movie :movie="movie" />
  </main>
</template>

<script lang="ts">
import Vue from "vue"
import type { MovieResponseJSON } from "~/entities/movie.entity"
import deviceLayout from "~/client/mixins/deviceLayout"

export default Vue.extend({
  mixins: [deviceLayout],
  async asyncData ({ params, $axios }) {
    const movie = await $axios.$get<MovieResponseJSON>(`/movie/${params.id}`)
    return { movie }
  },
  data () {
    return {
      movie: undefined as MovieResponseJSON,
    }
  },
})
</script>
