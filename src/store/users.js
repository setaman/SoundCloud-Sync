import { setValue, deleteValue, getValue } from './electron-store'
import loadUserData from '../utils/loaduserData'

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
  userTwo: userPlaceholder,
  isInitialized: false
}

const SET_USER_ONE = 'SET_USER_ONE'
const REMOVE_USER_ONE = 'REMOVE_USER_ONE'
const SET_USER_TWO = 'SET_USER_TWO'
const REMOVE_USER_TWO = 'REMOVE_USER_TWO'
const LOAD_USERS_DATA = 'LOAD_USERS_DATA'
const LOAD_PERSISTED_USERS = 'LOAD_PERSISTED_USERS'

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

  loadPersistedUsers ({ commit }) {
    const userOne = getValue('userOne')
    const userTwo = getValue('userTwo')

    commit(SET_USER_ONE, userOne)
    commit(SET_USER_TWO, userTwo)
  },

  async loadUsersData ({ commit, state }) {
    if (state.userOne.userId && state.userTwo.userId) {
      const result = await Promise.all([loadUserData(state.userOne.userId, state.userOne.clientId, state.userOne.token),
        loadUserData(state.userTwo.userId, state.userTwo.clientId, state.userTwo.token)
      ])

      if (result[0].errors.length > 0 || result[1].errors.length > 0) {
        return new Promise((resolve, reject) => reject('Somme error occurred while loading data!'))
      }

      const loadedUserOne = result.find(data => data.user.userId === state.userOne.userId)
      const loadedUserTwo = result.find(data => data.user.userId === state.userTwo.userId)

      console.log(loadedUserOne)
      console.log(loadedUserTwo)

      const userOne = { ...state.userOne, ...loadedUserOne.user }
      const userTwo = { ...state.userTwo, ...loadedUserTwo.user }

      // updated users data
      commit(SET_USER_ONE, userOne)
      commit(SET_USER_TWO, userTwo)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
