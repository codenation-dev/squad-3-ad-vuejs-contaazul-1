export default {
  ['SET_LOGS'](state, logs) {
    state.logs = logs;
  },
  ['setProdYear'](state, value) {
    state.showProdYear = value;
  },
  ['setHmlYear'](state, value) {
    state.showHmlYear = value;
  },
  ['setDevYear'](state, value) {
    state.showDevYear = value;
  },
};
