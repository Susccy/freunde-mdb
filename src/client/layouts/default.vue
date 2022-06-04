<template>
  <div class="l-default">
    <TheHeader class="l-default__header" />
    <Nuxt class="l-default__page" />
    <TheFooter class="l-default__footer" />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.l-default {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;

  &__page {
    grid-row-start: 2;
    width: 90vw;
    margin: 0 auto;
  }

  > &__footer {
    grid-row-start: 3;
  }
}
</style>
