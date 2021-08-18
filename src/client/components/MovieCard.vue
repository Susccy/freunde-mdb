<template>
  <article class="c-movie-card">
    <div class="c-movie-card__title">
      <div class="c-movie-card__date">
        <span>{{ dateSeen }}</span>
      </div>
      <div class="c-movie-card__name">
        <h3 ref="movieTitle">{{ title }}</h3>
      </div>
    </div>
    <div class="c-movie-card__rating" :class="[ratingModifier]">
      <strong>{{ rating }}</strong>
    </div>
    <div class="c-movie-card__genres">
      {{ genres }}
    </div>
    <div class="c-movie-card__expand">
      <details>
        <summary><TablerIcon name="chevron-down" /></summary>
        <div>sample details screen</div>
      </details>
    </div>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"
import fitty from "fitty"
import IMovie from "~e/movie.entity"

export default Vue.extend({
  props: {
    movie: {
      type: Object as PropType<IMovie>,
      required: true,
    },
  },
  computed: {
    dateSeen (): string {
      return "20.04.2069"
    },
    title (): string {
      const { title } = this.movie
      return title.ger || title.original
    },
    genres (): string {
      return this.movie.genres.join(", ") || "keine Genres vorhanden"
    },
    rating (): string {
      return (this.movie.rating.total / 100).toFixed(2)
    },
    ratingModifier (): string {
      const rating = parseFloat(this.rating)
      return (
        "c-movie-card__rating--" +
        (rating < 1.0
          ? "dire"
          : rating <= 4.0
          ? "bad"
          : rating < 6.0
          ? "meh"
          : rating <= 9.0
          ? "good"
          : "great")
      )
    },
  },
  mounted () {
    /* automatically scales the font size of the movie title to fit its container */
    fitty(this.$refs.movieTitle as HTMLElement, { minSize: 14, maxSize: 22 })
  },
})
</script>
