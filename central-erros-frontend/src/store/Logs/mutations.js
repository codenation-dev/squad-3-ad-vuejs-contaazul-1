export default {
  ['SET_LOGS'](state, logs) {
    state.logs = logs;
  },
  ['SET_FILTER_LEVEL'](state, listLevel) {
    state.filterLogsLevel = listLevel;
  },
  ['SET_FILTER_COLUMN'](state, filter) {
    state.filterColumnListLogs = filter.column;
    state.filterSearchLog = filter.search;
  },
  ['SET_LOGS_ARCHIVED'](state, logs) {
    state.logsArchived = logs;
  },
  ['SET_FILTER_LEVEL_ARCHIVED'](state, listLevel) {
    state.filterLogsLevelArchived = listLevel;
  },
  ['SET_FILTER_COLUMN_ARCHIVED'](state, filter) {
    state.filterColumnListLogsArchived = filter.column;
    state.filterSearchLogArchived = filter.search;
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
