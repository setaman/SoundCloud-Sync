const state = {
  connected: false
};

const SOCKET_CONNECT = 'SOCKET_CONNECT';

// mutations
const mutations = {
  [SOCKET_CONNECT] (state) {
    state.connected = true;
  }
};

const actions = {
  socket_connect ({ commit }) {
    commit(SOCKET_CONNECT);
  }
};

export default {
  state,
  mutations,
  actions
};
