import { login as loginService } from '@/services/user.js';
import { create as createService } from '@/services/user.js';

const login = async ({ commit }, { username, password }) => {
  const { data } = await loginService({ username, password });
  if (data.token) {
    commit('setUser', data);
  }
};

const create = async ({ commit }, { username, password }) => {
  const { data } = await createService({ username, password });
  if (data.token) {
    commit('setUser', data);
  }
};

const resetUser = ({ commit }) => {
  commit('setUser', {});
};

export default {
  login,
  create,
  resetUser,
};
