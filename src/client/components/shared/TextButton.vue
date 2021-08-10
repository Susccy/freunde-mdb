<template>
  <button class="btn-text">
    <slot></slot>
    <component :is="iconComponentName" size="20" />
  </button>
</template>

<script lang="ts">
import Vue from "vue"
import {
  ChevronRightIcon,
  ExternalLinkIcon,
  ShareIcon,
  BrandRedditIcon,
  Menu2Icon,
} from "vue-tabler-icons"

export default Vue.extend({
  components: {
    ChevronRightIcon,
    ExternalLinkIcon,
    ShareIcon,
    BrandRedditIcon,
    Menu2Icon,
  },
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconComponentName () {
      return this.icon && `${this.icon}-icon`
    },
  },
})
</script>

<style lang="scss" scoped>
.btn-text {
  border: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0;
}
</style>
