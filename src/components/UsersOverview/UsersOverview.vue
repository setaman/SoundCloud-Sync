<template>
  <div id="users-overview" class="shadow-0" :class="{expanded: isOverviewExpanded}">
    <div id="users-overview-container" class="shadow-0" :class="{expanded: isOverviewExpanded}">
      <div class="users-overview-head q-pa-lg">
        <div class="text-center">
          <user-avatar :url="userOne.avatar_url"/>
          <p class="ellipsis text-white text-bold q-mt-md q-px-sm">
            <a class="user-link" :href="userOne.permalink_url">
              {{ userOne.username.slice(0, 60) }}
            </a>
          </p>
        </div>
        <div class="flex flex-center">
          <user-statistics-divider>
            <q-btn id="sync-all-btn" flat color="primary" round icon="fas fa-sync-alt"></q-btn>
          </user-statistics-divider>
        </div>
        <div class="text-center">
          <user-avatar :url="userTwo.avatar_url"/>
          <p class="ellipsis text-white text-bold q-mt-md q-px-sm">
            <a class="user-link" :href="userTwo.permalink_url">
              {{ userTwo.username.slice(0, 60) }}
            </a>
          </p>
        </div>
      </div>
      <div id="users-overview-stats" class="">
        <user-statistics-card title="likes" :value-one="userOne.likes" :value-two="userTwo.likes"/>
        <user-statistics-card type="followings" title="followings" :value-one="userOne.followings" :value-two="userTwo.followings"/>
        <user-statistics-card type="playlists" title="playlists" :value-one="userOne.playlists" :value-two="userTwo.playlists"/>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from 'components/Base/UserAvatar';
import UserStatisticsCard from 'components/UsersOverview/UserStatisticsCard';
import UserStatisticsDivider from 'components/UsersOverview/UserStatisticsDivider';

export default {
  name: 'UsersOverview',
  components: { UserStatisticsDivider, UserStatisticsCard, UserAvatar },
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
  $expanded_height: 362px;

  $c_bg: #231c45;
  $c_likes: #ff4966;
  $c_followings: #2069ff;
  $c_playlists: #26ffae;
  $c_settings: #8344ff;

  #users-overview {
    transition: 0.5s;
    //border-left: 2px solid rgba(255, 255, 255, 0.1);
    background-color: $c_bg;
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
    grid-template-columns: 1fr 42px 1fr;
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
