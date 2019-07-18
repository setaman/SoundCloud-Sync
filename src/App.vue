<template>
  <div id="q-app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Quicksand:300,400,700&display=swap');
  #q-app {
    background-color: white;
    font-family: Quicksand, serif;
    position: relative;
  }
</style>
