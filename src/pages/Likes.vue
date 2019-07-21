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
        <list slot="list-one" :items="itemsOne" @filtersChange="onFiltersChangeOne"></list>
        <list-sync-controls slot="list-sync-controls"></list-sync-controls>
        <list slot="list-two" :items="itemsTwo" @filtersChange="onFiltersChangeTwo"></list>
      </lists-group>
    </transition>
  </q-page>
</template>
<script>
import ListsGroup from 'components/ListsGroup/ListsGroup';
import List from 'components/ListsGroup/List';
import ListSyncControls from 'components/ListsGroup/ListSyncControls';
import { SOCKET_GET_USER_LIKES, SOCKET_USER_LIKES, SOCKET_USER_LIKES_ERROR } from 'src/utils/socketEvents.js';
import SplashLoading from 'components/Base/SplashLoading';
import { STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR } from 'src/utils/const';

export default {
  name: 'Likes',
  components: { SplashLoading, ListSyncControls, List, ListsGroup },
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
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userOne.userId,
        title: '',
        status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR],
        sort: ''
      });
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userTwo.userId,
        title: '',
        status: [STATUS_SYNCHRONIZED, STATUS_WAITING, STATUS_EXIST, STATUS_ERROR],
        sort: ''
      });
    },
    onFiltersChangeOne (filters) {
      console.log('RELOAD ON CHANGE');
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userOne.userId,
        ...filters
      });
    },
    onFiltersChangeTwo (filters) {
      this.$socket.emit(SOCKET_GET_USER_LIKES, {
        userId: this.userTwo.userId,
        ...filters
      });
    },
    onChecked (itemId) {
      this.checkedItems.push(itemId);
    },
    onUnchecked (itemId) {
      const index = this.checkedItems.findIndex(item => item.id === itemId);
      this.checkedItems.splice(index, 1);
    }
  },
  mounted () {
    setTimeout(() => this.getUsersLikes(), 500);
    // this.getUsersLikes();
  }
};
</script>

<style scoped>

</style>
