import {
  loadLogs as loadLogsService,
  deleteLogs as deleteLogsService,
  deleteSelectLogs,
} from '@/services/log';

const loadLogs = async ({ commit }) => {
  const { data } = await loadLogsService();
  if (data.length) {
    commit('SET_LOGS', data);
  }
};

const deleteLogs = async ({ dispatch }, { id }) => {
  await deleteLogsService(id);
  dispatch('loadLogs');
};

const deleteListLogs = async ({ dispatch }, idListLogs) => {
  await deleteSelectLogs(idListLogs);
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
  deleteListLogs,
  addFilterLevel,
  addFilterColumn,
  resetLogs,
};
