import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

import Toasted from 'vue-toasted';
import Logger from 'vuejs-logger';

Vue.use(MuseUI);
Vue.use(Toasted);
Vue.use(Logger);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
