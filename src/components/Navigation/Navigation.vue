<template>
  <aside id="navigation" class="relative-position">
    <div id="navigation-container">
      <div id="navigation-items-container" class="flex column wrap justify-between">
        <div>
          <div class="flex justify-end q-pt-md q-pr-md">
            <q-btn round size="large" flat @click="toggleOverview">
        <span class="navigation-burger" :class="{expanded: isOverviewExpanded}">
        </span>
              <span class="navigation-burger" :class="{expanded: isOverviewExpanded}">
        </span>
            </q-btn>
          </div>

          <div>
          </div>
        </div>
        <div class="flex justify-end">
          <ul>
            <li v-for="(route, i) in routes" :key="`${i}_${route.title}`">
              <router-link :to="route.route" class="navigation-item" :class="[route.title]">
                {{route.title}}
              </router-link>
            </li>
            <li>
              <router-link to="/settings" class="navigation-item settings">
                <q-icon name="settings" size="large"></q-icon>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Navigation',
  components: { },
  data: () => ({
    activeRouteIndex: 0,
    expanded: true,
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
        title: 'followings',
        color: 'info'
      },
      {
        route: '/home/playlists',
        icon: 'list',
        title: 'playlists',
        color: 'cyan'
      }
    ]
  }),
  computed: {
    isOverviewExpanded () {
      return this.$store.state.overview.expanded;
    }
  },
  methods: {
    toggleOverview () {
      this.$store.dispatch('toggleOverview');
    }
  }
};
</script>

<style scoped lang="scss">
  $base_width: 80px;
  $expanded_width: 500px;

  $c_bg: #231c45;
  $c_likes: #ff4966;
  $c_followings: #2069ff;
  $c_playlists: #26ffae;
  $c_settings: #8344ff;

  #navigation {
    transition: 0.5s;
    max-height: 100vh;
    background: $c_bg;
    overflow: hidden;
    width: $base_width;
    &.expanded {
      width: $expanded_width;
    }
  }

  #navigation-container{
    position: fixed;
    height: 100vh;
    display: grid;
    z-index: 9999;
    background: $c_bg;
    transition: 0.5s;
    width: $base_width;
    &.expanded {
      width: $expanded_width;
    }
  }

  #navigation-items-container {
    height: 100vh;
    // position: fixed;
    overflow: hidden;
    width: $base_width;
    background: $c_bg;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        display: block;
        writing-mode: vertical-lr;
        text-orientation: sideways;
        direction: rtl;
        transform: rotate(180deg);
      }
    }
  }

  .navigation-burger {
    display: block;
    width: 100%;
    height: 20px;
    &:after, &:before {
      transition: 0.3s;
      display: inline-block;
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: transparent;
      border: 2px solid white;
      margin: 4px;
    }
    &.expanded {
      &:after, &:before {
        background: white;
      }
    }
  }

  a.navigation-item {

    transition: 0.3s;
    color: #c3c3c3;
    font-size: 0.8rem;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    display: block;
    padding: 20px 30px;
    font-weight: bold;

    &.likes {
      &:hover {
        background: rgba($c_likes, 0.1);
        color: $c_likes;
      }
    }

    &.followings {
      &:hover {
        background: rgba($c_followings, 0.1);
        color: $c_followings;
      }
    }

    &.playlists {
      &:hover {
        background: rgba($c_playlists, 0.1);
        color: $c_playlists;
      }
    }

    &.settings {
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      &:hover {
        background: rgba($c_settings, 0.1);
        color: $c_settings;
      }
    }
  }

  a.router-link-active {
    &.likes {
      background: rgba($c_likes, 0.1);
      color: $c_likes;
    }

    &.followings {
      background: rgba($c_followings, 0.1);
      color: $c_followings;
    }

    &.playlists {
      background: rgba($c_playlists, 0.1);
      color: $c_playlists;
    }

    &.settings {
      background: rgba($c_settings, 0.1);
      color: $c_settings;
    }
  }
</style>
