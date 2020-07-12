import {stringify} from 'qs';

export const Global = {
  // 首页
  INDEX_PAGE: '/index',
  // 登录页
  LOGIN_PAGE: '/login',
  // 购物车
  SHOPPING_CART_PAGE: '/shopping-cart',
  // 确认订单
  CONFIRM_ORDER_PAGE: '/order/confirm',
  // 支付订单
  PAYMENT_ORDER_PAGE: '/order/payment',
  // 订单来源
  ORDER_SOURCE_TYPE: 1
};

export const Urls = {
  // 我的优惠券
  getCouponPage: () => `/user/coupon`,
  // 搜索页面
  getSearchPage: () => `/search`,
  // 退款申请
  getRefundApplyPage: (itemId) => `/user/refund/${itemId}`,
  // 去支付
  getPaymentPage: (tradeSn) => `/order/payment?tradeSn=${tradeSn}`,
  //订单详情
  getOrderUrl: (id) => `/user/order/${id}`,
  //商品详情
  getProductPage: (id) => `/product/${id}`,
  // 收货地址
  getAddressPage: () => '/user/address',
  // 新增收货地址
  addAddressPage: () => '/user/address/add',
  // 修改收货地址
  updateAddressPage: (id) => `/user/address/${id}`,
  // 我的订单列表
  getMyOrderPage: (payload = {tab: 0}) => `/user/order?${stringify(payload)}`,
};

export const OrderTabs = {
  All: {
    name: '全部',
    value: -1,
  },
  PendingPayment: {
    name: '待支付',
    value: 0,
  },
  ToBeDelivered: {
    name: '待发货',
    value: 1,
  },
  Shipped: {
    name: '待收货',
    value: 2,
  },
  Completed: {
    name: '已完成',
    value: 3,
  },
};

export const PaymentWay = {
  AliPayWAP: {
    name: '支付宝',
    value: 2,
  }
};

export default Global;