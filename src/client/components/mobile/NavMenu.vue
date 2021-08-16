<template>
  <nav class="c-navmenu c-navmenu--mobile">
    navbar <TablerIcon @click.native="$emit('closeMenu')" name="x" />
    <form method="post" action="/api/movie">
      <input type="text" name="title.original" placeholder="title" />
      <input type="text" name="rating.total" placeholder="rating" />
      <button type="submit">upload</button>
    </form>
  </nav>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({})
</script>
