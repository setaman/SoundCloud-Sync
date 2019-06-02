import { setValue, deleteValue } from './electron-store'

const userPlaceholder = {
  userId: '',
  username: '',
  userUrl: '',
  clientId: '',
  token: '',
  cover: '',
  avatar: '',
  likes: [],
  followings: [],
  playlists: []
}

const state = {
  userOne: userPlaceholder,
  userTwo: userPlaceholder
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
  }
}

export default {
  state,
  mutations,
  actions
}
