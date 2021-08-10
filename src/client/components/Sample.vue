<template>
  <pre>{{ message }}</pre>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data () {
    return {
      message: "test",
    }
  },
  mounted () {
    this.$axios
      .$get(`/api/movie`)
      .then((res) => {
        this.message = res
      })
      .catch(console.error)
  },
})
</script>

<style></style>
