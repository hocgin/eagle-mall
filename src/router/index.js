import Vue from 'vue'
import VueRouter from 'vue-router'
import {BasicLayout, BlankLayout} from '@/layouts'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
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
        component: () => import('@/views/search/index'),
        meta: {title: '搜索商品'}
      }, {
        path: '/product/:id',
        name: 'product-detail',
        component: () => import('@/views/product/detail/index'),
        meta: {title: '商品详情'}
      }, {
        path: '/order/confirm',
        name: 'order-confirm',
        component: () => import('@/views/order/confirm/index'),
        meta: {title: '确认订单'}
      }, {
        path: '/user/order/:id',
        name: 'order-detail',
        component: () => import('@/views/order/detail/index'),
        meta: {title: '订单详情'}
      }, {
        path: '/order/payment',
        name: 'order-payment',
        component: () => import('@/views/order/payment/index'),
        meta: {title: '支付订单'}
      }, {
        path: '/user/refund/:id',
        name: 'user-refund',
        component: () => import('@/views/order/refundApply/index'),
        meta: {title: '退款申请'}
      }, {
        path: '/user/order',
        name: 'user-order',
        component: () => import('@/views/user/order/index'),
        meta: {title: '我的订单'}
      }, {
        path: '/user/address',
        name: 'user-address',
        component: () => import('@/views/user/address/index'),
        meta: {title: '我的收货地址'}
      }, {
        path: '/user/coupon',
        name: 'user-coupon',
        component: () => import('@/views/user/coupon/index'),
        meta: {title: '我的优惠券'}
      }, {
        path: '/user/address/add',
        name: 'user-address-add',
        component: () => import('@/views/user/address/detail/index'),
        meta: {title: '新增收货地址'}
      }, {
        path: '/user/address/:id',
        name: 'user-address-update',
        component: () => import('@/views/user/address/detail/index'),
        meta: {title: '修改收货地址'}
      }, {
        path: '/order/:id',
        name: 'order-detail',
        component: () => import('@/views/order/detail/index'),
        meta: {title: '订单详情'}
      }]
    },
    {
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
        component: () => import('@/views/classify/index'),
        meta: {title: '分类'}
      }]
    }]
});
export default router;