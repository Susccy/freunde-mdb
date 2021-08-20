<template>
  <component :is="iconComponentName" :size="size" />
</template>

<script lang="ts">
import Vue from "vue"
import {
  ChevronRightIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  Menu2Icon,
  XIcon,
  SearchIcon,
} from "vue-tabler-icons"

export default Vue.extend({
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
    Menu2Icon,
    XIcon,
    SearchIcon,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "24",
    },
  },
  computed: {
    iconComponentName () {
      return this.name && `${this.name}-icon`
    },
  },
})
</script>
