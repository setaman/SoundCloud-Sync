<template>
  <div id="navigation-container">
    <div id="navigation" class="row q-col-gutter-lg-md" :class="{'fixed-nav': position >= 430}">
      <q-scroll-observer @scroll="onScroll" />
      <div class="col">
        {{position}}
        <q-tabs dense
                no-caps
                inline-label>
          <q-route-tab
            icon="favorite"
            label="favorite"
            name="likes"
            to="/home/likes"
            exact
            class="text-red"
          />
          <q-route-tab
            name="followings"
            label="followings"
            icon="person"
            to="/home/followings"
            exact
            class="text-primary"
          />
          <q-route-tab
            name="playlist"
            label="playlist"
            icon="person"
            to="/home/playlists"
            exact
            class="text-cyan"
          />
          <q-route-tab
            name="settings"
            label="settings"
            icon="settings"
            to="/settings"
            exact
            class="text-cyan"
          />
          <q-route-tab
            name="welcome"
            label="welcome"
            icon="home"
            to="/"
            exact
            class="text-red-10"
          />
        </q-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data: () => ({
    scrollInfo: {
      position: 0
    }
  }),
  computed: {
    position () {
      return this.scrollInfo.position
    }
  },
  methods: {
    onScroll (info) {
      this.scrollInfo = info
      console.log(info)
    }
  }
}
</script>

<style scoped lang="scss">
  #navigation-container {
    height: 127px;
  }
  #navigation{
    transition: 1s;
    position: relative;
    background: white;
    //z-index: 2001;
    width: 100vw;
    border-radius: 0 0 50px 50px;
    top: -50px;
    padding: 70px 30px 0px 30px;
    &.fixed-nav {
      position: fixed;
      top: -75px;
      left: 0;
      width: 100%;
      z-index: 2000;
      box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1);
    }
  }

</style>
