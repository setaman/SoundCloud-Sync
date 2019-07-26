<template>
  <q-page class="q-px-lg q-pt-xl q-px-xs-sm">
    <!--<q-btn @click="getUsersLikes">
      load likes
    </q-btn>-->
    <transition
      appear
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <splash-loading v-if="!isInitialized"/>
      <lists-group v-else>
        <list slot="list-one" :isLoading="isLoadingOne" @increasePage="loadNewPage" :items="itemsOne" :maxItems="itemsCountOne" @filtersChange="onFiltersChangeOne"></list>
        <template slot="list-sync-controls">
          <list-sync-controls :progress="syncPercent"></list-sync-controls>
          <list-pagination/>
        </template>
        <list slot="list-two" :isLoading="isLoadingTwo" :items="itemsTwo" :maxItems="itemsCountOne" @filtersChange="onFiltersChangeTwo"></list>
      </lists-group>
    </transition>
  </q-page>
</template>
<script>
import ListsGroup from 'components/ListsGroup/ListsGroup';
import List from 'components/ListsGroup/List';
import ListSyncControls from 'components/ListsGroup/ListSyncControls';
import { SOCKET_GET_USER_LIKES, SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR, SOCKET_SYNC_STATUS_GET,
  SOCKET_SYNC_STATUS_DATA, SOCKET_SYNC_STATUS_FAIL } from 'src/utils/socketEvents.js';
import SplashLoading from 'components/Base/SplashLoading';
import { STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_ERROR } from 'src/utils/const';
import ListPagination from 'components/ListsGroup/ListPagination';

export default {
  name: 'Likes',
  components: { ListPagination, SplashLoading, ListSyncControls, List, ListsGroup },
  data: () => ({
    itemsCountOne: 0,
    itemsCountTwo: 0,
    itemsOne: [],
    itemsTwo: [],
    isLoadingOne: true,
    isLoadingTwo: true,
    isInitialized: false,
    syncPercent: 0,
    page: 1
  }),
  sockets: {
    [SOCKET_USER_LIKES] ({ userId, items, from }) {
      console.log('LOADED LIkES', userId, items, from);
      this.isInitialized = true;
      /* setTimeout(() => {
      }, 1000); */
      if (userId === this.userOne.userId) {
        this.itemsOne = items;
        this.itemsCountOne = from;
        this.isLoadingOne = false;
      } else {
        this.itemsTwo = items;
        this.itemsCountTwo = from;
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
    [SOCKET_SYNC_STATUS_FAIL] (e) {
      console.log('SYNC ERROR', e);
      this.syncPercent = 0;
    }
  },
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
      this.isLoadingOne = true;
      this.isLoadingTwo = true;

      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userOne.userId,
        title: '',
        status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_ERROR],
        sort: '',
        page: this.page
      });
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userTwo.userId,
        title: '',
        status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_ERROR],
        sort: '',
        page: this.page
      });
    },
    getSyncPercent () {
      this.$socket.emit(SOCKET_SYNC_STATUS_GET);
    },
    onFiltersChangeOne (filters) {
      this.isLoadingOne = true;
      this.page = 1;
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userOne.userId,
        ...filters,
        page: this.page
      });
    },
    onFiltersChangeTwo (filters) {
      this.isLoadingTwo = true;
      this.page = 1;
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
      /* this.page++;
      this.getUsersLikes(); */
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
