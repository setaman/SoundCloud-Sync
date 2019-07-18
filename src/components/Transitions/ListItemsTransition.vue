<template>
  <transition-group name="list-items" tag="div">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: 'ListItemsTransition'
};
</script>

<style scoped>
  .list-items-move {
    transition: transform 1s;
  }
  .list-items-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-items-enter, .list-items-leave-to
    /* .list-complete-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-items-leave-active {
    position: absolute;
  }
</style>
