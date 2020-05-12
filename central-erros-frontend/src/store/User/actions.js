import { login as loginService } from '@/services/user.js';

const login = async ({ commit }, { username, password }) => {
  const { data } = await loginService({ username, password });
  if (data.token) {
    commit('SET_USER', data);
  }
};

export default {
  login,
};
