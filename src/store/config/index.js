const actions = {
  GET_LOADING({ commit }, value) {
    commit('SET_LOADING', value);
  },
  ADD_LOADING({ commit }, loadingToken) {
    commit('ADD_LOADING', loadingToken);
  },
  REMOVE_LOADING({ commit }, loadingToken) {
    commit('REMOVE_LOADING', loadingToken);
  },
  CLEAR_LOADING({ commit }) {
    commit('CLEAR_LOADING');
  },
  CLEAR_REQUEST({ commit }, state) {
    for (let i = 0; i < state.requestArray.length; i += 1) {
      if (state.requestArray[i].cancel) {
        // state.requestArray[i].cancel({ uuid: state.requestArray[i].uuid });
      }
    }
    commit('CLEAR_REQUEST');
  },
  REMOVE_REQUEST({ commit }, request) {
    commit('REMOVE_REQUEST', request);
  },
  ADD_REQUEST({ commit }, request) {
    commit('ADD_REQUEST', request);
  },
};

const mutations = {
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  ADD_LOADING(state, loadingToken) {
    state.loadingArray.push(loadingToken);
  },
  REMOVE_LOADING(state, loadingToken) {
    const loadingRequestIndex = state.loadingArray.findIndex((item) => item.uuid === loadingToken.uuid);
    state.loadingArray.splice(loadingRequestIndex, 1);
  },
  CLEAR_LOADING(state) {
    state.loadingArray = [];
  },
  ADD_REQUEST(state, request) {
    state.requestArray.push(request);
  },
  CLEAR_REQUEST(state) {
    state.requestArray = [];
  },
  REMOVE_REQUEST(state, request) {
    const requestIndex = state.requestArray.findIndex((item) => item.uuid === request.uuid);
    state.requestArray.splice(requestIndex, 1);
  },
};

const state = {
  isLoading: false,
  loadingArray: [],
  requestArray: [],
};

const getters = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
