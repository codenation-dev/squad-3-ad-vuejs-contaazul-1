import store from '@/store';

export const request = config => {
  const isLogged = store.getters['User/isLogged'];
  const token = store.getters['User/userToken'];
  if (isLogged) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
