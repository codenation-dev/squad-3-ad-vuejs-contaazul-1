import {
  loadLogs as loadLogsService,
  deleteLogs as deleteLogsService,
} from '@/services/log';

const loadLogs = async ({ commit }) => {
  const { data } = await loadLogsService();
  if (data.length) {
    commit('SET_LOGS', data);
  }
};

const deleteLogs = async ({ dispatch, rootGetters }, { id }) => {
  const userToken = rootGetters['User/userToken'];
  await deleteLogsService(id, userToken);
  dispatch('loadLogs');
};

const addFilterLevel = ({ commit }, listLevel) => {
  commit('SET_FILTER_LEVEL', listLevel);
};

const addFilterColumn = ({ commit }, filter) => {
  commit('SET_FILTER_COLUMN', { column: filter.column, search: filter.search });
};

const resetLogs = ({ commit }) => {
  commit('SET_LOGS', []);
};

export default {
  loadLogs,
  deleteLogs,
  addFilterLevel,
  addFilterColumn,
  resetLogs,
};
