
const state = {
  isInitialized: false,
  isInitializing: false,
  isInitializationFailed: false
}

const START_INITIALIZATION = 'START_INITIALIZATION'
const INITIALIZATION_FAIL = 'INITIALIZATION_FAIL'
const INITIALIZATION_SUCCESS = 'INITIALIZATION_SUCCESS'

// mutations
const mutations = {
  [START_INITIALIZATION] (state) {
    state.isInitializing = true
  },
  [INITIALIZATION_SUCCESS] (state) {
    state.isInitializing = false
    state.isInitialized = true
  },
  [INITIALIZATION_FAIL] (state) {
    state.isInitializing = false
    state.isInitialized = false
    state.isInitializationFailed = true
  }
}

const actions = {
  startItialization ({ commit }, { userOne, userTwo }) {
    commit(START_INITIALIZATION, { userOne, userTwo })
  },

  faileInitialization ({ commit }) {
    commit(INITIALIZATION_FAIL)
  },

  successInitialization ({ commit }) {
    commit(INITIALIZATION_SUCCESS)
  }
}

export default {
  state,
  mutations,
  actions
}
