export default {
  ['SET_LOGS'](state, logs) {
    state.logs = logs;
  },
  ['SET_FILTER_LEVEL'](state, listLevel) {
    state.filterLogsLevel = listLevel;
  },
};
