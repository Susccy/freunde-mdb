<template>
  <article class="c-movie-card c-movie-card--mobile">
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
    }
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
    const { img } = this.movie
    img &&
      ("uri" in img
        ? this.loadImageFromUri(img.uri)
        : this.loadImageFromBuffer(img.data, img.contentType))
  },
  methods: {
    // first checks if the stored image url exists,
    // then sets the image as the css background;
    // otherwise displays placeholder title
    loadImageFromUri (
      // lookup type of nested union object: https://stackoverflow.com/a/51285433/16503617
      uri: Extract<IMovie["img"], { __type: "uri" }>["uri"]
    ): void {
      const setImage = () => {
        const imgElement = this.$refs.movieTitleContainer as HTMLElement
        imgElement.style.backgroundImage = `url(${uri})`
        imgElement.style.backgroundPositionY = "50%"
        imgElement.style.backgroundSize = "cover"
        this.imgLoaded = true
      }

      const handleError = (e: ErrorEvent) => {
        console.error("Error loading movie poster:", e)
      }

      const image = new Image()
      image.addEventListener("load", setImage)
      image.addEventListener("error", handleError)
      image.src = uri
    },

    loadImageFromBuffer (
      data: Extract<IMovie["img"], { __type: "buffer" }>["data"],
      contentType: Extract<IMovie["img"], { __type: "buffer" }>["contentType"]
    ): void {
      // @todo implement
    },
  },
})
</script>
