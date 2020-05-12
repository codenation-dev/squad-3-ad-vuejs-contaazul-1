import Vue from 'vue';
import Vuex from 'vuex';
import Logs from './Logs/index';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    Logs,
  },
});
