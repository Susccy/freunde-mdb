<template>
  <article class="c-movie-card c-movie-card--desktop">
    <p class="c-movie-card__date">
      {{ dateSeen }}
    </p>
    <img :src="imgSrc" :alt="imgAlt" class="c-movie-card__poster" />
    <h3 ref="movieTitle" class="c-movie-card__title">{{ title }}</h3>
    <p class="c-movie-card__rating" :class="[ratingModifier]">{{ rating }}</p>
    <p class="c-movie-card__genres">
      {{ genres }}
    </p>
    <div class="c-movie-card__expand">
      <button class="g-btn-reset">
        Details <TablerIcon name="chevron-down" />
      </button>
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
  data () {
    return {
      imgLoaded: false,
      imgSrc: "",
      imgAlt: "Filmposter",
    }
  },
  computed: {
    dateSeen (): string {
      const { dateSeen } = this.movie
      return dateSeen
        ? new Date(dateSeen).toLocaleDateString("de", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "Datum unbekannt"
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
    const { img } = this.movie
    img && ("uri" in img ? (this.imgSrc = img.uri) : (this.imgSrc = ""))
  },
})
</script>
