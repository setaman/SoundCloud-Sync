<template>
  <q-page class="q-px-lg q-pt-xl q-px-xs-sm">
    <!--<q-btn @click="getUsersLikes">
      load likes
    </q-btn>-->
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <splash-loading v-if="isLoading"/>
      <lists-group v-else>
        <list slot="list-one" @increasePage="loadNewPage" :items="itemsOne" @filtersChange="onFiltersChangeOne"></list>
        <list-sync-controls :progress="syncPercent" slot="list-sync-controls"></list-sync-controls>
        <list slot="list-two" :items="itemsTwo" @filtersChange="onFiltersChangeTwo"></list>
      </lists-group>
    </transition>
  </q-page>
</template>
<script>
import ListsGroup from 'components/ListsGroup/ListsGroup';
import List from 'components/ListsGroup/List';
import ListSyncControls from 'components/ListsGroup/ListSyncControls';
import { SOCKET_GET_USER_LIKES, SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR, SOCKET_SYNC_STATUS_GET,
  SOCKET_SYNC_STATUS_DATA } from 'src/utils/socketEvents.js';
import SplashLoading from 'components/Base/SplashLoading';
import { STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR } from 'src/utils/const';
import { SOCKET_INITIALIZATION_FAIL } from 'src/utils/socketEvents';

export default {
  name: 'Likes',
  components: { SplashLoading, ListSyncControls, List, ListsGroup },
  sockets: {
    [SOCKET_USER_LIKES] ({ userId, likes }) {
      console.log('LOADED LIkES', userId, likes);
      if (userId === this.userOne.userId) {
        this.itemsOne.push(...likes);
        this.isLoadingOne = false;
      } else {
        this.itemsTwo.push(...likes);
        this.isLoadingTwo = false;
      }
    },
    [SOCKET_USER_LIKES_ERROR] (e) {
      console.log('ERROR LIkES', e);
    },
    [SOCKET_SYNC_STATUS_DATA] ({ likesSyncPercent }) {
      console.log('SYNC PERCENT', likesSyncPercent);
      this.syncPercent = likesSyncPercent || 0;
    },
    [SOCKET_INITIALIZATION_FAIL] (e) {
      console.log('SYNC ERROR', e);
      this.syncPercent = 0;
    }
  },

  data: () => ({
    itemsOne: [],
    itemsTwo: [],
    isLoadingOne: true,
    isLoadingTwo: true,
    syncPercent: 0,
    page: 1
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
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userOne.userId,
        title: '',
        status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR],
        sort: '',
        page: this.page
      });
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userTwo.userId,
        title: '',
        status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR],
        sort: '',
        page: this.page
      });
    },
    getSyncPercent () {
      this.$socket.emit(SOCKET_SYNC_STATUS_GET);
    },
    onFiltersChangeOne (filters) {
      console.log('RELOAD ON CHANGE');
      this.page = 1;
      this.itemsOne = [];
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userOne.userId,
        ...filters,
        page: this.page
      });
    },
    onFiltersChangeTwo (filters) {
      this.page = 1;
      this.itemsTwo = [];
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userTwo.userId,
        ...filters,
        page: this.page
      });
    },
    onChecked (itemId) {
      this.checkedItems.push(itemId);
    },
    onUnchecked (itemId) {
      const index = this.checkedItems.findIndex(item => item.id === itemId);
      this.checkedItems.splice(index, 1);
    },
    loadNewPage () {
      this.page++;
      this.getUsersLikes();
    }
  },
  mounted () {
    setTimeout(() => this.getUsersLikes(), 500);
    this.getSyncPercent();
  }
};
</script>

<style scoped>

</style>
