<template>
  <div @keyup.enter="search" class="c-search">
    <input
      v-model.trim="inputValue"
      type="text"
      placeholder="Film suchen..."
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
  inheritAttrs: false,
  props: {
    defaultValue: {
      type: String,
      default: "",
    },
  },
  data () {
    return {
      inputValue: this.defaultValue,
    }
  },
  methods: {
    search () {
      this.inputValue && this.$emit("search", this.inputValue)
    },
  },
})
</script>
