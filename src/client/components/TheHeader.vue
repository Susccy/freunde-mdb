<template>
  <header class="c-header c-header--desktop">
    <NuxtLink to="/" class="c-header__logo">FREundE MDB</NuxtLink>
    <HeaderNavbar />
  </header>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.c-header {
  $self: &;

  position: sticky;
  height: 3.5rem;
  width: 100%;
  z-index: 100;
  // overflow: hidden;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.2);

  @include background-layer(0.5);

  &__logo {
    padding: 0.5rem;
    font-size: $lg-2x;
    font-family: Comfortaa;
    font-weight: 700;
    // text-shadow: 0 0 7px $on-surface, 0 0 10px $on-surface, 0 0 21px $on-surface,
    //   0 0 42px $primary-accent, 0 0 82px $primary-accent,
    //   0 0 92px $primary-accent, 0 0 102px $primary-accent;
    border: 0.2rem solid $on-surface;
    border-radius: 1.25rem;
    box-shadow: 0 0 0.2rem $on-surface, 0 0 0.2rem $on-surface,
      0 0 0 $on-surface, 0 0 0.2rem $primary-accent, 0 0 0.8rem $primary-accent,
      0 0 0 $primary-accent, 0 0 0 $primary-accent,
      inset 0 0 1.3rem $primary-accent, inset 0 0 0 $primary-accent;
    // animation: pulsate 1.5s infinite alternate;
    text-shadow: 0 0 4px $on-surface, 0 0 11px $on-surface, 0 0 19px $on-surface,
      0 0 40px $primary-accent, 0 0 80px $primary-accent,
      0 0 90px $primary-accent /* ,
      0 0 100px $primary-accent  */
        /* ,
      0 0 150px $primary-accent */;
    white-space: nowrap;
    transition: box-shadow 0.2s;

    &:hover {
      color: unset;
      box-shadow: 0 0 0.2rem $on-surface, 0 0 0.2rem $on-surface,
        0 0 0.4rem $on-surface, 0 0 0.2rem $primary-accent,
        0 0 0.8rem $primary-accent, 0 0 1rem $primary-accent,
        0 0 1.5rem $primary-accent, inset 0 0 1.3rem $primary-accent,
        inset 0 0 1.5rem $primary-accent;
    }
  }

  // @keyframes pulsate {
  //   100% {
  //     text-shadow: 0 0 4px $on-surface, 0 0 11px $on-surface,
  //       0 0 19px $on-surface, 0 0 40px $primary-accent, 0 0 80px $primary-accent,
  //       0 0 90px $primary-accent,
  //       0 0 100px $primary-accent /* ,
  //       0 0 150px $primary-accent */;
  //   }

  //   0% {
  //     text-shadow: 0 0 2px $on-surface, 0 0 4px $on-surface, 0 0 6px $on-surface,
  //       0 0 10px $primary-accent, 0 0 45px $primary-accent,
  //       0 0 55px $primary-accent,
  //       0 0 70px $primary-accent /* ,
  //       0 0 80px $primary-accent */;
  //   }
  // }

  &--mobile {
    transition: height 250ms;
    overflow: hidden;
    border-radius: 0 0 10px 10px;

    #{$self}__heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      #{$self}__btn {
        padding: 0.2rem;
        display: flex;
        align-items: center;
      }
    }

    &--extended {
      height: 10rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  &--desktop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5rem;
    padding: 0 5vw;
  }
}
</style>
