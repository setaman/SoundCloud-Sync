import Vue from 'vue';
import Vuex from 'vuex';

import users from './users';
import overview from './overview';
import socket from './socket';
import initialization from './initialization';
import tasks from './tasks';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
const Store = new Vuex.Store({
  modules: {
    users,
    overview,
    socket,
    tasks,
    initialization
  },
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});

// load persisted users data on app start
Store.dispatch('loadPersistedUsers');

export default Store;
