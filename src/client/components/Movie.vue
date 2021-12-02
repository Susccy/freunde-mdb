<template>
  <div
    @click="$emit('close')"
    class="c-movie"
    :class="[modal && 'c-movie--modal']"
  >
    <div @click.stop class="c-movie__content">
      <h1>{{ title }}</h1>
      <button v-if="modal" @click="$emit('close')">X</button>
    </div>
  </div>
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
    modal: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
