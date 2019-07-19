<template>
  <div id="navigation-container">
    <div id="navigation" class="q-pb-xl" :class="{'fixed-nav': position >= 200}">
      <div id="navigation-divider"></div>
      <q-scroll-observer @scroll="onScroll" />
      <div class="flex flex-center">
        <div id="navigation-items-container">
          <div class="" v-for="(item, i) in routes" :key="i">
            <drop-button :active="item.route === currentRoute">
              <q-btn slot="button" :to="item.route" round flat :color="item.color" :icon="item.icon" />
            </drop-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScrollMixin from './scrollObserverMixin';
import DropButton from './Base/DropButton';
export default {
  name: 'Navigation',
  components: { DropButton },
  mixins: [ScrollMixin],
  data: () => ({
    activeRouteIndex: 0,
    routes: [
      {
        route: '/home/likes',
        icon: 'favorite',
        title: 'likes',
        color: 'red'
      },
      {
        route: '/home/followings',
        icon: 'group',
        title: 'likes',
        color: 'info'
      },
      {
        route: '/home/playlists',
        icon: 'list',
        title: 'playlists',
        color: 'cyan'
      },
      {
        route: '/',
        icon: 'settings',
        title: 'home',
        color: 'orange'
      }
    ]
  }),
  computed: {
    currentRoute () {
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped lang="scss">
  #navigation-container {
    height: 127px;
  }
  #navigation-divider {
    height: 50px;
  }
  #navigation{
    transition: 1s;
    position: relative;
    width: 100vw;
    top: -50px;
    background-image: linear-gradient(to bottom, white 50%, transparent 100%);
    &.fixed-nav {
      position: fixed;
      // top: -75px;
      left: 0;
      width: 100%;
      z-index: 2000;
      #navigation-divider {
        border-bottom: 53px #241d46 solid;
      }
    }
  }
  #navigation-items-container {
    display: grid;
    grid-template-columns: repeat(4, 160px);
    column-gap: 10px;
  }

</style>
