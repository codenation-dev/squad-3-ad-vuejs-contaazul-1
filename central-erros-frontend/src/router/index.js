import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Index';
import Dashboard from '@/views/Dashboard/DashboardView';
import ListaDeErros from '@/views/ListaDeErros';
import Login from '@/views/Login';
import NotFound from '@/views/NotFound';
import { beforeEach } from './interceptor';

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
        props: { arquivados: false },
      },
      {
        path: '/arquivados',
        name: 'ListaDeArquivados',
        component: ListaDeErros,
        props: { arquivados: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { noAuth: true },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => beforeEach(to, from, next));

export default router;
