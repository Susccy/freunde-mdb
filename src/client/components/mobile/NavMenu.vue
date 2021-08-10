<template>
  <nav>navbar <SharedBurgerButton @click.native="$emit('closeMenu')" /></nav>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({})
</script>

<style scoped lang="scss"></style>
