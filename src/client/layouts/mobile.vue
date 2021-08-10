<template>
  <div class="layout-mobile">
    <MobileHeader @openMenu="menuVisible = true" />
    <MobileNavMenu v-show="menuVisible" @closeMenu="menuVisible = false" />
    <Nuxt />
    <MobileFooter />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data () {
    return {
      menuVisible: false,
    }
  },
})
</script>

<style lang="scss">
// html {
//   font-size: 0.75rem;
// }
</style>
