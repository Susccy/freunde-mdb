<template>
  <button
    v-if="layout === 'desktop'"
    class="g-btn-reset c-movie-card c-movie-card--desktop"
  >
    <div class="c-movie-card__poster">
      <img ref="moviePoster" :src="imgSrc" :alt="imgAlt" />
    </div>
    <p v-if="movie.mm" class="c-movie-card__mm">MM</p>
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
      <p>Erscheinungsjahr: {{ movie.releaseDate }}</p>
      <p v-show="movie.runtime">Länge: {{ movie.runtime }}min</p>
    </div>
    <TablerIcon name="arrows-maximize" size="20" class="c-movie-card__expand" />
  </button>

  <button v-else class="g-btn-reset c-movie-card c-movie-card--mobile">
    <div ref="movieTitleContainer" class="c-movie-card__title">
      <div class="c-movie-card__date">
        {{ dateSeen }}
      </div>
      <h3 ref="movieTitle" class="c-movie-card__name">{{ title }}</h3>
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
  </button>
</template>

<script lang="ts">
import Vue, { PropType } from "vue"
import { MovieResponse } from "~/entities/movie.entity"

export default Vue.extend({
  props: {
    movie: {
      type: Object as PropType<MovieResponse>,
      required: true,
    },
    layout: {
      type: String,
      default: "mobile",
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
    dateSeen (): string | undefined {
      const { dateSeen } = this.movie
      return dateSeen?.toLocaleDateString("de", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    },
    title (): string {
      const { title } = this.movie
      return (title.german || title.original).replace(/\s*\(mm\)\s*/gi, "")
    },
    fskIcon (): string | boolean {
      const { fsk } = this.movie
      return typeof fsk === "number" && require(`../assets/svg/fsk-${fsk}.svg`)
    },
    genres (): string {
      return this.movie.genres?.join(", ") || "keine Genres vorhanden"
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
    const { posterURL } = this.movie

    posterURL
      ? (this.imgSrc = `http://image.tmdb.org/t/p/w154${posterURL}`)
      : (this.$refs.moviePoster as HTMLElement).remove()
  },
})
</script>
