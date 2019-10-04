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
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,700&display=swap');

  $c_bg: #231c45;
  $c_likes: #ff4966;
  $c_followings: #2069ff;
  $c_playlists: #26ffae;
  $c_settings: #8344ff;

  #q-app {
    background-color: white;
    font-family: Quicksand, serif;
    position: relative;
  }
  ::-webkit-scrollbar {
    //display: none;
    width: 6px;
    height: 6px;
    background-color: white;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    transition: 0.3s;
    // background-color: rgba($c_accent_primary, 0.5);
    background-color: rgba($c_followings, 0.5);
    border-radius: 10px;

    &:hover {
      background-color: rgba($c_followings, 0.8);
    }
  }
</style>
