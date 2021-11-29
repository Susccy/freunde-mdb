import Vue from "vue"
import type { PropType } from "vue"
import formatDateDE from "../../utils/formatDateDE"
import type { MovieResponseJSON } from "~/entities/movie.entity"

export default Vue.extend({
  props: {
    movie: {
      type: Object as PropType<MovieResponseJSON>,
      required: true,
    },
  },

  data () {
    return {
      imgSrc: "",
      imgAlt: `${this.movie.title.original} Poster`,
    }
  },

  computed: {
    dateSeen (): string | null | undefined {
      const { dateSeen } = this.movie
      return dateSeen && formatDateDE(dateSeen)
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
    // w154
    posterURL && (this.imgSrc = `http://image.tmdb.org/t/p/w154${posterURL}`)
  },
})
