import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import {abilitiesPlugin} from "@casl/vue";
import {ability} from "@/permission/ability";

import Muse from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'nprogress/nprogress.css';

import 'axios';
import VueTooltip from 'v-tooltip';
import '@/assets/v-tooltip.scss';
import langConfig from '@/lang/';
import * as moment from 'moment';
moment.locale('vi');

Vue.use(Muse);

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.prototype.$lang = langConfig.vi;
Vue.use(abilitiesPlugin, ability);
Vue.use(VueTooltip, {
    defaultBoundariesElement: 'body',
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
