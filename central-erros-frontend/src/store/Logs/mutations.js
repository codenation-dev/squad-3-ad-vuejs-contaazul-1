export default {
  ['SET_LOGS'](state, logs) {
    state.logs = logs;
  },
  ['SET_FILTER_LEVEL'](state, listLevel) {
    state.filterLogsLevel = listLevel;
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
  ['setErrorMonth'](state, value) {
    state.showErrorMonth = value;
  },
  ['setWarningMonth'](state, value) {
    state.showWarningMonth = value;
  },
  ['setDebugMonth'](state, value) {
    state.showDebugMonth = value;
  },
};
