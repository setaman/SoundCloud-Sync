<template>
<div id="user-one-container" class="col-6">
  <user-edit :dialog.sync="dialog" :user="user"/>
  <div class="row justify-center items-center full-height q-col-gutter-sm relative-position z-top q-pa-xl">
    <div class="col-xs-12 col-sm-12 col-md-10">
      <div class="row wrap q-gutter-md">
        <user-statistics/>
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-2 flex flex-center">
      <q-btn size="35px" round @click="dialog.open = true">
        <user-avatar/>
      </q-btn>
    </div>
  </div>
</div>
</template>

<script>
import UserAvatar from '../UserAvatar'
import UserStatistics from './UserStatistics'
import UserEdit from './UserEdit'
export default {
  name: 'UserOne',
  components: { UserEdit, UserStatistics, UserAvatar },
  data () {
    return {
      dialog: {
        open: false
      },
      user: this.$store.state.users.userOne
    }
  },
  computed: {
    userOne () {
      console.log('UserOne', this.$store.state.users.userOne)
      return this.$store.state.users.userOne
    }
  },
  methods: {
    onEditClosed () {
      console.log('Closed')
      this.dialog = false
    }
  }
}
</script>

<style scoped lang="scss">
  #user-one-container {
    position: relative;
    overflow: hidden;
    z-index: 10;
  }

</style>
