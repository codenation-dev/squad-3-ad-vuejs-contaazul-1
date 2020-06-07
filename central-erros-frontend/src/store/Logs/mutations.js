export default {
  ['setLogs'](state, logs) {
    state.logs = logs;
  },
  ['setFilterLevel'](state, listLevel) {
    state.filterLogsLevel = listLevel;
  },
  ['setFilterColumn'](state, filter) {
    state.filterColumnListLogs = filter.column;
    state.filterSearchLog = filter.search;
  },
  ['setLogsArchived'](state, logs) {
    state.logsArchived = logs;
  },
  ['setFilterLevelArchived'](state, listLevel) {
    state.filterLogsLevelArchived = listLevel;
  },
  ['setFilterColumnArchived'](state, filter) {
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
  ['setLoading'](state, value) {
    state.isLoading = value;
  },
};
