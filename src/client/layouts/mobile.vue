<template>
  <!-- <div class="l-index l-index--mobile">
    <MobileHeader @openMenu="menuVisible = true" />
    <Searchbar />
    <Nuxt />
    <Footer />
  </div> -->
  <div>
    <h1>Mobile version is WIP. Please switch to desktop view for now.</h1>
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
