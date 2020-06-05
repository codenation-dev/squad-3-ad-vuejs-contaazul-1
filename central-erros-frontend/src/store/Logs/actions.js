import {
  loadLogs as loadLogsService,
  loadLogsArchived as loadLogsArchivedService,
  arquivarLog as arquivarLogService,
  arquivarSelectLogs,
  deleteLog as deleteLogsService,
  deleteSelectLogs,
} from '@/services/log';

import router from '@/router';

const loadLogs = async ({ commit }) => {
  const { data } = await loadLogsService();
  commit('SET_LOGS', data);
};

const deleteLog = async ({ dispatch }, id) => {
  await deleteLogsService(id);
  dispatch('reloadPage');
};

const deleteListLogs = async ({ dispatch }, idListLogs) => {
  await deleteSelectLogs(idListLogs);
  dispatch('reloadPage');
};

const arquivarLog = async ({ dispatch }, id) => {
  await arquivarLogService(id);
  dispatch('reloadPage');
};

const arquivarLogsList = async ({ dispatch }, idListLogs) => {
  await arquivarSelectLogs(idListLogs);
  dispatch('reloadPage');
};

const reloadPage = ({ dispatch }) => {
  router.currentRoute.path === '/arquivados'
    ? dispatch('loadLogsArchived')
    : dispatch('loadLogs');
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
  commit('SET_LOGS_ARCHIVED', data);
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
  deleteLog,
  deleteListLogs,
  arquivarLog,
  arquivarLogsList,
  reloadPage,
  addFilterLevel,
  addFilterColumn,
  resetLogs,
  loadLogsArchived,
  addFilterLevelArchived,
  addFilterColumnArchived,
  resetLogsArchived,
};
