<template>
  <tr>
    <td>
      <img :src="imgSrc" :alt="imgAlt" />
    </td>
    <td>{{ movie.title.german || "-" }}</td>
    <td>{{ movie.title.original }}</td>
    <td>{{ movie.mm }}</td>
    <td>
      <img
        v-if="fskIcon"
        :src="fskIcon"
        :alt="`FSK ${movie.fsk}`"
        class="c-movie-card__title__fsk"
        :class="['c-movie-card__title__fsk--' + movie.fsk]"
      />
    </td>
    <td>{{ genres }}</td>
    <td>{{ movie.runtime || "-" }}</td>
    <td>{{ yearReleased }}</td>
    <td>{{ dateSeen || "unbekannt" }}</td>
    <td>{{ rating.ch || "nur Gesamt" }}</td>
    <td>{{ rating.rt || "nur Gesamt" }}</td>
    <td>{{ rating.total }}</td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue"
import type { VueConstructor } from "vue"
import computedMovieData from "~/client/mixins/computedMovieData"

export default (
  Vue as VueConstructor<Vue & InstanceType<typeof computedMovieData>>
).extend({
  mixins: [computedMovieData],
})
</script>
