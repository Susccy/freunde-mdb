import Vue from "vue"
import type { PropType } from "vue"
import formatDateDE from "../../utils/formatDateDE"
import type { MovieResponse } from "~/entities/movie.entity"

export default Vue.extend({
  props: {
    movie: {
      type: Object as PropType<MovieResponse>,
      required: true,
    },
  },

  data () {
    return {
      imgAlt: `${this.movie.title.original} Poster`,
    }
  },

  computed: {
    dateSeen (): string | null | undefined {
      const { dateSeen } = this.movie
      return dateSeen && this.formatDateDE(dateSeen)
    },
    yearReleased (): number {
      const { releaseDate } = this.movie
      return new Date(releaseDate).getFullYear()
    },
    title (): string {
      const { title } = this.movie
      return (title.german || title.original).replace(/\s*\(mm\)\s*/gi, "")
    },
    fskIcon (): string | boolean {
      const { fsk } = this.movie
      return (
        typeof fsk === "number" && require(`~/client/assets/svg/fsk-${fsk}.svg`)
      )
    },
    genres (): string {
      return this.movie.genres?.join(", ") || "keine Genres vorhanden"
    },
    rating (): { ch?: string; rt?: string; total: string } {
      const formatRating = (rating: number) => (rating / 100).toFixed(2)

      const { rating } = this.movie

      return {
        total: formatRating(rating.total),
        ...("ch" in rating && { ch: formatRating(rating.ch) }),
        ...("rt" in rating && { rt: formatRating(rating.rt) }),
      }
    },
    ratingModifier (): string {
      return this.getRatingClass(this.rating.total)
    },
    ratingModifierCH (): string {
      return this.getRatingClass(this.rating.ch)
    },
    ratingModifierRT (): string {
      return this.getRatingClass(this.rating.rt)
    },
  },

  methods: {
    formatDateDE,

    getPosterSrc (size?: 92 | 154 | 185 | 342 | 500 | 780) {
      const { posterURL } = this.movie
      return `https://image.tmdb.org/t/p/${
        size ? `w${size}` : "original"
      }${posterURL}`
    },

    getRatingClass (rating?: string) {
      if (rating === undefined) return "rating--undefined"
      const ratingParsed = parseFloat(rating)
      return (
        "rating--" +
        (ratingParsed < 1.0
          ? "dire"
          : ratingParsed <= 4.0
          ? "bad"
          : ratingParsed < 6.0
          ? "meh"
          : ratingParsed <= 9.0
          ? "good"
          : "great")
      )
    },
  },
})
