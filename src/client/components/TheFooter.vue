<template>
  <footer class="c-footer">
    <a href="https://www.themoviedb.org/" target="blank" class="c-footer__tmdb">
      <figure>
        <img src="~assets/svg/tmdb_logo_full.svg" alt="The Movie DB Logo" />
        <figcaption>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </figcaption>
      </figure>
    </a>
  </footer>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.c-footer {
  @include background-layer(1);
  padding: 2rem;
  display: flex;
  justify-content: center;
  // align-items: center;

  &__tmdb {
    // display: block;
    height: $lg-5x;

    figure {
      display: flex;
      gap: $sm;
      width: 22rem;
      height: 100%;
      margin: 0;

      figcaption {
        text-align: left;
        margin: auto 0;
      }

      img {
        height: 100%;
      }
    }
  }
}
</style>
