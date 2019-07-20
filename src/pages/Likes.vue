<template>
  <q-page class="q-px-lg q-pt-xl q-px-xs-sm">
    <q-btn @click="getUsersLikes">
      load likes
    </q-btn>
    <lists-group v-if="!isLoading">
      <list slot="list-one" :items="itemsOne"></list>
      <list-sync-controls slot="list-sync-controls"></list-sync-controls>
      <list slot="list-two" :items="itemsTwo"></list>
    </lists-group>
  </q-page>
</template>
<script>
import ListsGroup from '../components/ListsGroup/ListsGroup';
import List from '../components/ListsGroup/List';
import ListSyncControls from '../components/ListsGroup/ListSyncControls';
import { SOCKET_GET_USER_LIKES, SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR } from 'src/utils/socketEvents.js';

export default {
  name: 'Likes',
  components: { ListSyncControls, List, ListsGroup },
  sockets: {
    [SOCKET_USER_LIKES] ({ userId, likes }) {
      console.log('LOADED LIkES', userId, likes);
      if (userId === this.userOne.userId) {
        this.itemsOne = likes;
        this.isLoadingOne = false;
      } else {
        this.itemsTwo = likes;
        this.isLoadingTwo = false;
      }
    },
    [SOCKET_USER_LIKES_ERROR] (e) {
      console.log('ERROR LIkES', e);
    }
  },

  data: () => ({
    itemsOne: [],
    itemsTwo: [],
    isLoadingOne: true,
    isLoadingTwo: true
  }),
  computed: {
    userOne () {
      return this.$store.state.users.userOne;
    },
    userTwo () {
      return this.$store.state.users.userTwo;
    },
    isLoading () {
      return this.isLoadingOne || this.isLoadingTwo;
    }
  },
  methods: {
    getUsersLikes () {
      this.$socket.emit(SOCKET_GET_USER_LIKES, this.userOne.userId);
      this.$socket.emit(SOCKET_GET_USER_LIKES, this.userTwo.userId);
    },
    onChecked (itemId) {
      this.checkedItems.push(itemId);
    },
    onUnchecked (itemId) {
      const index = this.checkedItems.findIndex(item => item.id === itemId);
      this.checkedItems.splice(index, 1);
    }
  }
};
</script>

<style scoped>

</style>
