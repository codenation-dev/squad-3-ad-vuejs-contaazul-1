import Vue from 'vue';
import moment from 'moment';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './../node_modules/bulma/css/bulma.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { request } from '@/utils/interceptor';

moment.locale('pt_BR');

Vue.config.productionTip = false;

axios.interceptors.request.use(request);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
