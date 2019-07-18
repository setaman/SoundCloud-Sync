<template>
  <div class="drop-button flex flex-center" :class="{active: active}">
    <slot name="button"></slot>
  </div>
</template>

<script>
export default {
  name: 'DropButton',
  props: {
    active: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
  $duration: 300ms;
  .drop-button {
    min-height: 42px;
    min-width: 42px;
    padding: 10px;
    //display: inline-block;
    width: 160px;
    height: 50px;
    //background-size: auto 100%;
    background-repeat: no-repeat;
    background-image: url("~assets/drop.svg");
    animation: drop $duration steps(30) forwards;
    &.active {
      animation: drop-active $duration steps(30) forwards;
    }
  }

  @keyframes drop-active {
    0% {
      background-position: -4800px 0px;
    }
    100% {
      background-position: 0px 0px;
    }
  }

  @keyframes drop {
    0% {
      background-position: 0px 0px;
    }
    100% {
      background-position: -4800px 0px;
    }
  }

</style>
