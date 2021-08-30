<template>
  <button class="g-btn-reset c-movie-card c-movie-card--desktop">
    <div class="c-movie-card__poster">
      <img ref="moviePoster" :src="imgSrc" :alt="imgAlt" />
    </div>
    <p v-if="mm" class="c-movie-card__mm">MM</p>
    <div class="c-movie-card__title">
      <h3 ref="movieTitle" class="c-movie-card__title__main">{{ title }}</h3>
      <div class="c-movie-card__title__sub">
        <img
          v-if="fskIcon"
          :src="fskIcon"
          :alt="`FSK ${movie.fsk}`"
          class="c-movie-card__title__fsk"
          :class="['c-movie-card__title__fsk--' + movie.fsk]"
        />
        <p class="c-movie-card__title__genres">{{ genres }}</p>
      </div>
    </div>
    <div class="c-movie-card__rating" :class="[ratingModifier]">
      <p class="c-movie-card__rating__ch">{{ rating.ch }}ch</p>
      <p class="c-movie-card__rating__total">{{ rating.total }}</p>
      <p class="c-movie-card__rating__rt">{{ rating.rt }}rt</p>
    </div>
    <div class="c-movie-card__meta">
      <p v-show="dateSeen">Gesehen: {{ dateSeen }}</p>
      <p v-show="movie.yearReleased">
        Erscheinungsjahr: {{ movie.yearReleased }}
      </p>
      <p v-show="movie.length">Länge: {{ movie.length }}min</p>
    </div>
    <TablerIcon name="arrows-maximize" size="20" class="c-movie-card__expand" />
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
    fskIcon (): string | boolean {
      const { fsk } = this.movie
      return (
        typeof fsk === "number" && require(`../../assets/svg/fsk-${fsk}.svg`)
      )
    },
    genres (): string {
      return (
        this.movie.genres.join(", ") ||
        "keine Genres vorhandennnn nnnn nnnn nnn"
      )
    },
    rating (): { ch: string; rt: string; total: string } {
      const formatRating = (rating: number) => (rating / 100).toFixed(2)

      const { rating } = this.movie

      const total = formatRating(rating.total)
      const ch = rating.ch < 0 ? total : formatRating(rating.ch)
      const rt = rating.rt < 0 ? total : formatRating(rating.rt)

      return {
        ch,
        rt,
        total,
      }
    },
    ratingModifier (): string {
      const rating = parseFloat(this.rating.total)
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
