<template>
  <component :is="iconComponentName" :size="size" class="c-icon" />
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
  ArrowsMaximizeIcon,
  FlameIcon,
  RotateClockwise2Icon,
} from "vue-tabler-icons"

export default Vue.extend({
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
    ExternalLinkIcon,
    Menu2Icon,
    XIcon,
    SearchIcon,
    ArrowsMaximizeIcon,
    FlameIcon,
    RotateClockwise2Icon,
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
    iconComponentName (): string {
      return this.name && `${this.name}-icon`
    },
  },
})
</script>
