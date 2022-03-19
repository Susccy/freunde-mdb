<template>
  <tr
    @click="
      $router.push({
        name: 'movie-slug',
        params: { slug: movie.slug || movie.tmdbID.toString() },
      })
    "
  >
    <td>
      <img :src="getPosterSrc(92)" :alt="imgAlt" class="hide-alt" />
    </td>
    <!-- redundant anchor for indexing (see https://stackoverflow.com/a/4904983/16503617) -->
    <td>
      <NuxtLink
        :to="{
          name: 'movie-slug',
          params: { slug: movie.slug || movie.tmdbID },
        }"
        >{{ movie.title.german || "-" }}</NuxtLink
      >
    </td>
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
})
</script>
