<template>
  <div>
    <MovieCard v-for="movie in movieData" :key="movie._id" :movie="movie" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"
// import IMovie from "~/src/entities/movie.entity"

export default Vue.extend({
  props: {
    movieData: {
      type: Array,
      default: () => [],
    },
  },
  mounted () {
    console.log({ mD: this.movieData })
  },
})
</script>

<style lang="scss" scoped></style>
