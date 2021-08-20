<template>
  <header
    class="c-header c-header--mobile"
    :class="{ 'c-header--mobile--extended': navMenu }"
  >
    <span class="c-header__heading">
      <h1>FREundE MDB</h1>
      <button @click="navMenu = !navMenu" class="g-btn-reset c-header__btn">
        <TablerIcon :name="navMenu ? 'x' : 'menu-2'" size="28" />
      </button>
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
