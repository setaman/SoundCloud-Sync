<template>
  <div id="q-app">
    <div id="background">

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Quicksand:300,400,700&display=swap');
  #q-app {
    background-color: #e9f2ff;
    font-family: Quicksand, serif;
    position: relative;
  }
  .background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);
  }
</style>
