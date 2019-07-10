import { setValue, deleteValue, getValue } from './electron-store'
import loadUserData from '../utils/loaduserData'

const userPlaceholder = {
  userId: '',
  username: '',
  permalink_url: '',
  clientId: '',
  token: '',
  likes: 0,
  followings: 0,
  playlists: 0,
  cover: '',
  avatar_url: ''
}

const state = {
  userOne: userPlaceholder,
  userTwo: userPlaceholder,
  isInitialized: false
}

const SET_USER_ONE = 'SET_USER_ONE'
const REMOVE_USER_ONE = 'REMOVE_USER_ONE'
const SET_USER_TWO = 'SET_USER_TWO'
const REMOVE_USER_TWO = 'REMOVE_USER_TWO'

// mutations
const mutations = {
  [SET_USER_ONE] (state, userOne) {
    setValue('userOne', userOne)
    state.userOne = userOne
  },
  [SET_USER_TWO] (state, userTwo) {
    setValue('userTwo', userTwo)
    state.userTwo = userTwo
  },
  [REMOVE_USER_ONE] (state) {
    deleteValue('userOne')
    state.userOne = userPlaceholder
  },
  [REMOVE_USER_TWO] (state) {
    deleteValue('userTwo')
    state.userTwo = userPlaceholder
  }
}

const actions = {
  setUserOne ({ commit }, userOne) {
    commit(SET_USER_ONE, userOne)
  },

  setUserTwo ({ commit }, userTwo) {
    commit(SET_USER_TWO, userTwo)
  },

  removeUserOne ({ commit }) {
    commit(REMOVE_USER_ONE)
  },

  removeUserTwo ({ commit }) {
    commit(REMOVE_USER_TWO)
  },

  // load users data on app start
  loadPersistedUsers ({ commit }) {
    const userOne = getValue('userOne') || userPlaceholder
    const userTwo = getValue('userTwo') || userPlaceholder

    commit(SET_USER_ONE, userOne)
    commit(SET_USER_TWO, userTwo)
  }
}

export default {
  state,
  mutations,
  actions
}
