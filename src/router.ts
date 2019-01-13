import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/waterfall',
    },
    {
      path: '/waterfall',
      name: 'waterfall',
      component: () => import('./views/waterfall.vue'),
    },
    {
      path: '/masonry',
      name: 'masonry',
      component: () => import('./views/masonry.vue'),
    },
  ],
});
