import {
  loadLogs as loadLogsService,
  loadLogsArchived as loadLogsArchivedService,
  arquivarLog as arquivarLogService,
  arquivarSelectLogs,
  deleteLog as deleteLogsService,
  deleteSelectLogs,
} from '@/services/log';

import { ToastProgrammatic as Toast } from 'buefy';

import router from '@/router';

const loadLogs = ({ commit }) => {
  commit('setLoading', true);
  loadLogsService()
    .then(({ data }) => {
      commit('setLogs', data);
    })
    .catch(() => {
      Toast.open({
        duration: 5000,
        message: 'Erro ao carregar registros',
        type: 'is-danger',
      });
    })
    .finally(() => {
      commit('setLoading', false);
    });
};

const deleteLog = ({ dispatch, commit }, id) => {
  commit('setLoading', true);
  deleteLogsService(id)
    .then(() => {
      dispatch('reloadPage');
    })
    .catch(() => {
      Toast.open({
        duration: 5000,
        message: 'Erro ao deletar registro',
        type: 'is-danger',
      });
      commit('setLoading', false);
    });
};

const deleteListLogs = ({ dispatch, commit }, idListLogs) => {
  commit('setLoading', true);
  deleteSelectLogs(idListLogs)
    .then(() => {
      dispatch('reloadPage');
    })
    .catch(() => {
      Toast.open({
        duration: 5000,
        message: 'Erro ao deletar registros',
        type: 'is-danger',
      });
      commit('setLoading', false);
    });
};

const arquivarLog = ({ dispatch, commit }, id) => {
  commit('setLoading', true);
  arquivarLogService(id)
    .then(() => {
      dispatch('reloadPage');
    })
    .catch(() => {
      Toast.open({
        duration: 5000,
        message: 'Erro ao arquivar registro',
        type: 'is-danger',
      });
      commit('setLoading', false);
    });
};

const arquivarLogsList = ({ dispatch, commit }, idListLogs) => {
  commit('setLoading', true);
  arquivarSelectLogs(idListLogs)
    .then(() => {
      dispatch('reloadPage');
    })
    .catch(() => {
      Toast.open({
        duration: 5000,
        message: 'Erro ao arquivar registros',
        type: 'is-danger',
      });
      commit('setLoading', false);
    });
};

const reloadPage = ({ dispatch }) => {
  router.currentRoute.path === '/arquivados'
    ? dispatch('loadLogsArchived')
    : dispatch('loadLogs');
};

const addFilterLevel = ({ commit }, listLevel) => {
  commit('setFilterLevel', listLevel);
};

const addFilterColumn = ({ commit }, filter) => {
  commit('setFilterColumn', { column: filter.column, search: filter.search });
};

const resetLogs = ({ commit }) => {
  commit('setLogs', []);
};

const loadLogsArchived = ({ commit }) => {
  commit('setLoading', true);
  loadLogsArchivedService()
    .then(({ data }) => {
      commit('setLogsArchived', data);
    })
    .catch(() => {
      Toast.open({
        duration: 5000,
        message: 'Erro ao carregar registros',
        type: 'is-danger',
      });
    })
    .finally(() => {
      commit('setLoading', false);
    });
};

const addFilterLevelArchived = ({ commit }, listLevel) => {
  commit('setFilterLevelArchived', listLevel);
};

const addFilterColumnArchived = ({ commit }, filter) => {
  commit('setFilterColumnArchived', {
    column: filter.column,
    search: filter.search,
  });
};

const resetLogsArchived = ({ commit }) => {
  commit('setLogsArchived', []);
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
