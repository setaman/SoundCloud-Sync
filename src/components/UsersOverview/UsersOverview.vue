<template>
  <div id="users-overview" class="shadow-0" :class="{expanded: isOverviewExpanded}">
    <div id="users-overview-container" class="shadow-0" :class="{expanded: isOverviewExpanded}">
      <div class="users-overview-head q-pa-lg">
        <div class="text-center">
          <user-avatar :url="userOne.avatar_url"/>
          <p class="ellipsis text-white text-bold q-mt-md q-px-sm">
            <user-link :url="userOne.permalink_url" :username="userOne.username"/>
          </p>
        </div>
        <div class="flex flex-center">
          <user-statistics-divider :sync-progress="syncStats.overallSyncPercent || 0">
            <!--<q-btn id="sync-all-btn" flat color="primary" round icon="fas fa-sync-alt"></q-btn>-->
          </user-statistics-divider>
        </div>
        <div class="text-center">
          <user-avatar :url="userTwo.avatar_url"/>
          <p class="ellipsis text-white text-bold q-mt-md q-px-sm">
            <user-link :url="userTwo.permalink_url" :username="userTwo.username"/>
          </p>
        </div>
      </div>
      <div id="users-overview-stats" class="">
        <user-statistics-card :sync-progress="syncStats.likesSyncPercent || 0" title="likes" :value-one="userOne.likes" :value-two="userTwo.likes"/>
        <user-statistics-card :sync-progress="syncStats.followingsSyncPercent || 0" type="followings" title="followings" :value-one="userOne.followings" :value-two="userTwo.followings"/>
        <user-statistics-card :sync-progress="syncStats.playlistsSyncPercent || 0" type="playlists" title="playlists" :value-one="userOne.playlists" :value-two="userTwo.playlists"/>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from 'components/Navigation/UserAvatar';
import UserStatisticsCard from 'components/UsersOverview/UserStatisticsCard';
import UserStatisticsDivider from 'components/UsersOverview/UserStatisticsDivider';
import UserLink from 'components/Base/UserLink';
const { SOCKET_SYNC_STAT_ONDATA } = require('src/background/const/socketEvents.js');

export default {
  name: 'UsersOverview',
  components: { UserLink, UserStatisticsDivider, UserStatisticsCard, UserAvatar },
  props: {
    likes: {
      type: Number,
      default: 0
    },
    followings: {
      type: Number,
      default: 0
    },
    playlists: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    syncStats: {}
  }),
  sockets: {
    [SOCKET_SYNC_STAT_ONDATA] (syncStats) {
      this.syncStats = syncStats;
    }
  },

  computed: {
    isOverviewExpanded () {
      return this.$store.state.overview.expanded;
    },
    userOne () {
      return this.$store.state.users.userOne;
    },
    userTwo () {
      return this.$store.state.users.userTwo;
    }
  }
};
</script>

<style scoped lang="scss">
  $base_height: 0px;
  $expanded_height: 380px;

  $c_bg: #231c45;
  $c_likes: #ff4966;
  $c_followings: #2069ff;
  $c_playlists: #26ffae;
  $c_settings: #8344ff;

  #users-overview {
    transition: 0.5s;
    //border-left: 2px solid rgba(255, 255, 255, 0.1);
    background-color: $c_bg;
    position: relative;
    z-index: 1000;
    height: $base_height;
    &.expanded {
      height: $expanded_height;
    }
  }

  #users-overview-container {
    z-index: 9998;
    background-color: $c_bg;
    border-left: 2px solid rgba(255, 255, 255, 0.1);
    width: calc(100% - 80px);
    transition: 0.5s;
    position: fixed;
    top: 0;
    height: $base_height;
    overflow: hidden;
    &.expanded {
      height: $expanded_height;
    }
  }

  .users-overview-head {
    display: grid;
    grid-template-columns: 1fr 120px 1fr;
  }

  #users-overview-stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .stat-title {
    font-family: "Quicksand Medium", serif;
    letter-spacing: 0.1rem;
  }

  .stat-value {
    font-family: "Quicksand Light", serif;
    font-size: 3rem;
  }

  .user-link {
    transition: 0.3s;
    color: white;
    text-decoration: none;
    &:hover{
      color: #8344ff;
    }
  }

</style>
