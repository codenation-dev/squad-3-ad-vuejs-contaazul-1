import store from '@/store';
import router from '@/router';

export const beforeEach = (to, from, next) => {
  const isLogged = store.getters['User/isLogged'];
  const needAuth = !to?.meta?.noAuth;
  const isLoginRoute = to?.name === 'Login';

  if ((needAuth && isLogged) || !needAuth) {
    next();
  } else if (!isLoginRoute) {
    router.push({ name: 'Login' });
  }
};
