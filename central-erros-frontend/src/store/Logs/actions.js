import {
  loadLogs as loadLogsService,
  deleteLogs as deleteLogsService,
} from '@/services/log';

const loadLogs = async ({ commit, rootGetters }) => {
  const userToken = rootGetters['User/userToken'];
  const { data } = await loadLogsService(userToken);
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

export default {
  loadLogs,
  deleteLogs,
  addFilterLevel,
  addFilterColumn,
};
