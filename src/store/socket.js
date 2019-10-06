const state = {
  connected: false
};

const SOCKET_CLIENT_CONNECTED = 'SOCKET_CLIENT_CONNECTED',
  SOCKET_CONNECTION_ERROR = 'SOCKET_CONNECTION_ERROR';

// mutations
const mutations = {
  [SOCKET_CLIENT_CONNECTED] (state) {
    console.log(SOCKET_CLIENT_CONNECTED);
    state.connected = true;
  }
};

const actions = {
  SOCKET_CLIENT_CONNECTED ({ commit }) {
    commit(SOCKET_CLIENT_CONNECTED);
  }
};

export default {
  state,
  mutations,
  actions
};
