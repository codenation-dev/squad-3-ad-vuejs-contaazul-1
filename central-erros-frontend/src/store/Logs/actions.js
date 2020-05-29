import { loadLogs as loadLogsService } from '@/services/log';

const loadLogs = async ({ commit, rootGetters }) => {
  const userToken = rootGetters['User/userToken'];
  const { data } = await loadLogsService(userToken);
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

export default {
  loadLogs,
  addFilterLevel,
  addFilterColumn,
  resetLogs,
};
