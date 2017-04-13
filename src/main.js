// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Axios from './utils/axios';
import Router from 'vue-router';
import Music from './components/Music';
import Rank from './components/Rank';
import Station from './components/Station';
import Index from './components/Index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import '../static/css/reset.css';
import 'vue-swipe/dist/vue-swipe.css';
import VueLazyload from 'vue-lazyload';

NProgress.inc(0.2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false });

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './static/img/error.jpg',
  loading: './static/img/loading.png',
  attempt: 1,
  listenEvents: [ 'scroll', 'mousewheel' ]
});
Vue.use(Router);

const routes = [{
  path: '/',
  component: Index
}, {
  path: '/music',
  component: Music
}, {
  path: '/station',
  component: Station
}, {
  path: '/rank',
  component: Rank
}];

const router = new Router({
  linkActiveClass: 'active',
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

/* http */
Vue.prototype.$http = Axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
