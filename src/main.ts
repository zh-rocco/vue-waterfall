import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueMasonry from 'vue-masonry-css';

Vue.use(VueMasonry);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
