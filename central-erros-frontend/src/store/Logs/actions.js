import { loadLogs as loadLogsService } from '@/services/log';
import { loadLogsArchived as loadLogsArchivedService } from '@/services/log';

const loadLogs = async ({ commit }) => {
  const { data } = await loadLogsService();
  if (data.length) {
    commit('SET_LOGS', data);
  }
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
  addFilterLevel,
  addFilterColumn,
  resetLogs,
  loadLogsArchived,
  addFilterLevelArchived,
  addFilterColumnArchived,
  resetLogsArchived,
};
