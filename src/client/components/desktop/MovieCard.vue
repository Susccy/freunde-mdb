<template>
  <button class="g-btn-reset">
    <div class="c-movie-card c-movie-card--desktop">
      <p v-if="dateSeen" class="c-movie-card__date">
        {{ dateSeen }}
      </p>
      <p v-if="mm" class="c-movie-card__mm">MM</p>
      <div class="c-movie-card__poster-container">
        <img
          ref="moviePoster"
          :src="imgSrc"
          :alt="imgAlt"
          class="c-movie-card__poster"
        />
      </div>
      <h3 ref="movieTitle" class="c-movie-card__title">{{ title }}</h3>
      <p class="c-movie-card__rating" :class="[ratingModifier]">{{ rating }}</p>
      <p class="c-movie-card__genres">
        {{ genres }}
      </p>
      <button class="g-btn-reset c-movie-card__expand">
        Details<TablerIcon name="arrows-maximize" size="20" />
      </button>
    </div>
  </button>
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
      mm: false,
    }
  },
  computed: {
    dateSeen (): string | undefined {
      const { dateSeen } = this.movie
      return (
        dateSeen &&
        new Date(dateSeen).toLocaleDateString("de", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      )
    },
    title (): string {
      const { title } = this.movie
      return (title.ger || title.original).replace(/\s*\(mm\)\s*/gi, "")
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
    const { img, title } = this.movie

    img
      ? "uri" in img && (this.imgSrc = img.uri)
      : (this.$refs.moviePoster as HTMLElement).remove()

    this.mm = /\s*\(mm\)\s*/i.test(title.original)
  },
})
</script>
