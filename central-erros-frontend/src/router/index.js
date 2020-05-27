import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Index.vue';
import Dashboard from '@/views/Dashboard.vue';
import ListaDeErros from '@/views/ListaDeErros.vue';
import Login from '@/views/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/lista-erros',
        name: 'ListaDeErros',
        component: ListaDeErros,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
