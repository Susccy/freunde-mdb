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

<style lang="scss" scoped>
.c-navbar {
  height: 100%;
  display: flex;
  align-items: center;

  &__list {
    display: flex;
    justify-content: flex-end;
    list-style: none;
    font-size: $lg;
    height: 40%;
    margin: 0;

    li {
      border-right: 0.25rem solid background-layer-color(3);
      padding-inline: 1rem;
      height: 100%;
      vertical-align: middle;
      display: flex;
      align-items: center;

      &:last-child {
        border: none;
        padding-right: 0;
      }
    }
  }
}
</style>
