<template>
  <p>{{ s }}</p>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  computed: {
    s () {
      return this.$route.params.s || "none"
    },
  },
})
</script>
