<template>
  <form @submit.prevent="submit">
    <div>
      <label for="title">Filmtitel</label>
      <input id="title" v-model="title" type="text" />
    </div>
    <div>
      <label for="rating-total">Rating Gesamt</label>
      <ClientOnly>
        <VueSlider id="rating-total" v-model="ratingTotal" />
      </ClientOnly>
    </div>
    <div>
      <label for=""></label>
      <input id="" type="text" name="" />
    </div>
    <div>
      <label for=""></label>
      <input id="" type="text" name="" />
    </div>
    <div>
      <label for=""></label>
      <input id="" type="text" name="" />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data () {
    return {
      title: "",
      ratingTotal: [0, 100],
    }
  },
  methods: {
    submit () {},
  },
})
</script>
