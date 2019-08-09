<template>
  <q-page class="q-px-lg q-pt-xl q-px-xs-sm">
    <transition
      appear
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <splash-loading v-if="!isInitialized"/>
      <lists-group v-else>
        <list slot="list-one" :isLoading="isLoadingOne" :items="itemsOne" :maxItems="itemsCountOne"
              @selectedChange="onSelectedChangeOne"
              @filtersChange="onFiltersChangeOne">
          <div>
            <transition
              appear
              mode="out-in"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <list-pagination v-if="pagesOne > 1" :current="pageOne" :max="pagesOne" @pageChange="changePageOne"/>
            </transition>
          </div>
        </list>
        <div slot="list-sync-controls">
          <list-sync-controls
            :progress="syncPercent"
            @syncSelectedOne="onSyncSelectedOne"
            @syncSelectedTwo="onSyncSelectedTwo"
            @syncFilteredOne="onSyncFilteredOne"
            @syncFilteredTwo="onSyncFilteredTwo"
          ></list-sync-controls>
        </div>
        <list slot="list-two" :isLoading="isLoadingTwo" :items="itemsTwo" :maxItems="itemsCountTwo"
              @selectedChange="onSelectedChangeTwo"
              @filtersChange="onFiltersChangeTwo">
          <div>
            <transition
              appear
              mode="out-in"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <list-pagination v-if="pagesTwo > 1" :current="pageTwo" :max="pagesTwo" @pageChange="changePageTwo"/>
            </transition>
          </div>
        </list>
      </lists-group>
    </transition>
  </q-page>
</template>
<script>
import ListsGroup from 'components/ListsGroup/ListsGroup';
import List from 'components/ListsGroup/List';
import ListSyncControls from 'components/ListsGroup/ListSyncControls';
import notificationMixin from 'components/notificationMixin';
const uniqid = require('uniqid');
const { SOCKET_GET_USER_LIKES, SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR, SOCKET_SYNC_STATUS_GET,
  SOCKET_SYNC_STATUS_DATA, SOCKET_SYNC_STATUS_FAIL, SOCKET_ADD_JOB } = require('../background/const/socketEvents.js');
const { JOB_TYPE_SELECTED, JOB_TYPE_ONE_USER, LIST_TYPE_LIKES } = require('../background/const/const.js');
import SplashLoading from 'components/Base/SplashLoading';
import { STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_ERROR } from 'src/utils/const';
import ListPagination from 'components/ListsGroup/ListPagination';

export default {
  name: 'Likes',
  components: { ListPagination, SplashLoading, ListSyncControls, List, ListsGroup },
  mixins: [notificationMixin],
  data: () => ({
    filtersTwo: {
      title: '',
      status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_ERROR],
      sort: ''
    },
    filtersOne: {
      title: '',
      status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_ERROR],
      sort: 'Oldest'
    },
    itemsCountOne: 0,
    itemsCountTwo: 0,
    itemsOne: [],
    checkedItemsOne: [],
    itemsTwo: [],
    checkedItemsTwo: [],
    isLoadingOne: true,
    isLoadingTwo: true,
    isInitialized: false,
    syncPercent: 0,
    pageOne: 1,
    pageTwo: 1,
    pagesOne: 1,
    pagesTwo: 1
  }),
  sockets: {
    [SOCKET_USER_LIKES] ({ userId, items, from, page, pages }) {
      console.log('LOADED LIkES', userId, items, from, page, pages);
      this.isInitialized = true;
      if (userId === this.userOne.userId) {
        this.itemsOne = items;
        this.itemsCountOne = from;
        this.isLoadingOne = false;
        this.pagesOne = pages;
      } else {
        this.itemsTwo = items;
        this.itemsCountTwo = from;
        this.isLoadingTwo = false;
        this.pagesTwo = pages;
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
      this.getUserOneLikes();
      this.getUserTwoLikes();
    },
    getUserOneLikes () {
      this.isLoadingOne = true;
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userOne.userId,
        ...this.filtersOne,
        page: this.pageOne
      });
    },
    getUserTwoLikes () {
      this.isLoadingTwo = true;
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userTwo.userId,
        ...this.filtersTwo,
        page: this.pageTwo
      });
    },
    getSyncPercent () {
      this.$socket.emit(SOCKET_SYNC_STATUS_GET);
    },
    onFiltersChangeOne (filters) {
      this.isLoadingOne = true;
      this.pageOne = 1;
      this.filtersOne = filters;
      this.getUserOneLikes();
    },
    onFiltersChangeTwo (filters) {
      this.isLoadingTwo = true;
      this.pageTwo = 1;
      this.filtersTwo = filters;
      this.getUserTwoLikes();
    },
    onSelectedChangeOne (items) {
      this.checkedItemsOne = items;
    },
    onSelectedChangeTwo (items) {
      this.checkedItemsTwo = items;
    },
    onSyncSelectedOne () {
      if (this.checkedItemsOne.length < 1) {
        this.notifyWarn('No items selected');
      } else {
        const selectedIds = this.checkedItemsOne.join(' ');
        const itemsToSync = this.itemsOne.filter(item => selectedIds.includes(item.id));
        // console.log(itemsToSync);
        this.addJob(JOB_TYPE_SELECTED, this.userOne, this.userTwo, itemsToSync);
      }
    },
    onSyncFilteredOne () {},
    onSyncFilteredTwo () {},
    onSyncSelectedTwo () {},
    changePageOne (newPage) {
      this.pageOne = newPage;
      this.getUserOneLikes();
    },
    changePageTwo (newPage) {
      this.pageTwo = newPage;
      this.getUserTwoLikes();
    },
    addJob (type, userFrom, userTo, items) {
      console.log('adding new job');
      this.$socket.emit(SOCKET_ADD_JOB, {
        id: uniqid(),
        type: type,
        itemsType: LIST_TYPE_LIKES,
        items,
        userTo,
        userFrom
      });
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
