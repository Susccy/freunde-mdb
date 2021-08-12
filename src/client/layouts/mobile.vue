<template>
  <div class="l-index--mobile">
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

<style scoped lang="scss">
.l-index--mobile {
  min-height: 100vh;
  display: grid;
  grid-template: 10px 8% 1fr auto 10px / 10px 1fr 10px;
}

.c-header--mobile {
  grid-area: 1 / 1 / 3 / -1;
}

.p-index {
  grid-area: 3 / 2;
}

.c-footer--mobile {
  grid-area: -3 / 1 / -1 / -1;
}
</style>
