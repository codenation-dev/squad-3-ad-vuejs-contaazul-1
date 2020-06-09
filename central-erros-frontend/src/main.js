import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';
import './../node_modules/bulma/css/bulma.css';
import '../src/assets/font/linear-icons/style.css';
import '../src/assets/font/simple-line/css/simple-line-icons.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import { request } from '@/utils/interceptor';

Vue.use(Buefy);

moment.locale('pt_BR');

Vue.config.productionTip = false;

axios.interceptors.request.use(request);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
