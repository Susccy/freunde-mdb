<template>
  <header class="c-header--mobile">
    <TablerIcon @click.native="$emit('openMenu')" name="menu-2" />
    <h1>FREundE MDB</h1>
  </header>
</template>

<style lang="scss" scoped>
.c-header--mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $col-purple-light;
  padding: 0.25rem 1rem;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2);

  h1 {
    padding: 0.2em 0;
    color: $col-white-light;
    font-size: 2rem;
  }
}
</style>
