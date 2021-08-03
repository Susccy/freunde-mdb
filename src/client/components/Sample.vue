<template>
  <p>{{ message }}</p>
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
    console.log(process.env.nodeEnv)

    this.$axios
      .$get("/api")
      .then((res) => {
        this.message = res
      })
      .catch(console.error)
  },
})
</script>

<style></style>
