<template>
  <!-- @todo! optimize link with https://stackoverflow.com/a/4904983/16503617 -->
  <tr @click="$router.push({ name: 'movie-id', params: { id: movie.id } })">
    <td>
      <img :src="getPosterSrc(92)" :alt="imgAlt" />
    </td>
    <td>{{ movie.title.german || "-" }}</td>
    <td>{{ movie.title.original }}</td>
    <td>{{ movie.mm ? "✔" : "✖" }}</td>
    <td>
      <img v-if="fskIcon" :src="fskIcon" :alt="`FSK ${movie.fsk}`" />
      <span v-else>?</span>
    </td>
    <td>{{ genres }}</td>
    <td>{{ movie.runtime || "-" }}</td>
    <td>{{ yearReleased }}</td>
    <td>{{ dateSeen || "?" }}</td>
    <td>{{ rating.ch || "n. G." }}</td>
    <td>{{ rating.rt || "n. G." }}</td>
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
  methods: {
    click () {
      console.log("click!")
    },
  },
})
</script>
