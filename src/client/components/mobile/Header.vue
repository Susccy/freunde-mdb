<template>
  <header
    class="c-header c-header--mobile"
    :class="{ 'c-header--extended': navMenu }"
  >
    <span class="c-header__heading">
      <h1>FREundE MDB</h1>
      <TablerIcon
        @click.native="navMenu = !navMenu"
        :name="navMenu ? 'x' : 'menu-2'"
        size="28"
      />
    </span>
    <div v-if="navMenu" class="c-header__navmenu">
      <MobileNavMenu />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data () {
    return {
      navMenu: false,
    }
  },
})
</script>
