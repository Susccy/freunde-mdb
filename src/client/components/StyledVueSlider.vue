<template>
  <VueSlider
    @change="(value) => $emit('input', value)"
    v-bind="$attrs"
    :drag-on-click="true"
    :contained="true"
    :process-style="{ background: '#00999b' }"
    :tooltip-style="{
      background: '#00999b',
    }"
    :dot-options="{ focusStyle: { boxShadow: '0 0 2px 1px #70e0dd' } }"
  />
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({})
</script>
