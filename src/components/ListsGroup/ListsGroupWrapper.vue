<template>
  <div id="list-group-wrapper">
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
  </div>
</template>

<script>
import ListsGroup from 'components/ListsGroup/ListsGroup';
import List from 'components/ListsGroup/List';
import ListSyncControls from 'components/ListsGroup/ListSyncControls';
import notificationMixin from 'components/notificationMixin';
import {
  SOCKET_ITEMS_GET,
  SOCKET_ITEMS_ONDATA,
  SOCKET_ITEMS_GET_ERROR,
  SOCKET_SYNC_STAT_GET,
  SOCKET_SYNC_STAT_ONDATA,
  SOCKET_SYNC_STAT_ERROR,
  SOCKET_TASK_ADD,
  SOCKET_INITIALIZATION_SUCCESS,
  SOCKET_SYNC_ITEM_ERROR,
  SOCKET_SYNC_ITEM_SUCCESS } from 'src/background/const/socketEvents.js';
import {
  TASK_TYPE_SELECTED,
  TASK_TYPE_FILTERED,
  LIST_TYPE_FOLLOWINGS,
  LIST_TYPE_PLAYLISTS,
  LIST_TYPE_LIKES,
  STATUS_WAITING,
  STATUS_SYNCHRONIZED,
  STATUS_ERROR } from 'src/background/const/const.js';
import SplashLoading from 'components/Base/SplashLoading';
import ListPagination from 'components/ListsGroup/ListPagination';
import { createTask } from 'components/Tasks/createTask';
import { debounce } from 'quasar';

