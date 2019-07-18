<template>
  <q-page>
    <q-btn @click="getUsersLikes">
      load likes
    </q-btn>
    <lists-group>
      <list slot="list-one" :items="likesUserOne"></list>
      <list-sync-controls slot="list-sync-controls"></list-sync-controls>
      <list slot="list-two" :items="likesUserTwo"></list>
    </lists-group>
  </q-page>
</template>
<script>
import ListsGroup from '../components/ListsGroup/ListsGroup'
import List from '../components/ListsGroup/List'
import ListSyncControls from '../components/ListsGroup/ListSyncControls'
import { SOCKET_GET_USER_LIKES, SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR } from 'src/utils/socketEvents.js'

export default {
  name: 'Likes',
  components: { ListSyncControls, List, ListsGroup },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    [SOCKET_USER_LIKES] (likes) {
      console.log('LOADED LIkES', likes)
    },
    [SOCKET_USER_LIKES_ERROR] (e) {
      console.log('ERROR LIkES', e)
    }
  },

  data: () => ({
    items: []
  }),
  computed: {
    userOne () {
      return this.$store.state.users.userOne
    },
    likesUserTwo () {
      return this.$store.state.users.userTwo.likes
    }
  },
  methods: {
    getUsersLikes () {
      console.log(this.userOne)
      this.$socket.emit(SOCKET_GET_USER_LIKES, this.userOne.userId)
    },
    onChecked (itemId) {
      this.checkedItems.push(itemId)
    },
    onUnchecked (itemId) {
      const index = this.checkedItems.findIndex(item => item.id === itemId)
      this.checkedItems.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
