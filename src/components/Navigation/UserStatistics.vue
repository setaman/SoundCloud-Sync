<template>
  <div class="row q-pa-xl text-center">
    <div class="col-5">
      <user-avatar :url="userOne.avatar_url"/>
    </div>
    <div class="col-2">
      <user-statistics-divider/>
    </div>
    <div class="col-5">
      <user-avatar :url="userTwo.avatar_url"/>
    </div>
    <div class="col-12 q-pt-xl">
      <user-statistics-card title="likes" :value-one="userOne.likes" :value-two="userTwo.likes"/>
    </div>
    <div class="col-12 q-pt-xl">
      <user-statistics-card type="followings" title="followings" :value-one="userOne.followings" :value-two="userTwo.followings"/>
    </div>
    <div class="col-12 q-pt-xl">
      <user-statistics-card type="playlists" title="playlists" :value-one="userOne.playlists" :value-two="userTwo.playlists"/>
    </div>
    <div class="col-12 q-pt-xl">
      <q-btn large rounded size="lg" class="full-width" color="primary">
        sync all
      </q-btn>
    </div>
  </div>
</template>

<script>
import UserAvatar from './UserAvatar';
import UserStatisticsCard from './UserStatisticsCard';
import UserStatisticsDivider from './UserStatisticsDivider';

export default {
  name: 'UserStatistics',
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
  .stat-title {
    font-family: "Quicksand Medium", serif;
    letter-spacing: 0.1rem;
  }

  .stat-value {
    font-family: "Quicksand Light", serif;
    font-size: 3rem;
  }

</style>
