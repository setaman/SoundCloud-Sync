import Vue from 'vue'
import Vuex from 'vuex'

import users from './users'
import initialization from './initialization'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
const Store = new Vuex.Store({
  modules: {
    users,
    initialization
  },
  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

// load persisted users data on app start
Store.dispatch('loadPersistedUsers')

export default Store
