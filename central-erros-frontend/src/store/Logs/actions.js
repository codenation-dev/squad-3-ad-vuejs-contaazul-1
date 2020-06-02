import {
  loadLogs as loadLogsService,
  loadLogsArchived as loadLogsArchivedService,
  deleteLogs as deleteLogsService,
  deleteSelectLogs,
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

const deleteListLogs = async ({ dispatch, rootGetters }, idListLogs) => {
  console.log(idListLogs);
  const userToken = rootGetters['User/userToken'];
  await deleteSelectLogs(idListLogs, userToken);
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

const loadLogsArchived = async ({ commit }) => {
  const { data } = await loadLogsArchivedService();
  if (data.length) {
    commit('SET_LOGS_ARCHIVED', data);
  }
};

const addFilterLevelArchived = ({ commit }, listLevel) => {
  commit('SET_FILTER_LEVEL_ARCHIVED', listLevel);
};

const addFilterColumnArchived = ({ commit }, filter) => {
  commit('SET_FILTER_COLUMN_ARCHIVED', {
    column: filter.column,
    search: filter.search,
  });
};

const resetLogsArchived = ({ commit }) => {
  commit('SET_LOGS_ARCHIVED', []);
};

export default {
  loadLogs,
  deleteLogs,
  deleteListLogs,
  addFilterLevel,
  addFilterColumn,
  resetLogs,
  loadLogsArchived,
  addFilterLevelArchived,
  addFilterColumnArchived,
  resetLogsArchived,
};
