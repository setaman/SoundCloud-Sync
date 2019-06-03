<template>
  <div id="user-two-container" class="col-6">
    <div class="row justify-center items-center full-height q-col-gutter-sm relative-position z-top q-pa-xl">
      <div class="col-xs-12 col-sm-12 col-md-2 flex flex-center">
        <user-avatar :url="userTwo.avatar_url"/>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-10">
        <div class="row wrap q-gutter-md">
          <user-statistics :likes="userTwo.likes.length" :followings="userTwo.followings.length" :playlists="userTwo.playlists.length"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '../UserAvatar'
import UserStatistics from './UserStatistics'
export default {
  name: 'UserTwo',
  components: { UserStatistics, UserAvatar },
  computed: {
    userTwo () {
      return this.$store.state.users.userTwo
    }
  }
}
</script>

<style scoped lang="scss">
  #user-two-container {
   position: relative;
  }
</style>
