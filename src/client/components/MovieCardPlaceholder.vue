<template>
  <div
    v-if="layout === 'desktop'"
    class="c-movie-card-placeholder c-movie-card-placeholder--desktop"
  >
    <div class="c-movie-card-placeholder__poster"></div>
    <div class="c-movie-card-placeholder__title">
      <p></p>
      <p></p>
    </div>
    <div class="c-movie-card-placeholder__rating"></div>
    <div class="c-movie-card-placeholder__meta">
      <p></p>
      <p></p>
      <p></p>
    </div>
  </div>

  <div
    v-else
    class="c-movie-card c-movie-card--mobile c-movie-card--placeholder"
  ></div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  props: {
    layout: {
      type: String,
      default: "mobile",
    },
  },
})
</script>
