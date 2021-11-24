<template>
  <button
    v-if="layout === 'desktop'"
    class="g-btn-reset c-movie-card c-movie-card--desktop"
  >
    <img
      ref="moviePoster"
      :src="imgSrc"
      :alt="imgAlt"
      class="c-movie-card__poster"
    />

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
      <p class="c-movie-card__rating__ch">{{ rating.ch }}</p>
      <p class="c-movie-card__rating__total">{{ rating.total }}</p>
      <p class="c-movie-card__rating__rt">{{ rating.rt }}</p>
    </div>
    <div class="c-movie-card__meta">
      <p v-show="dateSeen">Gesehen: {{ dateSeen }}</p>
      <p>Erscheinungsjahr: {{ yearReleased }}</p>
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
import Vue from "vue"
import type { VueConstructor } from "vue"
import computedMovieData from "~/client/mixins/computedMovieData"

export default (
  Vue as VueConstructor<Vue & InstanceType<typeof computedMovieData>>
).extend({
  mixins: [computedMovieData],
  props: {
    layout: {
      type: String,
      default: "mobile",
    },
  },
})
</script>