export default {
  name: 'ListsGroupWrapper',
  props: {
    itemsType: {
      type: String,
      required: true
    }
  },
  components: { ListPagination, SplashLoading, ListSyncControls, List, ListsGroup },
  mixins: [notificationMixin],
  data () {
    return {
      filtersTwo: {
        type: this.itemsType,
        title: '',
        status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_ERROR],
        sort: 'Newest',
        range: {
          min: 1,
          max: 0
        }
      },
      filtersOne: {
        type: this.itemsType,
        title: '',
        status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_ERROR],
        sort: 'Newest',
        range: {
          min: 1,
          max: 0
        }
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
    };
  },
  sockets: {
    [SOCKET_ITEMS_ONDATA] ({ userId, items, from, page, pages }) {
      if (userId === this.userOne.userId) {
        this.itemsOne = items;
        this.itemsCountOne = from;
        this.filtersOne.range.max = from;
        this.isLoadingOne = false;
        this.pagesOne = pages;
      } else {
        this.itemsTwo = items;
        this.itemsCountTwo = from;
        this.filtersTwo.range.max = from;
        this.isLoadingTwo = false;
        this.pagesTwo = pages;
      }
      this.isInitialized = true;
    },
    [SOCKET_ITEMS_GET_ERROR] (e) {
    },
    [SOCKET_SYNC_STAT_ONDATA] (syncInfo) {
      switch (this.itemsType) {
        case LIST_TYPE_LIKES:
          this.syncPercent = syncInfo.likesSyncPercent || 0;
          break;
        case LIST_TYPE_FOLLOWINGS:
          this.syncPercent = syncInfo.followingsSyncPercent || 0;
          break;
        case LIST_TYPE_PLAYLISTS:
          this.syncPercent = syncInfo.playlistsSyncPercent || 0;
          break;
      }
    },
    [SOCKET_SYNC_STAT_ERROR] (e) {
      console.error(SOCKET_SYNC_STAT_ERROR, e);
      this.syncPercent = 0;
    },
    [SOCKET_SYNC_ITEM_ERROR] (taskInfo, updatedItem) {
      this.updateItem(updatedItem);
    },
    [SOCKET_SYNC_ITEM_SUCCESS] (taskInfo, updatedItem) {
      this.updateItem(updatedItem);
    },
    [SOCKET_INITIALIZATION_SUCCESS] () {
      this.getSyncPercent();
      this.getUsersItems();
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
    getUsersItems () {
      this.getUserOneItems();
      this.getUserTwoItems();
    },
    getUserOneItems () {
      this.isLoadingOne = true;
      this.$socket.emit(SOCKET_ITEMS_GET, {
        userId: this.userOne.userId,
        ...this.filtersOne,
        page: this.pageOne
      });
    },
    getUserTwoItems () {
      this.isLoadingTwo = true;
      this.$socket.emit(SOCKET_ITEMS_GET, {
        userId: this.userTwo.userId,
        ...this.filtersTwo,
        page: this.pageTwo
      });
    },
    getSyncPercent () {
      this.$socket.emit(SOCKET_SYNC_STAT_GET);
    },
    onFiltersChangeOne (filters) {
      const oldFilters = this.filtersOne;
      if (oldFilters.range.min !== filters.range.min || oldFilters.range.max !== filters.range.max) {
        this.filtersOne = { type: this.filtersOne.type, ...filters };
        // do not refetch the items if range was changed
        return;
      }
      this.isLoadingOne = true;
      this.pageOne = 1;
      this.filtersOne = { type: this.filtersOne.type, ...filters };
      this.getUserOneItems();
    },
    onFiltersChangeTwo (filters) {
      const oldFilters = this.filtersTwo;
      if (oldFilters.range.min !== filters.range.min || oldFilters.range.max !== filters.range.max) {
        this.filtersTwo = { type: this.filtersTwo.type, ...filters };
        // do not refetch the items if range was changed
        return;
      }
      this.isLoadingTwo = true;
      this.pageTwo = 1;
      this.filtersTwo = { type: this.filtersTwo.type, ...filters };
      this.getUserTwoItems();
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
        this.createTask(TASK_TYPE_SELECTED, this.userOne, this.userTwo, itemsToSync);
      }
    },
    onSyncFilteredOne () {
      this.createTask(TASK_TYPE_FILTERED, this.userOne, this.userTwo, [], this.filtersOne);
    },
    onSyncFilteredTwo () {
      this.createTask(TASK_TYPE_FILTERED, this.userTwo, this.userOne, [], this.filtersTwo);
    },
    onSyncSelectedTwo () {
      if (this.checkedItemsTwo.length < 1) {
        this.notifyWarn('No items selected');
      } else {
        const selectedIds = this.checkedItemsTwo.join(' ');
        const itemsToSync = this.itemsTwo.filter(item => selectedIds.includes(item.id));
        this.createTask(TASK_TYPE_SELECTED, this.userTwo, this.userOne, itemsToSync);
      }
    },
    changePageOne (newPage) {
      this.pageOne = newPage;
      this.getUserOneItems();
    },
    changePageTwo (newPage) {
      this.pageTwo = newPage;
      this.getUserTwoItems();
    },
    createTask (taskType, userFrom, userTo, items = [], query = {}) {
      this.$socket.emit(SOCKET_TASK_ADD, createTask(
        taskType,
        this.itemsType,
        items,
        userFrom,
        userTo,
        query
      ));
    },
    updateItem (updatedItem) {
      for (let i = 0; i < this.itemsOne.length; i++) {
        if (this.itemsOne[i].id === updatedItem.id) {
          this.itemsOne.splice(i, 1, updatedItem);
          return;
        }
      }
      for (let i = 0; i < this.itemsTwo.length; i++) {
        if (this.itemsTwo[i].id === updatedItem.id) {
          this.itemsTwo.splice(i, 1, updatedItem);
          return;
        }
      }
    }
  },
  mounted () {
    this.getUsersItems();
    this.getSyncPercent();
    this.getUserOneItems = debounce(this.getUserOneItems, 1000);
    this.getUserTwoItems = debounce(this.getUserTwoItems, 1000);
  }
};
</script>

<style scoped>

</style>
