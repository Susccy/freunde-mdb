<template>
  <div class="l-index l-index--mobile">
    <MobileHeader @openMenu="menuVisible = true" />
    <MobileNavMenu v-show="menuVisible" @closeMenu="menuVisible = false" />
    <Nuxt />
    <MobileFooter />
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "LayoutMobile",
  data () {
    return {
      menuVisible: false,
    }
  },
})
</script>
