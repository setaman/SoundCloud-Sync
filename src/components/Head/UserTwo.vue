<template>
  <div id="user-two-container" class="col-6">
    <user-edit :dialog.sync="dialog" @save="persistUser" :user="userTwo"/>
    <div class="row justify-center items-center full-height q-col-gutter-sm relative-position z-top q-pa-xl">
      <div class="col-xs-12 col-sm-12 col-md-2 flex flex-center">
        <q-btn size="35px" round @click="dialog.open = true">
          <user-avatar :url="userTwo.avatar_url"/>
        </q-btn>
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
import UserAvatar from '../UserAvatar';
import UserStatistics from './UserStatistics';
import UserEdit from './UserEdit';
export default {
  name: 'UserTwo',
  components: { UserEdit, UserStatistics, UserAvatar },
  data () {
    return {
      dialog: {
        open: false
      }
    };
  },
  computed: {
    userTwo () {
      return this.$store.state.users.userTwo;
    }
  },
  methods: {
    persistUser (user) {
      this.$store.dispatch('setUserTwo', user);
    }
  }
};
</script>

<style scoped lang="scss">
  #user-two-container {
   position: relative;
  }
</style>
