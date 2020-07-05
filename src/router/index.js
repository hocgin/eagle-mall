import Vue from 'vue'
import VueRouter from 'vue-router'
import {BlankLayout} from '@/layouts'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: BlankLayout,
    redirect: '/index',
    children: [{
      path: '/index',
      name: 'index',
      component: () => import('@/views/index')
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index')
    }, {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search/index')
    }, {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('@/views/product/detail/index')
    }]
  }]
});
export default router;