import Vue from 'vue';
import Vuex from 'vuex';
import userInfo from './modules/userInfo';
import config from './config/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    closingHours: null,
    openingHours: null,
  },
  mutations: {
    setOPandED(state, payload) {
      state.openingHours = payload.open;
      state.closingHours = payload.close;

      localStorage.setItem('openingHours', payload.open);
      localStorage.setItem('closingHours', payload.close);
    },
  },
  actions: {
  },
  modules: {
    // userInfo 模組與config模組，本身就包含 state mutation action
    userInfo,
    config,
  },
  strict: true,
});
