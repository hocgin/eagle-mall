import shoppingCart from '@/services/my/shoppingCart'
import order from '@/services/my/order'
import trade from '@/services/my/trade'
import user from '@/services/my/user'
import coupon from '@/services/my/coupon'
import address from '@/services/my/address'
import * as types from "@/store/mutation-types";
import * as actions from '@/store/actions-types'
import {Toast} from "vant";

export default {
  namespaced: true,
  state: {
    shoppingCartPaging: {},
    addressPaging: {},
    userInfo: null,
  },
  actions: {
    async [actions.ADD_MY_ADDRESS](_, {payload, callback}) {
      let result = await address.addMyAddress(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.GET_MY_ADDRESS](_, {payload, callback}) {
      let result = await address.getMyAddress(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.UPDATE_MY_ADDRESS](_, {payload, callback}) {
      let result = await address.updateMyAddress(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.DELETE_MY_ADDRESS](_, {payload, callback}) {
      let result = await address.deleteMyAddress(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.PAGING_MY_ADDRESS]({commit}, {payload, callback}) {
      let result = await address.pagingMyAddress(payload);
      if (result.success) {
        commit(types.SET_ADDRESS_PAGING, result.data)
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    //
    async [actions.ADD_MY_SHOPPING_CART](_, {payload, callback}) {
      let result = await shoppingCart.addMyShoppingCart(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.UPDATE_MY_SHOPPING_CART](_, {payload, callback}) {
      let result = await shoppingCart.updateMyShoppingCart(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.DELETE_MY_SHOPPING_CART](_, {payload, callback}) {
      let result = await shoppingCart.deleteMyShoppingCart(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.PAGING_MY_SHOPPING_CART]({commit}, {payload = {}, callback}) {
      let result = await shoppingCart.pagingMyShoppingCart(payload);
      if (result.success) {
        commit(types.SET_SHOPPING_CART_PAGING, result.data)
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.CREATE_REFUND_APPLY](_, {payload, callback}) {
      let result = await order.createRefundApply(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.CREATE_ORDER](_, {payload, callback}) {
      let result = await order.createMyOrder(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.CONFIRM_MY_ORDER](_, {payload, callback}) {
      let result = await order.confirmMyOrder(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.CANCEL_MY_ORDER](_, {payload, callback}) {
      let result = await order.cancelMyOrder(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.GET_WAIT_PAYMENT_TRADE](_, {payload, callback}) {
      let result = await trade.getWaitPaymentOrder(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.PAY_TRADE](_, {payload, callback}) {
      let result = await trade.payTrade(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.GET_USER_INFO]({commit}, {payload, callback}) {
      let result = await user.getUserInfo(payload);
      if (result.success) {
        commit(types.SET_USER_INFO, result.data)
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.PAGING_MY_ORDER](_, {payload, callback}) {
      let result = await order.pagingMyOrder(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.PAGING_MY_COUPON](_, {payload, callback}) {
      let result = await coupon.pagingMyCoupon(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.GET_MY_ORDER](_, {payload, callback}) {
      let result = await order.getMyOrder(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
    async [actions.GET_MY_ADDRESS](_, {payload, callback}) {
      let result = await address.getMyAddress(payload);
      if (result.success) {
        if (callback) callback(result);
      } else {
        Toast.fail(result.message);
      }
    },
  },
  mutations: {
    [types.SET_SHOPPING_CART_PAGING](state, data) {
      state.shoppingCartPaging = data;
    },
    [types.SET_ADDRESS_PAGING](state, data) {
      state.addressPaging = data;
    },
    [types.SET_USER_INFO](state, data) {
      state.userInfo = data;
    }
  },
}