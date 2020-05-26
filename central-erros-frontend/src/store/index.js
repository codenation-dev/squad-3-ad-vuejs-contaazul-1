import Vue from 'vue';
import Vuex from 'vuex';
import Persistence from 'vuex-persist';
import Logs from './Logs/index';
import User from './User/index';

Vue.use(Vuex);

const local = new Persistence({
  storage: window.localStorage,
  reducer: state => ({ User: state.User }),
});

export default new Vuex.Store({
  namespaced: true,
  modules: {
    Logs,
    User,
  },
  plugins: [local.plugin],
});
