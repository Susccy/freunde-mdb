<template>
  <ClientOnly>
    <VueSlider
      @change="(value) => $emit('input', value)"
      v-bind="$attrs"
      :drag-on-click="true"
      :contained="true"
      :process-style="{ background: '#70e0dd' }"
      :tooltip-style="{
        background: '#70e0dd',
        color: '#000000',
      }"
      :dot-options="{ focusStyle: { boxShadow: '0 0 2px 1px #70e0dd' } }"
    />
  </ClientOnly>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({})
</script>
