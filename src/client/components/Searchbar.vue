<template>
  <div @keyup.enter="search" class="c-search">
    <input
      v-model="inputValue"
      type="text"
      placeholder="Suchen..."
      class="c-search__input"
    />
    <button @click="search" class="g-btn-reset c-search__btn">
      <TablerIcon name="search" size="18" />
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data () {
    return {
      inputValue: "",
    }
  },
  methods: {
    search () {
      if (!this.inputValue) return
      this.$router.push({
        name: "search",
        params: { s: this.inputValue },
      })
    },
  },
})
</script>
