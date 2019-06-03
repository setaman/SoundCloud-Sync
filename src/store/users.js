import { setValue, deleteValue, getValue } from './electron-store'

const userPlaceholder = {
  userId: '',
  username: '',
  permalink_url: '',
  clientId: '',
  token: '',
  cover: '',
  likes: [],
  followings: [],
  playlists: [],
  avatar_url: ''
}

const state = {
  userOne: userPlaceholder,
  userTwo: userPlaceholder
}

const SET_USER_ONE = 'SET_USER_ONE'
const REMOVE_USER_ONE = 'REMOVE_USER_ONE'
const SET_USER_TWO = 'SET_USER_TWO'
const REMOVE_USER_TWO = 'REMOVE_USER_TWO'
const INIT = 'INIT'

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
  },
  [INIT] (state) {
    const userOne = getValue('userOne')
    const userTwo = getValue('userTwo')
    state.userOne = userOne || userPlaceholder
    state.userTwo = userTwo || userPlaceholder

    console.log(state.userOne)
    console.log(state.userTwo)
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

  init ({ commit }) {
    commit(INIT)
  }
}

export default {
  state,
  mutations,
  actions
}
