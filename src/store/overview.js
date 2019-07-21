const state = {
  expanded: false
};

const TOGGLE_OVERVIEW = 'TOGGLE_OVERVIEW';

const mutations = {
  [TOGGLE_OVERVIEW] (state) {
    state.expanded = !state.expanded;
  }
};

const actions = {
  toggleOverview ({ commit }) {
    commit(TOGGLE_OVERVIEW);
  }
};

export default {
  state,
  mutations,
  actions
};
