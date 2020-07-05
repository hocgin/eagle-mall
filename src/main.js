import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import { Notify } from 'vant';

Vue.use(Notify);
Vue.config.productionTip = false;

new Vue({
  router,
  store: store,
  render: h => h(App),
}).$mount('#app');
