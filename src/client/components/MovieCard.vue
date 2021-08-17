<template>
  <article class="c-movie-card">
    <div class="c-movie-card__title">
      <h3>{{ title }}</h3>
    </div>
    <div class="c-movie-card__meta">
      <p class="c-movie-card__genres">
        {{ genres }}
      </p>
      <p class="c-movie-card__rating" :class="[ratingModifier]">
        <strong>{{ rating }}</strong>
      </p>
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
import IMovie from "~e/movie.entity"

export default Vue.extend({
  props: {
    movie: {
      type: Object as PropType<IMovie>,
      required: true,
    },
  },
  computed: {
    title (): string {
      const { title } = this.movie
      return title.ger || title.original
    },
    genres (): string {
      const { genres } = this.movie
      return genres.join(", ") || "keine Genres vorhanden"
    },
    rating (): string {
      const { total } = this.movie.rating
      return (total / 100).toFixed(2)
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
})
</script>
