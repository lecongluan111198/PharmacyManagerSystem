import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import Muse from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'axios';
import langConfig from '@/lang/';
import * as moment from 'moment';
moment.locale('vi');

Vue.use(Muse);

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.prototype.$lang = langConfig.vi;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
