import { loadLogs as loadLogsService } from '@/services/log';

const loadLogs = async ({ commit, rootGetters }) => {
  const userToken = rootGetters['User/userToken'];
  const { data } = await loadLogsService(userToken);
  if (data.length) {
    commit('SET_LOGS', data);
  }
};

export default {
  loadLogs,
};
