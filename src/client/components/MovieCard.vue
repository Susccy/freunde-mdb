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
    title () {
      const { title } = this.movie
      return title.ger || title.original
    },
    genres () {
      const { genres } = this.movie
      return genres.join(", ") || "keine Genres vorhanden"
    },
    rating () {
      const { total } = this.movie.rating
      return (total / 100).toFixed(2)
    },
    ratingModifier () {
      // @todo fix ts error `Property 'rating' does not exist ...`
      return "c-movie-card__rating--" + (this.rating < 1 ? "dire" : "bad")
    },
  },
})
</script>
