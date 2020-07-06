import Vue from 'vue'
import VueRouter from 'vue-router'
import {BasicLayout, BlankLayout} from '@/layouts'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: 'blank',
    name: 'blank',
    component: BlankLayout,
    redirect: '/index',
    children: [{
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
    }, {
      path: '/order/confirm',
      name: 'order-confirm',
      component: () => import('@/views/order/confirm/index')
    }, {
      path: '/order/payment',
      name: 'order-payment',
      component: () => import('@/views/order/payment/index')
    }]
  }, {
    name: 'index',
    path: '/',
    redirect: '/index',
    component: BasicLayout,
    children: [{
      path: '/index',
      name: 'index',
      component: () => import('@/views/index'),
      meta: {title: '首页'}
    }, {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: () => import('@/views/shoppingCart/index'),
      meta: {title: '购物车'}
    }, {
      path: '/user',
      name: 'user',
      component: () => import('@/views/user/index'),
      meta: {title: '个人中心'}
    }, {
      path: '/classify',
      name: 'classify',
      component: () => import('@/views/index'),
      meta: {title: '分类'}
    }]
  }]
});
export default router;