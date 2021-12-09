<template>
  <!-- <div class="l-index l-index--mobile">
    <MobileHeader @openMenu="menuVisible = true" />
    <Searchbar />
    <Nuxt />
    <Footer />
  </div> -->
  <div style="position: relative; height: 100vh">
    <!-- prettier-ignore-attribute -->
    <div
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"
    >
      <strong style="font-size: 3rem">
        <p style="text-align: center">
          Mobile version is WIP. Please switch to desktop view for now.
        </p>
      </strong>
    </div>
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
