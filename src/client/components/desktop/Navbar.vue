<template>
  <nav class="c-navbar">
    <ul class="c-navbar__list">
      <li class="c-navbar__item"><NuxtLink to="/">Startseite</NuxtLink></li>
      <li class="c-navbar__item"><NuxtLink to="/search">Suche</NuxtLink></li>
      <li class="c-navbar__item">
        <NuxtLink to="/search?sort=title.german">Alle Filme</NuxtLink>
      </li>
      <!-- <li class="c-navbar__item"><NuxtLink></NuxtLink></li>
      <li class="c-navbar__item"><NuxtLink></NuxtLink></li> -->
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({})
</script>
