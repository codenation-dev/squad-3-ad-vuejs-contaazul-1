import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Index.vue';
import Dashboard from '@/views/Dashboard.vue';
import ListaDeErros from '@/views/ListaDeErros.vue';
import Login from '@/views/Login';
import { beforeEach } from './interceptor';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
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
        props: {
          arquivados: false,
        },
      },
      {
        path: '/arquivados',
        name: 'arquivados',
        component: ListaDeErros,
        props: {
          arquivados: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { noAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => beforeEach(to, from, next));

export default router;
