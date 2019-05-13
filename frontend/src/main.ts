import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import Muse from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(Muse);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
