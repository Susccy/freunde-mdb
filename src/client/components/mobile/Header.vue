<template>
  <header class="container-master">
    <SharedTextButton
      icon="menu-2"
      @click.native="$emit('openMenu')"
    ></SharedTextButton>
    <h1>FREundE MDB</h1>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container-master {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
